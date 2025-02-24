'use strict'

import {resolve} from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = import.meta.dirname

export default {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: [resolve(__dirname, 'src', 'assets')],
        compress: true,
    },
    output: {
        path: resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
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
            template: './public/index.html',
        }),
    ],
}
