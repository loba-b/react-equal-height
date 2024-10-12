import { ElementType } from "react";
import EqualHeight from "../../../src/equal-height";
import {
    default as _EqualHeightHolder,
    Props as _EqualHeightHolderProps
} from "../../../src/equal-height-holder";
import {
    default as _EqualHeightElement,
    Props as _EqualHeightElementProps
} from "../../../src/equal-height-element";

const EqualHeightHolder = <T extends ElementType = 'div'>(props: _EqualHeightHolderProps<T>) => {
    return (
        <_EqualHeightHolder className="element" { ...props }>
            { props.children }
        </_EqualHeightHolder>
    );
}

const EqualHeightElement = <T extends ElementType = 'div'>(props: _EqualHeightElementProps<T>) => {
    const {children, ...rest} = props;
    return (
        <_EqualHeightElement { ...rest }>
            <div className="innerElement">
                { children }
            </div>
        </_EqualHeightElement>
    )
}

export {
    EqualHeight,
    EqualHeightHolder,
    EqualHeightElement
}