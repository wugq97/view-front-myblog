<template>
  <div class="">
    <div class="left-container left">
      <carousel class="carousel"></carousel>
      <Article v-for="(article,index) in articles" :key="index" :article="article"></Article>
      <div class="right" v-if="articles.length">
        <el-pagination
          @current-change="handleChangPage"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
      <div class="hasNone" v-else>暂无相关文章</div>
    </div>
    <div class="right-container right">
      <general></general>
      <Hot></Hot>
      <Tag></Tag>
    </div>
  </div>
</template>
<script>
import Carousel from '@/components/Carousel'
import Article from '@/components/Article'
import General from '@/components/box/general'
import Hot from '@/components/box/hot'
import Tag from '@/components/box/tag'
import { getArticles } from '@/api/home'
export default {
  data () {
    return {
      articles: [],
      category: 0,
      tag: 0,
      page: 1,
      pageSize: 7,
      total: 0
    }
  },
  mounted () {
    this.handleType(this.$route.query)
  },
  watch: {
    '$route' (to, from) {
      console.log(to.query)
      this.handleType(to.query)
    }
  },
  components: {
    Carousel,
    Article,
    General,
    Hot,
    Tag
  },
  methods: {
    getArticleList () {
      getArticles(this.category, this.tag, this.page).then(res => {
        console.log(res.data)
        this.articles = res.data.items
        this.total = res.data.count
      })
    },
    handleChangPage (page) {
      this.page = page
      this.getArticleList()
    },
    handleType (type) {
      if (typeof type === 'undefined') {
        return
      }
      this.category = 0
      this.tag = 0
      if (typeof type.category !== 'undefined') {
        this.category = type.category
      } else if (typeof type.tag !== 'undefined') {
        this.tag = type.tag
      }
      this.getArticleList()
    }
  }
}
</script>
<style scoped>
.classA .left-container{
  width: 70%;
}
.classA .right-container{
  width:28%;
}
.classB .left-container{
  width: 100%;
}
.classB .right-container{
  display: none;
}
.classC .left-container{
  width:70%;
}
.classC .right-container{
  width:28%;
}
.classB .carousel{
  display: none;
}
.hasNone{
  font-weight: bold;
  font-size: 15px;
  margin-top:20px;
}
</style>
<style>
.classC .el-pagination.is-background .btn-prev{
  background-color: black;
}
.classC .el-pagination.is-background .btn-prev:disabled{
  background-color: black;
}
.classC .el-pagination.is-background .btn-next{
  background-color: black;
}
.classC .el-pagination.is-background .el-pager li{
  background-color: black;
}
.classC .el-pager .active{
  color: white;
}
</style>
