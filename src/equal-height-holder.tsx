"use client";

import {
    ComponentPropsWithoutRef,
    createElement,
    ElementType,
    PropsWithChildren,
    Ref,
    RefObject,
    useEffect,
    useId,
    useRef,
    useState
} from 'react';
import { EqualHeightHolderProvider, useEqualHeightContext } from "./equal-height-context";
import { Props as ElementProps } from './equal-height-element';
import { ElementsMaxSizesProps } from "./equal-height";
import { fixedForwardRef } from "./types";

export interface ElementsProps extends Pick<ElementProps, 'name' | 'placeholder'> {
    id: string;
    height?: number;
}

export type Props<T extends ElementType> = {
    as?: T;
} & ComponentPropsWithoutRef<T>;

const EqualHeightHolder = fixedForwardRef(<T extends ElementType = 'div'>(
    {as, children, ...props}: PropsWithChildren<Props<T>>,
    forwardedRef: Ref<HTMLElement>
) => {
    const id = `holder_${ useId() }`;
    const tag = as || 'div';
    let ref = useRef<HTMLElement>(null);
    let createdByChild = false;

    const {
        holdersInfo,
        maxSizes,
        setHoldersInfo,
        developerMode
    } = useEqualHeightContext();

    /**
     * `EqualHeightHolder` is created by `EqualHeightElement`, so the ref is passed as a prop.
     */
    if (forwardedRef) {
        createdByChild = true;
        ref = forwardedRef as RefObject<HTMLElement>;
    }

    const [position, setPosition] = useState<number | undefined>(undefined);

    /**
     * Collection of elements (children) with their properties such as id (unique), name, height, etc.
     *
     * Structure example:
     * | id     | name     | height | placeholder |
     * |--------|----------|--------|-------------|
     * | ':r0:' | 'Name_1' | 516    | false       |
     * | ':r1:' | 'Name_1' | 603    | false       |
     * | ':r2:' | 'Name_2' | 555    | false       |
     */
    const [elementsInfo, setElementsInfo] = useState<ElementsProps[]>([]);

    /**
     * Collection of reduced to unique name including maximum height and position.
     *
     * Structure example:
     * | id     | name     | height | position |
     * |--------|----------|--------|----------|
     * | ':r0:' | 'Name_1' | 516    | 1343     |
     * | ':r1:' | 'Name_2' | 603    | 1343     |
     * | ':r2:' | 'Name_3' | 555    | 1343     |
     */
    const [elementsMaxSizes, setElementsMaxSizes] = useState<ElementsMaxSizesProps[]>([]);

    /**
     * Calculates and returns the vertical position (top position) of the referenced element.
     *
     * This method retrieves the `top` position of the element relative to the viewport using
     * `getBoundingClientRect`, rounds the value to the nearest integer, and returns it.
     *
     * If the `ref.current` element is not available, the method returns `undefined` to avoid errors.
     * If the element is available, it calculates the `top` coordinate and returns the rounded value.
     *
     * @returns {number | undefined} The rounded top position of the element, or `undefined` if the element is not available.
     */
    const getPosition = (): undefined | number => {
        if (!ref?.current) return;
        const {current: element} = ref;
        const {top} = element.getBoundingClientRect();
        return Math.round(top);
    }

    /**
     * Manages updates to the holders collection based on the specified action type.
     *
     * @param {('ADD' | 'REMOVE' | 'UPDATE' | 'UPDATE_POSITION')} action - The type of operation to perform:
     *   - 'ADD': Adds new elements or updates existing ones in the collection using the provided id.
     *   - 'REMOVE': Removes all elements with the specified id from the collection.
     *   - 'UPDATE': Updates elements with the specified id, similar to 'ADD', by replacing existing elements with new ones.
     *   - 'UPDATE_POSITION': Updates the position of the element if it differs from the current one, otherwise no action is taken.
     *
     * The function:
     *   - For 'ADD' and 'UPDATE': Removes all elements with the given id and then adds or updates elements from `elementsMaxSizes` with the same id.
     *   - For 'REMOVE': Filters out elements with the specified id.
     *   - For 'UPDATE_POSITION': Sets the position based on the current value and updates the element if the position has changed.
     */
    const handleHolderElement = (action: 'ADD' | 'REMOVE' | 'UPDATE' | 'UPDATE_POSITION') => {
        const position = getPosition();
        setPosition(position);

        if (action === 'UPDATE_POSITION') {
            if (!holdersInfo?.length) {
                return;
            }

            const holder = holdersInfo.some(holder => holder.id === id && holder.position !== position);
            if (holder) {
                action = 'UPDATE';
            } else {
                return;
            }
        }

        setHoldersInfo && setHoldersInfo(previous => {
            switch (action) {
                case 'ADD':
                case 'UPDATE': {
                    const updatedCollection = previous.filter(element => element.id !== id);

                    return [
                        ...updatedCollection,
                        ...elementsMaxSizes.map(element => ({
                            id,
                            name: element.name,
                            height: element.height,
                            position: getPosition()
                        }))
                    ];
                }
                case 'REMOVE':
                    return previous.filter(element => element.id !== id);
                default:
                    return previous;
            }
        });
    }

    /**
     * Processes and updates the `elementsMaxSizes` based on changes in `elementsInfo` and `position`.
     *
     * This `useEffect` hook is triggered whenever `elementsInfo` or `position` changes.
     * It performs the following operations:
     * - Reduces `elementsInfo` to a new collection of elements where:
     *   - Existing elements with the same name are merged, with the maximum height retained if both heights are defined.
     *   - New elements are added with the current height and position. If `position` is a number, it is assigned; otherwise, it remains undefined.
     * - Updates the `elementsMaxSizes` state with the processed collection.
     * - Logs a message indicating that the collection of highest elements has been set.
     */
    useEffect(() => {
        const getMaxSizes = elementsInfo.reduce<ElementsMaxSizesProps[]>((acc, current) => {
            const existing = acc.find(item => item.name === current.name);
            const position = getPosition();

            if (existing) {
                if (existing.height !== undefined && current.height !== undefined) {
                    existing.height = Math.max(existing.height, current.height);
                } else if (current.height !== undefined) {
                    existing.height = current.height;
                }

                existing.position = position;
            } else {
                acc.push({
                    name: current.name,
                    height: current.height !== undefined ? current.height : undefined,
                    position: position
                });
            }

            return acc;
        }, []);

        if (developerMode === 'DEEP' && getMaxSizes.length) {
            console.log('"Elements" updated:');
            console.table(elementsInfo);
        }
        setElementsMaxSizes(getMaxSizes);
    }, [elementsInfo]);

    /**
     * Updates the holder's position when `maxSizes` changes.
     * This ensures that the layout is adjusted based on the latest size constraints.
     */
    useEffect(() => {
        handleHolderElement('UPDATE_POSITION');
    }, [maxSizes]);

    /**
     * Adds the holder element when the component mounts and removes it when unmounting.
     * This allows the element to be tracked only while it is present in the DOM.
     */
    useEffect(() => {
        handleHolderElement('ADD');
        return () => handleHolderElement('REMOVE');
    }, []);

    /**
     * Updates the holder element whenever `elementsMaxSizes` changes.
     * This ensures that the holder reflects any modifications to the maximum sizes of its elements.
     */
    useEffect(() => {
        handleHolderElement('UPDATE');
    }, [elementsMaxSizes]);

    return (
        <EqualHeightHolderProvider value={ {
            elementsInfo,
            setElementsInfo,
            position
        } }>
            { createdByChild ? children : (
                createElement(tag, {
                    ref: ref,
                    ...props
                }, children)
            ) }
        </EqualHeightHolderProvider>
    );
});

export default EqualHeightHolder;
