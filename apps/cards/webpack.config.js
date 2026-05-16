const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')


module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
    clean: true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },

  plugins: [
  new ModuleFederationPlugin({
    name: 'cards',
    filename: 'remoteEntry.js',
    exposes: {
      './Cards': './src/App'
    },
    shared: {
  react: {
    singleton: true,
    requiredVersion: false
  },
  'react-dom': {
    singleton: true,
    requiredVersion: false
  }
}
  }),

  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html')
  })
],

  devServer: {
    port: 3002,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}