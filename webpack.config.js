const HtmlWebpackPlugin = require('html-webpack-plugin');
const folder = 'app';

module.exports = {
    context: __dirname,
    entry: './' + folder + '/index.js',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: "/node_modules/",
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css?$/,
                exclude: "/node_modules/",
                use: ['style-loader','css-loader']
            }
        ]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/build'
    },
    plugins: [new HtmlWebpackPlugin({
        template: './' + folder + '/index.html'
    })],
    devServer: {
        port: 3000
    }
};