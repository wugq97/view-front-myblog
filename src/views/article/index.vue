<template>
  <div class="article-container">
    <div class="article-main left">
      <div class="article-top"><bread-crumb :articleId="this.$route.params.id"></bread-crumb></div>
      <div class="article">
        <Content :id="this.$route.params.id || 0"></Content>
      </div>
    </div>
    <div class="comment left">
      <Comment :id="this.$route.params.id || 0"></Comment>
    </div>
    <div class="information right">
      <Hot></Hot>
      <Tag></Tag>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/breadcrumb'
import Content from './components/content'
import Comment from './components/comment'
import Hot from '@/components/box/hot'
import Tag from '@/components/box/tag'
export default {
  data () {
    return {
      id: 0,
      infos: []
    }
  },
  inject: ['reload'],
  watch: {
    $route: {
      handler: function (route) {
        if (route.name === 'article' && this.id !== route.params.id && this.id !== 0) {
          this.reload()
        }
        console.log(route)
      },
      immediate: true
    }
  },
  mounted () {
    this.id = this.$route.params.id
  },
  components: {
    BreadCrumb, Content, Comment, Hot, Tag
  }
}
</script>
<style scoped>
.article-container{
  width:100%;
  overflow: hidden;
  position: relative;
}
.classA .article-main{
  width:70%;
}
.classB .article-main{
  width:100%;
}
.classC .article-main{
  width:70%;
}
.classA .comment{
  width:70%;
}
.classB .comment{
  width:70%;
}
.classC .comment{
  width: 70%;
}
.classA .information{
  margin-top:27px;
  width:28%;
  position: absolute;
  top: 0;
  right: 0;
}
.classB .information{
  margin-top:20px;
  width:28%;
  float: right;
}
.classC .information{
  margin-top:27px;
  width:28%;
  position: absolute;
  top: 0;
  right: 0;
}
.article-top{
  text-align: left;
  margin-bottom: 10px;
}
.article{
  background-color: white;
  border:1px solid #DDD;
}
.classC .article{
  background-color: #263445;
  border:1px solid #838B8B;
}
.comment{
  margin-top:20px;
}
</style>
