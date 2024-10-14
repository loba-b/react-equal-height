'use client';

import {
    useCallback,
    useEffect,
    useState,
    useMemo,
    useId,
    PropsWithChildren,
    ElementType,
    createElement,
    ComponentPropsWithoutRef
} from 'react';
import { EqualHeightProvider, EqualHeightContextProps } from './equal-height-context';
import { ElementsProps } from "./equal-height-holder";

export interface ElementsMaxSizesProps extends Pick<ElementsProps, 'name' | 'height'> {
    position?: number;
}

export interface HoldersInfoProps extends ElementsMaxSizesProps {
    id: string;
}

interface BaseProps {
    /**
     * Unique identifier for the group of elements.
     */
    id?: string;
    /**
     * Specifies whether elements should be aligned to match the height of the tallest element in the row.
     * - If `true`, alignment is enabled with a default tolerance (2px).
     * - If `false`, alignment is disabled.
     * - If a number is provided, it sets the alignment tolerance in pixels.
     */
    equalRows?: EqualHeightContextProps['equalRows'];
    /**
     * Duration (in milliseconds) to wait before recalculating heights.
     */
    timeout?: number;
    /**
     * Duration of the height change animation.
     * Accepts time in seconds (e.g., '2s') or milliseconds (e.g., '500ms').
     * Default is in seconds if no prefix is provided.
     */
    animationSpeed?: EqualHeightContextProps['animationSpeed'];
    /**
     * This is a part of useEffect dependencies, so any value allowed in <b>updateOnChange</b> can be passed.
     */
    updateOnChange?: EqualHeightContextProps['updateOnChange'];
    /**
     * Enables additional logging and warnings useful for development and debugging.
     * Should be set to `true` only during development, as it may impact performance in production.
     * Necessary for playwright tests
     */
    developerMode?: EqualHeightContextProps['developerMode'];
}

export type Props<T extends ElementType | undefined = undefined> = {
    as?: T
} & (T extends undefined ? BaseProps : BaseProps & ComponentPropsWithoutRef<Exclude<T, undefined>>)

export const defaults:
    Omit<EqualHeightContextProps, 'setHoldersInfo'> &
    Pick<Props, 'timeout'> &
    Required<Pick<Props, 'updateOnChange'>> =
    {
        equalRows: false,
        animationSpeed: 0.25,
        update: {value: false},
        updateOnChange: [],
        forceUpdate: () => {
        },
        developerMode: false,
        maxSizes: [],
        holdersInfo: [],
        timeout: 200
    };

