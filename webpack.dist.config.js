const path = require('path');

const config = require('./webpack.config');

config.output.path = path.resolve(__dirname, 'dist');
delete config.devtool;

module.exports = config;
