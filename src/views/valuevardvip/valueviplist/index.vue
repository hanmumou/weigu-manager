<template>
  <div class="app-container">
    <el-tabs class="valueviplist-card" type="card">
      <el-tab-pane label="会员列表">
        <!-- 会员列表页面 -->
        <div class="vipcontent-list">
          <el-form :inline="true" class="demo-form-inline">
            <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
            <el-button class="select-all" @click="toggleviplist(tableData3)">全选表格</el-button>
            <div class="export">
              <el-button size="medium" type="primary" @click="exportExcel">导出会员列表</el-button>
            </div>
            <el-form-item label="会员ID：">
              <el-input placeholder="请输入会员ID"/>
            </el-form-item>
            <el-form-item label="会员名称：">
              <el-input placeholder="请输入会员名称"/>
            </el-form-item>
            <el-form-item label="会员电话">
              <el-input placeholder="请输入会员电话"/>
            </el-form-item>
            <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="充值日期"/>
            <el-form-item label="消费状态：">
              <el-select placeholder="全部" value="">
                <el-option label="全部" value=""/>
                <el-option label="消费总金额" value=""/>
                <el-option label="充值总金额" value=""/>
                <el-option label="剩余总金额" value=""/>
              </el-select>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 会员表格 -->
        <div>
          <el-table
            id="#exportexcel"  :data="tableData" fit  border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center"/>
            <el-table-column prop="id" label="会员ID" align="center"/>
            <el-table-column prop="username" label="姓名" align="center"/>
            <el-table-column prop="phone" align="center"  label="电话"/>
            <el-table-column prop="total_balance" align="center" label="充值总金额"p/>
            <el-table-column prop="community_value_card_info.payment_amount" align="center" label="消费总金额"/>
            <el-table-column prop="remaining_balance" align="center" label="剩余总金额" />
            <el-table-column prop="status" align="center" label="状态" >
            <template slot-scope="scope">
              <p v-if="!scope.row.status" type="primary" size="small">禁用</p>
              <p v-if="scope.row.status" type="danger" size="small" >正常</p>
            </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  width="250px">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.status" type="primary" size="mini" @click="changeStatus(scope.row)">启用</el-button>
                <el-button v-if="scope.row.status" type="danger" size="mini" @click="changeStatus(scope.row)">禁用</el-button>
                <el-button  type="primary" size="mini">详情</el-button>
                <el-button  type="primary" size="mini" @click="editVip(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteVip(scope.row)">删除</el-button>
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
      </el-tab-pane>
      <!--点击会员列表中的编辑  显示的modal框-->
      <div>
        <el-dialog title="编辑会员资料" :visible.sync="dialogFormVisible" width="30%">
          <el-form size="mini" label-width="100px">
            <el-form-item label="会员姓名" size="mini">
              <el-input style="width:200px;" v-model="vipname"></el-input>
            </el-form-item>
            <el-form-item label="会员手机号" size="mini">
              <el-input style="width:200px;" v-model="vipphone"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="subVipEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 会员列表结束 -->
      <el-tab-pane label="消费详情">
        <!-- 消费详情页面 -->
        <div class="vipconsume-title">
          <el-form :inline="true" class="demo-form-inline">
            <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
            <el-button class="select-all" @click="toggleSelection(tableData3)">全选表格</el-button>
            <div class="export">
              <el-button size="medium" type="primary" @click="exportExcel">导出会员列表</el-button>
            </div>
            <el-form-item label="会员ID：">
              <el-input/>
            </el-form-item>
            <el-form-item label="会员名称：">
              <el-input/>
            </el-form-item>
            <el-form-item label="会员电话">
              <el-input/>
            </el-form-item><br>
            <el-form-item label="选择产品：" class="vipconsume-select">
              <el-select placeholder="产品名称" value="">
                <el-option label="进口大菠萝" value=""/>
                <el-option label="好吃的山楂呦" value=""/>
              </el-select>
            </el-form-item>
            <el-date-picker
              type="date"
              format="yyyy-MM-d"
              value-format="yyyy-MM-d"
              placeholder="订单开始日期"/>
            <el-date-picker
              type="date"
              format="yyyy-MM-d"
              value-format="yyyy-MM-d"
              placeholder="订单结束日期"/>
            <el-button type="primary">查询</el-button>
          </el-form>
        </div>
        <!-- 消费详情表格 -->
        <el-table id="#exportexcel" ref="multipleTable" :xs="20" :data="tableData" :row-class-name="tableRoWClassName" class="vip-listtable" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"/>
          <el-table-column prop="name" label="会员ID" align="center"/>
          <el-table-column prop="name" label="姓名" align="center"/>
          <el-table-column prop="name" align="center" width="130" label="电话" show-overflow-tooltip/>
          <el-table-column prop="phone" align="center" width="130" label="产品名称" show-overflow-tooltip/>
          <el-table-column prop="address" align="center" label="规格" show-overflow-tooltip/>
          <el-table-column prop="address" align="center" label="数量" show-overflow-tooltip/>
          <el-table-column prop="phone" align="center" label="单价" show-overflow-tooltip/>
          <el-table-column prop="phone" align="center" label="合计" show-overflow-tooltip/>
          <el-table-column prop="phone" align="center" label="订单日期" show-overflow-tooltip/>
          <el-table-column prop="phone" align="center" label="使用会员卡" show-overflow-tooltip/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {getVipList, editVip} from '@/api/valueviplist'
