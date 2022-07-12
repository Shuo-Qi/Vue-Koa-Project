// user相关中间件：验证和加密，调用service中的方法时需要加await,且最好使用try catch来捕获service过程的错误

const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, 
        userAlreadyExist, 
        userRegisterError, 
        userNotExist, 
        userLoginError, 
        userPasswordError,
        tokenExpiredError,
        invalidToken, 
        notAdminError,
        notLoginError,
      } = require('../constant/error.type')
const jwt = require('jsonwebtoken')
// JWT密钥
const { JWT_SECRET } = process.env

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
    console.error('用户注册失败', err); 
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

// 加密中间件
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

// 验证 登录信息(用户是否存在，密码是否匹配)
const userValidator_3 = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 验证 用户不存在
  try {
    const res = await getUserInfo({username})
    if (!res) {
      console.error('用户名不存在',{username});
      ctx.app.emit('error', userNotExist, ctx)
      return
    }
  } catch (err) {
    console.error('用户登录失败', err); 
    ctx.app.emit('error', userLoginError, ctx)
    return
  }
  // 验证 密码错误
  try {
    const res = await getUserInfo({username})
    if (res.password !== password) { // 加密时：if (!bcrypt.compareSync(password, res.password))
      console.error('密码不匹配',{username});
      ctx.app.emit('error', userPasswordError, ctx)
      return
    }
  } catch (err) {
    console.error(err); 
    ctx.app.emit('error', userLoginError, ctx)
    return
  }
  await next()
}

// 用户授权验证中间件，验证用户是否登录
const auth = async (ctx, next) => {
  
  const {authorization} = ctx.request.header // 提取header的authorization
  const token = authorization.replace('Bearer ', '') // 从authorization中提取token
  // 验证token
  try {
    // user中包含了payload的信息(id, username, isAdmin, isLogin)
    const user = jwt.verify(token, JWT_SECRET) // 验证通过返回payload内容，验证失败返回err：TokenExpiredError，JsonWebTokenError等
    // 先检查isLogin是否为1，为1继续，为0表示需要重新登录
    const {isLogin} = await getUserInfo({username: user.username})
    if(!isLogin) {
      console.error('用户需要重新登录', {username: user.username, isLogin})
      return ctx.app.emit('error', notLoginError, ctx)
    }
    ctx.state.user = user // 存入ctx.state.user，之后通过ctx.state.user拿到用户信息
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}

// 检查是否有管理员权限
const hadAdminPermission = async (ctx, next) => {
  const { isAdmin } = ctx.state.user
  if (!isAdmin) {
    console.error('该用户没有管理员权限', ctx.state.user)
    return ctx.app.emit('error',notAdminError, ctx)
  }
  await next()
}

module.exports = {
    userValidator_1,
    userValidator_2,
    crpytPassword,
    userValidator_3,
    auth,
    hadAdminPermission,
}