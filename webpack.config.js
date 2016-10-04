var webpack = require('webpack'); // Requiring the webpack lib
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var definePlugin = new webpack.DefinePlugin({
  __ENV__: JSON.stringify(process.env.NODE_ENV),
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var entry = [];

if(process.env.NODE_ENV !== 'production'){
  entry.push('webpack-dev-server/client?http://localhost:8080') // Setting the URL for the hot reload
  entry.push('webpack/hot/only-dev-server') // Reload only the dev server)
}

entry.push('./src/index.jsx')

module.exports = {
  entry: entry,
  debug: true,
  devtool: '#inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel' // Include the react-hot loader
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      // bootstrap
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ["js", "node_modules"]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true // Activate hot loading
  },
  plugins: [
    definePlugin,
    new webpack.HotModuleReplacementPlugin(), // Wire in the hot loading plugin,
    new CopyWebpackPlugin([
      {from: './src/index.html'} // copy index.html to dist
    ]),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ]
};