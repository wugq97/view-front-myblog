<template>
  <div class="article-container">
    <div class="title" v-text="article.title"></div>
    <div class="content" v-html="decodeURIComponent(article.content)"></div>
    <div class="article-bottom">
      <span class="view"><i class="el-icon-view" style="margin-right:5px;"/>{{ article.views }}</span>
      <span class="like" @click="addLikes"><i class="ali-icon-zan" :class="{hasLike:hasLike}" style="margin-right:5px;"/>{{ article.likes }}</span>
    </div>
  </div>
</template>
<script>
import { getArticle, addViews, addLikes, getView } from '@/api/home'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      article: {
        id: 0,
        title: '',
        subtitle: '',
        content: '',
        views: 0,
        likes: 0
      },
      hasLike: false
    }
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters(['role'])
  },
  mounted () {
    this.query()
    this.addViews()
  },
  watch: {
    role: {
      handler: function (role) {
        if (role) {
          getView(this.id, this.role.id).then(res => {
            if (res.data > 0) {
              this.hasLike = true
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    query () {
      getArticle(this.id).then(res => {
        this.article = res.data
      })
    },
    addViews () {
      addViews(this.id).then(res => {
        this.article.views = this.article.views + 1
      })
    },
    addLikes () {
      console.log(this.role)
      if (!this.role.id) {
        this.$message({
          message: '请登录！',
          type: 'warning'
        })
      } else {
        if (!this.hasLike) {
          addLikes(this.id, this.role.id).then(res => {
            this.hasLike = true
            this.article.likes = this.article.likes + 1
          })
        } else {
          this.$message({
            message: '你已点过！',
            type: 'warning'
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.article-container{
  /*background-color: white;*/
  padding: 30px 15px;
  position: relative;
}
.title{
  font-size: 22px;
  background-color: #F8F8F8;
  margin-bottom: 30px;
  padding: 10px 0;
}
.classC .title{
  background-color: #263445;
}
.content{
  text-align: left;
  margin-bottom: 50px;
  word-wrap:break-word;
}
.article-bottom{
  position: absolute;
  width:100%;
  text-align:center;
  bottom:10px;
  margin-top:20px;
}
.view{
  margin-right: 15px;
}
.like:hover{
  cursor: pointer;
}
.hasLike{
  color: red;
}
</style>
