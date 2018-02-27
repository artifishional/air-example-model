import path from "path"
import GenerateJsonPlugin from "generate-json-webpack-plugin"
import pack from "./package.json"
import CopyWebpackPlugin from "copy-webpack-plugin"

const filename = "main.js";

export default {
  devtool: "source-map",
  entry: {
    'index': [path.resolve(__dirname, './src/dist.js')]
  },
  output: {
      path: path.resolve(__dirname, './dist/'),
      filename,
  },
  module: {
      loaders:[
          { test: /\.js$/, /*exclude: /node_modules/,*/ loader: "babel-loader" }
      ],
  },
  externals: {
    m_2: "M2"
  },
  plugins: [

      new CopyWebpackPlugin([
          { from: './res', to: './res' },
      ], {
          copyUnmodified: true
      }),

      new GenerateJsonPlugin('res.json', {
          version: pack.version,
          name: pack.name,
          main: filename
      }),

  ],

    watch: true

};