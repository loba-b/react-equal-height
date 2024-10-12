import "react";
declare module "*.png";
declare module "*.css";
declare module "*.scss";
/*
declare module "react" {
    function forwardRef<T, P = {}>(
        render: (props: P, ref: Ref<T>) => ReactNode
    ): (props: P & RefAttributes<T>) => ReactNode {
        return forwardRef(render) as any;
    }

    function memo<P extends object>(
        Component: (props: P) => ReturnType<FunctionComponent>,
        propsAreEqual?: (
            prevProps: Readonly<P>,
            nextProps: Readonly<P>,
        ) => boolean,
    ): (props: P) => ReturnType<FunctionComponent>;
}*/
