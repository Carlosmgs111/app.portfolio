const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: "asset",
        generator: {
          filename: "images/[hash][ext][query]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: { progressive: true, quality: 75 },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              webp: { quality: 75 },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "videos/",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
    new MiniCSSExtractPlugin({
      ignoreOrder: true,
      filename: "assets/[name].css",
      chunkFilename: "[id].css",
    }),
    new Dotenv({ path: ".env", safe: true, systemvars: true }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    port: "auto",
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    onListening: function (devServer) {
      const port = devServer.server.address().port;
      console.log("Listening on port:", port);
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
