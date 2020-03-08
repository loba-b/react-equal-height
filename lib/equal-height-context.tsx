import React, { Dispatch, SetStateAction } from 'react';
import { StatesProps as _StatesProps, defaults as _defaults } from './equal-height';

interface StatesProps extends _StatesProps {
    animationSpeed:             number;
    setForceUpdate:             Dispatch<SetStateAction<boolean>>
    setTemporarySizes:          Dispatch<SetStateAction<_StatesProps["sizes"]>>;
    setOriginalChildrenCount:   Dispatch<SetStateAction<number>>;
    setChildrenCount:           Dispatch<SetStateAction<number>>;
}

const defaults = {
    ...{
        setTemporarySizes: (() => undefined),
        setOriginalChildrenCount: (() => undefined),
        setChildrenCount: (() => undefined),
        setForceUpdate: (() => undefined),
    },
    ..._defaults
};

const EqualHeightContext = React.createContext<StatesProps>({
    sizes:                      defaults && defaults.sizes,
    temporarySizes:             defaults && defaults.temporarySizes,
    update:                     defaults && defaults.update,
    animationSpeed:             defaults && defaults.animationSpeed,
    forceUpdate:                defaults && defaults.forceUpdate,
    originalChildrenCount:      defaults && defaults.originalChildrenCount,
    childrenCount:              defaults && defaults.childrenCount,
    setTemporarySizes:          defaults && defaults.setTemporarySizes,
    setOriginalChildrenCount:   defaults && defaults.setOriginalChildrenCount,
    setChildrenCount:           defaults && defaults.setChildrenCount,
    setForceUpdate:             defaults && defaults.setForceUpdate
});
const EqualHeightProvider = EqualHeightContext.Provider;
const EqualHeightConsumer = EqualHeightContext.Consumer;

export { EqualHeightContext, EqualHeightProvider, EqualHeightConsumer };
