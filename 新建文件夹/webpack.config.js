const path =require('path')
//启用热更新  第二步
const webpack = require('webpack')

//导入在内存中生成 HTML 页面的插件  安装 html-webpack-plugin
//只要是插件 都要放到 plugins 节点中去
//这个插件的两个作用：1、自动在内存中根据指定页面生成一个页面  2、自动把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

//这个配置文件其实就是一个js文件  通过Node  中的模块操作  向外暴露了一个配置对象
module.exports = {
    //在配置文件中手动指定入口和出口
    entry:path.join(__dirname,'./src/main.js') ,//入口 表示要使用webpack 打包哪个文件
    output:{//输出文件相关配置
        path:path.join(__dirname,'./dist') ,      //    指定打包好的文件输出到哪个目录中去
        filename:'bundle.js'//指定输出文件的名称
    },
    devServer:{//这是配置dev-server 命令参数的第二种方式，相对来说这种方式麻烦一些
    // --open --port 3000 --contentBase src --hot
        open:true,//自动打开浏览器
        port:3000,//设置启动时候的端口
        contentBase:'src',//指定托管的根目录
        hot:true//启动热更新   的 第一步
    },
    plugins:[// 配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//new 一个热更新的 模块对象  这是启用热更新的第三步
        new htmlWebpackPlugin({ //创建一个在内存中 生成 HTML 页面的插件
            template:path.join(__dirname,'./src/index.html'),//指定模板页面 将来会根据指定页面路径 去生成内存中的页面
            filename:'index.html'//指定生成页面的名称
        })
    ] ,
    module:{//这个节点用于配置 所有第三方 加载器
        rules:[//所有第三方模块的匹配规则
            { test :/\.css$/,use: ['style-loader','css-loader'] },//配置处理  .css 文件的第三方loader 规则   调用规则从右到左←
            { test :/\.less$/,use: ['style-loader','css-loader','less-loader'] },//这是配置处理 .less 文件的 第三方 loader
            { test :/\.scss$/,use: ['style-loader','css-loader','sass-loader']}//这是配置处理 .scss 文件的 第三方 loader
        ]
    }          
}


//在控制台直接输入  webpack 命令执行的时候  webpack 做了以下几步
//1  首先 webpack发现 我们并没有通过命令的形式指定给它指定入口和出口  
//2  webpack 就会去项目中查找这个文件  webpack.config.js 
//3  当找到配置文件后 webpack 会去解析执行这个配置文件  当执行解析完这个文件后 就得到了 配置文件中 导出的配置对象
//4 当webpack 拿到配置对象以后 就拿到了 配置对象中 指定的入口 和出口 然后进行打包构建















