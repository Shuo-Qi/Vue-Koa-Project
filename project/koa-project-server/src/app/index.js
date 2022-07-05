// 业务相关部分，从main.js中分离出来

const Koa = require('koa')
const KoaBody = require('koa-body')

// 加载路由
const userRouter = require('../router/user.route')
// 实例化
const app = new Koa()

//注册koa-body中间件
app.use(KoaBody())
// 注册路由中间件
app.use(userRouter.routes())

module.exports = app