// 数据库操作

const User = require('../model/user.model')
class UserService {
    // 增
    async createUser(username, password) {
        // User.create({
        //     // 表字段名: 接收的字段名
        //     username: username,
        //     password: password
        // })
        // 属性名和属性值相同时，可以简写
        const res = await User.create({ username, password }) // 返回的是Promise类型的对象
        return res.dataValues // 取res中的dataValues部分，async返回的是Promise类型的对象
    }

    // 查
    async getUserInfo({id, username, password, isAdmin}) {
        // where条件
        const whereOpt = {}
        // 变量不为空则拷贝这个变量到whereOpt
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        isAdmin && Object.assign(whereOpt, { isAdmin })
        // 查询语句:查询第一个满足条件的记录
        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'isAdmin'], // 要查询的字段
            where: whereOpt, // where条件
          })
        return res ? res.dataValues : null
    }
}

module.exports = new UserService()
