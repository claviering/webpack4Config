const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

// config 默认编译 react 项目
const contentBase = __dirname + `/src`
const entryIndex = __dirname + `/src/index.tsx`
const htmlTemplete = __dirname + `/src/index.html`

const output = {
  path: __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
}

const resolve = {
  extensions: ['.less', '.css', '.js', '.jsx', '.ts', '.tsx'], // 忽略文件后缀
  modules: ['node_modules'], // 指定包的目录
  alias: {
    '@': contentBase, // 文件目录缩写
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, 'src/utils/antdIcon.js') // 解决 Icon 文件过大问题
  }
}

const webpackModule = {
  rules: [{
      test: /\.js[x]?$/,
      use: ['babel-loader?cacheDirectory=true']
    },
    {
      test: /\.tsx?$/,
      use: ['awesome-typescript-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:6].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|eot|ttf|svg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:6].[ext]'
        }
      }]
    },
    {
      test: /\.(html)$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }
  ]
}

const plugins = [
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  new ProgressBarPlugin(), // 打包进度
  new webpack.HotModuleReplacementPlugin(), // 热加载
  // 全局注册, 不需要 import
  new webpack.ProvidePlugin({
    axios: 'axios'
  })
]

const devServer = {
  compress: true,
  watchContentBase: true,
  progress: true,
  open: true,
  hot: true,
  disableHostCheck: true,
  host: 'localhost',
  port: 9030,
  historyApiFallback: false,
  proxy: {
    '/api': {
      target: 'http://localhost:6000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
}

const optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}

module.exports = {
  mode: 'development', // 打包模式 development || production
  entry: entryIndex, // 入口文件
  output, // 打包输出文件目录
  resolve,
  module: webpackModule,
  plugins,
  devServer,
  optimization
}