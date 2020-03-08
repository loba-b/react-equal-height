const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    devtool: "source-map",
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
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ]
};
