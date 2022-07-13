// 业务相关部分，从main.js中分离出来

const Koa = require('koa')
// Body解析
const KoaBody = require('koa-body')
// 错误处理
const errHandler = require('./errorHandler')
// 加载路由
// const userRouter = require('../router/user.route')
// 自动加载所有路由
const router = require('../router/index')
const cors = require('koa2-cors');

// 实例化
const app = new Koa()

// 解决跨域问题
app.use(cors(
    {
    
    origin: function (ctx) {
        //console.log(ctx.header.origin);
        return ctx.header.origin
        // return 'http://localhost:8080'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}
))
//注册koa-body中间件
app.use(KoaBody())
// 注册路由中间件
app.use(router.routes())

// 错误监听及处理
app.on('error', errHandler)

module.exports = app