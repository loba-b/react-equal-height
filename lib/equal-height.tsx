import React, { useCallback, useEffect, useState, useMemo, memo, ReactNode } from 'react';
import { EqualHeightProvider } from './equal-height-context';

interface Props {
    children: ReactNode;
    /** Time to recalculate heights */
    timeout?: number;
    /** Time of animation for height change (in milliseconds) */
    animationSpeed?: number;
    /** It's a part of useEffect deps so in <b>updateOnChange</b> can be passed anything they allow */
    updateOnChange?: unknown;
}

export interface SizesProps {
    name: string;
    height: number;
}

export interface StatesProps {
    sizes: SizesProps[];
    temporarySizes: SizesProps[];
    update: boolean;
    forceUpdate: boolean;
    originalChildrenCount: number;
    childrenCount: number;
    updateOnChange?: unknown;
}

export const defaults = {
    sizes: [],
    temporarySizes: [],
    update: false,
    forceUpdate: false,
    originalChildrenCount: 0,
    childrenCount: 0,
    animationSpeed: 0.25,
    timeout: 200,
    updateOnChange: undefined
};

const EqualHeight = memo((props: Props) => {
    const {
        children,
        timeout = defaults.timeout,
        animationSpeed = defaults.animationSpeed,
        updateOnChange = defaults.updateOnChange
    } = props;

    // States
    const [sizes, setSizes] = useState<StatesProps["sizes"]>(defaults.sizes);
    const [temporarySizes, setTemporarySizes] = useState<StatesProps["sizes"]>(defaults.temporarySizes);
    const [update, setUpdate] = useState<StatesProps["update"]>(defaults.update);
    const [forceUpdate, setForceUpdate] = useState<StatesProps["forceUpdate"]>(defaults.forceUpdate);
    const [originalChildrenCount, setOriginalChildrenCount] = useState<StatesProps["originalChildrenCount"]>(defaults.originalChildrenCount);
    const [childrenCount, setChildrenCount] = useState<StatesProps["childrenCount"]>(defaults.childrenCount);

    const handleUpdate = useCallback(() => setUpdate(value => !value), []);

    // Observe [resize, orientationchange] event
    useEffect(() => {
        let resizeTimer: number;
        let orientationChangeTimer: number;
        const browser: boolean = typeof window === 'object' && typeof window.document === 'object';

        if (browser) {
            // const styles = document.createElement('style');
            // styles.id = 'react-equal-height-styles';

            window.addEventListener('resize', timeout ? () => {
                clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(handleUpdate, timeout);
            } : handleUpdate);

            window.addEventListener('orientationchange', timeout ? () => {
                clearTimeout(orientationChangeTimer);
                orientationChangeTimer = window.setTimeout(handleUpdate, timeout);
            } : handleUpdate);

            return () => {
                window.removeEventListener('resize', handleUpdate);
                window.removeEventListener('orientationchange', handleUpdate);
            };
        }
    }, []);

    // Force calculate heights
    // Force calculate height when children count changed
    useMemo(() => {
        handleUpdate();
    }, [forceUpdate, originalChildrenCount, updateOnChange]);

    // Choose only highest heights when all children calculated
    // Set right sizes
    // Reset temp values
    useMemo(() => {
        // statement (<= instead ===) in case when new children will be add
        if (originalChildrenCount <= childrenCount) {
            let filteredSizes: SizesProps[] = [];
            temporarySizes.map((filteredSize) => {
                const name = filteredSize.name;
                const height = filteredSize.height;
                const elementIndex: number = filteredSizes.findIndex((e) => e.name === name);
                if (elementIndex > -1) {
                    const savedHeight: number = filteredSizes[elementIndex].height;
                    if (savedHeight < height) {
                        filteredSizes[elementIndex].height = height;
                    }
                } else {
                    filteredSizes = [...filteredSizes, {
                        name,
                        height
                    }]
                }
            });
            setSizes(filteredSizes);

            // Reset
            setTemporarySizes([]);
            setChildrenCount(0);
        }
    }, [childrenCount]);

    return (
        <EqualHeightProvider value={{
            sizes,
            temporarySizes,
            update,
            animationSpeed,
            forceUpdate,
            originalChildrenCount,
            childrenCount,
            setTemporarySizes,
            setOriginalChildrenCount,
            setChildrenCount,
            setForceUpdate,
            updateOnChange
        }}>
            { children }
        </EqualHeightProvider>
    );
});

export default EqualHeight;
