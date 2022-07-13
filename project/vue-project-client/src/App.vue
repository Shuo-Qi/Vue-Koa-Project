<template>
  <!-- <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div>
    <router-view></router-view>
    <!-- <LoginPage></LoginPage> -->
  </div>
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LoginPage from './views/LoginPage.vue'
import HomePage from './views/HomePage.vue'
import HomePage_admin from './views/HomePage_admin'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    LoginPage,
    HomePage,
    HomePage_admin,
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

</style>
