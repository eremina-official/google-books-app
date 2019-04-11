/* google books app */

const path = require('path');

module.exports = {
  mode: 'production',

  //entry point
  entry: './src/js/index.js',

  //output point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.css$/,
        /* css loader loads css to js files, style loader adds css into the DOM */
        use: [ 
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
