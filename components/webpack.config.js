module.exports = {
    entry: ["./src/hint/component.js","./src/link/component.js" ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
        ],
    },
}