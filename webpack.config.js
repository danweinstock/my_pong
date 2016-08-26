module.exports = {
   entry: './src/main.js',
   output: {
      filename: './build/bundle.js'
   },
module: {
   loaders: [
   {
     test: /\.js$/,
     loader: 'babel-loader',
     query: {
       presets: ['es2015']
     }
   },
   {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
   }
 ]
},
devServer: {
   watch:true,
   inline:true,
   host: '0.0.0.0',
   port: '3000',
   watchOptions: {
      aggregateTimeout: 300,
      poll: true
   }
}
};