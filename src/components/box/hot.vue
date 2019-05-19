<template>
  <div class="main">
    <div class="top-container">
      <Top :title="title"></Top>
    </div>
    <div class="center-container">
      <ul>
        <li v-for="(article, index) in articles" :key="index">
          <router-link :to="{path: '/article/'+article.id}"><span class="box" :class="{red: index < 3}">{{ index + 1 }}</span>{{ article.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Top from './top'
import { getHotArticles } from '@/api/home'
export default {
  data () {
    return {
      title: '热评文章',
      articles: []
    }
  },
  components: {
    Top
  },
  mounted () {
    getHotArticles().then(res => {
      this.articles = res.data
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
.classC ul{
  list-style-type:disc;
  padding-left:20px;
}
li{
  vertical-align:bottom;
}
.box{
  background-color: #CCC;
  border: 1px solid #CCC;
  border-radius: 3px;
  color: white;
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-right: 8px;
  font-size: 13px;
  text-align: center;
  line-height: 13px;
}
.classC .box {
  display: none;
}
.red{
  background-color: #C40000;
  border: 1px solid #C40000;
}
</style>
