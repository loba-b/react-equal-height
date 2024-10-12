"use client";

import './equal-height.css';
import {
    useEffect,
    useState,
    createElement,
    CSSProperties,
    useId,
    ElementType,
    Ref,
    useRef,
    useImperativeHandle,
    ComponentPropsWithoutRef,
    PropsWithChildren
} from 'react';
import {
    useEqualHeightContext,
    useEqualHeightHolderContext
} from './equal-height-context';
import EqualHeightHolder from "./equal-height-holder";
import { fixedForwardRef } from "./types";

export type Props<T extends ElementType = 'div'> = {
    name: string;
    as?: T;
    placeholder?: boolean;
    disable?: boolean;
} & ComponentPropsWithoutRef<T>;

const EqualHeightElement = fixedForwardRef(<T extends ElementType = 'div'>(
    {name, as, children, placeholder = false, disable = false, ...props}: PropsWithChildren<Props<T>>,
    forwardedRef: Ref<HTMLElement>
) => {
    const id = `el_${ useId() }`;
    const tag = as || 'div';
    const ref = useRef<HTMLElement>(null);

    useImperativeHandle(forwardedRef, () => ref.current as HTMLElement);

    const {
        update,
        animationSpeed,
        maxSizes,
        equalRows,
        developerMode
    } = useEqualHeightContext();

    /**
     * Retrieves the context of EqualHeightHolder.
     * If the context does not exist add EqualHeightElement component as the parent.
     */
    const holderContext = useEqualHeightHolderContext();
    const isExistHolderContext = Boolean(holderContext && Object.keys(holderContext).length);
    const {
        setElementsInfo,
        position
    } = holderContext;

    /**
     * State to store the maximum height from `maxSizes`
     * */
    const [height, setHeight] = useState<number>();

    /**
     * Calculates and returns the height of the element referenced by `ref`.
     *
     * It temporarily sets the height of the element to 'auto' to ensure it can fully expand,
     * measures the `offsetHeight`, and then restores the original height.
     *
     * @returns {number | undefined} - The calculated height of the element, or `undefined` if the
     * element is not available or is disabled.
     */
    const getHeight = (): number | undefined => {
        if (!ref?.current || disable) return;
        const {current: element} = ref;
        const tempHeight = element.style.height;
        element.style.height = 'auto';
        const height = element.offsetHeight;
        element.style.height = tempHeight;

        return height;
    };

    /**
     * Handles updates to the elements collection based on the specified action.
     *
     * @param {'ADD' | 'REMOVE' | 'UPDATE'} action - The operation to perform:
     *   - 'ADD': Adds a new element or updates an existing one if it already exists.
     *   - 'REMOVE': Removes all elements with the specified id.
     *   - 'UPDATE': Updates the element with the specified id.
     *
     * The function uses `setElementsInfo` to update the collection accordingly.
     */
    const handleElement = (action: 'ADD' | 'REMOVE' | 'UPDATE') => {
        if (!setElementsInfo) {
            return;
        }

        setElementsInfo(previous => {
            const realHeight = getHeight();

            switch (action) {
                case 'ADD':
                case 'UPDATE':
                    const exists = previous.some(e => e.id === id);
                    if (exists) {
                        return previous.map(item =>
                            item.id === id
                                ? {id, name, height: realHeight, placeholder}
                                : item
                        );
                    }
                    return [
                        ...previous,
                        {id, name, height: realHeight, placeholder}
                    ];
                case 'REMOVE':
                    return previous.filter(e => e.id !== id);
                default:
                    return previous;
            }
        });
    }

    /**
     * Register the element to the parent on mount and de-register it on unmount.
     */
    useEffect(() => {
        handleElement('ADD');
        return () => handleElement('REMOVE');
    }, []);

    /**
     * Re-registers the element to the parent whenever `placeholder` changes or `update` is triggered.
     */
    useEffect(() => {
        handleElement('UPDATE');
    }, [placeholder, update]);

    /**
     * Register or de-register the element to the parent based on the `disable` flag.
     */
    useEffect(() => {
        handleElement(disable ? 'REMOVE' : 'ADD');
    }, [disable]);

    /**
     * Updates the height of the current element based on the maximum calculated height from `maxSizes`.
     *
     * This `useEffect` triggers when `maxSizes` changes. It finds the corresponding element by `name`,
     * and if `equalRows` is true, it also matches the `position` to ensure the correct row.
     *
     * Dependencies:
     * - `maxSizes`: Array containing maximum sizes.
     * - `equalRows`: If true, ensures the match includes the same `position`.
     * - `name`: The element's name used for matching.
     * - `position`: The element's position, used when `equalRows` is true.
     */
    useEffect(() => {
        if (!maxSizes?.length) {
            return;
        }

        const element = maxSizes.find((el) => {
            if (equalRows) {
                let tolerance = 0;
                if (typeof equalRows === 'number') {
                    tolerance = equalRows;
                }

                return el.name === name && typeof el.position === 'number' && Math.abs(el.position - (position ?? 0)) <= tolerance;
            }

            return el.name === name;
        });

        if (element && element.height) {
            setHeight(element.height);
        }
    }, [maxSizes]);

    /**
     * Styles for wrapper
     */
    const inlineStyles: CSSProperties = {
        height: `${ height }px`,
        /**
         * Defines the transition duration for height changes.
         * - If `animationSpeed` is 0, `transitionDuration` is set to an empty string, disabling the transition.
         * - If `animationSpeed` is a number, it's interpreted as seconds and converted to a string (e.g., '2s').
         * - If `animationSpeed` is a string (e.g., '500ms' or '2s'), it is used directly.
         */
        transitionDuration: animationSpeed === 0
            ? ''
            : typeof animationSpeed === "number"
                ? `${ animationSpeed }s`
                : animationSpeed
    };

    if (!placeholder && !children) {
        return null;
    }

    if (disable) {
        return children;
    }

    if (!isExistHolderContext) {
        return (
            <EqualHeightHolder ref={ ref }>
                <EqualHeightElement
                    { ...props }
                    ref={ ref }
                    name={ name }
                    as={ tag }
                    placeholder={ placeholder }
                    disable={ disable }
                >
                    { children }
                </EqualHeightElement>
            </EqualHeightHolder>
        );
    }

    return (
        createElement(tag, {
            ref: ref,
            className: "equal-height-wrapper",
            style: inlineStyles,
            ...props,
            ...developerMode && {
                'data-id': id,
                'data-name': name
            },
        }, !placeholder && (developerMode ? (
            <>
                <small
                    style={ {display: 'block', height: 0, textAlign: 'right'} }>{ height || 'undefined' }&nbsp;</small>
                { children }
            </>
        ) : children))
    )
});

export default EqualHeightElement;
