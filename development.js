import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

export default {
    mode: 'development',
    target: 'web',
    node: { fs: 'empty' },
    entry: src + '/main.tsx',

    output: {
        path: dist,
        filename: 'bundle.js'
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    resolve: {
        extensions: ['.js', 'ts', '.tsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html'
        })
    ]
}