const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['react-hot-loader/patch', './src'],

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },

    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        port: 3001,
        watchContentBase: true,
        historyApiFallback: true,
        filename: 'index.html',

    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader',
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.IS_PROD),
            API_URL: process.env.IS_PROD === 'true' ? '\'/api\'' : '\'http://localhost:3000/api\'',
        }),
    ],

};