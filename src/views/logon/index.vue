<template>
  <div class="login-container">
    <el-form ref="logonForm" :model="logonForm" class="login-form" auto-complete="on" label-position="left">
      <!--<h3 class="title">vue-admin-template</h3>-->
      <el-form-item prop="username">
        <span class="svg-container">
          账户：
        </span>
        <el-input v-model="logonForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          密码：
        </span>
        <el-input
          type="password"
          v-model="logonForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item prop="same">
        <span class="svg-container">
          确认：
        </span>
        <el-input
          type="password"
          v-model="logonForm.same"
          name="same"
          auto-complete="on"
          placeholder="请重复密码"
          @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogon">
          注册
        </el-button>
      </el-form-item>
      <router-link class="left user" :to="{path:'/login'}">登录</router-link>
      <router-link class="right user" :to="{path:'/'}">首页</router-link>
    </el-form>
  </div>
</template>
<script>
import { logon } from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
      logonForm: {
        username: '',
        password: '',
        same: ''
      },
      loading: false,
      redirect: undefined
    }
  },
  methods: {
    handleLogon () {
      this.loading = true
      console.log(this.logonForm.password + '  ' + this.same)
      if (this.logonForm.username === '' || this.logonForm.password === '') {
        this.$message({
          message: '用户名、密码不准为空！！!',
          type: 'warning'
        })
        this.loading = false
        return
      }
      if (this.logonForm.password !== this.logonForm.same) {
        this.$message({
          message: '两次密码不一样，请重新输入',
          type: 'warning'
        })
        this.logonForm.password = ''
        this.logonForm.same = ''
        this.loading = false
        return
      }
      logon(this.logonForm).then(res => {
        if (res.code === 2) {
          this.$message({
            message: '用户名已存在，请重新输入',
            type: 'error'
          })
          this.logonForm.username = ''
        } else {
          this.$message({
            message: '注册成功，请登录',
            type: 'success'
          })
          this.$router.push({path: '/login'})
        }
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
.user{
  color:#889aa4;
}
.user:hover{
  color:#409EFF;
  cursor: pointer;
}
</style>
<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      color: $dark_gray;
      vertical-align: middle;
      width: 55px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
</style>
