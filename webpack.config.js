const path = require('path')
const webpack = require('webpack')

// 参考: https://ics.media/entry/16329
module.exports = { 
  // エントリーポイントの設定
  entry: {
    "app": "./_src/ts/app.ts"
    // "common": "./_src/ts/common.ts"
  },  
  output: {
    // 出力するファイル名
    filename: "[name].bundle.js",

    // 出力先のパス
    path: path.resolve('public/js'),

    publicPath: "/"
  },  
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'awesome-typescript-loader'
      },
      // ソースマップファイルの処理
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  plugins: [
    // 指定した変数を他のモジュール内で使えるようにする
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }) 
  ],
  // 
  // ソースマップを有効に
  devtool: 'source-map'
};