var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './app',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.scss', '.json', '.html'],
		modulesDirectories: ['node_modules']
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{ test: /\.js$/,  loaders: ['babel', 'xo-loader'], exclude: /node_modules/ },
			{ test: /\.html$/, loaders: ['raw'], exclude: /node_modules/ },
			{ test: /\.json$/, loaders: ['raw'] },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css!sass?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')) }
		]
	},
	plugins: [
		new ExtractTextPlugin('../css/main.css', { allChunks: true })
	]
};
