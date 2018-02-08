import path from "path"
import GenerateJsonPlugin from "generate-json-webpack-plugin"
import pack from "./package.json"

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

      new GenerateJsonPlugin('res.json', {
          version: pack.version,
          name: pack.name,
          main: filename
      }),

  ]
};