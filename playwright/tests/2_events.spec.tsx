import { test, expect } from '@playwright/experimental-ct-react';
import {
    getComponent,
    getComponentHeight, getDefaultTimeout,
    setComponentContent
} from "./helpers/get-component-helpers";
import { BasicComponent } from "./helpers/components";
import {
    getBasicComponentEqualRowsHeights,
    getBasicComponentHeights
} from "./helpers/get-components-heights";

test('on resize', async ({mount, page}) => {
        const component = await mount(<BasicComponent/>)
        const {
            Base_1_1,
            Base_3_1
        } = await getBasicComponentHeights(component);

        await page.setViewportSize({width: 1024, height: 1024})

        await page.waitForTimeout(getDefaultTimeout());

        const Base_1_1_after_resize = await getComponentHeight(component, 'Base_1_1');
        const Base_1_2_after_resize = await getComponentHeight(component, 'Base_1_2');
        const Base_2_1_after_resize = await getComponentHeight(component, 'Base_2_1');
        const Base_2_2_after_resize = await getComponentHeight(component, 'Base_2_2');
        const Base_3_1_after_resize = await getComponentHeight(component, 'Base_3_1');
        const Base_3_2_after_resize = await getComponentHeight(component, 'Base_3_2');
        const Base_4_1_after_resize = await getComponentHeight(component, 'Base_4_1');
        const Base_4_2_after_resize = await getComponentHeight(component, 'Base_4_2');

        const Base_1_after_resize_equals = Base_1_1_after_resize === Base_1_2_after_resize;
        const Base_2_after_resize_equals = Base_2_1_after_resize === Base_2_2_after_resize;
        const Base_3_after_resize_equals = Base_3_1_after_resize === Base_3_2_after_resize;
        const Base_4_after_resize_equals = Base_4_1_after_resize === Base_4_2_after_resize;

        expect(
            Base_1_after_resize_equals,
            `Expected same height for all "Base_1" components after resize.`
        ).toBeTruthy();

        expect(
            Base_2_after_resize_equals,
            `Expected same height for all "Base_2" components after resize.`
        ).toBeTruthy();

        expect(
            Base_3_after_resize_equals,
            `Expected same height for all "Base_3" components after resize.`
        ).toBeTruthy();

        expect(
            Base_4_after_resize_equals,
            `Expected same height for all "Base_4" components after resize.`
        ).toBeTruthy();

        expect(
            Base_1_1_after_resize,
            `Expected NOT same height for "Base_1_1" component after resize and "Base_1_1" before resize.`
        ).not.toEqual(Base_1_1);

        expect(
            Base_3_1_after_resize,
            `Expected NOT same height for "Base_3_1" component after resize and "Base_3_1" before resize.`
        ).not.toEqual(Base_3_1);
    });

test('on orientationchange', async ({mount, page}) => {
        const component = await mount(<BasicComponent/>)
        const {
            Base_1_1
        } = await getBasicComponentHeights(component);

        await setComponentContent(component, 'Base_1_1', '' +
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>'
        );

        const Base_1_1_after_add_content = await getComponentHeight(component, 'Base_1_1');

        expect(
            Base_1_1,
            `Expected same height for "Base_1_1" component after add content before orientation change event.`
        ).toEqual(Base_1_1_after_add_content);

        await page.evaluate(() => window.dispatchEvent(new Event('orientationchange')));
        await page.waitForTimeout(getDefaultTimeout());

        const Base_1_1_after_orientation_change = await getComponentHeight(component, 'Base_1_1');
        const Base_1_2_after_orientation_change = await getComponentHeight(component, 'Base_1_2');

        expect(
            Base_1_1,
            `Expected NOT same height for "Base_1_1" component after orientation change event and "Base_1_1" before.`
        ).not.toEqual(Base_1_1_after_orientation_change);

        expect(
            Base_1_1_after_orientation_change,
            `Expected same height for "Base_1_1" and "Base_1_2" after orientation change event.`
        ).toEqual(Base_1_2_after_orientation_change);
    });

test('send "EqualHeight" event on update sizes', async ({mount, page}) => {
        // Add the event listener in the page context
        await page.evaluate(() => {
            // @ts-ignore
            window.addEventListener('EqualHeight', (e: CustomEvent) => console.log(typeof e.detail.elements));
        });

        await mount(<BasicComponent/>);

        // Wait for the console event and capture log
        const consoleMessage = await page.waitForEvent('console', msg => msg.text() === 'object');

        expect(consoleMessage.text()).toEqual('object');
    });

