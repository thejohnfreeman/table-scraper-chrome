var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    'background/index.js': 'background/index.js',
    'scraper/index.js': 'scraper/index.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'targets': {
                'browsers': ['last 5 Chrome versions']
              }
            }]
          ],
          plugins: [
            'transform-function-bind'
          ]
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'icons/**' },
      { from: 'manifest.json' }
    ], { copyUnmodified: true })
  ]
}
