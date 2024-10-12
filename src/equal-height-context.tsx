"use client";

import {
    ContextType,
    createContext,
    DependencyList,
    Dispatch,
    SetStateAction,
    useContext
} from 'react';
import {
    ElementsMaxSizesProps,
    HoldersInfoProps
} from './equal-height';
import { ElementsProps } from "./equal-height-holder";


/**
 * Main context
 */
export interface EqualHeightContextProps {
    equalRows:        boolean | number;
    animationSpeed:     number | `${ string }s` | `${ string }ms`;
    update:             { value: boolean };
    updateOnChange?:    DependencyList;
    forceUpdate:        () => void;
    developerMode:      boolean | 'DEEP';
    maxSizes:           ElementsMaxSizesProps[];
    holdersInfo:        HoldersInfoProps[];
    setHoldersInfo:     Dispatch<SetStateAction<HoldersInfoProps[]>>;
}

const EqualHeightContext = createContext<EqualHeightContextProps>({} as EqualHeightContextProps);
const EqualHeightProvider = EqualHeightContext.Provider;
const EqualHeightConsumer = EqualHeightContext.Consumer;

const useEqualHeightContext = (): ContextType<typeof EqualHeightContext> | never => {
    const context = useContext(EqualHeightContext);
    if (!context) {
        throw new Error('useEqualHeightContext must be used within an EqualHeightProvider');
    }
    return context;
};

const getEqualHeightContext = () => {
    return useEqualHeightContext();
};

export { EqualHeightContext, EqualHeightProvider, EqualHeightConsumer, useEqualHeightContext, getEqualHeightContext };


/**
 * EqualHeightHolder context
 */
export interface EqualHeightHolderContextProps {
    elementsInfo: ElementsProps[];
    setElementsInfo: Dispatch<SetStateAction<ElementsProps[]>>;
    position: number | undefined;
}
const EqualHeightHolderContext = createContext<EqualHeightHolderContextProps>({} as EqualHeightHolderContextProps);
const EqualHeightHolderProvider = EqualHeightHolderContext.Provider;
const EqualHeightHolderConsumer = EqualHeightHolderContext.Consumer;

const useEqualHeightHolderContext = (): ContextType<typeof EqualHeightHolderContext> | never => {
    const context = useContext(EqualHeightHolderContext);
    if (!context) {
        throw new Error('useEqualHeightHolderContext must be used within an EqualHeightHolderProvider');
    }
    return context;
};

const getEqualHeightHolderContext = () => {
    return useEqualHeightHolderContext();
};

export { EqualHeightHolderContext, EqualHeightHolderProvider, EqualHeightHolderConsumer, useEqualHeightHolderContext, getEqualHeightHolderContext };