const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifestPlugin = require("webpack-pwa-manifest");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
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
        test: /\.(js|jsx|png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
    new MiniCSSExtractPlugin({
      filename: "assets/[name].css",
    }),
    new Dotenv(),
    // ! discomment for it use
    /*  new WebpackPwaManifestPlugin({
      filename: "manifest.webmanifest",
      name: "Synapse - A synapse universe",
      short_name: "Synapse",
      start_url: "/",
      orientation: "portrait",
      display: "standalone",
      description: "Where you connect your ideas with the rest of the world!",
      background_color: "#fff",
      theme_color: "#b1a",
      prefer_related_applications: true,
      icons: [
        {
          src: path.resolve("public/synapse-logo-firstaproach.png"),
          size: [96, 128, 192, 256, 384, 512],
          purpose: "maskable",
          destination: path.join("Icons"),
          ios: true,
        },
      ],
    }), */
    // ! discomment for it use
    /* new WorkboxWebpackPlugin.GenerateSW({
      maximumFileSizeToCacheInBytes: 5000000,
      runtimeCaching: [
        {
          urlPattern: new RegExp(
            "https://(res.cloudinary.com|images.unplash.com)"
          ),
          handler: "CacheFirst",
          options: {
            cacheName: "images",
          },
        },
        {
          urlPattern: new RegExp("http://localhost:3030"),
          handler: "NetworkFirst",
          options: {
            cacheName: "api",
          },
        },
      ],
    }), */
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 3080,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
