const path = require ('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin')

module.exports = {
    entry: {
        main: ["@babel/polyfill", "whatwg-fetch", ".src/public/index.js"]
    },
    output: {
        path: path.join (__dirname, "dist/public/"),
        publicPath: "",
        filename: "js/[name].js"
    },
    target: "web",
    devtool: "#source-map",
    module: {
        rules: [
            {
                //комп из ES6
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                //html
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                //css
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                //static files
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "file-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "src/public/index.html",
            filename: "index.html",
            excludeChunks: ['server']
        })
    ]
}
