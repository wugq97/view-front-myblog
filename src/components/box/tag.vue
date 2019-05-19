<template>
  <div class="main">
    <div class="top-container">
      <Top :title="title"></Top>
    </div>
    <div class="center-container">
      <span v-for="(tag, index) in tags" :key="index" class="tag">
        <router-link :to="{path: '/',query:{tag:tag.id}}">{{ tag.name }}</router-link>
      </span>
    </div>
  </div>
</template>
<script>
import Top from './top'
import { getAllTags } from '@/api/home'
export default {
  data () {
    return {
      title: '所有标签',
      tags: []
    }
  },
  components: {
    Top
  },
  mounted () {
    getAllTags().then(res => {
      this.tags = res.data
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
  overflow: hidden;
}
.classC .center-container{
  background-color: #312E41;
}
.tag{
  display: inline-block;
  border: 1px solid #DDD;
  float: left;
  height: 30px;
  padding: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.classC .tag{
  border: 1px solid #001528;
}
.tag:hover{
  cursor: pointer;
  background-color: #2e8799;
  color:white;
}
</style>
