module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [ __dirname ],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',

        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    devtool: '#inline-source-map'

};