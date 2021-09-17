const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './clean/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'commonjs2',
        filename: 'clean/index.js'
    },
    optimization: {
        minimize: true
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
                    MiniCssExtractPlugin.loader,
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
        new CssMinimizerPlugin(),
        new MiniCssExtractPlugin({
            filename: 'clean/main.css'
        })
    ]
};
