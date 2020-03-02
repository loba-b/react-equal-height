import React from 'react';
interface Props {
    children: React.ReactNode;
    timeout?: number;
    animate?: boolean;
}
export interface SizesProps {
    name: string;
    height: number;
}
export default function EqualHeight(props: Props): JSX.Element;
export {};
