const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackReactProdConfig = require('./webpack.react.prod.config');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const merge = require('webpack-merge')

const plugins = [
  new DashboardPlugin(),  // 打包结果分析 控制台版
  new BundleAnalyzerPlugin({  // 打包结果分析 网页版
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    openAnalyzer: true
  })
]

const webpackAnalyzeConfig = {
  plugins
}

module.exports = smp.wrap(merge(webpackReactProdConfig, webpackAnalyzeConfig))
// for vue repo
// const webpackVueProdConfig = require('./webpack.vue.prod.config');
// module.exports = smp.wrap(merge(webpackBaseConfig, webpackVueProdConfig, webpackAnalyzeConfig))

