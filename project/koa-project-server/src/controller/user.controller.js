// 控制器：业务处理，调用service中的方法时需要加await,且最好使用try catch来捕获service过程的错误

const jwt = require('jsonwebtoken')
// JWT密钥
const { JWT_SECRET } = process.env
const { createUser, getUserInfo, updateById } = require('../service/user.service')
const {userRegisterError, userloginError, updatePasswordError} = require('../constant/error.type')

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
            console.error('用户注册失败', err); 
            ctx.app.emit('error', userRegisterError, ctx)   
        }
        
    }

    // 用户登录,通过jwt颁发token
    async login(ctx, next) {
        const { username } = ctx.request.body
        try {
            const {password, ...res} = await getUserInfo({username}) // 解构参数，剔除password属性,注意参数是{}形式！
            ctx.body = {
                code: 0,
                message: `用户 ${username} 登录成功！`,
                result: {
                    // res存在token的payload中，经过密钥JWT_SECRET加密，过期时间1天
                    token: jwt.sign(res,JWT_SECRET,{ expiresIn: '1d'}), 
                }
            }
        } catch (err) {
            console.error('用户登录失败', err);
            ctx.app.emit('error', userloginError, ctx)
        }
    }

    // 修改密码（登录后）
    async updatePassword(ctx, next) {
        const id = ctx.state.user.id // 获取当前登录的用户id
        // 获取新密码，请求中新密码对应属性名称要为password，便于使用加密（加密直接对ctx.request.body.password进行加密）
        const password = ctx.request.body.password
        if (await updateById({id, password})) {// 根据id修改password
            ctx.body = {
                code: 0,
                message: `用户 ${ctx.state.user.username} 密码修改成功！`,
                result: '',
            } 
        }else {
            console.error('修改密码失败'); 
            ctx.app.emit('error', updatePasswordError, ctx)
        }
    }
}

module.exports = new UserController()