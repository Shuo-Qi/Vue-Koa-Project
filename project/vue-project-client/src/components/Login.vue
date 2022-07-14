<template>

    <div class="login">
      <div class="title">平台登录</div>

      <!-- 输入框和登录按钮 -->
      <div style="margin-top: 50px">
      <el-form ref="form1" :model="loginData">
        <el-form-item prop="username">
          <el-input v-model="loginData.username" placeholder="请输入用户名" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 回车登录响应 -->
          <el-input v-model="loginData.password" placeholder="请输入密码" show-password maxlength="13" style="margin-top:5px" @keyup.enter.native="userLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin" class="loginButton">登录</el-button>
        </el-form-item>
      </el-form>
      </div>
      
      <!-- 底部弹窗按钮 -->
      <div style="margin-top: 10px;">
        <label type="text" @click="RegisterDialogVisible=true" class="dialogSpan">用户注册</label>
        <el-divider direction="vertical"></el-divider>
        <label type="text" @click="PasswordDialogVisible=true" class="dialogSpan">修改密码</label>
      </div>

      <!-- 注册弹窗 -->
      <el-dialog title="用户注册" :visible.sync="RegisterDialogVisible" width="380px">
        <div>
          <el-form ref="form2" :model="registerData" label-width="80px" :rules="rules1">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="registerData.username" placeholder="请输入用户名" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="registerData.password" placeholder="请输入密码" style="width: 250px;" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="password2">
              <el-input v-model="registerData.password2" placeholder="请再次输入密码" style="width: 250px;" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button @click="RegisterDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="userResgister('form2')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改密码弹窗 -->
      <el-dialog title="修改密码" :visible.sync="PasswordDialogVisible" width="380px">
        <div>
          <el-form ref="form3" :model="ChangePasswordData" label-width="80px" :rules="rules2">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="ChangePasswordData.username" placeholder="请输入用户名" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="原密码:" prop="oldPassword">
              <el-input v-model="ChangePasswordData.oldPassword" placeholder="请输入旧密码" style="width: 250px;" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
              <el-input v-model="ChangePasswordData.newPassword" placeholder="请输入新密码" style="width: 250px;" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="newPassword2">
              <el-input v-model="ChangePasswordData.newPassword2" placeholder="请再次输入新密码" style="width: 250px;" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button @click="PasswordDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="userChange('form3')">确 定</el-button>
        </span>
      </el-dialog>

    </div>

</template>

<script>
import { async } from 'q';
import axios from 'axios'
export default {
  data () {

    var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ChangePasswordData.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      
      loginData:{
        username: '',
        password: '',
      },
      RegisterDialogVisible: false,
      PasswordDialogVisible: false,
      registerData: {
        username: '',
        password: '',
        password2: ''
      },
      ChangePasswordData: {
        username: '',
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      
      rules1: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 13, message: '长度在 6 到 13 个字符', trigger: 'blur' }
          ], 
        password2: [
            { validator: validatePass1, trigger: 'blur' }
          ],
      },

      rules2: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
        oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 13, message: '长度在 6 到 13 个字符', trigger: 'blur' }
          ], 
        newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 13, message: '长度在 6 到 13 个字符', trigger: 'blur' }
          ], 
        newPassword2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      }
    }
  },

  methods: {
    // 登录
    async userLogin() {
      try {
        const res = await axios.post('http://localhost:8000/users/login', {
            username: this.loginData.username,
            password: this.loginData.password
          })
        console.log(res);
        this.$message({
          message: res.data.message,
          type: 'success',
          duration:1500
        });
        this.$refs['form1'].resetFields();
        // 页面带参数跳转 name+params和path+query两种方式，前者刷新页面会清空.或者使用sessionStorage存储要传的数据
        if(!res.data.result.isAdmin) {// 不是管理员
          this.$router.push({
            path: '/home',
            query: {
              user: this.loginData.username,
              token: res.data.result.token,
            }
          })
        } else {// 是管理员
            this.$router.push({
            path: '/home_admin',
            query: {
              user: this.loginData.username,
              token: res.data.result.token,
            }
          })
        }
      } catch (error) {
        this.$refs['form1'].resetFields();// 清空表单
        this.$message.error('登录失败！' + error.response.data.message);
        console.error(error);
      }
    },
   
   // 注册
    userResgister(formName) {
      this.$refs[formName].validate( async valid => {
        if (valid) {
          try {
          const res = await axios.post('http://localhost:8000/users/register', {
            username: this.registerData.username,
            password: this.registerData.password
          })
            console.log(res);
            this.$message({
              message: res.data.message,
              type: 'success',
              duration:1500
            });
          this.RegisterDialogVisible = false;
          } catch(err) {
            this.$message.error('注册失败！' + err.response.data.message); // 获取后台error的message
            console.error(err);
          }
          this.$refs[formName].resetFields();
        } else {
          this.$message.error('注册信息不合法！');
          this.$refs[formName].resetFields();
          // this.RegisterDialogVisible = false;
          return false;
        }
      });
    },
      
    // 修改密码
    userChange(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await axios.patch('http://localhost:8000/users/updatePassword2', {
              username: this.ChangePasswordData.username,
              password: this.ChangePasswordData.oldPassword,
              newPassword: this.ChangePasswordData.newPassword
            })
            console.log(res);
            this.$message({
              message: res.data.message,
              type: 'success',
              duration:1500
            });
            this.PasswordDialogVisible = false;
          } catch(err) {
            this.$message.error('密码修改失败！' + err.response.data.message); // 获取后台error的message
            console.error(err);
          }
          this.$refs[formName].resetFields();
        } else {
          this.$message.error('密码修改信息不合法！');
          this.$refs[formName].resetFields();
          // this.PasswordDialogVisible = false;
          return false;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .center{
  
} */
.login{
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  /* flex-wrap: wrap; */
  width: 380px;
  height: 400px;
  background:rgb(255, 255, 255);
}
.title{
  width: 380px;
  height: 30px;
  margin-top: 40px;
  text-align:center;
  font-size: 28px;
  font-weight: bold;
  color:#0c0c0c;
}
.loginButton{
  width: 300px;
  margin-top: 15px;
}
/* 调整间距
.el-form-item{
  margin-bottom: 20px;
} */
.dialogSpan{
  width: 90px;
  text-align: center;
  color: #606266;
  font-size: smaller;

}
</style>
