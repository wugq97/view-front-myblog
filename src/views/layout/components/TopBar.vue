<template>
  <nav class="top">
    <div class="topOne" :class="{hidden: isScroll}">
      <div class="notice">
        <div class="left" style="margin-top:5px;margin-right: 20px;">
          <a :href="adminUrl" target="_blank" class="color" style="margin-right: 20px;">后台</a>
          <el-select v-model="localstyle" size="mini" @change="styleChange">
            <el-option value="classB" label="简约"/>
            <el-option value="classA" label="普通"/>
            <el-option value="classC" label="科技"/>
          </el-select>
        </div>
        <div class="right" style="margin-top:10px;">
          <span class="link color" @click="toChat">聊天室</span>
          <span class="link color" @click="toFile">存储空间</span>
          <span style="margin-right: 25px;"></span>
          <span class="link color" @click="login" v-if="!role">登录</span>
          <span class="link color" @click="logon" v-if="!role">注册</span>
          <el-dropdown @command="handleCommand" v-else>
            <span class="el-dropdown-link">
              {{ role.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">修改资料</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div style="clear:both;"></div>
    <div class="topTwo" :class={toTop:isScroll}>
      <div class="topContainer">
        <div class="left">
          <el-button type="text" @click="toIndex" class="name">个人博客</el-button>
        </div>
        <div class="menu right">
          <div class="forSub">
            <i class="el-icon-s-home"></i>
            <router-link :to="{path: '/'}">首页</router-link>
          </div>
          <div v-for="category in categories" :key="category.parent.id" class="forSub" @mouseenter="showChildCategory(category)" @mouseleave="hiddenChildCategory()">
              <router-link :to="{path: '/',query:{category:category.parent.id}}">{{ category.parent.name }}</router-link>
              <div class="subCategories" v-show="category.show">
                <ul>
                  <router-link :to="{ path: '/', query: { category: child.id }}" v-for="child in category.child" :key="child.id">
                    <li>{{ child.name }}</li>
                  </router-link>
                </ul>
              </div>
          </div>
          <span class="el-icon-search" style="cursor:pointer;" @click="showSearch = !showSearch"></span>
        </div>
      </div>
    </div>
    <div class="search" v-show="showSearch">
      <div style="width:70%;display: inline-block;"><el-input v-model="searchText" placeholder="请输入内容"  size="medium"></el-input></div>
      <el-button type="primary" size="medium" style="margin-left:-5px;" @click="search">搜索</el-button>
    </div>
    <div style="clear:both;"></div>
    <el-dialog
      title="修改资料"
      :visible.sync="dialogVisible"
      :modal-append-to-body='false'
      width="30%"
      :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户名" name="username">
          <el-input v-model="username"></el-input>
        </el-tab-pane>
        <el-tab-pane label="密码" name="password">
          <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
          <el-input v-model="newpass" placeholder="请输入新密码" type="password"></el-input>
          <el-input v-model="repeat" placeholder="请重复新密码" type="password"></el-input>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="commit">确 定</el-button>
  </span>
    </el-dialog>
  </nav>
</template>
<script>
import { getAllCategories, updateUsername, updatePassword } from '@/api/home'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  data () {
    return {
      isScroll: false,
      adminUrl: 'http://localhost:9528',
      localstyle: 'classA',
      categories: [{parent: {}, child: [], show: false}],
      showSearch: false,
      searchText: '',
      dialogVisible: false,
      activeName: 'username',
      tab: 'username',
      username: '',
      password: '',
      newpass: '',
      repeat: ''
    }
  },
  computed: {
    ...mapGetters(['role', 'style'])
  },
  watch: {
    role: {
      handler: function (role) {
        if (role !== '') {
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.initCategories()
    window.addEventListener('scroll', this.handleScroll, true)
    if (getToken()) {
      this.$store.dispatch('GetInfo')
    }
    this.localstyle = this.style
  },
  methods: {
    handleScroll: function () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      if (top > 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    },
    styleChange (value) {
      this.$store.dispatch('Set', value)
    },
    showChildCategory (category) {
      category.show = true
    },
    hiddenChildCategory () {
      this.categories.forEach(function (element) {
        element.show = false
      }, this)
    },
    initCategories () {
      getAllCategories().then(res => {
        const parents = res.data.parents
        const child = res.data.child
        this.categories = []
        parents.forEach(function (parent) {
          const item = {}
          item.parent = parent
          item.show = false
          item.child = []
          child.forEach(function (child) {
            if (child.pid === parent.id) {
              item.child.push(child)
            }
          }, this)
          this.categories.push(item)
        }, this)
      })
    },
    login () {
      this.$router.push({path: '/login', query: {redirect: this.$route.path}})
    },
    logon () {
      this.$router.push({path: '/logon'})
    },
    toIndex () {
      this.$router.push({ path: '/' })
    },
    toChat () {
      if (!this.role) {
        this.$message({
          message: '请登录',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/chat' })
      }
    },
    toFile () {
      if (!this.role) {
        this.$message({
          message: '请登录',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/file' })
      }
    },
    search () {
      const text = this.searchText
      this.showSearch = false
      this.searchText = ''
      this.$router.push({path: '/search', query: {text: text}})
    },
    handleCommand (command) {
      if (command === 'a') {
        this.dialogVisible = true
      } else if (command === 'b') {
        this.$store.dispatch('LogOut')
      }
    },
    handleClick (tab, event) {
      this.tab = tab.name
    },
    commit () {
      if (this.tab === 'username') {
        if (!this.username) {
          this.$message({
            message: '用户名不准为空',
            type: 'warning'
          })
        } else {
          updateUsername(this.role.id, this.username).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.role.username = this.username
            this.handleClose()
          })
        }
      } else if (this.tab === 'password') {
        if (this.password === '' || this.newpass === '' || this.repeat === '') {
          this.$message({
            message: '请填写完整信息！',
            type: 'warning'
          })
        } else if (this.newpass !== this.repeat) {
          this.$message({
            message: '两次新密码不同！',
            type: 'warning'
          })
        } else {
          updatePassword(this.role.id, this.password, this.newpass).then(res => {
            if (res.data > 0) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.handleClose()
            } else {
              this.$message({
                message: '修改失败,请重试',
                type: 'error'
              })
            }
          })
        }
      }
    },
    handleClose () {
      this.username = ''
      this.password = ''
      this.newpass = ''
      this.repeat = ''
      this.activeName = 'username'
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
.color:hover{
  color:#2E8799;
}
.hidden{
  display: none;
}
.toTop {
  margin-top: 0 !important;
}
.link:hover{
  cursor:pointer;
}
.top{
  position: fixed;
  top:0;
  width:100%;
  z-index:999;
}
.topOne{
  width:100%;
  background-color: #F4F7F8;
}
.topTwo{
  width:100%;
  height:60px;
  line-height: 60px;
  margin-top:5px;
}
.classA .topTwo, .classB .topTwo{
  border:1px solid #DDD;
  background-color:rgba(255,255,255,0.9);
}
.classC .topTwo{
  /*background-color: rgba(80,122,179,0.9);*/
  color: white;
  background-color: rgba(59,85,118,0.9);
}
.notice{
  width:80%;
  margin:0 auto;
  font-size:15px;
}
.notice .el-button{
  padding-top:10px;
}
.topContainer{
  width:80%;
  margin:0 auto;
}
.name{
  margin-top:5px;
  font-weight: bold;
  font-size:20px;
  font-family:黑体;
  color:#001528;
}
.el-select{
  width:90px;
}
.forSub{
  display: inline-block;
  padding: 0 15px;
  position: relative;
  width:90px;
}
.class .forSub{
  color:#1874CD;
}
.forSub:hover{
  background-color: #656565;
  color:white;
  cursor: pointer;
}
.classC .forSub:hover{
  background-color: #1D2124;
}
.subCategories{
  width:90px;
  color: black;
  position:absolute;
  top: 60px;
  left: 0px;
  z-index:999;
  font-size: 14px;
  background-color:rgba(255,255,255,0.9);
}
.classC .subCategories{
  color:white;
  /*background-color: rgba(80,122,179,0.9);*/
  background-color: rgba(59,85,118,0.9);
}
.subCategories ul{
  border-right:1px solid #DDD;
  border-left:1px solid #DDD;
  border-bottom:1px solid #DDD;
}
.subCategories li{
  height:40px;
  /*padding-left:10px;*/
  line-height:40px;
  border-top:1px solid #DDD;
}
.subCategories ul li:hover{
  background-color:#DDD;
}
.classC .subCategories ul li:hover{
  background-color: #152534;
}
.search{
  background-color: white;
  border:1px solid #DDD;
  height:60px;
  line-height: 60px;
  width:80%;
  margin:5px auto;
}
.classC .search{
  background-color: rgba(59,85,118,0.9);
  border:1px solid #152534;
}
.classC .el-icon-search{
  color:#1874CD;
}
</style>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dialog__header{
  text-align: left;
}
.el-dialog__body{
  padding: 10px 10px;
}
.el-dialog__body .el-input{
  margin-bottom: 10px;
}
</style>
