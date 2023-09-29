// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

// eslint-disable-next-line eqeqeq
const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      APIKEY: JSON.stringify('NmY3NTNhMTk0MDJiNDlmODkyNzE2MDEyNzIzMjYwOQ=='),
      GOOGLEAPIKEY: JSON.stringify('QUl6YVN5QnV4a1gyRzhVdU5CNkhHNk5iMlQ5cHJseXF1UkFpQ1VV'),
      SEARCHID: JSON.stringify('NzI1OTA2NWYyMDcxMTRiMjI='),
      BINGKEY: JSON.stringify('MzI0OWJiNmU4MmEwNDk1MmFiMmYzYmU5OTBiY2NjOGQ=')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
