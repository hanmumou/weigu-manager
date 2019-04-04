<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog
      :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :data="dirname"
        :headers="headers"
        class="editor-slide-upload"
        action="https://community.suokekj.com/api/images/upload"
        list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      dirname: {
        dirname: 'articles',
        images: ''
      },
      headers: {
        Authorization: ''
      },
      imagesArray: [],
      fileArr:''
    }
  },
  mounted: function() {
    this.GetToken()
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 上传完之后向父组件传值
    handleSubmit() {
      // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }else{
        for(let i=0;i<this.fileArr.length;i++){
            this.imagesArray.push(this.fileArr[i].response.path)
        }
        this.$emit('successCBK', this.imagesArray)
        // 原数组置空 以及显示列表为空
        this.imagesArray = []
        this.listObj = {}
        this.fileList = []
        // 关闭dialog
        this.dialogVisible = false
      }
    },
    // 成功的钩子
    handleSuccess(response, file, fileList) {
      this.fileArr = fileList  //正确的顺序
    },
    // 移除钩子
    handleRemove(file) {
      const imgurl = file.response.path
      this.imagesArray.splice(imgurl, 1)
    },
    // 上传前钩子
    beforeUpload(file) {
      this.dirname['images'] = file
      //console.log(file)  正确的顺序
    },
    GetToken() {
      const res = getToken()
      this.headers.Authorization = 'Bearer ' + res
      return this.headers
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
