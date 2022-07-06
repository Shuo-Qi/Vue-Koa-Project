// user相关中间件：验证和加密，调用service中的方法时需要加await,且最好使用try catch来捕获service过程的错误

const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExist } = require('../constant/error.type')
  
// 验证 用户名或密码为空
const userValidator_1 = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx) // 提交错误给app,由app监听错误并处理
    return
  }
  // 继续执行下一个中间件
  await next()
}
// 验证 用户已经存在
const userValidator_2 = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
    // 查询用户
    const res = await getUserInfo({ username })
    // 判断用户是否已存在
    if (res) {
        console.error('用户已经存在', { username })
        ctx.app.emit('error', userAlreadyExist, ctx)
        return
      }
  } catch (err) {
    console.log(err); 
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    // 盐
    const salt = bcrypt.genSaltSync(10)
    // 加密，hash是密文
    const hash = bcrypt.hashSync(password, salt)
    // 密文代替明文密码
    ctx.request.body.password = hash
    await next()
  }

module.exports = {
    userValidator_1,
    userValidator_2,
    crpytPassword
}