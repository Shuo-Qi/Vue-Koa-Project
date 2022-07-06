// 路由：解析url，并分发给对应controller方法处理

// 导入包
const Router = require('koa-router')

// 导入中间件
const { userValidator_1, userValidator_2, crpytPassword } = require('../middleware/user.middleware')

// 导入controller
const { register, login } = require('../controller/user.controller')

// 实例化路由
const router = new Router({ prefix: '/users' })

// 注册接口,先通过中间件进行验证、加密（可选），通过后再执行register方法
// router.post('/register', userValidator_1, userValidator_2, crpytPassword, register)
router.post('/register', userValidator_1, userValidator_2, register)
// 登录接口
router.post('/login', login)

// 导出路由
module.exports = router