test.describe('load component', () => {
    test('default', async ({mount, page}) => {
        let load = false;
        const component = await mount(
            <BasicComponent buttons={{
                load: load
            }}/>
        );

        await getBasicComponentHeights(component);

        let Base_1_0_component = await getComponent(component, 'Base_1_0');
        let Base_3_0_component = await getComponent(component, 'Base_3_0');

        await expect(Base_1_0_component).not.toBeVisible();
        await expect(Base_3_0_component).not.toBeVisible();

        await page.getByRole('button', { name: /Load component/i }).click();
        await page.waitForTimeout(getDefaultTimeout());

        let Base_1_0_after_load = await getComponentHeight(component, 'Base_1_0');
        let Base_1_1_after_load = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2_after_load = await getComponentHeight(component, 'Base_1_2');
        let Base_3_0_after_load = await getComponentHeight(component, 'Base_3_0');
        let Base_3_1_after_load = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2_after_load = await getComponentHeight(component, 'Base_3_2');

        const Base_1_equals = (Base_1_0_after_load === Base_1_1_after_load) && (Base_1_1_after_load === Base_1_2_after_load);
        const Base_3_equals = (Base_3_0_after_load === Base_3_1_after_load) && (Base_3_1_after_load === Base_3_2_after_load);

        expect(
            Base_1_equals,
            `Expected same height for all "Base_1" components.`
        ).toBeTruthy();

        expect(
            Base_3_equals,
            `Expected same height for all "Base_3" components.`
        ).toBeTruthy();

        await page.getByRole('button', { name: /Remove component/i }).click();
        await page.waitForTimeout(getDefaultTimeout());

        let Base_1_0_component_after_remove = await getComponent(component, 'Base_1_0');
        let Base_3_0_component_after_remove = await getComponent(component, 'Base_3_0');

        await expect(Base_1_0_component_after_remove).not.toBeVisible();
        await expect(Base_3_0_component_after_remove).not.toBeVisible();

        let Base_1_1_after_remove = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2_after_remove = await getComponentHeight(component, 'Base_1_2');
        let Base_3_1_after_remove = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2_after_remove = await getComponentHeight(component, 'Base_3_2');

        const Base_1_equals_after_remove = Base_1_1_after_remove === Base_1_2_after_remove;
        const Base_3_equals_after_remove = Base_3_1_after_remove === Base_3_2_after_remove;

        expect(
            Base_1_equals_after_remove,
            `Expected same height for all "Base_1" components.`
        ).toBeTruthy();

        expect(
            Base_3_equals_after_remove,
            `Expected same height for all "Base_3" components.`
        ).toBeTruthy();
    });

    test('equalRows', async ({mount, page}) => {
        let load = false;
        const component = await mount(
            <BasicComponent
                buttons={{
                    load: load
                }}
                equalHeight={{
                    equalRows: true
                }}
            />
        );

        await getBasicComponentEqualRowsHeights(component);

        let Base_1_0_component = await getComponent(component, 'Base_1_0');
        let Base_3_0_component = await getComponent(component, 'Base_3_0');

        await expect(Base_1_0_component).not.toBeVisible();
        await expect(Base_3_0_component).not.toBeVisible();

        await page.getByRole('button', { name: /Load component/i }).click();
        await page.waitForTimeout(getDefaultTimeout());

        let Base_1_0_after_load = await getComponentHeight(component, 'Base_1_0');
        let Base_1_1_after_load = await getComponentHeight(component, 'Base_1_1');
        let Base_1_2_after_load = await getComponentHeight(component, 'Base_1_2');
        let Base_3_0_after_load = await getComponentHeight(component, 'Base_3_0');
        let Base_3_1_after_load = await getComponentHeight(component, 'Base_3_1');
        let Base_3_2_after_load = await getComponentHeight(component, 'Base_3_2');

        const Base_3_equals = (Base_3_0_after_load === Base_3_1_after_load) && (Base_3_1_after_load === Base_3_2_after_load);

        // First row
        expect(
            Base_1_0_after_load,
            `Expected same height for "Base_1_0" and "Base_1_1"`
        ).toEqual(Base_1_1_after_load);
        // Second row
        expect(
            Base_1_1_after_load,
            `Expected same height for "Base_1_1" and "Base_1_2"`
        ).not.toEqual(Base_1_2_after_load);

        //Third row
        expect(
            Base_3_equals,
            `Expected same height for all "Base_3" components.`
        ).toBeTruthy();
    });
});


test.describe('update component', () => {
    const updateCases: string[] = ['Dependencies change', 'Force update'];

    updateCases.forEach(name => {
        test(`by ${name}`, async ({mount, page}) => {
            const component = await mount(<BasicComponent/>)
            const {
                Base_1_1,
                Base_1_2
            } = await getBasicComponentHeights(component);

            await setComponentContent(component, 'Base_1_1', '' +
                '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
                '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
                '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
                '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
                '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>'
            );

            const Base_1_1_after_add_content = await getComponentHeight(component, 'Base_1_1');

            expect(
                Base_1_1,
                `Expected same height for "Base_1_1" component after add content before manually update.`
            ).toEqual(Base_1_1_after_add_content);

            expect(
                Base_1_1,
                `Expected same height for "Base_1_1" and "Base_1_2" component before manually update.`
            ).toEqual(Base_1_2);

            await page.getByRole('button', { name: new RegExp(name, 'i') }).click();
            await page.waitForTimeout(getDefaultTimeout());

            const Base_1_1_after_update = await getComponentHeight(component, 'Base_1_1');
            const Base_1_2_after_update = await getComponentHeight(component, 'Base_1_2');

            expect(
                Base_1_1_after_update,
                `Expected same height for "Base_1_1" and "Base_1_2" component after manually update.`
            ).toEqual(Base_1_2_after_update);

            expect(
                Base_1_1_after_update,
                `Expected NOT same height for "Base_1_1" and "Base_1_2" component after manually update.`
            ).not.toEqual(Base_1_1);

            await setComponentContent(component, 'Base_1_1', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>');

            await page.getByRole('button', { name: new RegExp(name, 'i') }).click();
            await page.waitForTimeout(getDefaultTimeout());

            const Base_1_1_after_second_update = await getComponentHeight(component, 'Base_1_1');
            const Base_1_2_after_second_update = await getComponentHeight(component, 'Base_1_2');

            expect(
                Base_1_1_after_second_update,
                `Expected same height for "Base_1_1" and "Base_1_2" component after manually update.`
            ).toEqual(Base_1_2_after_second_update);

            expect(
                Base_1_1_after_second_update,
                `Expected NOT same height for "Base_1_1" and "Base_1_2" component after manually update.`
            ).not.toEqual(Base_1_1_after_update);
        });
    });
});

