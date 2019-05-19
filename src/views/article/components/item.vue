<template>
  <div class="comment-item">
    <div class="parent" @mouseenter="handleEnter(-1)" @mouseleave="handleLeave()">
      <span class="name">{{ comment.parent.username }}</span>
      <span class="time">{{ formatTime(comment.parent.createdAt) }}</span>
      <span class="right parent_reply" :class="{hidden: show !== -1}" @click="add(comment.parent.id, comment.parent.username, -1)">回复</span>
      <span class="content">{{ comment.parent.content }}</span>
    </div>
    <div class="child right" :class="{ childBorder: !comment.child }">
      <ul>
        <li v-for="(child, index) in comment.child" :key="index" @mouseenter="handleEnter(index)" @mouseleave="handleLeave()">
          <div class="child-item">
            <span>{{ child.username }} 回复 {{ child.replyName }}:</span>
            <div class="child-content">{{ child.content }}</div>
            <div class="reply">
              {{ formatTime(child.createdAt) }}
              <el-button type="text" @click="add(comment.parent.id, child.username, index)" :class="{hidden: show !== index}">回复</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div class="input" v-show="needReply">
      <span v-html="user"></span>
      <el-input v-model="reply.content"></el-input>
      <el-button type="primary" style="padding: 5px 5px;" @click="sendReply">确定</el-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import DateUtil from '@/utils/dateUtil'
import { commitReply } from '@/api/home'
export default {
  data () {
    return {
      index: -2,
      needReply: false,
      user: '',
      example: {
        parent: {
          id: 0,
          name: 'wwgq1',
          time: '2019-04-08 10:39:44',
          replyName: '',
          content: 'cxcvxvxvcxcvxvxv'
        },
        child: [
          {
            id: 0,
            name: 'wwgq2',
            time: '2019-04-08 10:39:44',
            replyName: '1',
            content: 'cxcvxvxvcvxvxvxv'
          },
        ]
      },
      reply: {
        parentId: 0,
        content: '',
        replyName: ''
      },
      show: -2
    }
  },
  props: {
     comment: Object
  },
  mounted () {
    this.comment.parent.show = false
    this.comment.child.forEach(function (element) {
      element.show = false
    })
  },
  methods: {
    sendReply () {
      const { id, name } = this.$parent
      if (!name) {
        this.$message({
          message: '请输入昵称！',
          type: 'warning'
        })
      } else if (!this.reply.content) {
        this.$message({
          message: '请输入回复！',
          type: 'warning'
        })
      } else {
        commitReply(id, name, this.reply).then(res => {
          this.$parent.query()
          this.reply.content = ''
        })
      }
    },
    add (parentId, name, index) {
      if (this.needReply === false) {
        this.needReply = true
      } else if (this.index === index) {
        this.needReply = false
      }
      this.index = index
      this.user = '@' + name
      this.reply.replyName = name
      this.reply.content = ''
      this.reply.parentId = parentId
    },
    formatTime (time) {
      return DateUtil.formatDate.format(new Date(time), 'yyyy-MM-dd hh:mm:ss')
    },
    handleEnter (index) {
      this.show = index
    },
    handleLeave () {
      this.show = -2
    }
  }
}
</script>
<style scoped>
.comment-item{
  background-color: white;
  margin-bottom: 15px;
  border:1px solid #DDD;
  text-align: left;
  padding: 15px 15px;
  font-size:15px;
  overflow: hidden;
}
.classC .comment-item{
  background-color: #263445;
  border:1px solid #838B8B;
}
.name{
  font-weight: bold;
  display: inline-block;
  margin-right: 25px;
}
.content{
  display: block;
  margin-top:20px;
  word-wrap:break-word;
}
.parent_reply{
  color:#4292FD;
}
.parent_reply:hover{
  color:#67B1FD;
  cursor: pointer;
}
.child{
  background-color: #F6F7F9;
  margin-top: 15px;
  width:85%;
}
.classC .child{
  background-color: #263445;
  border:1px solid #838B8B;
}
.childBorder{
  border:1px solid #DDD;
}
.child-item{
  padding: 5px 5px;
  border-bottom: 1px dashed #D6D6D6;
}
.child-content{
  word-wrap:break-word;
  padding-left:10px;
  margin-top:5px;
}
.reply{
  text-align: right;
  padding-top:5px;
  font-size:14px;
}
.input{
  text-align: right;
  margin-top:5px;
}
.hidden{
  visibility: hidden;
}
</style>
<style>
.comment-item .el-button{
  padding: 0;
}
.comment-item .el-input{
  width:450px;
}
.comment-item .el-input__inner{
  height:32px;
}
</style>
