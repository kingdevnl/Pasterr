const path = require("path")

module.exports = {
    entry: ['react-hot-loader/patch', './src'],

    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, '/dist'),

        port: 3001,
        watchContentBase: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                use: ["file-loader"],
            },
            {
                test: /\.svg$/,
                use: "svg-url-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }

}