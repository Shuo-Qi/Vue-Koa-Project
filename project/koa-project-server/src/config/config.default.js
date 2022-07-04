const dotenv = require('dotenv')
// 读取.env文件，写入process.env
dotenv.config()

module.exports = process.env
