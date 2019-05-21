<template>
  <div class="chat-container">
    <div class="chat-top">
      <router-link :to="{path: '/'}" class="left index">首页</router-link>
      <span class="right">{{ this.role.username }}</span>
    </div>
    <div class="chat-main">
      <div class="left-container">
        <el-menu
          class="el-menu-vertical-demo">
          <el-menu-item v-for="(user, index) in users" :key="index">
            <span slot="title">{{ user }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-container">
        <div class="content">
          <template v-for="(message, index) in messages">
            <div class="text" :key="index" :class="{leftText:!message.isMine,rightText:message.isMine}">
              <div class="information">
                {{ message.username + '   ' + message.time }}
              </div>
              <div class="chatText">
                {{ message.content }}
              </div>
            </div>
            <div style="clear: both;" :key="'c' + index"></div>
          </template>
        </div>
        <div class="input-text">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="请输入内容"
            v-model="input">
          </el-input>
        </div>
        <div class="button-group">
          <el-button type="primary" @click="send">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import DateUtil from '@/utils/dateUtil'
export default {
  data () {
    return {
      websocket: undefined,
      users: {},
      input: '',
      messages: [],
      messageExample: {
        isMine: false,
        username: '',
        content: '',
        time: ''
      }
    }
  },
  computed: {
    ...mapGetters(['role', 'chatContent'])
  },
  async created () {
    if (!getToken()) {
      this.$message({
        message: '请登录！',
        type: 'warning'
      })
      this.$router.push({path: '/'})
    } else {
      if (!this.role) {
        await this.$store.dispatch('GetInfo')
      }
      this.initWebSocket()
    }
  },
  mounted () {
    this.messages = this.chatContent
  },
  beforeDestroy () {
    if (this.websocket) {
      this.websocket.close()
    }
    this.$store.dispatch('SetChat', this.messages)
  },
  methods: {
    handData (data) {
      console.log(data)
      if (data.new) {
        this.addNewUser(data.new)
      } else if (data.other) {
        this.initUsers(data.other)
      } else if (data.quit) {
        this.deleteUser(data.quit)
      } else if (data.message) {
        this.handleMessage(data.message)
      }
    },
    handleMessage (message) {
      console.log(message)
      this.messages.push(message)
    },
    initUsers (other) {
      this.users = other
    },
    addNewUser (newUser) {
      console.log('new')
      this.users.push(newUser)
    },
    deleteUser (quitUser) {
      var index = -1
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i] === quitUser) {
          index = i
        }
      }
      if (index !== -1) {
        this.users.splice(index, 1)
      }
    },
    send () {
      const content = this.input
      // 发送到服务端
      this.websocketsend(content)
      // 在自己的界面显示
      const message = {}
      message.isMine = true
      message.username = this.role.username
      message.content = content
      message.time = DateUtil.formatDate.format(new Date(), 'hh:mm:ss')
      this.messages.push(message)
      this.input = ''
    },
    initWebSocket () {
      const wsuri = window.BASE_API.replace('http', 'ws') + `websocket/${this.role.id}/${this.role.username}`
      this.websocket = new WebSocket(wsuri)
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.websocketonmessage
      this.websocket.onclose = this.websocketclose
    },
    websocketonopen () {
      console.log('WebSocket连接成功')
    },
    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage (e) {
      this.handData(JSON.parse(e.data))
    },
    websocketsend (agentData) {
      const message = {}
      message.content = agentData
      this.websocket.send(JSON.stringify(message))
    },
    websocketclose (e) {
      console.log('connection closed (' + e.code + ')')
    }
  }
}
</script>
<style scoped>
.chat-container{
  background-color: #F3F6F7;
  height: 100%;
}
.chat-top{
  padding: 5px 5px;
  width: 80%;
  margin: 0 auto;
}
.index{
  margin-left:-20px;
  margin-top:5px;
}
.index:hover{
  cursor: pointer;
  color:#2E8799;
}
.chat-main{
  background-color: #F2F6FC;
}
.left-container{
  position: fixed;
  left:0;
  width: 20%;
  height:95%;
  margin-top:30px;
  background-color: #F2F6FC;
  border-right: 2px solid #e6e6e6;
  overflow-y:auto;
  border-top:1px solid #DDD;
}
.right-container{
  width: 80%;
  position: fixed;
  right:0;
  margin-top:30px;
  border-top:1px solid #DDD;
  height:95%;
}
.content{
  overflow-y: auto;
  height:75%;
  background-color: white;
  border-bottom: 2px solid #DDD;
  border-right:2px solid #DDD;
}
.text{
  margin-top:10px;
  width:33%;
}
.leftText{
  float: left;
  text-align: left;
}
.rightText{
  float: right;
  text-align: right;
}
.information{
  text-align: center;
}
.chatText{
  margin-top:10px;
  text-align: left;
  height:auto;
  word-wrap: break-word;
}
.input-text{
  height:15%;
  border-top:2px solid #DDD;
  border-bottom: 2px solid #DDD;
  border-right:2px solid #DDD;
  background-color: white;
  text-align: left;
  overflow:hidden;
}
.button-group{
  position: absolute;
  bottom: 14px;
  right: 5px;
}
::-webkit-scrollbar-track-piece {
  background-color:#f8f8f8;
}
::-webkit-scrollbar {
  width:18px;
  height:9px;
}
::-webkit-scrollbar-thumb {
  background-clip:padding-box;
  min-height:28px;
  background-color:#dddddd;
}
::-webkit-scrollbar-thumb:hover {
  background-color:#bbb;
}
</style>
<style>
.chat-container .el-menu{
  background-color:#F2F6FC;
  border:none;
}
.chat-container .el-menu:hover{
  cursor: default;
}
.chat-container .el-menu-item:hover{
  cursor: default;
}
.chat-container .el-menu-item.is-active {
  color:black;
}
.chat-container textarea{
  overflow-x: hidden;
}
.chat-container .el-textarea__inner{
  height:100% !important;
  border:0 none;
  outline:none;
}
</style>
