<template>
  <div>
    <el-container class="login_background">
      <el-header height="5%">
        <div class="header_title">砂型数字化成型工艺数据管理系统</div>
      </el-header>
      <div class="divider_length">
        <el-divider></el-divider>
      </div>
      <el-main>
        <Login></Login>
      </el-main>
      <div class="divider_length">
        <el-divider></el-divider>
      </div>
      <el-footer height="5%">
        <div class="footer_content">2021-2022 &copy; SEU-458</div>
      </el-footer>
    </el-container>
  </div>
    
</template>

<script>

import Login from "../components/Login.vue";
export default {
  components: {
    Login
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login_background{
  height: 100vh;
  background:rgb(40, 42, 49);
}
.header_title{
  height:fit-content;
  display:flex;
  justify-content:center;
  margin-top: 10px;
  font-size: 35px;
  font-weight: bold;
  color:#f0f2f5
}
.footer_content{
  display:flex;
  height:fit-content;
  justify-content:center;
  color: #f0f2f5;
}
.divider_length{
  margin-left: 15px;
  margin-right: 15px;
}
.el-main{
  display:flex;
  justify-content:center;
  align-items: center;
}
</style>
