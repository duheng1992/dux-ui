const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const babelConfig = require('./.babelrc.json');

const cssPlugin = new MiniCssExtractPlugin({
  filename: 'styles/[name].min.css',
});

const isProd = process.env.NODE_ENV === 'production';
const isAnalyzer = !!process.env.ANALYZER;

const config = {
  // 必填 webpack执⾏构建⼊⼝
  entry: {
    // main: path.resolve(__dirname, './index.js'),
    // webpack只负责css打包
    icon: path.resolve(__dirname, './static/style/icon.css'),
  },
  output: {
    filename: 'scripts/[name].[contenthash].min.js',
    // 输出⽂件的存放路径，必须是绝对路径
    path: path.resolve(__dirname, './build'),
    // 3. 静态资源的路径
    assetModuleFilename: 'assets/[contenthash][ext]',
    library: 'dux-ui',
    libraryTarget: 'umd',
    clean: true,
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      src: path.join(__dirname, 'src'),
      tests: path.join(__dirname, 'tests'),
      shared: path.join(__dirname, 'shared'),
    },
  },
  plugins: [cssPlugin],
  module: {
    rules: [
      //loader模块处理
      {
        test: /static\/style\/icon\.css$/,
        use: [
          // webpack5中, 使用MiniCssExtractPlugin.loader代替style-loader
          {
            loader: MiniCssExtractPlugin.loader,
            // 2. publicPath找相对路径，由于css打包到css文件夹下，需要往上一级后再找assetModuleFilename路径
            options: { publicPath: '../' },
          },
          'css-loader',
        ],
      },
      //   {
      //     test: /\.tsx?$/,
      //     use: 'ts-loader',
      //     exclude: /(node_modules | bower_components | \.umi)/,
      //   },
      {
        test: /\.(tsx | ts | js)$/,
        exclude: /(node_modules | bower_components | \.umi)/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
      {
        // 1. webpack5 配置
        test: /.(svg|eot|ttf|woff)$/,
        type: 'asset/resource',
      },
    ],
  },
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
  externals: {
    react: {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    moment: {
      root: 'moment',
      amd: 'moment',
      commonjs: 'moment',
      commonjs2: 'moment',
    },
  },
  devtool: 'eval-source-map',
};

if (isAnalyzer) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

if (isProd) {
  config.devtool = false;
  config.optimization.minimize = true;
}

module.exports = config;
