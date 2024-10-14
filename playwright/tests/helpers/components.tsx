import { ElementType, useState } from "react";
import { EqualHeight, EqualHeightElement, EqualHeightHolder } from "./styled-component";
import { Props as EqualHeightProps } from "../../../src/equal-height";
import { Props as divProps } from "../../../src/equal-height-holder";
import { Props as EqualHeightElementProps } from "../../../src/equal-height-element";
import { useEqualHeightContext } from "../../../src";

export interface Props<Z extends ElementType | undefined = undefined, T extends ElementType = 'div', U extends ElementType = 'div'> {
    buttons?: {
        load?: boolean
        disable?: boolean
        placeholder?: boolean
    };
    equalHeight?: Partial<EqualHeightProps<Z>>;
    equalHeightHolder?: Pick<Partial<divProps<T>>, 'as'>;
    equalHeightElement?: Pick<Partial<EqualHeightElementProps<U>>, 'as'>;
}

const ComponentWithContext = () => {
    const context = useEqualHeightContext();

    return (
        <button onClick={ context?.forceUpdate }>
            Force update
        </button>
    );
};

const BasicComponent = <Z extends ElementType, T extends ElementType = 'div', U extends ElementType = 'div'>(props: Props<Z, T, U>) => {
    const {
        developerMode,
        equalRows,
        ...rest
    } = props.equalHeight ?? {};

    const [updateOnChange, setUpdateOnChange] = useState(false);
    const [load, setLoad] = useState(props.buttons?.load || false);
    const [disable, setDisable] = useState(props.buttons?.disable || false);
    const [placeholder, setPlaceholder] = useState(props.buttons?.placeholder || false);
    console.log(props.equalHeight);
    return (
        // @ts-ignore
        <EqualHeight
            developerMode={ true }
            updateOnChange={ [updateOnChange] }
            equalRows={ equalRows || false }
            { ...rest }
        >
            <div className="buttons">
                <button
                    onClick={ () => setUpdateOnChange(value => !value) }> { 'Dependencies change' }</button>
                <button
                    onClick={ () => setLoad(value => !value) }> { load ? 'Remove component' : 'Load component' }</button>
                <button
                    onClick={ () => setDisable(value => !value) }> { disable ? 'Enable component' : 'Disable component' }</button>
                <button
                    onClick={ () => setPlaceholder(value => !value) }> { placeholder ? 'Revert component as placeholder' : 'Component as placeholder' }</button>
                <ComponentWithContext/>
            </div>

            { load && (
                <div className="element">
                    <EqualHeightElement name="Base_1">
                        <h3>Base_1_0</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </EqualHeightElement>
                </div>
            ) }
            <div className="element">
                <EqualHeightElement
                    as={ props.equalHeightElement?.as }
                    disable={ disable }
                    placeholder={ placeholder }
                    name="Base_1"
                >
                    <h3>Base_1_1</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_2">
                    <h3>Base_2_1</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_1">
                    <h3>Base_1_2</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_2">
                    <h3>Base_2_2</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_1">
                    <h3>Base_1_3</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_2">
                    <h3>Base_2_3</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
            <EqualHeightHolder as={props.equalHeightHolder?.as} className="element">
                { load && (
                    <EqualHeightElement name="Base_3">
                        <h3>Base_3_0</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </EqualHeightElement>
                ) }
                <EqualHeightElement
                    disable={ disable }
                    placeholder={ placeholder }
                    name="Base_3"
                >
                    <h3>Base_3_1</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
                <EqualHeightElement name="Base_3">
                    <h3>Base_3_2</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
                <EqualHeightElement name="Base_4">
                    <h3>Base_4_1</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </EqualHeightHolder>
            <div className="element element--no-space">
                <EqualHeightElement name="Base_4">
                    <h3>Base_4_2</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </div>
        </EqualHeight>
    )
}

export {
    BasicComponent
}