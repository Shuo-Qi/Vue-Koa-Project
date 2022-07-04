// 导入包
const Router = require('koa-router')
// 实例化路由
const router = new Router({ prefix: '/users' })

// GET请求: /users/
router.get('/', (ctx, next) => {
  ctx.body = 'hello users'
})

// 导出路由
module.exports = router