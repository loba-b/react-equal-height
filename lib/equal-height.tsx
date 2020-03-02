import React, { useState, useEffect } from 'react';
import { EqualHeightProvider } from './equal-height-context';

interface Props {
    children: React.ReactNode;
    timeout?: number;
    animate?: boolean;
}

export interface SizesProps {
    name: string;
    height: number;
}

export default function EqualHeight(props: Props) {
    const {
        children,
        timeout = 200,
        animate = false
    } = props;

    // States
    const [sizes, setSizes] = useState<SizesProps[]>([]);
    const [forceUpdateSize, setForceUpdateSize] = useState<boolean>(false);

    const handleResize = () => setSizes([]);

    useEffect(() => {
        let timer: number;

        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = window.setTimeout(handleResize, timeout);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        handleResize();
    }, [forceUpdateSize]);

    return (
        <EqualHeightProvider value={{
            sizes,
            setSizes,
            animate,
            forceUpdateSize,
            setForceUpdateSize
        }}>
            {children}
        </EqualHeightProvider>
    );
}
