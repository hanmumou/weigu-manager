<template>
  <div class="app-container">
    <!-- 权限管理页面总容器 -->
    <div class="promotionvip-container">
      <!-- 添加和搜索的容器 -->
      <div class="addAndSearch">
        <el-row class="addrow">
          <el-col :span="4" class="add_management">
            <!-- 添加按钮 -->
            <el-button type="primary" @click="addpreferential()">添加优惠券 <i class="el-icon-circle-plus-outline"/></el-button>
          </el-col>
          <!-- 搜索查询 -->

          <el-form ref="checkForm" :model="checkForm" :inline="true">

            <el-form-item label="优惠券ID：">
              <el-input v-model="checkForm.id" placeholder="请输入优惠券编号" />
            </el-form-item>

            <el-form-item label="优惠券名：">
              <el-input v-model="checkForm.name" placeholder="请输入优惠券姓名" />
            </el-form-item>

            <el-form-item label="能否与储值卡同时用："/>
            <el-select v-model="checkForm.is_value_card" placeholder="全部">
              <el-option value="" label="全部"/>
              <el-option value="1" label="是"/>
              <el-option value="0" label="否"/>
            </el-select>
            <div class="promotio-enter">
              <!-- 管理员账号查询 -->
              <el-form-item label="开始日期：">
                <el-date-picker
                  v-model="checkForm.startime_at"
                  type="date"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-d"
                  placeholder="请输入订单开始时间"/>
              </el-form-item>
              <el-date-picker
                v-model="checkForm.endtime_at"
                type="date"
                format="yyyy-MM-d"
                value-format="yyyy-MM-d"
                placeholder="请输入订单结束时间"/>
              <el-form-item label="消费状态：">
                <el-select v-model="checkForm.status" placeholder="全部">
                  <el-option value="" label="全部"/>
                  <el-option value="0" label="禁止"/>
                  <el-option value="1" label="启用"/>
                </el-select>
                <el-button type="primary" @click="searchproList()">搜索</el-button>
                <el-button type="text" style="margin-left:10px;">清除搜索记录</el-button>
              </el-form-item>
          </div></el-form>
          <!-- 查询表单结束 -->

      </el-row></div>

      <!-- 数据表单 -->
      <el-table
        :data="promotionlist"
        class="rootTable"
        style="width: 100%">
        <el-table-column align="center" prop="id" label="优惠券ID" />
        <el-table-column align="center" prop="name" label="优惠券名称" />
        <el-table-column align="center" prop="minimum_consumption" label="最低消费" />
        <el-table-column align="center" prop="exemption_amount" label="减免金额" />
        <el-table-column align="center" prop="startime_at" label="开始时间" />
        <el-table-column align="center" prop="endtime_at" label="结束时间" />
        <el-table-column align="center" prop="num" label="总数量" />
        <el-table-column align="center" prop="num" label="剩余数量" />
        <el-table-column align="center" label="能否与储值卡同用">
          <template slot-scope="props">
            <span v-if="props.row.is_value_card===0" style="color:#f56c6c;">否</span>
            <span v-if="props.row.is_value_card===1" style="color:#67c23a;">是</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="props">
            <span v-if="props.row.status===0" style="color:#f56c6c;">禁用中</span>
            <span v-if="props.row.status===1" style="color:#67c23a;">启用中</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="props">
            <el-button v-if="props.row.status===0" type="success" size="small" @click="chanageStatus(props.row)">启用</el-button>
            <el-button v-if="props.row.status===1" type="danger" size="small" @click="chanageStatus(props.row)">禁用</el-button>
            <el-button type="info" size="small" @click="delpromotion(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <el-dialog
        :visible.sync="addRoot"
        :close-on-click-modal="false"
        title="添加优惠券"
        width="56%"
        class="addyhq"
        center>
        <!-- 表单数据 -->
        <el-form
          ref="addRootForm"
          :model="addRootForm"
          :inline="true"
          class="">
          <!-- 表单数据第一行 -->
          <el-row>
            <el-col :span="24">
              <el-form-item
                :rules="[
                  { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
                ]"
                prop="name"
                label="优惠券名称：">
                <el-input v-model="addRootForm.name" placeholder="请输入优惠券名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                :rules="[
                  { required: true, message: '最低消费不能为空', trigger: 'blur' }
                ]"
                prop="minimum_consumption"
                label="最低消费金额：">
                <el-input v-model="addRootForm.minimum_consumption" placeholder="请入输最低消费金额"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                :rules="[
                  { required: true, message: '免减金额不能为空', trigger: 'blur' }
                ]"
                prop="exemption_amount"
                label="免减金额：">
                <el-input v-model="addRootForm.exemption_amount" placeholder="请入输免减金额"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                :rules="[
                  { required: true, message: '优惠券数量不能为空', trigger: 'blur' }
                ]"
                prop="num"
                label="优惠券数量：">
                <el-input v-model="addRootForm.num" placeholder="请入输数量"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                :rules="[
                  { required: true, message: '开始日期不能为空', trigger: 'blur' }
                ]"
                prop="startime_at"
                label="请输入开始时间：">
                <el-date-picker
                  v-model="addRootForm.startime_at"
                  type="date"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-d"
                  placeholder="开始日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                :rules="[
                  { required: true, message: '结束日期不能为空', trigger: 'blur' }
                ]"
                prop="endtime_at"
                label="请输入结束时间：">
                <el-date-picker
                  v-model="addRootForm.endtime_at"
                  type="date"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-d"
                  placeholder="结束日期"/>
              </el-form-item>
            </el-col>
            <!--<el-col :span="24" class="promdilog-radio">
              <el-form-item
                :rules="[
                  { required: true, message: '选项不能为空', trigger: 'blur' }
                ]"
                prop="is_value_card"
                label="能否与储值卡同用："/>
              <el-radio v-model="addRootForm.is_value_card" label="1">能</el-radio>
              <el-radio v-model="addRootForm.is_value_card" label="0">不能</el-radio>
            </el-col>-->
            <!--<el-col :span="24" class="promdilog-radio">
              <el-form-item
                :rules="[
                  { required: true, message: '选项不能为空', trigger: 'blur' }
                ]"
                prop="is_integral"
                label="能否与运动积分同用："/>
              <el-radio v-model="addRootForm.is_integral" label="1">能</el-radio>
              <el-radio v-model="addRootForm.is_integral" label="0">不能</el-radio>
            </el-col>-->
          </el-row>
          <el-button type="primary" class="promdilog-btn" @click="addpromotionlist('addRootForm')">确认提交</el-button>
      </el-form></el-dialog>
    </div>
  </div>
