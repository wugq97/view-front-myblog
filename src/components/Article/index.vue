<template>
  <div class="article-container">
    <div class="left-container left">
      <span class="category" v-if="article.category">{{ article.category }}</span>
      <img :src="img">
    </div>
    <div class="right-container">
      <div class="title"><router-link :to="{path: '/article/'+article.id}">{{ article.title }}</router-link></div>
      <div class="subtitle">{{ article.subtitle }}</div>
      <div class="information">
        <span style="margin-right:10px;"><i class="ali-icon-time" style="margin-right: 8px;"/>{{ article.time }}</span>
        <span><i class="el-icon-view" style="margin-right: 8px;"/>{{ article.views }}</span>
        <span class="button"><router-link :to="{path: '/article/'+article.id}">阅读全文</router-link></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      example: {
        id: 0,
        category: 'Java进阶',
        img: 'http://localhost:8080/image/random/img_25.jpg',
        title: '深入了解Java多线程',
        subtitle: '简介\n' +
          '\n' +
          'Java 提供了多种线程之间通信的机制，其中最基本的就是使用同步 (synchronization)\n' +
          '\n' +
          '其使用监视器 (monitor) 来实现。java中的每个对象都关联了一个监视器，线程可以对其进行加锁和解锁操作。\n' +
          '\n' +
          '在同一时间，只有一个线程可以拿到对象上的监视器锁。如果其他线程在锁被占用期间试图去获取锁，那么将会被阻塞直到成功获取到锁。同时，监视器锁可以重入，也就是说如果线程 t 拿到了锁，那么线程 t 可以在解锁之前重复获取锁,每次解锁操作会反转一次加锁产生的效果。',
        time: '2019年05月10日',
        views: 0
      }
    }
  },
  computed: {
    img () {
      return window.BASE_API + this.article.img
    }
  },
  props: {
    article: Object
  }
}
</script>
<style scoped>
.article-container{
  padding: 15px 20px;
  background-color: white;
  overflow: hidden;
  border: 1px solid #DDD;
  margin-bottom: 15px;
}
.classC .article-container{
  background-color: #322F42;
  border: 1px solid #322F42;
}
.left-container{
  position: relative;
}
.category{
  position: absolute;
  top:0;
  left:0;
  color:white;
  background-color:#DC4647;
  font-size: 14px;
}
img{
  height: 150px;
  width: 175px;
}
.right-container{
  overflow: hidden;
  height: 150px;
  text-align: left;
  padding-left: 15px;
  position: relative;
  display: block;
}
.title{
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 15px;
}
.title:hover{
  cursor: pointer;
}
.subtitle{
  /*padding: 10px 0;*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  line-height: 20px;
}
.information{
  position: absolute;
  bottom: 0;
  font-size: 15px;
  width:100%;
}
.button{
  float: right;
  color:white;
  background-color: #388797;
  padding: 5px;
  margin-right: 20px;
}
.classC .button{
  color: #409EFF;
}
.button:hover{
  cursor: pointer;
  background-color: #3D93A4;
}
</style>
