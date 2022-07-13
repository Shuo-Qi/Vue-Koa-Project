<template>
  <div style="display: flex; justify-content: center; align-items: center;">
    <div style="font-size:large; text-align: center;">HomePage_admin {{this.$route.query.user}}</div>
    <div>{{userInfo}}</div>
    <el-button type="primary" @click="userLogout">注销</el-button>
  </div>
  
    
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInfo: {},
    }
  },
  // 页面渲染前执行
  async created() { 
    try {
      const res = await axios.get('http://localhost:8000/users/getUser',
      {
        headers: {// 设置请求头，存入登录时生成的token，用于后端的登录验证
          'Authorization': 'Bearer ' + this.$route.query.token
        }
      }
      // ,{
      //   params: {
      //     username: this.$route.params.user
      //   }
      // }
      )
      this.userInfo = res.data.result
    } catch (error) {
      this.$message.error('用户信息获取失败！' + error.response.data.message);
      console.error(error);
    }
    
  },

  methods: {
    async userLogout() {
      try {// patch请求必须传data参数，然后才能再传config参数
        const res = await axios.patch('http://localhost:8000/users/logout',{},
        {// 设置请求头，存入登录时生成的token，用于后端的登录验证
          headers: {'Authorization': 'Bearer ' + this.$route.query.token}
        })
        console.log(res);
        this.$message({
          message: res.data.message,
          type: 'success',
          duration:1500
        });
        this.$router.push({path:'/login'})
    } catch(error){
        this.$message.error('注销失败！' + error.response.data.message);
        console.error(error);
      }
    }
  }
}
</script>

<style scoped></style>
