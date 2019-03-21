<template>
  <div class="members_dad">
    <div class="members_head">添加会员卡:</div>
    <!--添加会员的input框-->
    <div class="members_in">
      <div class="in_one"><div class="one_word">会员卡面额:</div>&nbsp;&nbsp;<el-input v-model="denomination" placeholder="请输入会员卡金额">元</el-input></div>
      <div class="in_two"><div class="two_word">会员支付金额:</div><el-input v-model="payment_amount" placeholder="请输入会员卡金额">元</el-input></div>
      <el-button type="primary" class="two_btn" @click="addCardList()">添加</el-button>
    </div>
    <!--添加会员的input框结束-->
    <!--列表-->
    <el-table :data="CardList" style="width: 100%" class="members_table" border>
      <el-table-column prop="id" label="会员卡ID" min-width="10%" align="center"/>
      <el-table-column prop="denomination" label="会员卡金额" min-width="10%" align="center"/>
      <el-table-column prop="payment_amount" label="支付金额" min-width="10%" align="center"/>
      <el-table-column prop="status" label="状态" min-width="10%" align="center">
        <template slot-scope="props">
          <span v-if="props.row.status===0" style="color:#f56c6c;">禁用</span>
          <span v-if="props.row.status===1" style="color:#67c23a;">启用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="10%">
        <template slot-scope="props">
          <el-button v-if="props.row.status===1" size="mini" type="danger" @click="handleEdit(props.row)">
            禁用
          </el-button>
          <el-button v-if="props.row.status===0" size="mini" type="success" @click="handleEdit(props.row)">
            启用
          </el-button>
          <el-button size="mini" type="info" @click="handleDelete(props.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--列表结束-->
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
import { GetValCardList, chanagecardlist, DelCardlist, addCardlist } from '@/api/vipseeting'

export default{
  data() {
    return {
      CardList: [
        {
          id: '', // 储值卡ID
          status: '', // 储值卡状态
          denomination: '', // 储值卡金额
          payment_amount: '' // 储值卡使用金额
        }
      ],
      denomination: '', // 会员卡面额
      payment_amount: '', // 实际支付金额
      total: 0, // 获取列表数据的长度
      pagesize: 0, // 每页的数据列表
      currentPage: 1 // 默认开始页面
    }
  },
  created() {
    this.getcardList()
  },
  methods: {
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.getcardList()
    },
    // 启用禁用
    async handleEdit(row) {
      if (row.status === 0) {
        row.status = 1
      } else if (row.status === 1) {
        row.status = 0
      }
      const status = row.status
      const id = row.id
      try {
        const res = await chanagecardlist(id, status)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除储值卡
    async handleDelete(row) {
      const id = row.id
      try {
        const res = await DelCardlist(id)
        if (res.status === 204) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        this.getcardList()
      } catch (err) {
        this.$message({
          type: 'warning',
          message: '异常信息'
        })
      }
    },
    // 储值卡列表
    async getcardList() {
      try {
        const res = await GetValCardList(this.currentPage)
        this.CardList = res.data
        this.total = res.meta.pagination.total
        this.pagesize = res.meta.pagination.per_page
      } catch (err) {
        this.$message({
          type: 'warning',
          message: '异常信息'
        })
      }
    },
    // 添加储值卡
    async addCardList() {
      const denomination = this.denomination
      const payment_amount = this.payment_amount
      try {
        const res = await addCardlist(denomination, payment_amount)
        this.denomination = ''
        this.payment_amount = ''
        if (res.status === 201) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
        this.getcardList()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
  /*整个盒子*/
  .members_dad{
    padding: 50px 50px 0 30px;
  }
  /*头部名称*/
  .members_head{
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 40px;
  }
  /*input框*/
  .members_in{
    font-size: 15px;
    display: flex;
    flex-direction: row;
  }
  .in_one{
     margin-right:50px;
  }
  el-input{
    width: 15%;
  }
  .in_one{
    display: flex;
    flex-direction: row;
  }
  .in_two{
    display: flex;
    flex-direction: row;
  }
  .one_word{
    width: 125px;
    height: 40px;
    line-height: 40px;
  }
  .two_word{
    width: 155px;
    height: 40px;
    line-height: 40px;
  }
  .two_btn{
    margin-left: 40px;
  }
  .members_table{
    margin-top: 50px;
  }
    /* 分页设置 */
  .block{
    text-align: center;
    margin-top: 20px;
    margin-right: 144px;
  }
</style>
