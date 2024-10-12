import { expect, MountResult } from "@playwright/experimental-ct-react";
import { getComponentHeight } from "./get-component-helpers";

const getBasicComponentHeights = async (component: MountResult) => {
    const Base_1_1 = await getComponentHeight(component, 'Base_1_1');
    const Base_1_2 = await getComponentHeight(component, 'Base_1_2');
    const Base_1_3 = await getComponentHeight(component, 'Base_1_3');
    const Base_2_1 = await getComponentHeight(component, 'Base_2_1');
    const Base_2_2 = await getComponentHeight(component, 'Base_2_2');
    const Base_2_3 = await getComponentHeight(component, 'Base_2_3');
    const Base_3_1 = await getComponentHeight(component, 'Base_3_1');
    const Base_3_2 = await getComponentHeight(component, 'Base_3_2');
    const Base_4_1 = await getComponentHeight(component, 'Base_4_1');
    const Base_4_2 = await getComponentHeight(component, 'Base_4_2');

    const Base_1_equals = (Base_1_1 === Base_1_2) && (Base_1_2 === Base_1_3);
    const Base_2_equals = (Base_2_1 === Base_2_2) && (Base_2_2 === Base_2_3);
    const Base_3_equals = Base_3_1 === Base_3_2;
    const Base_4_equals = Base_4_1 === Base_4_2;

    expect(
        Base_1_equals,
        `Expected same height for all "Base_1" components.`
    ).toBeTruthy();

    expect(
        Base_2_equals,
        `Expected same height for all "Base_2" components.`
    ).toBeTruthy();

    expect(
        Base_3_equals,
        `Expected same height for all "Base_3" components.`
    ).toBeTruthy();

    expect(
        Base_4_equals,
        `Expected same height for all "Base_4" components.`
    ).toBeTruthy();

    expect(
        true,
        '!!! Basic tests done !!!'
    ).toBeTruthy();

    return {
        Base_1_1,
        Base_1_2,
        Base_1_3,
        Base_2_1,
        Base_2_2,
        Base_2_3,
        Base_3_1,
        Base_3_2,
        Base_4_1,
        Base_4_2,
    };
};

const getBasicComponentEqualRowsHeights = async (component: MountResult) => {
    const Base_1_1 = await getComponentHeight(component, 'Base_1_1');
    const Base_1_2 = await getComponentHeight(component, 'Base_1_2');
    const Base_1_3 = await getComponentHeight(component, 'Base_1_3');
    const Base_2_1 = await getComponentHeight(component, 'Base_2_1');
    const Base_2_2 = await getComponentHeight(component, 'Base_2_2');
    const Base_2_3 = await getComponentHeight(component, 'Base_2_3');
    const Base_3_1 = await getComponentHeight(component, 'Base_3_1');
    const Base_3_2 = await getComponentHeight(component, 'Base_3_2');
    const Base_4_1 = await getComponentHeight(component, 'Base_4_1');
    const Base_4_2 = await getComponentHeight(component, 'Base_4_2');

    // First row
    expect(
        Base_1_1,
        `Expected same height for "Base_1_1" and "Base_1_2"`
    ).toEqual(Base_1_2);
    expect(
        Base_1_2,
        `Expected NOT same height for "Base_1_2" and "Base_1_3"`
    ).not.toEqual(Base_1_3);

    // Second row
    expect(
        Base_2_1,
        `Expected NOT same height for "Base_2_1" and "Base_2_2"`
    ).not.toEqual(Base_2_2);
    expect(
        Base_2_2,
        `Expected same height for "Base_2_2" and "Base_2_3"`
    ).toEqual(Base_2_3);

    // Third row
    expect(
        Base_3_1,
        `Expected same height for "Base_3_1" and "Base_3_2"`
    ).toEqual(Base_3_2);
    expect(
        Base_4_1,
        `Expected same height for "Base_4_1" and "Base_4_2"`
    ).toEqual(Base_4_2);

    expect(
        true,
        '!!! Basic tests done !!!'
    ).toBeTruthy();

    return {
        Base_1_1,
        Base_1_2,
        Base_1_3,
        Base_2_1,
        Base_2_2,
        Base_2_3,
        Base_3_1,
        Base_3_2,
        Base_4_1,
        Base_4_2,
    };
};

export {
    getBasicComponentHeights,
    getBasicComponentEqualRowsHeights
}