<template>
  <div class="main">
    <div class="top-container">
      <Top :title="title"></Top>
    </div>
    <div class="center-container">
      <ul>
        <li><i class="el-icon-document"/> 文章总数：{{ info.article }}篇 </li>
        <li><i class="el-icon-chat-square"/> 留言数量：{{ info.comment }}条 </li>
        <li><i class="el-icon-files"/> 分类数量：{{ info.category }}个 </li>
        <li><i class="el-icon-collection-tag"/> 标签总数：{{ info.tag }}个 </li>
        <li><i class="el-icon-date"/> 最后更新: {{ info.time }} </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Top from './top'
import { getInfo } from '@/api/home'
export default {
  data () {
    return {
      title: '网站概况',
      info: {
        article: 0,
        comment: 0,
        category: 0,
        tag: 0,
        time: '2019年05月10日'
      }
    }
  },
  components: {
    Top
  },
  mounted () {
    getInfo().then(res => {
      this.info = res.data
    })
  }
}
</script>
<style scoped>
.main{
  width:100%;
  border:1px solid #DDD;
  margin-bottom: 15px;
}
.classC .main{
  border:1px solid #001528;
}
.center-container{
  background-color: white;
  text-align: left;
  padding: 25px 15px;
}
.classC .center-container{
  background-color: #312E41;
}
ul{
  line-height: 28px;
}
</style>
