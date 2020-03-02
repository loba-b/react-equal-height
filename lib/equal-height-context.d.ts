import React, { Dispatch, SetStateAction } from 'react';
import { SizesProps } from './equal-height';
export interface EqualHeightContextProps {
    sizes?: SizesProps[];
    setSizes?: Dispatch<SetStateAction<SizesProps[]>>;
    animate?: boolean;
    forceUpdateSize?: boolean;
    setForceUpdateSize?: Dispatch<SetStateAction<boolean>>;
}
declare const EqualHeightContext: React.Context<EqualHeightContextProps>;
declare const EqualHeightProvider: React.Provider<EqualHeightContextProps>;
declare const EqualHeightConsumer: React.Consumer<EqualHeightContextProps>;
export { EqualHeightContext, EqualHeightProvider, EqualHeightConsumer };
