'use client';

import { forwardRef, ReactNode, Ref, RefAttributes } from "react";

function fixedForwardRef<T, P = {}>(
    render: (props: P, ref: Ref<T>) => ReactNode
): (props: P & RefAttributes<T>) => ReactNode {
    // @ts-ignore
    return forwardRef(render) as any;
}

export { fixedForwardRef };