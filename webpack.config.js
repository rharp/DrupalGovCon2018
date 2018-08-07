var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/app/index.js',
    module: {
        rules: [
            {
                // "test" is commonly used to match the file extension
                test: /\.js$/,

                // "exclude" should be used to exclude exceptions
                exclude: [
                    "/node_modules/"
                ],

                // the "loader"
                loader: "babel-loader" // or "babel" because webpack adds the '-loader' automatically
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