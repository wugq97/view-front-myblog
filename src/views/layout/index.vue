<template>
  <div :class="{classA:classA,classB:classB,classC:classC}" >
    <div class="index">
      <header>
        <top-bar></top-bar>
      </header>
      <div class="main-container">
        <app-main/>
      </div>
    </div>
    <div class="main-bottom"></div>
  </div>
</template>
<script>
import { TopBar, AppMain } from '@/views/layout/components'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
      classA: true,
      classB: false,
      classC: false
    }
  },
  computed: {
    ...mapGetters(['style'])
  },
  mounted () {
    this.changeStyle(this.style)
  },
  watch: {
    style (value) {
      this.changeStyle(value)
    }
  },
  methods: {
    changeStyle (value) {
      this.classA = false
      this.classB = false
      this.classC = false
      if (value === 'classA') {
        this.classA = true
      } else if (value === 'classB') {
        this.classB = true
      } else {
        this.classC = true
      }
    }
  },
  components: {
    TopBar,
    AppMain
  }
}
</script>
<style scoped>
.classA, .classB{
  background-color: #F4F7F8;
  color: #2c3e50;
}
.classC{
  background-color: #0B0F33;
  color:#44628E;
}
.main-container{
  padding-top: 110px;
  width: 80%;
  margin: 0 auto;
}
.main-bottom{
  height:100px;
}
</style>
