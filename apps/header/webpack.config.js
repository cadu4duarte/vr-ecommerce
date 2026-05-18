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
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'header', // Nome que o Shell usará para identificar este remoto
      filename: 'remoteEntry.js',
      exposes: {
        // Isso permite que o Shell faça: import('header/Header')
        './Header': './src/App'
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
        }
      }
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],

  devServer: {
    port: 3001, // O Header deve rodar na porta 3001
    open: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*' // Crucial para o Shell conseguir ler este micro-frontend
    }
  }
}