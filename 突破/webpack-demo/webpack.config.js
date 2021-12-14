const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    devtool:'inline-source-map',
    devServer:{
        static:'./dist',
    },
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.styl$/,use:['style-loader','css-loader','stylus-loader']},
            {test:/\.(png|svg|jpg|jpeg|gif)$/,type:'asset/resource'},
            {test:/\.txt/,type:'asset/source'},
        ]
    },
    plugins:[new HtmlWebpackPlugin({filename:'index.html',template:'./src/index.html'})]
}