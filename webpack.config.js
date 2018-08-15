const HtmlWebpackPlugin = require('html-webpack-plugin');
const version = 'v1';

module.exports = {
    context: __dirname,
    entry: './apps/' + version + '/App.js',
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
        template: './apps/index.html'
    })],
    devServer: {
        port: 3000
    }
};