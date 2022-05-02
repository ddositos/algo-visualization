var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
		app: "./src/index"
	},
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        compress: true,
        port: 9000,
        watchFiles: ['src/**/*'],
		
    },
    devtool: "inline-source-map",
};
