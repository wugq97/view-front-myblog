<template>
  <div class="search-container">
    <div class="">
      <bread-crumb :searchinfos="infos"></bread-crumb>
    </div>
    <div class="search-main-container">
      <ul>
        <li v-for="(article,index) in articles" :key="index">
          <span class="border">
            <router-link :to="{path: '/article/' + article.id}">{{ article.title }}</router-link>
            <span class="time">{{ format(article.createdAt) }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getSearchArticles } from '@/api/home'
import BreadCrumb from '@/components/breadcrumb'
import DateUtil from '@/utils/dateUtil'
export default {
  data () {
    return {
      text: '',
      articles: [],
      size: 0,
      infos: [{name: '555'}]
    }
  },
  components: {
    BreadCrumb
  },
  mounted () {
    this.text = this.$route.query.text || ''
    this.query()
  },
  watch: {
    '$route' (to, from) {
      this.text = to.query.text || ''
      this.query()
    }
  },
  methods: {
    format (time) {
      return DateUtil.formatDate.format(new Date(time), 'yyyy年MM月dd日')
    },
    query () {
      getSearchArticles(this.text).then(res => {
        this.articles = res.data
        this.size = res.data.length
        const object = {}
        object.name = `搜索 ${this.text} 找到 ${this.size} 个与之相关的文章`
        this.infos = []
        this.infos.push(object)
        console.log(this.infos)
      })
    }
  }
}
</script>
<style scoped>
.search-container{
  text-align: left;
}
.search-main-container{
  margin-top:15px;
  border:1px solid #DDD;
  padding:20px 25px;
  background-color: white;
}
.classC .search-main-container{
  background-color: #312E41;
  border:1px solid #001528;
}
ul{
  list-style-type: disc;
  line-height: 35px;
}
.border{
  width:100%;
  display: inline-block;
  border-bottom: 1px solid #DDD;
}
.classC .border{
  border-bottom:1px solid #001528;
}
.time{
  float:right;
}
a:hover{
  color:#2E8799;
}
</style>
