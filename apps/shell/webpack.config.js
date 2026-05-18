const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies 

module.exports = {
  mode: 'development',

  experiments: {
    asyncStartup: true
  },

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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js',
        cards: 'cards@http://localhost:3002/remoteEntry.js',
        footer: 'footer@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react/jsx-runtime': {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-router-dom': { 
          singleton: true, 
          requiredVersion: deps['react-router-dom'] 
        }
      }
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],

  devServer: {
    port: 3000, 
    open: true,
    historyApiFallback: true, 
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}