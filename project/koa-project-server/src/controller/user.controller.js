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
            const update = await updateById({
                id : res.id,
                isLogin: 1
            })
            if(update){
                res.isLogin = 1
            }else{
                console.error("登录状态更新失败！");
                return
            }
            ctx.body = {
                code: 0,
                message: `用户 ${username} 登录成功！`,
                result: {
                    // res存在token的payload中，经过密钥JWT_SECRET加密，过期时间1天
                    token: jwt.sign(res,JWT_SECRET,{ expiresIn: '1d'}), 
                    isAdmin: res.isAdmin
                }
            }
        } catch (err) {
            console.error('用户登录失败', err);
            ctx.app.emit('error', userloginError, ctx)
        }
    }

    // 注销
    async logout(ctx, next) {
        const id = ctx.state.user.id
        // 此处必须使用'0'而不能直接使用0，否则会更新失败，但是直接非0值可以更新成功
        const res = await updateById({id, isLogin: '0'}) 
        if (res) {
            // 必要时清空ctx.state.user，暂不需要
            ctx.body = {
                code: 0,
                message: `用户 ${ctx.state.user.username} 注销成功！`,
                result: '',
            }
        }else {
            console.error('注销失败'); 
            // ctx.app.emit('error', , ctx)
        }
    }

    // 修改密码（登录后）
    async updatePassword(ctx, next) {
        const id = ctx.state.user.id // 获取当前登录的用户id
        // 获取新密码，请求中新密码对应属性名称要为password，便于使用加密（加密直接对ctx.request.body.password进行加密）
        const password = ctx.request.body.password
        if (await updateById({id, password})) {// 根据id修改password
            await updateById({id, isLogin: '0'}) // 改变isLogin，用户需要重新登录
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

    // 修改密码（登录前）新密码newPassword和旧密码password，登录信息验证中间件对旧密码验证，加密中间件对新密码加密
    // password名称冲突，暂时不使用加密，若使用需修改加密中间件密码名称
    async updatePassword2(ctx, next) {
        const { username, newPassword } = ctx.request.body
        const {id} = await getUserInfo({username})
        if (await updateById({id, password: newPassword})) {// 根据id修改password
            ctx.body = {
                code: 0,
                message: `用户 ${username} 密码修改成功！`,
                result: '',
            }
        }else {
            console.error('修改密码失败'); 
            ctx.app.emit('error', updatePasswordError, ctx)
        }
    }

}

module.exports = new UserController()