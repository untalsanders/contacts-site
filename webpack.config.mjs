'use strict'

import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'node:path'

const __dirname = import.meta.dirname

export default {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        static: [resolve(__dirname, 'src', 'assets'), resolve(__dirname, 'public')],
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
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
        new CopyPlugin({
            patterns: [{ from: 'public/**/*.{png,svg,jpg,jpeg,webm}' }],
        }),
    ],
}
