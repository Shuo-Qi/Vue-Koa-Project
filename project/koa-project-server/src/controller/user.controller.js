// 控制器：业务处理，调用service中的方法时需要加await,且最好使用try catch来捕获service过程的错误

const { createUser, getUserInfo } = require('../service/user.service')
const {userRegisterError} = require('../constant/error.type')

class UserController {
    // 用户注册
    async register(ctx, next) {
        // 1. 从前端请求获取数据(前端请求的数据类型必须是JSON)
        const { username, password } = ctx.request.body    
        try {
            // 2. 调用数据库操作
            const res = await createUser(username, password)
            // 3. 返回结果
            ctx.body = {
                code: 0,
                message:'用户注册成功',
                result: {
                    id: res.id,
                    username:res.username,
                }
            }
        } catch(err){
            // 注册时发生的错误，如数据库错误
            console.log(err); 
            ctx.app.emit('error', userRegisterError, ctx)   
        }
        
    }
    // 用户登录
    async login(ctx, next) {
        const {username, password} = ctx.request.body
        ctx.body = '用户登录成功！'
    }
}

module.exports = new UserController()