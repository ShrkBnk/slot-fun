const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// var webpack = require('webpack');

module.exports = {

    entry: [
        "./src/index.js",
        "./src/css/style.scss"
    ],
    output: {
        // filename: "bundle.[contenthash].js",
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true}
                    }
                ]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/',
                        }
                    }

                ]
            },

            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"],
            },


        ],

    },

};
