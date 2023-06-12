'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
    mode: env.mode || 'production',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: [path.resolve(__dirname, 'src', 'assets')],
        compress: true,
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: env.mode === 'production' ? '/contacts-api-site' : '/',
        clean: true,
    },
    resolve: {
        alias: {
            '@': path.join(process.cwd(), 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            [
                                '@babel/preset-react',
                                {
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
            scriptLoading: 'defer',
            title: 'Contacts',
            template: './src/index.html',
        }),
    ],
})
