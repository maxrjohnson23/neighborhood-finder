const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: "./src/js/app.js",
    output: {
        path: path.join(__dirname, 'public/js/'),
        filename: "bundle.js",
    }
}