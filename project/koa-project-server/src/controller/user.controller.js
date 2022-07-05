// 控制器：业务处理

const { createUser } = require('../service/user.service')

class UserController {
    // 用户注册
    async register(ctx, next) {
        // 1. 从前端请求获取数据
        const {username, password} = ctx.request.body
        // 2. 调用数据库操作
        const res = await createUser(username, password)
        console.log(res)
        // 3. 返回结果
        ctx.body = ctx.request.body
    }
    // 用户登录
    async login(ctx, next) {
        const {username, password} = ctx.request.body
        ctx.body = '用户登录成功！'
    }
}

module.exports = new UserController()