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
        await User.create({ username, password })
        return '写入数据库成功' // async返回的是Promise类型的对象
    }
}

module.exports = new UserService()
