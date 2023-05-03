const path = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWbpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/i,
        type: 'asset/resource',
        use: [{
          loader: 'image-webpack-loader',
          options: { 
            pngquant: {
              quality: [.90, .95],
            },
          }
        }],
        generator: {
            filename: 'images/[name]-[hash][ext]'
        }
      }
    ],
  },
  mode: 'development',
};