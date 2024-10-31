const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env, argv) {
    let clean = argv.env.clean;
    let entryFile, outputPath;

    const plugins = [new CleanWebpackPlugin()];
    const cssLoaderConfig = {
        loader: 'css-loader',
        options: {
            sourceMap: false,
        },
    };

    if (env.WEBPACK_SERVE) {
        plugins.push(
            new HtmlWebpackPlugin({
                template: './server/index.html',
            }),
        );
    }

    if (clean) {
        entryFile = path.resolve(__dirname, '/src/clean/index.tsx');
        outputPath = path.resolve(__dirname, './dist/clean');

        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'main.css',
            }),
        );
    } else {
        entryFile = path.resolve(__dirname, '/src/index.tsx');
        outputPath = path.resolve(__dirname, './dist');

        plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'package.json', to: './' },
                    { from: 'LICENSE', to: './' },
                    { from: 'README.md', to: './' },
                ],
            }),
        );
    }

    return {
        mode: argv.mode,
        entry: env.WEBPACK_SERVE ? './server/app.tsx' : entryFile,
        target: 'web',
        output: {
            path: outputPath,
            library: 'react-equal-height',
            libraryTarget: 'umd',
            filename: 'index.js',
            umdNamedDefine: true,
            clean: true,
            globalObject: 'this',
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            preamble: "'use client';",
                            comments: false,
                        },
                    },
                    extractComments: {
                        condition: /^\**!|@preserve|@license|@cc_on/i,
                        /*banner: () => {
                            return `@license MIT, @author: Bartosz Loba`;
                        },*/
                    },
                }),
            ],
        },
        devtool: argv.mode !== 'production' ? 'source-map' : false,
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                },
                {
                    test: /\.css$/,
                    use: clean
                        ? [MiniCssExtractPlugin.loader, cssLoaderConfig]
                        : ['style-loader', cssLoaderConfig],
                },
            ],
        },
        ...(!env.WEBPACK_SERVE && {
            externals: {
                react: 'react',
                'react-dom': 'react-dom',
            },
        }),
        plugins,
        devServer: {
            static: './server',
            port: 8889,
            hot: true,
        },
    };
};
