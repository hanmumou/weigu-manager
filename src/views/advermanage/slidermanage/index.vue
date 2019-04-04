<template>
  <div class="app-container">
    <div class="sllidermanage">
      <div class="userdefined-btn">
        <el-button type="primary" class="slidermanage-btn" @click="add">添加轮播图<i class="el-icon-circle-plus-outline"/></el-button>
      </div>
      <div class="userdefined-tabel">
        <el-table :row-class-name="tableRoWClassName" :data="tableData" border style="width: 100%">
          <el-table-column prop="id" align="center" label="轮播图id"/>
          <el-table-column align="center" prop="name" label="轮播图图片">
            <template slot-scope="scope">
              <img :src="scope.row.banner_img" width="100px" height="100px">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="上传时间"/>
          <el-table-column align="center" prop="link_address" label="显示状态">
            <template slot-scope="scope">
              <div v-if="scope.row.link_address">
                <span>已链接</span>
              </div>
              <div v-else>
                <span>未链接</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editBanner(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteBaner(scope.$index, scope.row);">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          :total="total"
          :pager-count="5"
          :page-size="pagesize"
          background
          layout="prev, pager, next"
          @current-change="current_change"/>
      </div>
      <!-- 分页结束 -->
      <!-- 添加轮播弹窗 -->
      <el-dialog :visible.sync="addadvertising" title="添加轮播图" class="addadvertising-dialog" center width="40%">
        <el-form :model="bannerForm" label-width="180px">
          <el-form-item label="上传轮播图主图：">
            <el-upload :show-file-list="false" :data="banner" :headers="GetToken()" :on-success="addBanner" :before-upload="addBefore" class="avatar-uploader" action="https://community.suokekj.com/api/images/upload">
              <img v-if="bannerForm.banner_img" :src="bannerForm.banner_img" class="avatar" width="100px" height="100px">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="tips">图片大小控制在2M以内，宽686*高300象素</div>
          </el-form-item>
          <el-form-item label="链接类别：" >
            <el-radio v-model="bannerForm.type" label="1">产品</el-radio>
            <el-radio v-model="bannerForm.type" label="2">自定义广告</el-radio>
          </el-form-item>
          <el-form-item label="选择链接：" >
            <el-select v-model="bannerForm.link_address" placeholder="请选择你要跳转的链接">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitBanner(bannerForm)">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { banner, delBanner, addBanner, goodsList } from '@/api/slidermanage'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      tableData: [],
      addadvertising: false,
      bannerForm: {
        type: '1',
        banner_img: '',
        link_address: ''
      },
      headers: { // 图片请求头部
        Authorization: ''
      },
      banner: {
        dirname: 'companies',
        images: ''
      },
      options: [{
        value: '',
        label: ''
      }],
      total: 0, // 获取列表数据的长度
      pagesize: 15, // 每页的数据列表
      currentPage: 1 // 默认开始页面
    }
  },
  mounted: function() {
    this.getBanner()
  },
  methods: {
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.getBanner()
    },
    // 隔行变色
    tableRoWClassName({ row, rowIndex }) {
      if ((rowIndex % 2) === 1) {
        return 'success-row'
      } else if ((rowIndex % 2) === 0) {
        return 'warning-row'
      }
    },
    // 获取轮播图列表
    async getBanner() {
      try {
        const res = await banner(this.currentPage)
        this.tableData = res.data
        console.log('h', this.tableData)
        this.total = res.meta.pagination.total
        this.pagesize = res.meta.pagination.per_page
      } catch (err) {
        console.log(err)
      }
    },
    // 添加路径到imageUrl之前
    addBefore(res) {
      this.banner['images'] = res
    },
    // 添加路径到ImageUrl中
    addBanner(res) {
      this.bannerForm.banner_img = res.path
    },
    // 图片上传获取到token
    GetToken() {
      const res = getToken()
      this.headers.Authorization = 'Bearer ' + res
      return this.headers
    },
    // 编辑轮播图
    async editBanner(index, row) {
      this.addadvertising = true
      this.bannerForm = row
      this.bannerForm.type = row.type + ''

      let readyNum = ''
      readyNum = row.link_address
      console.log(readyNum)
      this.bannerForm.link_address = Number(readyNum)

      try {
        const res = await goodsList()
        this.options = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 删除轮播图
    async deleteBaner(index, row) {
      try {
        await delBanner(row.id)
        this.getBanner()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 添加轮播图
    async add() {
      this.addadvertising = true
      this.bannerForm = {
        type: '1',
        banner_img: '',
        value: ''
      }
      try {
        const res = await goodsList()
        this.options = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 新增或编辑提交
    async submitBanner(val) {
      console.log(val)
      val.status = 0
      try {
        const res = await addBanner(val)

        this.$message({
          message: '提交成功',
          type: 'success'
        })
        // this.$router.go(0)
      } catch (err) {
        console.log(err)
        // if (this.bannerForm.banner_img == '') {
        //   this.$message({
        //     message: `${err.response.data.errors.banner_img}`
        //   })
        // } else {
        //   this.$message({
        //     message: `${err.response.data.errors.link_address}`
        //   })
        // }
      }
    }
  }
}
</script>

<style>
/* 容器 */
.sllidermanage{
 width: 100%;
}
/* btn设置 */
.slidermanage-btn{
    margin-top: 40px;
  margin-left: 10px;
  width:10rem;
  height: 3.4rem;
  line-height: 1.7rem;
  font-size: 1.2em;
  margin-bottom: 20px;
}
/* 控制i大小 */
.slidermanage i{
  width: 33px;
  height: 33px;
}
/* 弹窗标题 */
.addadvertising-dialog .el-dialog__header{
  background-color: rgb(48, 65, 86);
}
/* 标题颜色 */
.addadvertising-dialog .el-dialog__header .el-dialog__title{
  color: #ffffff;
}
/* input 宽度 */
.addadvertising-dialog .el-dialog__body .el-form-item__content{
  width: 315px;
}
/* 图片上传 */
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
  .tips{
    font-size: 14px;
    color: #999999;
  }
  /* 分页设置 */
.block{
  text-align: center;
  margin-top: 20px;
  margin-right: 144px;
}
</style>
