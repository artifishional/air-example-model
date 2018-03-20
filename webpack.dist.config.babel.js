import path from "path"
import GenerateJsonPlugin from "generate-json-webpack-plugin"
import {name, version} from "./package.json"
import CopyWebpackPlugin from "copy-webpack-plugin"
import fs from "fs";

const main = "main.js";

export default {
    devtool: "source-map",
    entry: {
        'main': [path.resolve(__dirname, './src/dist.js')],
        'test': [path.resolve(__dirname, './test')]
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /\.loader$/],
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        port: 8089,
        host: "0.0.0.0",
        contentBase: './dist',/*
        before(app) {
            app.get('/modules/*', function(req, res) {

                console.log(req.originalUrl);

                fs.readFile("dist/modules/advanced1.js", "utf8", function(err, data){
                    if(err) throw err;


                    res.send(data);


                });

            });
        }*/
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './fill', to: './'},
            {from: './src/modules', to: './modules'},
            {from: './node_modules/mocha/mocha.js', to: './'},
            {from: './node_modules/chai/chai.js', to: './'},
            {from: './node_modules/mocha/mocha.css', to: './'},
        ], {
            copyUnmodified: true
        }),
        new GenerateJsonPlugin('res.json', {version, name, main}),
    ],
    watch: true
};