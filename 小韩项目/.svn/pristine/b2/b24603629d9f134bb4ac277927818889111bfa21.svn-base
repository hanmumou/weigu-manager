<template>
  <div class="app-container">
    <div class="userdefined-conter">
      <div class="userdefined-btn">
        <el-button type="primary" class="userdefined-addadvertisting" @click="addadvertising =true;advertisingmsg()">添加广告<i class="el-icon-circle-plus-outline"/></el-button>
      </div>
      <div class="userdefined-tabel">
        <el-table
          :data="advlists"
          :row-class-name="tableRoWClassName"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="广告id"/>
          <el-table-column
            align="center"
            prop="title"
            label="广告标题"/>
          <el-table-column
            align="center"
            prop="updated_at"
            label="上传时间"/>
          <el-table-column
            align="center"
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status==true">
                已链接
              </div>
              <div v-if="scope.row.status==false">
                未链接
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="props">
              <el-button size="mini" @click="deleteEdit(props.row)">删除</el-button>
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
      <!-- 添加广告弹窗 -->
      <el-dialog
        :visible.sync="addadvertising"
        :close-on-click-modal="false"
        :model="advlists"
        title="添加广告"
        class="addadvertising-dialog"
        center
        width="50%">
        <el-form align="center">
          <el-form-item
            label="广告标题："
            width="30%">
            <el-input v-model="title" placeholder="请输入广告标题"/>
          </el-form-item>
          <el-form-item class="userdefined">
            <tinymce v-model="content"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addEdit();">确认提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import tinymce from '@/components/tinymce'
import { delAdverList, addAdverlist } from '@/api/userdefined'
import { advertising } from '@/api/advertising'
export default {
  components: { tinymce },
  data() {
    return {
      // 富文本编辑器
      content: '',
      img_url: '',
      title: '',
      status: 0,
      details: '',
      advlists: [{
        id: '',
        img_url: '',
        title: '',
        updated_at: '',
        status: ''
      }],
      addadvertising: false,
      total: 0, // 获取列表数据的长度
      pagesize: 200, // 每页的数据列表
      currentPage: 1 // 默认开始页面
    }
  },
  // 钩子函数
  // 创建自定义广告的列表
  created() {
    this.advlist()
  },
  methods: {
    // 点击删除message提示
    delmsg() {
      this.$message('删除成功')
    },
    // 点击添加广告内容清空
    advertisingmsg() {
      this.title = ''
      this.content = ''
    },
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.advlist(this.currentPage)
    },
    // 隔行变色
    tableRoWClassName({ row, rowIndex }) {
      if ((rowIndex % 2) === 1) {
        return 'success-row'
      } else if ((rowIndex % 2) === 0) {
        return 'warning-row'
      }
    },
    async advlist() {
      try {
        const res = await advertising(this.currentPage)
        this.advlists = res.data
        this.total = res.meta.pagination.total
        this.pagesize = res.meta.pagination.per_page
      } catch (err) {
        console.log(err)
      }
    },
    // 点击编辑按钮
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 点击删除按钮删除自定义广告
    async deleteEdit(row) {
      const id = row.id
      try {
        await delAdverList(id)
        this.advlist()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (err) {
        console.log('错误信息', err)
      }
    },
    // 添加广告
    async addEdit() {
      try {
        const res = await addAdverlist(this.img_url, this.title, this.status, this.content)
        console.log('res', res)
        this.addadvertising = false
        this.currentPage = 1
        if (res.status === 201) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          // this.advlist()
        }
        this.content = ''
      } catch (err) {
        console.log('错误信息', err)
        // if (this.content === '') {
        //   this.$message({
        //     message: `${err.response.data.errors.details}`,
        //     type: 'info'
        //   })
        // } else {
        //   this.$message({
        //     message: `${err.response.data.errors.title}`,
        //     type: 'info'
        //   })
        // }
      }
    }
  }
}
</script>

<style>
/* 容器 */
.userdefined-btn{
  width: 100%;
  height: 122px;
  background-color: rgb(48, 65, 86);
}
/* btn设置 */
.userdefined-addadvertisting{
  margin-top: 40px;
  margin-left: 10px;
  width:10rem;
  height: 3.4rem;
  line-height: 1.7rem;
  font-size: 1.2em;
  margin-bottom: 20px;
}
/* 控制i大小 */
.userdefined-addadvertisting i{
  width: 22px;
  height: 22px;
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
  width: 100%;
}
.userdefined .el-form-item__content .tinymce-container {
  width: 700px;
  margin:0 auto;
}
.gg_tupian{
  width: 100px;
  height: 100px;
}
 /* 分页设置 */
  .block{
    text-align: center;
    margin-top: 20px;
    margin-right: 144px;
  }
</style>
