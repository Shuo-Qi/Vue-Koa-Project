// 错误类型

module.exports = {
    userFormateError: {
        code: '10001', // 后台+模块+编号
        message: '用户名或密码为空',
        result: '',
    },
    userAlreadyExist: {
        code: '10002', 
        message: '用户已经存在',
        result: '',
    },
    userRegisterError: {
        code: '10003', 
        message: '注册时发生错误', // 执行中间件或执行register方法时出错
        result: '',
    },
    userNotExist: {
        code: '10004', 
        message: '用户不存在',
        result: '',
    },
    userLoginError: {
        code: '10005', 
        message: '登录时发生错误', // 执行中间件或执行login方法时出错
        result: '',
    },
    userPasswordError: {
        code: '10006', 
        message: '密码不匹配', 
        result: '',
    },
    tokenExpiredError: {
        code: '10007',
        message: 'token已过期', 
        result: '',
    },
    invalidToken: {
        code: '10008',
        message: '无效的token', 
        result: '',
    },
    updatePasswordError: {
        code: '10009',
        message: '修改密码失败', // 执行updatePassowrd方法时出错
        result: '',
    },
    notAdminError: {
        code: '10010',
        message: '无管理员权限',
        result: '',
    },
    notLoginError: {
        code: '10011',
        message: '用户未登录', // isLogin为0，用户手动注销或者修改了用户信息或者从未登录过，此时需要重新登陆
        result: '',
    }
}