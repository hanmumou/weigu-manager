<template>
  <div style="padding:30px;">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="类目名称" style="width:50%;">
        <el-input v-model="formData.name"/>
        <span style="color:#cccccc;">类目名称在1~20位字符(不能重复)</span>
      </el-form-item>
      <el-form-item label="置顶首页">
        <el-radio-group v-model="formData.radioValue">
          <el-radio label="是"/>
          <el-radio label="否"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级类目">
        <el-select v-model="treeId" placeholder="请选择上级类目">
          <el-option :label="treeName" :value="treeId">
            <el-tree
              :data="levelData"
              :props="defaultProps"
              :load="load"
              lazy
              @node-click="chooseTree"/>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用年限" style="width:50%;">
        <el-input v-model="formData.useTime"/>
      </el-form-item>
      <el-form-item label="排序" style="width:30%;">
        <el-input v-model="formData.ifSort"/>
      </el-form-item>
      <el-form-item label="最小价格" style="width:30%;">
        <el-input v-model="formData.lowPrice"/>
      </el-form-item>
      <el-form-item label="最大价格" style="width:30%;">
        <el-input v-model="formData.highPrice"/>
      </el-form-item>
      <el-form-item label="链接路径" style="width:50%;">
        <el-input v-model="formData.urlHttp"/>
      </el-form-item>
      <el-form-item label="活动形式" style="width:50%;">
        <el-input v-model="formData.content" type="textarea"/>
      </el-form-item>
      <el-form-item label="类目图标" style="width:30%;">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="http://newapi.qzlckj.com/api/upload/uploadFile/">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100px;height:100px;">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTableData, getTreeNode, summitInfo, getInfoByid, editClass } from '@/api/tabletree'
export default {
  data() {
    return {
      id:this.$route.query.id,
      treeId: '', // 选中节点的id
      treeName: '', // 选中节点的名称
      defaultProps: {
        label: 'name',
        children: 'name'
      },
      levelData: [], // 一级节点数据
      formData: {
        name: '',
        radioValue: '',
        useTime: '',
        ifSort: '',
        lowPrice: '',
        highPrice: '',
        urlHttp: '',
        content: ''
      },
      imageUrl: ''// 类目图标
    }
  },
  mounted() {
    this.getData()
    this.id = this.$route.query.id
    this.getDataById()
  },
  methods: {
    beforeAvatarUpload(file) {
      // console.log(file)
    },
    handleAvatarSuccess(res, file, filelist) {
      this.imageUrl = res
      console.log(res)
    },
    // 保存
    async submitForm() {
      if(this.formData.radioValue == '是'){
        this.formData.radioValue = 1
      }else if(this.formData.radioValue == '否'){
        this.formData.radioValue = 0
      }
      if(this.id){
        try{
          await editClass(this.id,this.treeId,this.formData.name,this.formData.content,this.formData.useTime,
            this.formData.radioValue,this.formData.lowPrice,this.formData.highPrice,this.formData.urlHttp,
            this.formData.ifSort,this.imageUrl).then(res => {
            this.$message.success('修改成功')
            this.$router.push('/tabletree')
          })
        }catch(err){
          console.log(err)
        }
      }else if(!this.id){
        try{
          await summitInfo(this.treeId,this.formData.name,this.formData.content,this.formData.useTime,
            this.formData.radioValue,this.formData.lowPrice,this.formData.highPrice,this.formData.urlHttp,
            this.formData.ifSort,this.imageUrl).then(res => {
            this.$message.success('操作成功')
          })
        }catch(err){
          console.log(err)
        }
      }
    },
    // 子节点被点击时
    chooseTree(data) {
      this.treeId = data.id
      this.treeName = data.name
    },
    // 加载数据
    async load(node, resolve) {
      const id = node.id
      // 获取子节点数据
      if (id) {
        try {
          await getTreeNode(id).then(res => {
            const treeData = res
            resolve(treeData)
          })
        } catch (err) {
          console.log(err)
        }
      }
    },
    // 获取数据
    async getData() {
      try {
        await getTableData().then(res => {
          this.levelData = res
        })
      } catch (err) {
        console.log(err)
      }
    },
    //根据id查询信息
    async getDataById(){
      if(this.id){
        try{
          await getInfoByid(this.id).then(res=>{
            console.log(res)
            let data = res
            this.formData.name = data.name
            this.formData.useTime = data.fixed
            this.formData.content = data.description
            this.formData.lowPrice = data.minval
            this.formData.highPrice = data.maxval
            this.formData.urlHttp = data.url
            if(data.top == 'N'){
              this.formData.radioValue = '否'
            }else if(data.top == 'Y'){
              this.formData.radioValue = '是'
            }
            this.imageUrl = data.icon
            this.treeId = data.pid
            this.treeName = data.pidName
            this.formData.ifSort = data.sortOrder
          })
        }catch(err){
          console.log(err)
        }
      }
    }
  }
}
</script>

<style>
  avatar-uploader .el-upload {
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
    font-size: 16px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  .el-select-dropdown__item{
    height:auto!important;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background:#fff !important;
  }
</style>
