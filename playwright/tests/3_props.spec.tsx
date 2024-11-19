import { expect, test } from '@playwright/experimental-ct-react';
import {
    getComponent,
    getComponentHeight,
    getComponentStyles,
    getDefaultTimeout,
    setComponentStyles
} from "./helpers/get-component-helpers";
import { BasicComponent } from "./helpers/components";
import {
    getBasicComponentEqualRowsHeights,
    getBasicComponentHeights
} from "./helpers/get-components-heights";
import { defaults, Props as EqualHeightProps } from "../../src/equal-height";
import { ElementType } from "react";
type AnimationSpeed = EqualHeightProps['animationSpeed'];

test.describe('for "EqualHeight" component', () => {
    test('only as provider', async ({mount, page}) => {
        const component = await mount(
            <BasicComponent />
        );

        const element = await getComponent(component, 'Base_1_1', 'WRAPPER').evaluate(
            (e) => {
                const element = e as HTMLElement;
                return {
                    tagName: element.tagName,
                    id: element.id,
                };
            }
        );

        const foundRoot = element.tagName === 'DIV' && element.id === 'root'

        expect(
            foundRoot,
            `Expected root element, not component tag`
        ).toBeTruthy();
    });

    test('tag', async ({mount, page}) => {
        const customTag: ElementType = 'main';

        const component = await mount(
            <BasicComponent equalHeight={ { as: customTag } }/>
        );

        const tag = await getComponent(component, 'Base_1_1', 'WRAPPER').evaluate(
            (e) => (e as HTMLElement).tagName
        );

        expect(
            tag,
            `Expected custom tag`
        ).toEqual(customTag.toUpperCase());
    });

    test('id', async ({mount, page}) => {
        const id = 'custom_id';

        // Add the event listener in the page context
        await page.evaluate(() => {
            // @ts-ignore
            window.addEventListener('EqualHeight', (e: CustomEvent) => console.log(e.detail.id));
        });

        await mount(
            <BasicComponent equalHeight={ {id} }/>
        );

        // Wait for the console event and capture the logged `e.detail.id`
        const consoleMessage = await page.waitForEvent('console', msg => msg.text() === id);

        expect(
            consoleMessage.text(),
            `Expected custom id`
        ).toEqual(id);
    });

    test('timeout', async ({mount, page}) => {
        const timeout = 3000;
        const failureTimeout = 1000;

        const component = await mount(
            <BasicComponent
                equalHeight={ {
                    timeout
                } }
            />
        );
        const {
            Base_1_1
        } = await getBasicComponentHeights(component);

        await page.setViewportSize({width: 1024, height: 1024})
        await page.waitForTimeout(getDefaultTimeout({timeout: failureTimeout}));
        let Base_1_1_after_resize = await getComponentHeight(component, 'Base_1_1');

        expect(
            Base_1_1_after_resize,
            `Expected same height for "Base_1_1" components after resize.`
        ).toEqual(Base_1_1);

        await page.waitForTimeout(getDefaultTimeout({timeout: timeout - failureTimeout}));
        Base_1_1_after_resize = await getComponentHeight(component, 'Base_1_1');

        expect(
            Base_1_1_after_resize,
            `Expected NOT same height for "Base_1_1" components after resize.`
        ).not.toEqual(Base_1_1);
    });

    test.describe('animationSpeed', () => {
        test('is working', async ({mount, page}) => {
            const animationSpeed = 2000;

            const component = await mount(
                <BasicComponent
                    equalHeight={ {
                        animationSpeed
                    } }
                />
            );
            const {
                Base_1_1
            } = await getBasicComponentHeights(component);

            await page.setViewportSize({width: 1024, height: 1024})
            await page.waitForTimeout(getDefaultTimeout({animationSpeed: animationSpeed}));
            const Base_1_1_after_resize = await getComponentHeight(component, 'Base_1_1');

            expect(
                Base_1_1_after_resize,
                `Expected NOT same height for "Base_1_1" components after resize.`
            ).toEqual(Base_1_1);

            await page.waitForTimeout(getDefaultTimeout());
            const Base_1_1_after_resize_wait = await getComponentHeight(component, 'Base_1_1');

            expect(
                Base_1_1_after_resize_wait,
                `Expected same height to prove that animation was stopped.`
            ).toEqual(Base_1_1_after_resize);
        });

        test.describe('types', () => {
            const animationSpeedCases: Array<{ speed?: AnimationSpeed; expected: string | number }> = [
                // The expected values are compared against the 'transitionDuration' property from the styles retrieved via getComponentStyles.
                {expected: `${ defaults.animationSpeed }s`}, // Default value
                {speed: 0, expected: '0s'},
                {speed: 2, expected: '2s'},
                {speed: '1s', expected: '1s'},
                {speed: '500ms', expected: '0.5s'} // Playwright may convert ms to s
            ];

            animationSpeedCases.forEach(({speed, expected}) => {
                test(`is ${ speed ?? 'default' }`, async ({mount, page}) => {
                    const component = await mount(
                        <BasicComponent equalHeight={ {animationSpeed: speed} }/>
                    );

                    const transitionDuration = await getComponentStyles(component, 'Base_1_1').then(
                        (style) => style.transitionDuration
                    );

                    const inlineStyles = await getComponent(component, 'Base_1_1').evaluate(
                        (e) => (e as HTMLElement).style.transitionDuration
                    );

                    if (speed === 0) {
                        expect(
                            inlineStyles,
                            `Expected transition-duration to not be set for speed: ${ speed }`
                        ).toBeFalsy(); // Expecting to not set transition-duration in inline styles
                    } else if (speed === undefined) {
                        expect(
                            transitionDuration,
                            `Expected default transition-duration to be ${ expected }`
                        ).toEqual(expected);
                    } else {
                        expect(
                            transitionDuration,
                            `Expected transition-duration to be ${ expected }`
                        ).toEqual(expected);
                    }
                });
            });
        });
    });

    test.describe('equalRows', () => {
        test('is working', async ({mount, page}) => {
            const component = await mount(
                <BasicComponent equalHeight={ {equalRows: true} }/>
            );

            await getBasicComponentEqualRowsHeights(component);
        });

        test('tolerates difference in position', async ({mount, page}) => {
            const tolerance = 9;
            const toleranceFailure = tolerance + 1;

            const component = await mount(
                <BasicComponent equalHeight={ {equalRows: tolerance} }/>
            );

            await getBasicComponentEqualRowsHeights(component);

            await setComponentStyles(component, 'Base_1_1', 'HOLDER', {
                'margin-top': `calc(1% + ${ toleranceFailure }px)`
            });

            await page.setViewportSize({width: 1024, height: 1024});
            await page.waitForTimeout(getDefaultTimeout());

            let Base_1_1_after_resize = await getComponentHeight(component, 'Base_1_1');
            let Base_1_2_after_resize = await getComponentHeight(component, 'Base_1_2');
            expect(
                Base_1_1_after_resize,
                `Expected NOT same height for "Base_1_1" and "Base_1_2" components.`
            ).not.toEqual(Base_1_2_after_resize);

            await setComponentStyles(component, 'Base_1_1', 'HOLDER', {
                'margin-top': `calc(1% + ${ tolerance }px)`
            });

            await page.setViewportSize({width: 1000, height: 1024});
            await page.waitForTimeout(getDefaultTimeout());

            Base_1_1_after_resize = await getComponentHeight(component, 'Base_1_1');
            Base_1_2_after_resize = await getComponentHeight(component, 'Base_1_2');

            expect(
                Base_1_1_after_resize,
                `Expected same height for "Base_1_1" and "Base_1_2" components.`
            ).toEqual(Base_1_2_after_resize);
        });
    });
});

