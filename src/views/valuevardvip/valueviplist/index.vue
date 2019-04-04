<template>
  <div class="app-container">
    <el-tabs class="valueviplist-card" type="card" @tab-click="changeTab" v-model="activeName">
      <el-tab-pane label="会员列表" name="1">
        <!-- 会员列表页面 -->
        <div class="vipcontent-list">
          <el-form :inline="true" class="demo-form-inline">
            <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
            <!--<el-button class="select-all" @click="toggleSelection(tableData)">全选表格</el-button>-->
            <div class="export">
              <el-button size="medium" type="primary" @click="exportVipExcel">导出会员列表</el-button>
            </div>
            <el-form-item label="会员ID：">
              <el-input placeholder="请输入会员ID" v-model="vipid"/>
            </el-form-item>
            <el-form-item label="会员名称：">
              <el-input placeholder="请输入会员名称" v-model="username"/>
            </el-form-item>
            <el-form-item label="会员电话">
              <el-input placeholder="请输入会员电话" v-model="phone"/>
            </el-form-item>
            <!--<el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="充值日期" v-model="vipdate"/>-->
            <el-button type="primary" @click="searchVip">查询</el-button>
          </el-form>
        </div>
        <!-- 会员表格 -->
        <div>
          <el-table
            id="#exportexcel"  ref="multipleTable" :data="tableData" fit  border style="width: 100%" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" align="center"/>-->
            <el-table-column prop="id" label="会员ID" align="center"/>
            <el-table-column prop="value_card_buy_record[0].username" label="姓名" align="center"/>
            <el-table-column prop="value_card_buy_record[0].phone" align="center"  label="电话"/>
            <el-table-column prop="total_buy_balance" align="center" label="充值总金额"p/>
            <el-table-column prop="total_use_balance" align="center" label="消费总金额"/>
            <el-table-column prop="balance" align="center" label="剩余总金额" />
            <el-table-column prop="is_member" align="center" label="状态" >
            </el-table-column>
            <el-table-column label="操作" align="center"  width="300px">
              <template slot-scope="scope">
                <el-button v-if="scope.row.is_member != '已启用'" type="primary" size="mini" @click="changeStatus(scope.row)">启用</el-button>
                <el-button v-if="scope.row.is_member == '已启用'" type="danger" size="mini" @click="changeStatus(scope.row)">禁用</el-button>
                <el-button  type="primary" size="mini" @click="seeVipDetail(scope.row)">详情</el-button>
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
      <!--点击详情 查看该会员充值记录-->
      <div>
        <el-dialog title="会员充值记录" :visible.sync="record" width="30%">
          <el-table :data="recordData" style="width: 100%" size="mini">
            <el-table-column prop="value_card_blance.created_at" label="充值日期" ></el-table-column>
            <el-table-column prop="value_card_info.denomination" label="充值金额"></el-table-column>
            <el-table-column prop="value_card_blance.previous_balance" label="上次余额"></el-table-column>
            <el-table-column prop="value_card_blance.current_balance" label="当前余额"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="record = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 会员列表结束 消费详情页面-->
      <el-tab-pane label="消费详情" name="2">
        <!-- 消费详情页面 -->
        <div class="vipconsume-title">
          <el-form :inline="true" class="demo-form-inline">
            <!--<el-button class="select-all">全选表格</el-button>-->
            <div class="export">
              <el-button size="medium" type="primary" @click="exportCostDetail">导出消费详情</el-button>
            </div>
            <el-form-item label="会员ID：">
              <el-input placeholder="会员id" style="width:80px;" v-model="vipid"/>
            </el-form-item>
            <el-form-item label="会员名称：">
              <el-input placeholder="会员名称" style="width:100px;" v-model="username"/>
            </el-form-item>
            <el-form-item label="会员电话">
              <el-input placeholder="会员电话" style="width:120px;"  v-model="phone"/>
            </el-form-item>
            <el-form-item label="选择产品：">
              <el-select placeholder="选择产品" v-model="choosepname">
                <el-option v-for="item in proName" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="订单开始日期" v-model="start_at"/>
            <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="订单结束日期" v-model="end_at"/>
            <el-button type="primary" @click="searchDetail">查询</el-button>
          </el-form>
        </div>
        <!-- 消费详情表格 -->
        <el-table :data="costData"  border style="width: 100%;">
          <!--<el-table-column type="selection" align="center"/>-->
          <el-table-column prop="id" label="会员ID" align="center"/>
          <el-table-column prop="username" label="姓名" align="center"/>
          <el-table-column prop="phone" align="center"  label="电话"/>
          <el-table-column prop="proname" align="center"  label="产品名称"/>
          <el-table-column prop="sku" align="center" label="规格" />
          <el-table-column prop="num" align="center" label="数量" />
          <el-table-column prop="price" align="center" label="单价" />
          <el-table-column prop="total" align="center" label="合计" />
          <el-table-column prop="orderdate" align="center" label="订单日期" />
          <el-table-column prop="ifuse" align="center" label="使用会员卡" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {getVipList, editVip, changeStatus, deleteVip, searchVip, getCostDetail, getDetailByCon} from '@/api/valueviplist'