const EqualHeight = <T extends ElementType | undefined = undefined>(
    {
        as,
        children,
        id = `context_${ useId() }`,
        timeout = defaults.timeout,
        animationSpeed = defaults.animationSpeed,
        equalRows = defaults.equalRows,
        updateOnChange = defaults.updateOnChange,
        developerMode = defaults.developerMode,
        ...props
    }: PropsWithChildren<Props<T>>
) => {

    const tag = as;
    const isBrowser = typeof window === 'object' && typeof window.document === 'object';

    /**
     * State used to trigger recalculation for all elements.
     * When `update` is change, each element re-evaluates its values
     * and updates all values if necessary.
     */
    const [update, setUpdate] = useState<EqualHeightContextProps['update']>(defaults.update);
    const handleUpdate = useCallback(() => setUpdate(value => ({value: !value.value})), []);

    /**
     * Collection of elements from holders (id = holder unique id) with their properties such as id and reduced collection of element with name, height, position.
     *
     * Structure example:
     * | id    | name     | height | position |
     * |-------|----------|--------|----------|
     * | ':r0:'| 'Name_1' | 516    | 202      |
     * | ':r1:'| 'Name_1' | 603    | 202      |
     * | ':r1:'| 'Name_2' | 474    | 202      |
     * | ':r2:'| 'Name_1' | 700    | 1343     |
     */
    const [holdersInfo, setHoldersInfo] = useState<EqualHeightContextProps['holdersInfo']>(defaults.holdersInfo);

    /**
     * Collection of reduced size information for elements, including their maximum heights and position.
     *
     * Structure example:
     * | name     | height | position |
     * |----------|--------|----------|
     * | 'Name_1' | 516    | 202      |
     * | 'Name_2' | 603    | 202      |
     * | 'Name_1' | 474    | 1343     |
     * | 'Name_2' | 700    | 1343     |
     */
    const [maxSizes, setMaxSizes] = useState<EqualHeightContextProps['maxSizes']>(defaults.maxSizes);

    /**
     * Recalculates layout changes based on scrollbar visibility.
     *
     * This function checks if the scrollbar visibility changes after a resize event, once the animation end.
     * It initially checks scrollbar visibility before the resize, waits for a specified timeout duration, and checks again after the resize.
     * If there is a chang in visibility, it triggers the handleUpdate function to recalculate the layout.
     *
     * This prevents the height of the observed elements from changing when the scrollbar disappears and when the element expands or reduces its height.
     */
    const updateOnScrollbar = () => {
        const isScrollbarBeforeResize = document.documentElement.scrollHeight > document.documentElement.clientHeight;
        let timeout = 0;

        if (typeof animationSpeed === 'number') {
            timeout = animationSpeed * 1000; // Convert seconds to milliseconds
        }

        if (typeof animationSpeed === 'string') {
            let numericValue = parseFloat(animationSpeed);

            if (isNaN(numericValue)) {
                throw new Error(`Invalid animationSpeed: '${ animationSpeed }'. Accepted values include numbers (e.g., 2), seconds (e.g., '2s'), or milliseconds (e.g., '500ms')`);
            }

            timeout = animationSpeed.endsWith('ms') ? numericValue : numericValue * 1000;
        }

        // Set timeout to check scrollbar after a delay
        setTimeout(() => {
            const isScrollbarAfterResize = document.documentElement.scrollHeight > document.documentElement.clientHeight;

            // Compare scrollbar presence before and after resizing
            if (isScrollbarBeforeResize !== isScrollbarAfterResize) {
                handleUpdate(); // Call handleUpdate if scrollbar presence changes
            }
        }, timeout);
    };

    /**
     * Observes the 'resize' and 'orientationchange' events of the window.
     * If a timeout is specified, debounce the events to wait for a certain duration
     * before triggering 'handleUpdate' and 'updateOnScrollbar' functions.
     */
    useEffect(() => {
        let resizeTimer: number;
        let orientationChangeTimer: number;

        if (isBrowser) {
            window.addEventListener('resize', timeout ? () => {
                clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(() => {
                    handleUpdate();
                    updateOnScrollbar();
                }, timeout);
            } : handleUpdate);

            window.addEventListener('orientationchange', timeout ? () => {
                clearTimeout(orientationChangeTimer);
                resizeTimer = window.setTimeout(() => {
                    handleUpdate();
                    updateOnScrollbar();
                }, timeout);
            } : handleUpdate);

            return () => {
                window.removeEventListener('resize', handleUpdate);
                window.removeEventListener('orientationchange', handleUpdate);
            };
        }
    }, []);

    useEffect(() => {
        if (isBrowser) {
            const timer = setTimeout(() => {
                window.dispatchEvent(new CustomEvent('EqualHeight', {
                    detail: {
                        id,
                        elements: maxSizes
                    }
                }));
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [maxSizes]);

    /**
     * Forces recalculation of heights based on dependencies.
     */
    useMemo(() => {
        handleUpdate();
    }, [...updateOnChange]);

    /**
     * Forces recalculation of heights on call forceUpdate method.
     */
    const forceUpdate = () => {
        handleUpdate();
    };

    useEffect(() => {
        const getMaxSizes = holdersInfo.reduce<ElementsMaxSizesProps[]>((acc, current) => {
            const name = current.name;
            const height = current.height;
            let position = current.position;

            let existing;
            let tolerance = 0;
            if (typeof equalRows === 'number') {
                tolerance = equalRows;
            }

            if (equalRows) {
                existing = acc.find(
                    item => item.name === name &&
                        typeof item.position === 'number' &&
                        Math.abs(item.position - (position ?? 0)) <= tolerance
                );
            } else {
                existing = acc.find(item => item.name === name);
            }

            if (existing) {
                if (existing.height !== undefined && height !== undefined) {
                    existing.height = Math.max(existing.height, height);
                } else if (height !== undefined) {
                    existing.height = height;
                }
            } else {
                acc.push({
                    name,
                    height: height !== undefined ? height : undefined,
                    position: typeof position === 'number' ? position : undefined
                });
            }

            return acc;
        }, []);

        if (developerMode) {
            if (developerMode === 'DEEP' && holdersInfo.length) {
                console.log('"Holders" updated:');
                console.table(holdersInfo);
            }

            if (getMaxSizes.length) {
                console.log('Final sizes updated:');
                console.table(getMaxSizes);
            }
        }

        // Create a collection of elements with the highest heights (possibility to extra split collection based on `position`)
        setMaxSizes(getMaxSizes);
    }, [holdersInfo]);

    return (
        <EqualHeightProvider value={ {
            update,
            animationSpeed,
            equalRows,
            forceUpdate,
            developerMode,
            updateOnChange,
            maxSizes,
            holdersInfo,
            setHoldersInfo
        } }>
            { tag ? (
                createElement(tag, {
                    ...props
                }, children)
            ) : children }
        </EqualHeightProvider>
    );
};

export default EqualHeight;