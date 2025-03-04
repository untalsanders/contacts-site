'use strict'

import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join, resolve } from 'node:path'

const basePath = import.meta.dirname

export default {
    mode: process.env.NODE_ENV || 'production',
    context: resolve(basePath, 'src'),
    entry: './index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        static: [join(basePath, 'src', 'assets'), join(basePath, 'public')],
        compress: true,
        historyApiFallback: true,
    },
    output: {
        filename: '[chunkhash].bundle.js',
        path: resolve(basePath, 'dist'),
        clean: true,
    },
    resolve: {
        alias: {
            '@': join(basePath, 'src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                    },
                },
                exclude: /node_modules/,
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
            meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            scriptLoading: 'defer',
            title: 'Contacts',
            template: join(basePath, 'public/index.html'),
            hash: true,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'favicon.svg',
                    to: join(basePath, 'dist'),
                    context: resolve(basePath, 'public'),
                },
                {
                    from: '**/*.{png,jpg,jpeg,webm,svg}',
                    to: join(basePath, 'dist'),
                    toType: 'file',
                    context: resolve(basePath, 'src/assets/img'),
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
}
