import React, {
    useEffect,
    useRef,
    useState,
    useContext,
    useMemo,
    memo,
    ReactElement
} from 'react';

import { EqualHeightContext } from './equal-height-context';

import styles from './equal-height.modules.scss';

interface Props {
    children?: React.ReactNode;
    name: string;
    tag?: string;
    placeholder?: boolean;
    disable?: boolean;
}

const EqualHeightElement = memo((props: Props): ReactElement | null => {
    const {
        children = '',
        name,
        tag = 'div',
        placeholder = false,
        disable = false
    } = props;

    const {
        sizes,
        update,
        setTemporarySizes,
        setOriginalChildrenCount,
        setChildrenCount,
        animationSpeed
    } = useContext(EqualHeightContext);

    // States
    const [height, setHeight] = useState<number>();

    // Refs to wrapper element
    const innerElement = useRef<HTMLDivElement>(null);

    // Calculate method
    const getHeight = () => {
        if (!innerElement.current || disable) {return;}
        const tempHeight: string = innerElement.current.style.getPropertyValue('height');
        innerElement.current.style.removeProperty('height');
        const newHeight: number = innerElement.current.offsetHeight;
        innerElement.current.style.setProperty('height', tempHeight);
        setTemporarySizes(values => {
            return [...values, {
                name,
                height: newHeight
            }]
        });

        if (!disable) {
            setChildrenCount(value => value + 1);
        }
    };

    // Init
    useEffect(() => {
        if (disable) {return;}

        // Report self to parent component (to calculate how many components exist)
        setOriginalChildrenCount(value => value + 1);
        return () => {
            setOriginalChildrenCount(value => value - 1);
        };
    }, [disable, placeholder]);

    // Call calculate method
    useEffect((): void => {
        if (disable) {return;}

        getHeight();
    }, [update, disable, placeholder]);

    // Set sizes on elements in DOM
    useMemo((): void => {
        if (disable) {return;}

        const elementIndex: number = sizes.findIndex((e) => e.name === name);

        if (sizes && sizes[elementIndex] && sizes[elementIndex].height) {
            setHeight(sizes[elementIndex].height);
        }
    }, [sizes]);

    // Styles for wrapper element
    const inlineStyles: React.CSSProperties = {
        height: `${height}px`,
        transitionDuration: animationSpeed === 0 ? '' : `${animationSpeed}s`
    };

    if (!placeholder && !children) {
        return null;
    }

    return (
        <>
            { disable ? (
                children
            ) : (
                React.createElement(tag, {
                    ref: innerElement,
                    className: styles.wrapper,
                    style: inlineStyles
                }, !placeholder && children)
            )}
        </>
    );
});

export default EqualHeightElement;
