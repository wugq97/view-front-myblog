<template>
  <div class="file-container">
    <div class="file-top">
      <router-link :to="{path: '/'}" class="left index">首页</router-link>
      <div class="right" style="line-height: 27px;">
        <span>{{ this.role.username }}</span>
      </div>
    </div>
    <div class="file-main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="公共空间" name="public">
          <upload :files="publicFiles" :flag="publicFlag" :uid="role.id"></upload>
        </el-tab-pane>
        <el-tab-pane label="私人空间" name="private">
          <upload :files="privateFiles" :flag="privateFlag" :uid="role.id"></upload>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getPublicFiles, getPrivateFiles } from '@/api/upload'
import Upload from './upload'
export default {
  data () {
    return {
      activeName: 'public',
      publicFlag: 0,
      privateFlag: 1,
      publicFiles: [],
      privateFiles: []
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  components: {
    Upload
  },
  mounted () {
    this.query()
  },
  watch: {
    'role.id' (value) {
      this.queryPrivate()
    }
  },
  async created () {
    if (!getToken()) {
      this.$message({
        message: '请登录！',
        type: 'warning'
      })
      this.$router.push({path: '/'})
    } else {
      if (!this.role) {
        await this.$store.dispatch('GetInfo')
      }
    }
  },
  methods: {
    query () {
      this.queryPublic()
      this.queryPrivate()
    },
    queryPublic () {
      getPublicFiles().then(res => {
        this.publicFiles = res.data
      })
    },
    queryPrivate () {
      if (this.role) {
        getPrivateFiles(this.role.id).then(res => {
          this.privateFiles = res.data
        })
      }
    }
  }
}
</script>
<style scoped>
.file-container{
  background-color: #F3F6F7;
  min-height: 100%;
  padding-bottom: 20px;
}
.file-top{
  padding: 5px 5px;
  width: 80%;
  margin: 0 auto;
}
.index{
  margin-top:5px;
}
.index:hover{
  cursor: pointer;
  color:#2E8799;
}
.upload-text{
  margin-right: 50px;
}
.upload-text:hover{
  cursor: pointer;
  color:#2E8799;
}
.file-main{
  width:80%;
  margin: 25px auto 0 auto;
  background-color: white;
  border:1px solid #DDD;
  padding: 10px 10px;
  min-height: 575px;
}
</style>
