const path = require('path');
const webpack = require('webpack');

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

module.exports = { 
  mode: MODE,
  // メインとなるJavascriptファイル(エントリーポイント)
  entry: {
    "index": "./_src/ts/index.ts"
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
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ]
  },
  // import文で .ts ファイルを解決するため
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  externals: [
    {
      $: 'jQuery',
      jQuery: 'jQuery',
    }
  ]
};