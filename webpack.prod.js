const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'commonjs2',
        filename: 'index.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        preamble: "'use client';"
                    }
                }
            }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "**/*.spec.js"),
                    path.resolve(__dirname, "app.tsx")
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'equal-height-JlocK',
                                exportLocalsConvention: 'camelCase'
                            },
                            importLoaders: 2,
                            sourceMap: false
                        }
                    }],
            }
        ]
    },
    externals: {
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom'
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};