import {getGoodsName} from '@/api/logistics'
export default {
  data() {
    return {
      id:'',//当前编辑行团长的id
      start_at:'',//订单开始日期
      end_at:'',//订单结束日期
      activeName:'1',//选中的选项卡的名字
      vipid:'',//会员id
      username:'',//会员姓名
      phone:'',//手机号
      vipdate:'',//充值日期
      costStatus:'',//会员列表消费状态
      recordData:[],//会员充值记录
      record:false,//会员充值记录对话框
      vipname:'',
      vipphone:'',
      dialogFormVisible:false,
      tableData: [],
      multipleSelection: [],
      total: 0, // 获取列表数据的长度
      pagesize: 200, // 每页的数据列表
      currentPage: 1, // 默认开始页面
      costData:[],//消费详情数据
      proName:[],//产品名称列表
      choosepname:''//选择的产品
    }
  },
  mounted(){
    this.getviplist()
    this.getProname()
  },
  methods: {
    //会员列表 点击详情
    seeVipDetail:function(row){
       this.record = true
       this.recordData = row.value_card_buy_record
    },
    //会员列表删除会员
    async deleteVip(row){
       await deleteVip(row.id).then(res=>{
         this.$message.success('删除成功')
         this.getviplist()
       })
    },
    //会员列表  改变启用 禁用
    async changeStatus(row){
      let id = row.id
       await changeStatus(id).then(res=>{
           this.$message.success('修改成功')
           this.getviplist()
       })
    },
    //会员列表  修改姓名 手机号
    async subVipEdit(row){
      let username = this.vipname
      let phone = this.vipphone
      try{
        await editVip(this.id,username,phone).then(res=>{
          this.getviplist()
          this.$message.success('修改成功')
          this.dialogFormVisible = false
        })
      }catch(err){
         console.log(err)
      }
    },
    //编辑会员列表
    editVip:function(row){
      this.dialogFormVisible = true
      this.id = row.id
      this.vipname= row.value_card_buy_record[0].username
      this.vipphone = row.value_card_buy_record[0].phone
    },
    //根据条件查询会员列表
    async searchVip(){
       await searchVip(this.vippid, this.username, this.phone, this.vipdate, '').then(res=>{
          this.tableData = res.data
       })
    },
    //默认获取会员列表信息
    async getviplist(){
       await getVipList().then(res=>{
          this.tableData = res.data
       })
    },
    //切换tab标签时
    async changeTab(){
      if(this.activeName == '1'){
         this.getviplist()
      }else if(this.activeName == '2'){
         //获取会员消费详情
         await getCostDetail().then(res=>{
             let data = res.data
             let costlist = []
            for(let i=0;i<data.length;i++){
               for(let j=0;j<data[i].order_items.length;j++){
                 let obj={'id':'',
                      'username':'',//姓名
                      'phone':'',//电话
                      'proname':'',//产品名称
                      'sku':'',//规格
                      'num':'',//数量
                      'price':'',//单价
                      'total':'',//总计
                      'orderdate':'',//订单日期
                      'ifuse':''//使用会员卡
                 }
                 obj.id = data[i].id
                 obj.username = data[i].user_address_receiver_name
                 obj.phone = data[i].user_address_phone
                 obj.sku = data[i].order_items[j].stock
                 obj.proname = data[i].order_items[j].name
                 obj.price = data[i].order_items[j].price
                 obj.num = data[i].order_items[j].pay_goods_number
                 obj.total = data[i].total_money
                 obj.orderdate = data[i].created_at
                 obj.ifuse = data[i].payment_method
                 costlist.push(obj)
               }
            }
            this.costData = costlist
         })
      }
    },
    //根据条件查询会员消费详情
    async searchDetail(){
        try{
          await getDetailByCon(this.vipid, this.username, this.phone, this.start_at, this.end_at).then(res=>{
              console.log(res)
          })
        }catch(err){
           console.log(err)
        }
    },
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    //获取产品名称信息
    async getProname(){
      try{
        await getGoodsName().then(res => {
          this.proName = res.data
        })
      }catch(err){
        console.log(err)
      }
    },

    // 会员列表的表格全选操作
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
    //导出全部会员
    exportVipExcel() {
       window.location.href = 'https://community.suokekj.com/api/member/export?token=' + this.$store.getters.token
    },
    //导出会员消费详情
    exportCostDetail(){
      window.location.href = 'https://community.suokekj.com/api/member/orders/export?token=' + this.$store.getters.token
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

