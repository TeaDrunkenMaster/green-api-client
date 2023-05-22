var path = require('path');
module.exports = {
    entry: './build/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve:{
    extensions:['.js','.jsx','.ts','tsx']
 }
};