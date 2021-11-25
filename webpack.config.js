const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry: './spa/react/main.js',
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: 'index_bundle.js'
    },
    resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [".ts", ".js"]
    },
    devServer: {
        port: 8001
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react']
                }
            }
        ]
    },
    plugins:[
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: './spa/react/index.html'
        })
    ]
}