<template>
  <div id="">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="img in list" :key="img.id">
          <div><router-link :to="{path:'/article/'+img.id}"><img :src="formatPath(img.img)"></router-link></div>
          <span class="name">{{ img.title }}</span>
        </div>
      </div>
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { Swiper } from 'vue-awesome-swiper'
import { getRecommend } from '@/api/home'
/* eslint-disable */
export default {
  data () {
    return {
      list: []
    }
  },
   mounted () {
     this.query()
  },
  methods: {
    query() {
      getRecommend().then(res => {
        this.list = res.data
        this.$nextTick(function () {
          var mySwiper = new Swiper('.swiper-container', {
            speed: 1000,
            loop: true,
            autoplay: {
              disableOnInteraction: false,
              delay: 2500
            },
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        })
      })
    },
    formatPath(src) {
      return window.BASE_API + src
    }
  }
}
</script>
<style scoped>
img{
  width:100%;
  height: 270px;
}
.swiper-container{
  position: relative;
}
.name{
  position: absolute;
  bottom: 30px;
  margin-left: -20px;
  color:white;
}
.swiper-pagination{
  position: absolute;
  bottom: 10px;
  color:white;
}
</style>
