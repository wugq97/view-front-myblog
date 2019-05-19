<template>
  <div>
    <router-link :to="{path:'/'}" class="center"><span class="el-icon-s-home">首页</span></router-link>
    <span v-for="(info,index) in infos" :key="index">
      <i class="el-icon-arrow-right"/>
      <router-link :to="{path:info.to}" v-if="info.to" class="center">{{ info.name }}</router-link>
      <span v-else>{{ info.name }}</span>
    </span>
  </div>
</template>
<script>
import { getCategoryByArticle } from '@/api/home'
export default {
  data () {
    return {
      infos: []
    }
  },
  props: {
    searchinfos: Array,
    articleId: String
  },
  watch: {
    searchinfos (value) {
      this.infos = this.searchinfos
    }
  },
  mounted () {
    if (this.articleId) {
      this.initBreadCrumb()
    }
  },
  methods: {
    initBreadCrumb () {
      getCategoryByArticle(this.$route.params.id).then(res => {
        const parent = {}
        parent.name = res.data.parent.name
        parent.to = `/index?category=${res.data.parent.id}`
        this.infos.push(parent)
        const child = {}
        child.name = res.data.child.name || ''
        child.to = `/index?category=${res.data.child.id}`
        this.infos.push(child)
        const article = {}
        article.name = res.data.name
        this.infos.push(article)
      })
    }
  }
}
</script>
<style scoped>
.center:hover{
  color:#409EFF;
}
</style>
