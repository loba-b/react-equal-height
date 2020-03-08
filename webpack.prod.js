const path = require('path');

module.exports = {
    entry: './lib/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: "commonjs2",
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
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
                                'css-modules-transform'
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            localsConvention: 'camelCase',
                            modules: {
                                localIdentName: '[name]-[local]-[hash:base64:5]'
                            },
                            importLoaders: 2
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom',
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};
