// 路由：解析url，并分发给对应controller方法处理

// 导入包
const Router = require('koa-router')

// 导入controller
const { register, login } = require('../controller/user.controller')

// 实例化路由
const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', register)
// 登录接口
router.post('/login', login)

// 导出路由
module.exports = router