test.describe('for "EqualHeightHolder" component', () => {
    test('tag', async ({mount, page}) => {
        const customTag: ElementType = 'main';

        const component = await mount(
            <BasicComponent equalHeightHolder={ {as: customTag} }/>
        );

        const tag = await getComponent(component, 'Base_3_1', 'HOLDER').evaluate(
            (e) => (e as HTMLElement).tagName
        );

        expect(
            tag,
            `Expected custom tag`
        ).toEqual(customTag.toUpperCase());
    });
});

test.describe('for "EqualHeightElement" component', () => {
    test('tag', async ({mount, page}) => {
        const customTag = 'main';

        const component = await mount(
            <BasicComponent equalHeightElement={ {as: customTag} }/>
        );

        const tag = await getComponent(component, 'Base_1_1').evaluate(
            (e) => (e as HTMLElement).tagName
        );

        expect(
            tag,
            `Expected custom tag`
        ).toEqual(customTag.toUpperCase());
    });

    test('placeholder', async ({mount, page}) => {
        let placeholder = true;
        const component = await mount(
            <BasicComponent buttons={ {
                placeholder: placeholder
            } }/>
        );

        let Base_1_1_component = await getComponent(component, 'Base_1_1');
        let Base_3_1_component = await getComponent(component, 'Base_3_1');

        let Base_1_1 = await component
            .locator('[data-name="Base_1"]').first()
            .evaluate((el) => el.clientHeight);
        let Base_1_2 = await getComponentHeight(component, 'Base_1_2');
        let Base_3_1 = await component
            .locator('[data-name="Base_3"]')
            .first().evaluate((el) => el.clientHeight);
        let Base_3_2 = await getComponentHeight(component, 'Base_3_2');

        await expect(Base_1_1_component).not.toBeVisible();
        await expect(Base_3_1_component).not.toBeVisible();

        expect(
            Base_1_1,
            `Expected same height for "Base_1_1" and "Base_1_2" components.`
        ).toEqual(Base_1_2);

        expect(
            Base_3_1,
            `Expected same height for "Base_3_1" and "Base_3_2" components.`
        ).toEqual(Base_3_2);

        await page.getByRole('button', {name: /Revert component as placeholder/i}).click();
        await page.waitForTimeout(getDefaultTimeout());

        let Base_1_1_after_revert = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2_after_revert = await getComponentHeight(component, 'Base_1_2');
        let Base_3_1_after_revert = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2_after_revert = await getComponentHeight(component, 'Base_3_2');

        expect(
            Base_1_1_after_revert,
            `Expected same height for "Base_1_1" and "Base_1_2" components.`
        ).toEqual(Base_1_2_after_revert);

        expect(
            Base_3_1_after_revert,
            `Expected same height for "Base_3_1" and "Base_3_2" components.`
        ).toEqual(Base_3_2_after_revert);
    });

    test('disable', async ({mount, page}) => {
        let disable = true;
        const component = await mount(
            <BasicComponent buttons={ {
                disable: disable
            } }/>
        );

        let Base_1_1 = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2 = await getComponentHeight(component, 'Base_1_2');
        let Base_3_1 = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2 = await getComponentHeight(component, 'Base_3_2');

        expect(
            Base_1_1,
            `Expected NOT same height for "Base_1_1" and "Base_1_2" components.`
        ).not.toEqual(Base_1_2);

        expect(
            Base_3_1,
            `Expected NOT same height for "Base_3_1" and "Base_3_2" components.`
        ).not.toEqual(Base_3_2);

        await page.getByRole('button', {name: /Enable component/i}).click();
        await page.waitForTimeout(getDefaultTimeout());

        let Base_1_1_after_enabled = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2_after_enabled = await getComponentHeight(component, 'Base_1_2');
        let Base_3_1_after_enabled = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2_after_enabled = await getComponentHeight(component, 'Base_3_2');

        expect(
            Base_1_1_after_enabled,
            `Expected same height for "Base_1_1" and "Base_1_2" components.`
        ).toEqual(Base_1_2_after_enabled);

        expect(
            Base_3_1_after_enabled,
            `Expected same height for "Base_3_1" and "Base_3_2" components.`
        ).toEqual(Base_3_2_after_enabled);

        await page.getByRole('button', {name: /Disable component/i}).click();
        await page.waitForTimeout(getDefaultTimeout());

        let Base_1_1_after_disabled = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2_after_disabled = await getComponentHeight(component, 'Base_1_2');
        let Base_3_1_after_disabled = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2_after_disabled = await getComponentHeight(component, 'Base_3_2');

        expect(
            Base_1_1_after_disabled,
            `Expected NOT same height for "Base_1_1" and "Base_1_2" components.`
        ).not.toEqual(Base_1_2_after_disabled);

        expect(
            Base_3_1_after_disabled,
            `Expected NOT same height for "Base_3_1" and "Base_3_2" components.`
        ).not.toEqual(Base_3_2_after_disabled);
    });
});
