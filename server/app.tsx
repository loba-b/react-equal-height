/*
* FOR MANUAL TESTS
* */

import './app.css';
import { useState } from "react";
import { createRoot } from 'react-dom/client';
import EqualHeight from '../src/equal-height';
import EqualHeightElement from '../src/equal-height-element';
import EqualHeightHolder from "../src/equal-height-holder";
import { useEqualHeightContext } from "../src";

const ComponentWithContext = () => {
    const context = useEqualHeightContext();

    return (
        <button onClick={ context?.forceUpdate }>
            Force update
        </button>
    );
};

const App = () => {
    const [updateOnChange, setUpdateOnChange] = useState(false);
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(false);
    const [placeholder, setPlaceholder] = useState(false);

    return (
        <EqualHeight developerMode={ true } updateOnChange={ [updateOnChange] } equalRows={ true }>
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
                        <div className="innerElement">
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
                        </div>
                    </EqualHeightElement>
                </div>
            ) }

            <div className="element">
                <EqualHeightElement
                    name="Base_1"
                    disable={ disable }
                    placeholder={ placeholder }
                >
                    <div className="innerElement">
                        <h3>Base_1_1</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_2">
                    <div className="innerElement">
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
                    </div>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_1">
                    <div className="innerElement">
                        <h3>Base_1_2</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_2">
                    <div className="innerElement">
                        <h3>Base_2_2</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_1" as="div" >
                    <div className="innerElement">
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
                    </div>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_2">
                    <div className="innerElement">
                        <h3>Base_2_3</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
            <EqualHeightHolder className="element">
                { load && (
                    <EqualHeightElement name="Base_3" >
                        <div className="innerElement">
                            <h3>Base_3_0</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                    </EqualHeightElement>
                ) }
                <EqualHeightElement
                    name="Base_3"
                    disable={ disable }
                    placeholder={ placeholder }
                >
                    <div className="innerElement">
                        <h3>Base_3_1</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
                <EqualHeightElement name="Base_3">
                    <div className="innerElement">
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
                    </div>
                </EqualHeightElement >
                <EqualHeightElement name="Base_4">
                    <div className="innerElement">
                        <h3>Base_4_1</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </EqualHeightHolder>
            <div className="element element--no-space">
                <EqualHeightElement name="Base_4">
                    <div className="innerElement">
                        <h3>Base_4_2</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
            <div className="element">
                <EqualHeightElement name="Base_4">
                    <div className="innerElement">
                        <h3>Base_4_3</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
        </EqualHeight>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App/>);
