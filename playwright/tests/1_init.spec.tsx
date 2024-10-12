import { test } from '@playwright/experimental-ct-react';
import { BasicComponent } from "./helpers/components";
import {
    getBasicComponentHeights,
} from "./helpers/get-components-heights";

test('set heights', async ({mount}) => {
    const component = await mount(<BasicComponent/>)
    await getBasicComponentHeights(component);
});
