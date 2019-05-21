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
          <el-row>
            <el-col :span="5" v-for="(file, index) in publicFiles" :key="index" style="margin-left:33px;margin-top:10px;">
              <el-card :body-style="{ padding: '9px' }" v-if="file.id">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="margin-top:10px;">
                  {{ file.name }}
                </div>
              </el-card>
              <!--<el-upload-->
                <!--v-else-->
                <!--style="margin-top:40px;"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--list-type="picture-card"-->
                <!--:before-upload="beforeUpload"-->
                <!--:on-success="handleSuccess">-->
                <!--<i class="el-icon-plus"></i>-->
              <!--</el-upload>-->
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="私人空间" name="private">
          私人空间
        </el-tab-pane>
        <el-tab-pane label="上传情况" name="upload">
          <uploader ref="uploader" :options="options" :fileStatusText="fileStatusText" class="uploader-example"
             @file-complete="fileComplete" @complete="complete">
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
              <p>拖曳文件上传</p>
              <uploader-btn>选择文件</uploader-btn>
            </uploader-drop>
            <uploader-list></uploader-list>
          </uploader>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { merge } from '@/api/upload'
export default {
  data () {
    return {
      currentDate: new Date(),
      activeName: 'public',
      publicFiles: [
        {
          id: 1,
          name: 'test',
          img: ''
        },
        {
          id: 0,
          name: '123456',
          img: ''
        }
      ],
      privateFiles: [],
      options: {
        target: window.BASE_API + 'upload/chunk',
        simultaneousUploads: 1,
        chunkSize: 10 * 1024 * 1024,
        maxChunkRetries: 2
      },
      fileStatusText: {
        success: '成功了',
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      }
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  mounted () {

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
    complete () {
      console.log('complete', arguments)
    },
    fileComplete () {
      console.log('file complete', arguments)
      const file = arguments[0].file
      merge(file.name, arguments[0].uniqueIdentifier, file.size, file.type).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    query () {}
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
.image {
  width: 200px;
  height:200px;
  display: block;
}
.uploader-example {
  width: 920px;
  padding: 15px;
  margin: 20px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
