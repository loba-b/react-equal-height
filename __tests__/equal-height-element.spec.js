import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect";
import { EqualHeight, EqualHeightConsumer, EqualHeightElement } from '../';

describe('EqualHeightElement', () => {
    test('should render correctly', () => {
        const container = shallow(
            <EqualHeight>
                <EqualHeightElement name="ComponentName">
                    <p>Lorem ipsum</p>
                </EqualHeightElement>
            </EqualHeight>
        );

        expect(container).toMatchSnapshot();
    });

    test('should change tag DIV into SECTION', () => {
        const { getByText} = render(
            <EqualHeight>
                <EqualHeightElement name="ComponentName" tag={"section"}>
                    Lorem ipsum
                </EqualHeightElement>
            </EqualHeight>
        );

        expect(getByText('Lorem ipsum').nodeName).toBe('SECTION');
    });

    test('should add/remove elements', () => {
        let originalChildrenCount = 'NOT INITIALIZED';

        const ToggleElement = () => {
            const [show, setShow] = useState(false);

            return (
                <>
                    <button data-testid="toggleButton" onClick={() => setShow(value => !value)}>Toggle</button>
                    {show && (
                        <EqualHeightElement name="ComponentName">
                            <p>Element 1</p>
                        </EqualHeightElement>
                    )}
                </>
            );
        };

        const { getByTestId } = render(
            <EqualHeight>
                <EqualHeightConsumer>
                    {context => {
                        originalChildrenCount = context.originalChildrenCount;
                    }}
                </EqualHeightConsumer>
                <ToggleElement />
                <EqualHeightElement name="ComponentName">
                    <p>Element 2</p>
                </EqualHeightElement>
                <EqualHeightElement name="ComponentName">
                    <p>Element 3</p>
                </EqualHeightElement>
            </EqualHeight>
        );

        expect(originalChildrenCount).not.toBe('NOT INITIALIZED');
        expect(originalChildrenCount).toBe(2);

        fireEvent.click(getByTestId('toggleButton'));

        expect(originalChildrenCount).toBe(3);

        fireEvent.click(getByTestId('toggleButton'));

        expect(originalChildrenCount).toBe(2);
    });

    test('should disable/enable element', () => {
        let originalChildrenCount = 'NOT INITIALIZED';

        const ToggleElement = () => {
            const [disable, setDisable] = useState(true);

            return (
                <>
                    <button data-testid="toggleButton" onClick={() => setDisable(value => !value)}>Toggle</button>
                    <EqualHeightElement name="ComponentName" disable={disable}>
                        <p>Element 1</p>
                    </EqualHeightElement>
                </>
            );
        };

        const { getByTestId } = render(
            <EqualHeight>
                <EqualHeightConsumer>
                    {context => {
                        originalChildrenCount = context.originalChildrenCount;
                    }}
                </EqualHeightConsumer>
                <ToggleElement />
                <EqualHeightElement name="ComponentName">
                    <p>Element 2</p>
                </EqualHeightElement>
                <EqualHeightElement name="ComponentName">
                    <p>Element 3</p>
                </EqualHeightElement>
            </EqualHeight>
        );

        expect(originalChildrenCount).not.toBe('NOT INITIALIZED');
        expect(originalChildrenCount).toBe(2);

        fireEvent.click(getByTestId('toggleButton'));

        expect(originalChildrenCount).toBe(3);

        fireEvent.click(getByTestId('toggleButton'));

        expect(originalChildrenCount).toBe(2);
    });

    test('should mock element as placeholder', () => {
        let originalChildrenCount = 'NOT INITIALIZED';

        const ToggleElement = () => {
            const [placeholder, setPlaceholder] = useState(false);

            return (
                <>
                    <button data-testid="toggleButton" onClick={() => setPlaceholder(value => !value)}>Toggle</button>
                    <EqualHeightElement name="ComponentName" placeholder={placeholder} />
                </>
            );
        };

        const { getByTestId } = render(
            <EqualHeight>
                <EqualHeightConsumer>
                    {context => {
                        originalChildrenCount = context.originalChildrenCount;
                    }}
                </EqualHeightConsumer>
                <ToggleElement />
                <EqualHeightElement name="ComponentName">
                    <p>Element 2</p>
                </EqualHeightElement>
                <EqualHeightElement name="ComponentName">
                    <p>Element 3</p>
                </EqualHeightElement>
            </EqualHeight>
        );

        expect(originalChildrenCount).not.toBe('NOT INITIALIZED');
        expect(originalChildrenCount).toBe(3);

        fireEvent.click(getByTestId('toggleButton'));

        expect(originalChildrenCount).toBe(3);

        fireEvent.click(getByTestId('toggleButton'));

        expect(originalChildrenCount).toBe(3);
    });

    test('should save sizes for different components', () => {
        let sizes = 'NOT INITIALIZED';

        const ToggleElement = () => {
            const [show, setShow] = useState(false);

            return (
                <>
                    <button data-testid="toggleButton" onClick={() => setShow(value => !value)}>Toggle</button>
                    {show && (
                        <>
                            <EqualHeightElement name="OtherComponentName">
                                <p>Element 1</p>
                            </EqualHeightElement>
                            <EqualHeightElement name="OtherComponentName">
                                <p>Element 2</p>
                            </EqualHeightElement>
                        </>
                    )}
                </>
            );
        };

        const { getByTestId } = render(
            <EqualHeight>
                <EqualHeightConsumer>
                    {context => {
                        sizes = context.sizes;
                    }}
                </EqualHeightConsumer>
                <ToggleElement />
                <EqualHeightElement name="ComponentName">
                    <p>Element 1</p>
                </EqualHeightElement>
                <EqualHeightElement name="ComponentName">
                    <p>Element 2</p>
                </EqualHeightElement>
            </EqualHeight>
        );

        expect(sizes).not.toBe('NOT INITIALIZED');
        expect(sizes.length).toBe(1);

        fireEvent.click(getByTestId('toggleButton'));

        expect(sizes.length).toBe(2);

        fireEvent.click(getByTestId('toggleButton'));

        expect(sizes.length).toBe(1);
    });
});
