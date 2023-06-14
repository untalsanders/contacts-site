'use strict'

const { DefinePlugin } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
    mode: argv.mode || 'production',
    entry: './src/index.jsx',
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: env.production ? '/contacts-api-site' : '',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: [path.resolve(__dirname, 'src', 'assets')],
        compress: true,
    },
    resolve: {
        alias: {
            '@': path.join(process.cwd(), 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(?:js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
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
        new DefinePlugin({
            BASE_URL: env.production ? JSON.stringify('/contacts-api-site') : JSON.stringify('')
        })
    ],
})