export default {
  data() {
    return {
      vipname:'',
      vipphone:'',
      dialogFormVisible:false,
      tableData: [],
      multipleSelection: [],
      total: 0, // 获取列表数据的长度
      pagesize: 200, // 每页的数据列表
      currentPage: 1 // 默认开始页面
    }
  },
  mounted(){
    this.getviplist()
  },
  methods: {
    //会员列表删除会员
    async deleteVip(){

    },
    //会员列表  改变启用 禁用
    changeStatus:function(row){

    },
    //会员列表  修改姓名 手机号
    async subVipEdit(row){
      let id = row.id
      let username = this.vipname
      let phone = this.vipphone
      await editVip(id,username,phone).then(res=>{
          //渲染列表
        this.getviplist()
        this.$message('修改成功')
      })
    },
    //编辑会员列表
    editVip:function(row){
      this.dialogFormVisible = true
      this.vipname= row.username
      this.vipphone = row.phone
    },
    //默认获取会员列表信息
    async getviplist(){
       await getVipList().then(res=>{
          this.tableData = res.data
       })
    },
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    // 表格隔行显示不同颜色
    tableRoWClassName({ row, rowIndex }) {
      if ((rowIndex % 2) === 1) {
        return 'success-row'
      } else if ((rowIndex % 2) === 0) {
        return 'warning-row'
      }
    },
    // 会员列表的表格全选操作
    toggleviplist(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 消费详情的表格全选操作
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 导出Excel
    exportExcel() {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.getElementById('#exportexcel'))
      /* get binary string as output */
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '会员列表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    }
  }
}
</script>

<style>
/* 去除tab 标签边框 */
.valueviplist-card .el-tabs__header .el-tabs__nav{
  border: none;
}
/* tab标签活动选项 */
.valueviplist-card .el-tabs__item.is-active{
  background:#67c23a;
  color:#fff;
}
.valueviplist-card .el-tabs__item:hover{
  color:#ffffff;
}
/* tab标签初始化样式 */
.valueviplist-card .el-tabs__item{
  font-size: 0.8rem;
  width: 8.42rem;
  height: 2.76rem;
  text-align: center;
  line-height: 2.76rem;
  border-radius: 16px 16px 0px 0px;
  background-color: #676767;
  color: #fff;
  margin-right: 10px;
}
.export{
  display: inline;
}
/* 会员列表样式 */
.vipcontent-list{
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  /* padding:20px 20px 20px 10px; */
  background-color: rgb(48, 65, 86);
  box-sizing: border-box;
}
.vipcontent-list .el-form-item__label{
  color:#fff;
}
/* 会员列表页结束 */

/* 消费详情页开始 */

.vipconsume-title{
  background-color: rgb(48, 65, 86);
  padding: 20px;
  width: 100%;
}
.vipconsume-title .el-form-item__label{
  color:#fff;
}
.vipconsume-select{
  margin-left: 15.5%;
}
 /* 分页设置 */
  .block{
    text-align: center;
    margin-top: 20px;
    margin-right: 144px;
  }
</style>

