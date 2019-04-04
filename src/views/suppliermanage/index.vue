<template>
  <div class="app-container">
    <el-main class="suppliermanage" >
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名"
          align="center"
          width="180"/>
        <el-table-column
          prop="phone"
          label="电话"
          align="center"
          width="180"/>
        <el-table-column
          prop="product_introduce"
          align="center"
          label="产品简介"/>
        <el-table-column align="center" label="代理商信息">
          <template slot-scope="props">
            <el-button v-if="props.row.is_read===0" type="primary" size="small" @click="changeRead(props)">未读</el-button>
            <el-button v-if="props.row.is_read===1" type="danger" size="small">已读</el-button>
            <el-button v-if="props.row.is_read===2" type="primary" size="small">通过</el-button>
            <el-button type="primary" size="small" @click="delSupplier(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
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
  </div>
</template>
<script>
import { delsupplierList, getsupplierList } from '@/api/suppliermanage'
// import { try } from 'q';

export default {
  data() {
    return {
      tableData: [
        {
          id: '', // ID
          username: '', // 姓名
          phone: '', // 电话
          product_introduce: '', // 产品介绍
          is_read: '', // 状态
          created_at: '', // 注册时间
          updated_at: '' // 更新时间
        }
      ],
      total: 0, // 获取列表数据的长度
      pagesize: 0, // 每页的数据列表
      currentPage: 1 // 默认开始页面
    }
  },
  // 钩子函数
  created() {
    this.GetSupplierList()
  },
  methods: {
    //供应商信息由未读改成已读
   async changeRead(props){
          props.row.is_read = 1
    },
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.GetSupplierList()
    },
    // 获取供应商信息
    async GetSupplierList() {
      try {
        const res = await getsupplierList(this.currentPage)
        console.log(res)
        this.tableData = res.data
        this.total = res.meta.pagination.total
        this.pagesize = res.meta.pagination.per_page
      } catch (err) {
        console.log(err)
      }
    },
    // 删除供应商信息
    async delSupplier(row) {
      try {
        await delsupplierList(row.id)
        this.GetSupplierList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

  <style>
  .suppliermanage{
    margin: 0 auto;
  }
   /* 分页设置 */
  .block{
    text-align: center;
    margin-top: 20px;
    margin-right: 144px;
  }
  </style>
