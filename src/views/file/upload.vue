<template>
  <div>
    <div class="text" @click="dialogVisible = true">上传文件</div>
    <el-row>
      <el-col v-for="(file, index) in fileArray" :key="index" :span="3" style="margin-left:33px;margin-top:10px;">
        <el-card :body-style="{ padding: '5px' }">
          <img @dblclick="download(file.id)" src="../../assets/file.png" class="image">
          <div style="margin-top:10px;">
            {{ file.filename }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="flag === 0 ? '上传至公共空间' : '上传至私人空间'"
      :visible.sync="dialogVisible"
      width="75%">
      <span></span>
      <uploader ref="uploader" :options="options" :fileStatusText="fileStatusText" class="uploader"
                @file-complete="fileComplete" @complete="complete">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p>拖曳文件上传</p>
          <uploader-btn>选择文件</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </el-dialog>
  </div>
</template>
<script>
import { merge, getPrivateFiles } from '@/api/upload'
export default {
  props: {
    files: Array,
    flag: Number,
    uid: Number
  },
  data () {
    return {
      fileArray: [],
      dialogVisible: false,
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
  watch: {
    files (value) {
      this.fileArray = value
    }
  },
  methods: {
    download (fileId) {
      window.location.href = window.BASE_API + `download/${fileId}`
    },
    complete () {
      // console.log('complete', arguments)
    },
    fileComplete () {
      // console.log('file complete', arguments)
      const file = arguments[0].file
      const _this = this
      merge(this.uid, this.flag, file.name, arguments[0].uniqueIdentifier, file.size, file.type).then(function (response) {
        if (_this.flag === 1) {
          getPrivateFiles(_this.uid).then(res => {
            _this.fileArray = res.data
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
  .text{
    text-align: right;
    padding-right: 15px;
  }
  .text:hover{
    cursor: pointer;
    color:#2E8799;
  }
  .image {
    width: 120px;
    height:120px;
    display: block;
  }
  .image:hover{
    cursor: pointer;
  }
  .uploader {
    width: 920px;
    padding: 15px;
    margin: 20px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader .uploader-btn {
    margin-right: 4px;
  }
  .uploader .uploader-list {
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
