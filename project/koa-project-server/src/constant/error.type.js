// 错误类型

module.exports = {
    userFormateError: {
        code: '10001', // 后台+模块+编号
        message: '用户名或密码为空',
        result: '',
    },
    userAlreadyExist: {
        code: '10002', // 后台+模块+编号
        message: '用户已经存在',
        result: '',
    },
    userRegisterError: {
        code: '10003', // 后台+模块+编号
        message: '注册时发生错误', // 执行中间件或执行register方法时出错
        result: '',
    },
}