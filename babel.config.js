module.exports = api => {
    api.cache(false);
    return {
        presets: [
            "@babel/preset-env",
            '@babel/preset-react',
            '@babel/preset-typescript'
        ],
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
                '@babel/plugin-proposal-class-properties',
                {
                    spec: true
                }
            ],
            '@babel/plugin-transform-modules-commonjs',
            'css-modules-transform',
            '@babel/plugin-transform-runtime'
        ]
    }
};
