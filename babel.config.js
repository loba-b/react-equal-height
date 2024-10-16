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
            '@babel/plugin-transform-modules-commonjs',
            '@babel/plugin-transform-runtime'
        ]
    }
};
