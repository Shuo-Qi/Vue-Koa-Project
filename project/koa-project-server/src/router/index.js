// 管理router目录下的所有路由文件，统一自动加载路由到app-index.js

const Router = require('koa-router')
const router = new Router()
const fs = require('fs')

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js'){
        let r = require('./' + file) // 加载所有路由文件
        router.use(r.routes()) // 注册路由中间件
    }
})

module.exports = router

