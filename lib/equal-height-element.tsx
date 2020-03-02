import React, {
    useEffect,
    useRef,
    useState,
    useContext
} from 'react';

import { EqualHeightContext } from './equal-height-context';
import { SizesProps } from './equal-height';

import styles from './equal-height.scss';

interface Props {
    children?: React.ReactNode;
    name: string;
    placeholder?: boolean;
    disable?: boolean;
    overflow?: boolean;
}

export default function EqualHeightElement(props: Props) {
    const {
        children = '',
        name,
        placeholder = false,
        disable = false,
        overflow = true
    } = props;

    const {
        sizes,
        setSizes,
        animate
    } = useContext(EqualHeightContext);

    // States
    const [height, setHeight] = useState<number>(0);

    // Refs
    const innerElement = useRef<HTMLDivElement>(null);

    useEffect((): void => {
        // If array or dispatch of sizes or are empty then stop
        if (!sizes || !setSizes) {return;}

        // Get element from sizes array
        const elementIndex: number = sizes.findIndex((e) => e.name === name);

        // If element not exist then stop
        if (!innerElement.current) return;

        // Get real element height
        const elementHeight: number = innerElement.current.clientHeight;

        if (elementIndex > -1) {

            // Get saved height for element
            const savedHeight: number = sizes[elementIndex].height;

            // Compare saved height and real height
            if (savedHeight < elementHeight) {
                const newSizes: SizesProps[] = [...sizes];
                newSizes[elementIndex].height = elementHeight;
                setSizes(newSizes);
            }
        } else {
            setSizes(sizes => {
                return [...sizes, {
                    name,
                    height: elementHeight
                }]
            });
        }
    }, [sizes, disable]);

    // Set height on local element
    useEffect((): void => {
        // If sizes are empty then stop
        if (!sizes) {return;}
        // Get element from sizes array
        const elementIndex: number = sizes.findIndex(e => e.name === name);
        if (sizes[elementIndex] && sizes[elementIndex].height) {
            setHeight(sizes[elementIndex].height);
        }
    }, [sizes, disable]);

    // Inline styles for equal-element
    const inlineStyles: React.CSSProperties = {};

    // If equal-element is not disable calculate his height
    if (!disable) {
        // Choose right style property to set height
        if (animate) {
            inlineStyles.minHeight = `${height}px`;
        } else {
            inlineStyles.height = `${height}px`;
        }
    }

    const classes: string = `${styles.holder} ${animate ? styles.animate : ''} ${overflow ? styles.overflow : ''}`;

    return (
        <>
            {disable ? (
                children
            ) : (
                <div style={inlineStyles} className={classes}>
                    <div ref={innerElement} className={styles.inner}>
                        {!placeholder && children}
                    </div>
                </div>
            )}
        </>
    );
}
