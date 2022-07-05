// user模型与数据库表建立映射

const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model user -> 表 users)
const User = seq.define('user', {
  // id 会被sequelize自动创建, 管理
  // 类型对应：https://www.sequelize.com.cn/core-concepts/model-basics
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码',
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
  },
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })

module.exports = User