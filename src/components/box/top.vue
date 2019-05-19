<template>
  <div class="t">
    <span class="el-icon-menu icon"></span>
    <span class="toptitle">{{ title }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style scoped>
.t{
  background-color: #F8F8F8;
  border-bottom: 1px solid #DDD;
  height: 35px;
  line-height: 35px;
  position: relative;
  font-size: 17px;
  text-align: left;
}
.icon{
  display: inline-block;
  position: absolute;
  width: 40px;
  height: 100%;
  font-size: 20px;
  color: #2F889A;
  top: 7px;
  left: 9px;
}
.toptitle{
  display: inline-block;
  font-weight: bold;
  font-size: 15px;
  border-left: 1px solid #DDD;
  margin-left: 40px;
  padding-left:10px;
}
.classC .toptitle{
  border-left:1px solid #001528;
}
.classC .t{
  background-color: #312E41;
  border: #312E41;
  border-bottom: 1px solid #001528;
}
</style>
