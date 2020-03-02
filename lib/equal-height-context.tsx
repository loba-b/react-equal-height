import React, {Dispatch, SetStateAction} from 'react';
import { SizesProps } from './equal-height';

export interface EqualHeightContextProps {
    sizes?: SizesProps[];
    setSizes?: Dispatch<SetStateAction<SizesProps[]>>;
    animate?: boolean;
    forceUpdateSize?: boolean;
    setForceUpdateSize?: Dispatch<SetStateAction<boolean>>;
}

const EqualHeightContext = React.createContext<EqualHeightContextProps>({});
const EqualHeightProvider = EqualHeightContext.Provider;
const EqualHeightConsumer = EqualHeightContext.Consumer;

export { EqualHeightContext, EqualHeightProvider, EqualHeightConsumer };
