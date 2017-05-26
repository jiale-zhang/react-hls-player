module.exports = {
    context: __dirname,
    entry: './src/App.tsx',
    output: {
        filename: 'dist/bundle.js'
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)(\?.*)?$/,
            use: 'ts-loader'
        }]
    }
}