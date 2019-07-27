//这是我们项目的入口文件

//导入jquery
//import  from 是ES6中导入模块的方式
import $ from 'jquery'
// const $ = require('jquery')

//使用 import 语法导入 css 样式表
import './css/index.css'
//注意 webpack 默认只能打包处理 js类型文件 wufa处理 其他 非js类型的文件
//如果要处理 非js类型文件 需要手动安装一些合适的第三方 loader 加载器
// 1 如果要打包处理  css  文件 需要安装 cnpm i style-loader css-loader -D
//2 打开 webpack.config.js 文件 在里面 新增一个 配置节点  叫作 module 它是一个对象
//这个 module 对象身上 有个  rules 属性 这个rules 属性是个数组 这个数组中 存放了 所有第三方文件的匹配  和处理规则

// 注意  webpack 处理第三方文件类型的过程
//1  发现这个要处理的文件不是js文件 然后就去 配置文件中 查找有没有对应的第三方 loader 规则
//2  如果能找到对应的规则 就会调用 对应的 第三方 loader 处理 这种文件类型
//3 在调用loader 的时候 是从后往前调用
//4 当最后一个 loader 调用完毕 会把处理结果 直接交给webpack 进行打包合并

import './css/index.less'

// import './css/index.scss'

$(function(){
    $('li:odd').css('backgroundColor','blue')
    $('li:even').css('backgroundColor',function(){
        return "#"+"D97634"
    })
})


// webpack  可以做什么事情
//1 webpack 能够处理js文件之间的互相依赖关系
//2 webpack 能够处理js的兼容问题  把高级的浏览器不识别的语法转为低级的浏览器能正常识别的语法
//3 刚才运行 的命令格式  ： webpack 要打包的的文件路径  打包好的输出文件路径


//使用webpack-dev-server 这个工具来实现自动打包编译的功能
//1 运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
//2 安装完毕后这个命令的用法和webpack的用法完全一样
//3 由于是本地安装的 webpack-dev-server  所以无法把它当做脚本命令 在 powershell  终端直接执行 只有安装到全局  -g 的工具才能在终端中正常执行  


//4  注意 webpack-dev-server 这个工具 如果想要正常运行 要求在本地项目中 必须安装webpack
// 5 webpack-dev-server帮我们打包生成的 bundle.js 文件 并没有存放到 事件的物理磁盘上  而是直接托管到 电脑的内存中 所以 我们在项目的根目录中找不到这个打包好的 bundle.js
// 6 我们可以认为 webpack-dev-server把打包好的文件  以一种虚拟的形式 托管到了咱们项目的根目录中虽然看不到，但是 可认为 和dist src node_modules 平级
// 有一个看不见的文件叫作 bundle.js








