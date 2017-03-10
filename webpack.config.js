module.exports = {
	context: __dirname + "/app",
	entry: './app.js',
	output: {
		path: 'public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
					{
						test: /\.js$/,
						exclude: '/node_modules/',
						loader: "babel-loader"
					}
		]
	}
}