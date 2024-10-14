import { MountResult } from "@playwright/experimental-ct-react";
import { Locator } from "@playwright/test";
import { defaults } from "../../../src/equal-height";

type DeepTypes = 'INNER' | 'ELEMENT' | 'HOLDER' | 'WRAPPER'

const getComponent = (component: MountResult, title: string, deep: DeepTypes = 'ELEMENT'): Locator => {
    const getComponent = component
        .locator('h3', {hasText: title});

    if (deep === 'INNER') {
        return getComponent
            .locator('..');
    }

    if (deep === 'HOLDER') {
        return getComponent
            .locator('..')
            .locator('..')
            .locator('..');
    }

    if (deep === 'WRAPPER') {
        return getComponent
            .locator('..')
            .locator('..')
            .locator('..')
            .locator('..');
    }

    return getComponent
        .locator('..')
        .locator('..');
}

const getComponentHeight = async (component: MountResult, title: string): Promise<number> => (
    await getComponent(component, title).evaluate((el) => el.clientHeight)
)

const getComponentStyles = async (component: MountResult, title: string): Promise<CSSStyleDeclaration> => (
    await getComponent(component, title).evaluate((el) => window.getComputedStyle(el))
)

const setComponentStyles = async (
    component: MountResult,
    title: string,
    deep: DeepTypes,
    styles: { [key: string]: string }
): Promise<void> => {
    await getComponent(component, title, deep).evaluate((el, styles) => {
        Object.entries(styles).forEach(([property, value]) => {
            el.style.setProperty(property, value);
        });
    }, styles);
};

const setComponentContent = async (component: MountResult, title: string, htmlContent: string): Promise<void> => {
    await getComponent(component, title, 'INNER').evaluate((el, htmlContent) => {
        el.innerHTML = htmlContent;
    }, `<h3>${ title }</h3>${ htmlContent }`);
};

const getDefaultTimeout = (custom?: { timeout?: number, animationSpeed?: number }): number => {
    const timeout = custom?.timeout ?? defaults.timeout as number;
    const animationSpeed = custom?.animationSpeed ?? defaults.animationSpeed as number * 1000;
    return timeout + animationSpeed;
};

export {
    getComponent,
    getComponentHeight,
    getComponentStyles,
    getDefaultTimeout,
    setComponentContent,
    setComponentStyles
}