<template>
  <div class="introduction_dad">
    <div class="introduction_head">上传公司LOGO</div>
    <!--上传图片-->
    <div class="introduction_filebox">
      <el-upload
        :show-file-list="fileList"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="dirname"
        :headers="headers"
        class="avatar-uploader"
        action="https://community.suokekj.com/api/images/upload">
        <img v-if="imgUrl" :src="imgUrl" class="avatar">
        <i v-else class="el-icon-upload avatar-uploader-icon"/>
      </el-upload>
      <div slot="tip" class="introduction_word">图片大小控制在2M以内</div>
    </div>
    <!--上传图片结束-->
    <div class="introduction_title">公司名称:</div>
    <el-input v-model="name" placeholder="请输入公司名称" class="introduction_input"/>
    <div class="introduction_title">客服电话</div>
    <el-input v-model="phone" placeholder="请输入客服电话" class="introduction_input"/>
    <div class="introduction_title">公司地址:</div>
    <el-input v-model="address" placeholder="请输入公司所在地址" class="introduction_input"/>
    <div class="about-tinymce"> <tinymce ref="box" v-model="content" :height="200" /></div>
    <div class="introduction_btn"><el-button type="primary" class="btnn" @click="submit">确认提交</el-button></div>
  </div>
</template>
<script>
import tinymce from '@/components/tinymce'
import { getToken } from '@/utils/auth'
import { aboutgroup, aboutCompents, creataCompanise } from '@/api/aboutgroup'
export default{
  components: { tinymce },
  data() {
    return {
      messageError: '',
      differ: null,
      // 富文本的值
      content: '',
      imgUrl: '',
      name: '',
      phone: '',
      address: '',
      url: '@/assets',
      fileList: '',
      // 上传公司logo 所需要获取的值
      dirname: {
        dirname: 'articles',
        images: ''
      },
      headers: {
        Authorization: ''
      }
    }
  },
  mounted: function() {
    this.GetToken()
  },
  created: function() {
    this.getaboutgroup()
  },
  // 图片的一些操作
  methods: {
    // 公司logo 成功的钩子
    handleAvatarSuccess(res) {
      this.imgUrl = res.path
    },
    // 公司 logo 上传之前的钩子
    beforeAvatarUpload(file) {
      this.dirname['images'] = file
    },
    handelIncrease(step) {
      console.log('step', step)
    },
    // 提交公司弹窗
    aboutgroupmgbox() {
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    // 获取公司列表
    async getaboutgroup() {
      try {
        const id = localStorage.id
        const res = await aboutCompents(id)
        this.name = res.name
        this.imgUrl = res.logo
        this.phone = res.phone
        this.address = res.address
        this.content = res.introduce
        this.$refs.box.setContent(this.content)
        this.differ = true
      } catch (err) {
        console.log(err)
      }
    },
    // 创建公司
    async creatacompanise() {
      try {
        await creataCompanise(this.name, this.imgUrl, this.phone, this.address, this.content)
      } catch (err) {
        console.log(err)
      }
    },
    // 修改公司函数
    async submitcompanies() {
      const id = localStorage.id
      try {
        const res = await aboutgroup(id, this.name, this.imgUrl, this.phone, this.address, this.content)
        if (res.status === 200) {
          this.aboutgroupmgbox()
          this.differ = true
        }
      } catch (err) {
        // console.dir(err.response.data.errors)
        // eslint-disable-next-line no-unused-vars

        for (const i in err.response.data.errors) {
          this.messageError += err.response.data.errors[i] + '   '
        }
        this.$message({
          type: 'info',
          message: `${this.messageError}`
        })
        this.messageError = ''
      }
    },
    // 提交判断是修改还是添加
    submit() {
      if (this.differ) {
        this.submitcompanies()
      } else {
        this.creatacompanise()
      }
    },
    GetToken() {
      const res = getToken()
      this.headers.Authorization = 'Bearer ' + res
      return this.headers
    }
  }
}
</script>
<style>
  .about-tinymce{
    margin-top: 30px;
    width: 50%;
  }
  .introduction_dad{
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 40px 0 0 60px;
  }
  /*头部样式*/
  .introduction_head{
    margin: 16px 0;
  }
  /*图片的样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .introduction_word{
    margin: 10px 0 30px 0;
  }
  /*.el-icon-upload{*/
    /*width: 100%;*/
  /*}*/
  /*图片样式结束*/
  /*input框*/
  .introduction_title{
    font-size: 14px;
    margin: 40px 0 20px 0;
  }
  .introduction_input{
    width: 500px;
  }
  /*input框结束*/
  /*富文本*/

  /*富文本结束*/
  /*按钮*/
  .introduction_btn{
    width: 100%;
    margin-left: 25%;
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .btnn{
    width: 300px;
  }
  /*按钮结束*/
</style>
