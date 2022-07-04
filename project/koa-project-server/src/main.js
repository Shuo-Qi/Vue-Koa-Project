// 入口文件，http服务部分

//导入监听端口配置
const { APP_PORT } = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
  })