</template>
<script>
import { getpromotionList, chanageStatus, AddProList, searchpro, delprolist } from '@/api/promotionvip'

export default {
  data() {
    return {
      provinces: '', // 省份选择
      city: '', // 城市选择
      area: '', // 区域选择
      addRoot: false, //
      checkForm: {
        id: '', // 优惠券ID
        name: '', // 优惠券名
        is_value_card: '', // 能否和储蓄卡同时使用
        startime_at: '', // 开始日期
        endtime_at: '', // 结束日期
        status: '' // 优惠券状态
      },
      addRootForm: [{
        name: '', // 名字
        minimum_consumption: '', // 最低消费金额
        exemption_amount: '', // 免减金额
        num: '', // 数量
        startime_at: '', // 开始日期
        endtime_at: '', // 结束日期
        is_value_card: '', // 是否能和储蓄卡同时使用
        is_integral: '' // 是否能和运动积分同时使用
      }],
      promotionlist: [{
        id: '', // ID
        name: '', // 姓名
        minimum_consumption: '', // 最低消费金额
        exemption_amount: '', // 免减金额
        num: '', // 数量
        startime_at: '', // 开始时间
        endtime_at: '', // 结束时间
        is_value_card: '', // 是否能和储蓄卡一起用
        is_integral: '', // 是否能和运动积分一起用
        status: '', // 状态
        created_at: '', // 注册时间
        updated_at: '' // 更新时间
      }],
      total: 0, // 获取列表数据的长度
      pagesize: 0, // 每页的数据列表
      currentPage: 1 // 默认开始页面
    }
  },
  created() {
    this.getprolist()
  },
  methods: {
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.getprolist()
    },
    // 点击添加优惠券发生的时间
    addpreferential() {
      this.addRoot = true
    },
    // 获取优惠券列表
    async getprolist() {
      try {
        const res = await getpromotionList(this.currentPage)
        this.promotionlist = res.data
        // console.log(res)
        this.total = res.meta.pagination.total
        this.pagesize = res.meta.pagination.per_page
      } catch (err) {
        console.log(err)
      }
    },
    // 更改启用禁用
    async chanageStatus(row) {
      if (row.status === 0) {
        row.status = 1
      } else if (row.status === 1) {
        row.status = 0
      }
      const id = row.id
      const status = row.status
      try {
        await chanageStatus(id, status)
        if (row.status === 0) {
          this.$message({
            message: '禁用成功',
            type: 'success'
          })
        } else if (row.status === 1) {
          this.$message({
            message: '启用成功',
            type: 'success'
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 添加优惠券验证
    async addpromotionlist(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addprolist()
          this.$refs[formName].resetFields()
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加优惠券
    async addprolist() {
      const name = this.addRootForm.name
      const minimum_consumption = this.addRootForm.minimum_consumption
      const exemption_amount = this.addRootForm.exemption_amount
      const num = this.addRootForm.num
      const startime_at = this.addRootForm.startime_at
      const endtime_at = this.addRootForm.endtime_at
      const is_value_card = this.addRootForm.is_value_card
      const is_integral = this.addRootForm.is_integral
      try {
        await AddProList(name, minimum_consumption, exemption_amount, num, startime_at, endtime_at, is_value_card, is_integral)
        this.addRoot = false
        this.getprolist()
      } catch (err) {
        console.log(err)
      }
    },
    // 查询优惠券列表
    async searchproList() {
      const id = this.checkForm.id
      const name = this.checkForm.name
      const is_value_card = this.checkForm.is_value_card
      const startime_at = this.checkForm.startime_at
      const endtime_at = this.checkForm.endtime_at
      const status = this.checkForm.status
      try {
        const res = await searchpro(id, name, is_value_card, startime_at, endtime_at, status)
        this.promotionlist = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 删除优惠券
    async delpromotion(row) {
      const id = row.id
      try {
        await delprolist(id)
        this.getprolist()
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
.promotio-enter{
  display: block;
  margin-left: 16.5%;
}
/* 添加优惠券弹窗头部整体样式设定 */
.promotionvip-container .addyhq .el-dialog__header{
  background:rgb(48, 65, 86);
}
/* 添加优惠券弹窗标题样式设定 */
.promotionvip-container .addyhq .el-dialog__title{
  color:#fff;
}
.promdilog-btn{
 margin-left: 200px;
}
.promdilog-radio .el-radio{
  margin-top: 15px;
}
/* 添加优惠券弹窗的label标签宽度调整 */
.promotionvip-container .addyhq .el-form-item__label{
  width:165px;
}
/* 添加查询容器的整体设定 */
.promotionvip-container .addAndSearch{
  width:100%;
  background:rgb(48, 65, 86);
}
/* 添加查询容器行的设定 */
.promotionvip-container .addAndSearch .addrow{
  width:100%;
  height:100%;
  padding: 22px;
}
/* 添加查询容器中的label的整体设定 */
.promotionvip-container .addAndSearch .addrow .el-form-item__label{
  color:#fff;
}
 /* 分页设置 */
  .block{
    text-align: center;
    margin-top: 20px;
    margin-right: 144px;
  }
</style>
