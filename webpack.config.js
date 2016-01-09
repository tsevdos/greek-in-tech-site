var path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'js'),
	entry: './main',
	output: {
		path: path.resolve(__dirname, 'js', 'dist'),
		publicPath: 'js/dist/',
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules']
	},
	module: {
		loaders: [
			{ test: /\.html$/, loaders: ['raw'], exclude: /node_modules/ },
			{ test: /\.json$/, loaders: ['raw'], exclude: /node_modules/ }
		]
	}
};