var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/app/index.js',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: "/node_modules/",
                loader: 'babel-loader'
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
        template: __dirname + '/app/index.html'
    })],
    devServer: {
        port: 3000
    }
};