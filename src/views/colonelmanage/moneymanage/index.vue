<template>
  <div class="app-container">
    <el-tabs class="money-container" type="card" v-model="activeName" @tab-click="changeTab" >
      <el-tab-pane label="提现管理" name="1">
        <!-- 提现管理页面 -->
        <div class="money-content">
          <el-form :inline="true" class="demo-form-inline">
            <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
            <el-button class="select-all" @click="toggleviplist(cashlist)">全选表格</el-button>
            <div class="export">
              <el-button size="medium" type="primary" @click="exportExcel">导出列表</el-button>
            </div>
            <el-form-item label="所在区域：">
										<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
											<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
										</el-select>
										<el-select placeholder="请选择所在区域" v-model="city.city_id">
											<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
										</el-select>
									</el-form-item>
            <el-form-item label="团长姓名：">
              <el-input placeholder="请输入团长姓名" v-model="com_name"/>
            </el-form-item>
            <el-form-item label="团长电话：">
              <el-input placeholder="请输入团长电话" v-model="com_phone"/>
            </el-form-item>
            <el-form-item label="团长小区：">
              <el-input placeholder="请输入团长小区" v-model="com_area"/>
            </el-form-item>
            <el-form-item label="提现状态：">
              <el-select placeholder="请选择提现状态" v-model="cashStatus">
                <el-option  key="0" label="已取消" value="0" />
                <el-option  key="1" label="申请中" value="1" />
                <el-option  key="2" label="已发放" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="开始日期：">
              <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="开始日期" v-model="start_at"/>
            </el-form-item>
            <el-form-item label="结束日期：">
              <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="结束日期" v-model="end_at"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchCash">查询</el-button>
              <el-button type="text" @click="clearSearch">清空搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 提现表格 -->
        <div>
          <el-table :data="cashlist" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center"/>
            <el-table-column prop="commander_id" label="团长ID" align="center"/>
            <el-table-column prop="commander_info.name" label="团长姓名" align="center"/>
            <el-table-column prop="commander_info.phone" align="center"  label="团长电话"/>
            <el-table-column prop="commander_info.province_name" align="center" label="地区"/>
            <el-table-column prop="commander_info.residential_quarters" align="center" label="团长所在小区"/>
            <el-table-column prop="commander_info.address" align="center" label="取货地址"/>
            <el-table-column prop="commander_sale_all_total" align="center" label="总销售额"/>
            <el-table-column  align="center" label="总佣金">
              <template slot-scope="scope" >
                 <p>队长:{{scope.row.commander_commission_all_total.commander_team_commission_total}}</p>
                 <p>团长:{{scope.row.commander_commission_all_total.commander_user_commission_total}}</p>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="预得佣金">
              <template slot-scope="scope" >
                <p>队长:{{scope.row.commander_advance_commission_all_total.commander_team_advance_total}}</p>
                <p>团长:{{scope.row.commander_advance_commission_all_total.commander_user_advance_total}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="可提佣金">
              <template slot-scope="scope" >
                <p>队长:{{scope.row.commander_user_info.team_actually_commission_amount}}</p>
                <p>团长:{{scope.row.commander_user_info.actually_commission_amount}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已提佣金">
              <template slot-scope="scope" >
                <p>队长:{{scope.row.commander_user_info.team_commission_amount}}</p>
                <p>团长:{{scope.row.commander_user_info.commission_amount}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="transfer_money" align="center" label="提现中"/>
            <el-table-column prop="apply_status_name" align="center" label="状态"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope" >
                <el-button type="primary" size="mini" style="width:80px;margin-bottom:5px;margin-left:6px;">手动发放</el-button>
                <el-button type="success" size="mini" style="width:80px;margin-bottom:5px;">自动发放</el-button>
                <el-button type="danger" size="mini" style="width:80px;">不发放</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 提现管理结束 -->
      <el-tab-pane label="佣金明细" name="2">
        <!-- 佣金明细页面 -->
        <div class="manage-content">
          <el-form :inline="true" class="demo-form-inline">
            <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
            <el-button class="select-all" @click="toggleSelection(moneyList)">全选表格</el-button>
            <div class="export">
              <el-button size="medium" type="primary" @click="exportMoney">导出列表</el-button>
            </div>
            <el-form-item label="团长所在区域：">
              <el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
                <el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
              </el-select>
              <el-select placeholder="请选择所在区域" v-model="city.city_id">
                <el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
              </el-select>
            </el-form-item>
            <el-form-item label="团长姓名：">
              <el-input placeholder="团长姓名" v-model="com_name"/>
            </el-form-item>
            <el-form-item label="团长电话：">
              <el-input placeholder="团长电话" v-model="com_phone"/>
            </el-form-item>
            <el-form-item label="配送地址：">
              <el-input placeholder="团长小区" v-model="com_area"/>
            </el-form-item>
            <el-form-item label="选择产品：">
              <el-select placeholder="请选择产品名称" v-model="goodsid">
                <el-option v-for="item in goodslist" :value="item.id" :label="item.name" :key="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="请输入开始时间" v-model="start_at"/>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="请输入结束时间" v-model="end_at"/>
            </el-form-item>
            <el-form-item label="佣金状态">
              <el-select placeholder="请选择佣金状态" v-model="cashStatus">
                <el-option  key="0" label="预得" value="0" />
                <el-option  key="1" label="可提" value="1" />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="searchMoneyList">查询</el-button>
            <el-button type="text" @click="clearSearch">清空搜索</el-button>
          </el-form>
        </div>
        <!--佣金明细表格-->
        <el-table id="#exportexcel" ref="multipleTable2"  :data="moneyList" :row-class-name="tableRoWClassName" tooltip-effect="dark" border style="width: 100%" @select="handleSelectionChange2">
          <el-table-column type="selection" align="center"/>
          <el-table-column prop="commander_id" label="团长ID" align="center"/>
          <el-table-column prop="commander_name" label="姓名" align="center"/>
          <el-table-column prop="commander_phone" align="center" width="130" label="电话" show-overflow-tooltip/>
          <el-table-column prop="commander_community" align="center" width="130" label="配送区域" show-overflow-tooltip/>
          <el-table-column prop="goods_name" align="center" label="产品名称" show-overflow-tooltip/>
          <el-table-column  align="center" label="规格" show-overflow-tooltip>
            <template slot-scope="scope" >
              <p v-if="scope.row.goods_sku_detail">{{scope.row.goods_sku_detail}}</p>
              <p v-if="!scope.row.goods_sku_detail">无规格</p>
            </template>
          </el-table-column>
          <el-table-column prop="goods_amount" align="center" label="数量" show-overflow-tooltip/>
          <el-table-column prop="goods_price" align="center" label="单价" show-overflow-tooltip/>
          <el-table-column prop="goods_mul_money" align="center" label="合计" show-overflow-tooltip/>
          <el-table-column prop="order_created_at" align="center" label="订单日期" show-overflow-tooltip/>
          <el-table-column prop="commission_type_name" align="center" label="佣金状态" show-overflow-tooltip/>
          <el-table-column prop="commission" align="center" label="佣金" show-overflow-tooltip/>
        </el-table>
        <!-- 合计 -->
        <!--<p class="combined">合计：</p>-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getPro, getCashlist, getCashBycon, getMoneyList, searchMoney, exportMoney } from '@/api/colonelist'
import { getGoodsName} from '@/api/logistics'
export default {
  data() {
    return {
      activeName:'1',
      goodsid:'',//选择的商品名称
      start_at:'',//开始时间
      end_at:'',//结束时间
      com_name:'',//团长姓名
      com_phone:'',//团长电话
      com_area:'',//团长小区
      cashStatus:'',//提现状态
      cashlist: [],//提现列表
      moneyList: [],
      multipleSelection: [],
      multipleSelection2: [],
      WD_status: '', // 提现状态
      province:"",//省
      city:"",//市
      goodslist:'',//商品名称
      ifAll:''//是否全选
    }
  },
  methods: {
    changeTab(){
       this.clearSearch()
      this.getProvince()
    },
    //获取佣金明细列表
    async getMoneylist(){
       try{
           await getMoneyList().then(res=>{
              this.moneyList = res.data
           })
       }catch(err){
          console.log(err)
       }
    },
    //根据条件查询佣金列表
    async searchMoneyList(){
        try{
           await searchMoney(this.com_name, this.com_phone,this.com_area,this.goodsid,this.start_at,this.end_at,this.cashStatus).then(res=>{
             this.moneyList = res.data
           })
        }catch(err){
           console.log(err)
        }
    },
    //清除搜索查询
    clearSearch(){
        this.com_name =  this.com_phone = this.com_area = this.cashStatus = this.start_at = this.end_at = this.province = this.city = ''
    },
    //根据条件查询提现列表
    async searchCash(){
       try{
           await getCashBycon(this.cashStatus, this.province.province_id, this.city.city_id, this.com_name,this.com_phone,this.com_area,this.start_at,this.end_at).then(res=>{
                let data = res.data
                for(let i=0; i<data.length;i++){
                  data[i].commander_info.province_name = data[i].commander_info.province_name + data[i].commander_info.city_name + data[i].commander_info.area_name
                }
             this.cashlist = res.data
           })
       }catch(err){
          console.log(err)
       }
    },
    //获取提现管理列表
    async getcashlist(){
       try{
          await getCashlist().then(res=>{
            let data = res.data
            //地区字段处理
            for(let i=0;i<data.length;i++){
              data[i].commander_info.province_name = data[i].commander_info.province_name + data[i].commander_info.city_name + data[i].commander_info.area_name
            }
            this.cashlist = res.data
          })
       }catch(err){
          console.log(err)
       }
    },
  	//获取省
			async getProvince() {
				try {
					await getPro(1).then(res=>{
						 let data = res.data
					   this.province = data
					})
				} catch(err) {
					console.log(err)
				}
			},
			//根据省份获取城市
			async getCity() {
				const data = JSON.stringify({
					'province_id': this.province.province_id
				})
				try {
					const res = await getPro(2, data)
					this.city = res.data
				} catch(err) {
					console.log(err)
				}
			},
			changePro: function() {
				this.getCity()
			},
    //获取产品名称
    async getgoodsname(){
       try{
          await getGoodsName().then(res=>{
             this.goodslist = res.data
          })
       }catch(err){
          console.log(err)
       }
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
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable2.toggleRowSelection(row)
        })
        this.ifAll = true
      } else {
        this.$refs.multipleTable2.clearSelection()
        this.ifAll = false
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    // 导出Excel
    exportExcel() {

    },
    //导出佣金明细列表
    async exportMoney() {
      //处理选中的行id
      if (this.multipleSelection2.length == this.moneyList.length || this.ifAll == true) {
        var sel = ''
      } else {
        var sel = []
        for (let i = 0; i < this.multipleSelection2.length; i++) {
          sel.push(this.multipleSelection2[i].commander_commission_record_id)
        }
      }
        window.location.href= 'https://suokekj.com/community-api/api/regimental-commander/commission/list/export?commander_commission_record_ids=' +
          sel + '&name=' + this.com_name +
          '&phone=' + this.com_phone +
          '&community_name=' + this.com_area +
          '&goods_id=' + this.goodsid +
          '&start_at=' + this.start_at +
          '&end_at=' + this.end_at +
          '&commission_status=' + this.cashStatus
    }
  },
  mounted(){
  	this.getProvince()
    this.getcashlist()
    this.getgoodsname()
    this.getMoneylist()
  }
}
</script>

<style>

/* 去除tab 标签边框 */
.money-container .el-tabs__header .el-tabs__nav{
  border: none;
}
.money-container .el-tabs__header{
  margin: 0;
}
/* tab标签活动选项 */
.money-container .el-tabs__item.is-active{
  background:#67c23a;
  color:#fff;
}
.money-container .el-tabs__item:hover{
  color:#ffffff;
}
/* tab标签初始化样式 */
.money-container .el-tabs__item{
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
/* 提现管理样式 */
.money-content{
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  /* padding:20px 20px 20px 10px; */
  background-color: rgb(48, 65, 86);
  box-sizing: border-box;
}
.money-content .el-form-item__label{
  color:#fff;
}

/* 会员列表页结束 */

/* 消费详情页开始 */

.manage-content{
  background-color: rgb(48, 65, 86);
  padding: 20px;
}
.manage-content .el-form-item__label{
  color:#fff;
}

/* 佣金明细页面select样式 */
.money-container .manage-content .el-select{
  width:170px;
}
/* 佣金明细页面日期框样式 */
.money-container .manage-content .el-date-editor{
  width:170px;
}
/* 合计文本样式 */
.money-container .combined{
  width:100%;
  text-align:right;
}
/* 备注 */
.money-container .note{
  width:812px;
  color:#BC1700;
}
</style>

