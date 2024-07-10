const webpack = require('webpack');

module.exports = {
  // Supondo que você já tenha uma configuração existente, adicione ou modifique aqui
  resolve: {
    fallback: {
      crypto: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  // Adicione ou modifique esta linha:
  node: {
    __filename: true,
    __dirname: true,
  },
};
