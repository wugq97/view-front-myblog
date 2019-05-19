<template>
  <div class="comment-container">
    <div class="commentTop">
      <div class="comment-title">发表评论</div>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="commentText">
      </el-input>
      <div class="imf">
        <label>昵称&nbsp;<span style="color:red;">*</span></label>
        <el-input type="text" v-model="name"></el-input>
        <span class="switch">匿名:&nbsp;&nbsp;&nbsp;&nbsp;
          <el-switch
            v-model="anonymous"
            active-text="是"
            inactive-text="否">
            </el-switch>
        </span>
      </div>
      <el-button @click="sendComment()" class="button">提交评论</el-button>
    </div>
    <div class="comment-item">
      <Item v-for="(comment,index) in comments" :key="index" :comment="comment"></Item>
    </div>
  </div>
</template>
<script>
import { getComment, commitComment } from '@/api/home'
import Item from './item'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      comments: [],
      commentText: '',
      name: '',
      anonymous: true
    }
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters(['role'])
  },
  components: {
    Item
  },
  watch: {
    anonymous (value) {
      if (!value && !this.role) {
        this.$message({
          message: '未登录无法使用非匿名方式！',
          type: 'error'
        })
        this.anonymous = true
      }
      if (!value && this.role && this.name !== this.role.username) {
        this.name = this.role.username
      }
    },
    name (value) {
      if (!this.anonymous && value !== this.role.username) {
        this.anonymous = true
      }
    }
  },
  mounted () {
    this.query()
    if (this.role) {
      this.name = this.role.username
      this.anonymous = false
    }
  },
  methods: {
    sendComment () {
      if (!this.name) {
        this.$message({
          message: '请输入昵称！',
          type: 'warning'
        })
      } else if (!this.commentText) {
        this.$message({
          message: '请输入评论！',
          type: 'warning'
        })
      } else {
        const { id, name, commentText } = this
        commitComment(id, name, commentText).then(res => {
          this.query()
          this.commentText = ''
        })
      }
    },
    query () {
      getComment(this.id).then(res => {
        this.comments = res.data
      })
    }
  }
}
</script>
<style scoped>
.commentTop{
  text-align: left;
  background-color: white;
  padding: 20px 20px;
  border:1px solid #ddd;
}
.classC .commentTop{
  background-color: #263445;
  border:1px solid #838B8B;
}
.comment-title{
  font-weight: bold;
  margin-bottom: 15px;
}
.imf{
  margin-top:15px;
  margin-bottom: 15px;
}
.switch{
  float:right;
  font-size: 14px;
}
.comment-item{
  margin-top:20px;
}
.classC .button{
  background-color: #304156;
}
</style>
<style>
.comment-container .el-input{
  display: inline-block;
  width:180px;
}
.classC .comment-container .el-input__inner{
  background-color: #1f2d3d;
  border:1px solid #838B8B;
}
.classC .comment-container .el-textarea__inner{
  background-color: #1f2d3d;
  border:1px solid #838B8B;
}
.classC .comment-container .el-switch__label{
  color:#44628D;
}
</style>
