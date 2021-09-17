import React, { useContext, useState } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { EqualHeightConsumer, EqualHeight, EqualHeightElement, EqualHeightContext } from '../';

describe('EqualHeight', () => {
    test('should render correctly', () => {
        const container = shallow(
            <EqualHeight children={null} />
        );

        expect(container).toMatchSnapshot();
    });

    test('should update state on resize event', () => {
        let resizeStatus = 'NOT INITIALIZED';

        render(
            <EqualHeight timeout={0}>
                <EqualHeightConsumer>
                    {context => {
                        resizeStatus = context.update;
                    }}
                </EqualHeightConsumer>
            </EqualHeight>
        );

        expect(resizeStatus).not.toBe('NOT INITIALIZED');
        expect(resizeStatus).toBe(true);

        act(() => {
            window.dispatchEvent(new Event('resize'));
        });

        expect(resizeStatus).toBe(false);
    });

    test('should update state on orientationchange event', () => {
        let orientationChangeStatus = 'NOT INITIALIZED';

        render(
            <EqualHeight timeout={0}>
                <EqualHeightConsumer>
                    {context => orientationChangeStatus = context.update}
                </EqualHeightConsumer>
            </EqualHeight>
        );

        expect(orientationChangeStatus).not.toBe('NOT INITIALIZED');
        expect(orientationChangeStatus).toBe(true);

        act(() => {
            window.dispatchEvent(new Event('orientationchange'));
        });

        expect(orientationChangeStatus).toBe(false);
    });

    test('should update state on forceUpdate method call', () => {
        let forceUpdateStatus = 'NOT INITIALIZED';
        let updateStatus = 'NOT INITIALIZED';

        const MockForceUpdate = () => {
            const { setForceUpdate } = useContext(EqualHeightContext);

            return (
                <p data-testid={'forceUpdateElement'} onClick={() => setForceUpdate(value => !value)} />
            );
        };

        const { getByTestId } = render(
            <EqualHeight>
                <EqualHeightConsumer>
                    {context => {
                        forceUpdateStatus = context.forceUpdate;
                        updateStatus = context.update;
                    }}
                </EqualHeightConsumer>
                <MockForceUpdate />
            </EqualHeight>
        );

        expect(forceUpdateStatus).not.toBe('NOT INITIALIZED');
        expect(updateStatus).not.toBe('NOT INITIALIZED');

        expect(forceUpdateStatus).toBe(false);
        expect(updateStatus).toBe(true);

        fireEvent.click(getByTestId('forceUpdateElement'));

        expect(forceUpdateStatus).toBe(true);
        expect(updateStatus).toBe(false);
    });
});
