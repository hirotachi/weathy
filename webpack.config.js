const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.NODE_ENV === "test"){
  require("dotenv").config({path: ".env.test"});
}else if (process.env.NODE_ENV === "development"){
  require("dotenv").config({path: ".env.development"});
}

module.exports = (env) => {
  const isProduction = env === "production";

  console.log("env", env);
  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [{
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
        {
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          test: /\.s?css$/
        }, {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true
              }
            }
          ]
        }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        "process.env.WEATHER_KEY" : JSON.stringify(process.env.WEATHER_KEY)
      })
    ],
    devtool: isProduction ? "source-map" : "cheap-eval-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public")
    }
  };
};