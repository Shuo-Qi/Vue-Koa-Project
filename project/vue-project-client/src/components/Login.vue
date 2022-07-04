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
          <el-input v-model="loginData.password" placeholder="请输入密码" show-password maxlength="13" style="margin-top:5px"></el-input>
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
      
      role: 0, //角色
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
    userLogin() {
      this.$message({
          message: "登录成功！用户名:"+this.loginData.username +"密码:"+ this.loginData.password,
          type: 'success',
          duration:1500
        });
        // 页面带参数跳转
      this.$router.push({
        name: 'HomePage',
        params: {
          user: this.loginData.username
        }
      })

      // alert("登录：用户名"+this.loginData.username +"密码"+ this.loginData.password);
      // console.log("用户名"+this.loginData.username +"密码"+ this.loginData.password);
    },
   
   // 注册
    userResgister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
          message: '注册成功！用户名:'+this.registerData.username +"密码:"+ this.registerData.password,
          type: 'success',
          duration:1500
        });
          this.RegisterDialogVisible = false;
        } else {
          this.$message.error('注册信息不合法！');
          // this.RegisterDialogVisible = false;
          return false;
        }
      });
    },
      
    // 修改密码
    userChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
          message: '密码修改成功！用户名:'+this.ChangePasswordData.username +
      "原密码:"+ this.ChangePasswordData.oldPassword+
      "新密码:"+ this.ChangePasswordData.newPassword,
          type: 'success',
          duration:1500
        });
          this.PasswordDialogVisible = false;
        } else {
          this.$message.error('密码修改信息不合法！');
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
