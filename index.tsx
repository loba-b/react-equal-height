/*
* FOR MANUAL TESTS
* */

import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import { EqualHeightConsumer, EqualHeightContext } from './lib';
import EqualHeight from './lib/equal-height';
import EqualHeightElement from './lib/equal-height-element';
import styles from './index.scss';

const LoadImageLocal = () => {
    const { setForceUpdate } = useContext(EqualHeightContext);

    const handleImage = () => (
        setForceUpdate((value: boolean) => !value)
    );

    return (
        <img className={styles.image} src="https://via.placeholder.com/300x300" onLoad={handleImage} alt="" />
    );
};

const App = () => {
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(true);
    const [placeholder, setPlaceholder] = useState(true);

    return (
        <EqualHeight>
            <h1>Base</h1>
            <p>
                <button onClick={() => setLoad(value => !value)}> {load ? 'Remove component' : 'Load component'}</button>
            </p>

            {load && (
                <div className={styles.element}>
                    <EqualHeightElement name="Base">
                        <div className={styles.innerElement}>
                            <h3>Loaded component</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
                            </p>
                        </div>
                    </EqualHeightElement>
                </div>
            )}

            <div className={styles.element}>
                <EqualHeightElement name="Base">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="Base">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <h1>Disable</h1>
            <p>
                <button onClick={() => setDisable(value => !value)}> {disable ? 'Remove disable' : 'Add disable'}</button>
            </p>
            <div className={styles.element}>
                <EqualHeightElement name="Disable">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="Disable" disable={disable}>
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="Disable">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <h1>Placeholder</h1>
            <p>
                <button onClick={() => setPlaceholder(value => !value)}> {placeholder ? 'Remove placeholder' : 'Add placeholder'}</button>
            </p>
            <div className={styles.element}>
                <EqualHeightElement name="Placeholder">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="Placeholder" placeholder={placeholder}><p>aaa</p></EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="Placeholder">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>


            <h1>Load Image</h1>
            <div className={styles.element}>
                <EqualHeightElement name="LoadImage">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget.
                        </p>
                        <p>
                            <EqualHeightConsumer>
                                {context => (
                                    <img className={styles.image} src="https://via.placeholder.com/600x600" onLoad={() => (context.setForceUpdate(value => !value))} alt="" />
                                )}
                            </EqualHeightConsumer>
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="LoadImage">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget.
                        </p>
                        <p>
                            <LoadImageLocal />
                        </p>
                    </div>
                </EqualHeightElement>
            </div>

            <div className={styles.element}>
                <EqualHeightElement name="LoadImage">
                    <div className={styles.innerElement}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget. Auctor eu augue ut lectus arcu bibendum at varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet risus nullam eget felis eget. Vestibulum sed arcu non odio euismod. Purus non enim praesent elementum. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl purus in mollis nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque.
                        </p>
                    </div>
                </EqualHeightElement>
            </div>
        </EqualHeight>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));


