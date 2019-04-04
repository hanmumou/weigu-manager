<template>
	<div class="app-container">
    <p class="text-wanner"><span>*</span>注:导出的EXEL表包含退款中的订单</p>
		<!-- 取货点汇总表头 -->
		<div class="fetcollect-tile">
			<el-form :inline="true" class="demo-form-inline">
				<el-button @click="allcheck()">全选表格</el-button>
				<el-button @click="allcheckr()">取消全选</el-button>
				<div class="export">
					<el-button size="medium" type="primary">导出汇总列表</el-button>
				</div>
				<el-form-item label="所在区域：">
					<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
						<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
					</el-select>
					<el-select placeholder="请选择所在区域" v-model="city.city_id">
						<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
					</el-select>
				</el-form-item>
        <el-form-item label="选择产品">
          <el-select placeholder="全部" v-model="goodsChoose" multiple collapse-tags>
            <el-option v-for="item in goodslist" :label="item.name" :value="item.id">
              <el-checkbox :label="item.name" :value="item.id"></el-checkbox>
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="取货点">
					<el-select placeholder="全部" multiple v-model="addChoose" collapse-tags>
						<el-option v-for="item in address"  :label="item.residential_quarters" :value="item.id">
							<el-checkbox :label="item.residential_quarters" :value="item.id"></el-checkbox>
						</el-option>
					</el-select>
				</el-form-item>
				<el-date-picker type="datetime" format="yyyy-MM-d HH:mm:ss"  placeholder="开始时间" v-model="start_at"/>
				<el-date-picker type="datetime" format="yyyy-MM-d HH:mm:ss"  placeholder="结束时间" v-model="end_at"/>
				<el-button type="primary" @click="getpickupByCon">查询</el-button>
			</el-form>
		</div>
		<!-- 表格循环开始 -->
		<div v-for="(item,index) in takegds" :key="index">
			<table class="fetcollect-tab" style="width:100%;">
				<div class="fetcollect-dis">
					<input v-model="name" class="checkinput" type="checkbox">
					<span>取货点：{{ item.residential_quarters }}</span>
					<span>团长姓名：{{ item.name }}</span>
					<span>联系方式：{{ item.phone }}</span>
					<span>具体地址：{{ item.address }}</span>
				</div>
				<div style="clear:both" />
				<div class="fetcollect-titile">
					<span class="id" style="width:8%;">序号</span>
					<span class="gdsid" style="width:8%;">商品ID</span>
					<span class="gdsname" style="width:20%;">产品名称</span>
					<span class="specification" style="width:10%;">规格</span>
					<span class="price" style="width:8%;">单价</span>
					<span class="volume" style="width:8%;">总销量</span>
					<span class="received" style="width:8%;">实收款</span>
				</div>
				<div class="ml">
					<div class="fectcollect-row fect-bgc">
						<ul v-for="(row,index) in takegds[index].goods_list"  class="fetcollect-row" style="width:100%">
							<li class="rowid" style="width:8%;">{{ index }}</li>
							<li class="rowgdsid" style="width:8%;">{{ row.goods_id }}</li>
							<li class="rowname" style="width:20%;">{{ row.goods_name }}</li>
							<li class="rowspecti" style="width:10%;" v-if="row.goods_sku_status == 1">{{ row.goods_sku_stock_detail }}</li>
              <li class="rowspecti" style="width:10%;" v-if="row.goods_sku_status == 0">无规格</li>
							<li class="rowprice" style="width:8%;">{{ row.goods_price }}</li>
							<li class="rowvolume" style="width:8%;">{{ row.sale_goods_stock_sum }}</li>
							<li class="rowreceived" style="width:8%;">{{ row.sale_goods_money_total }}</li>
							<div style="clear:both" />
						</ul>
					</div>
				</div>
			</table>
			<div class="fetcollect-count">
				<span>总统计:<i>260000</i>元</span>
			</div>
		</div>
	</div>
</template>
<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	import { getPro, getCommander,getGoodsList, getAddSale, getPickupList } from '@/api/sellcollect'
	export default {
		data() {
			return {
        start_at:'',//开始时间
        end_at:'',//结束时间
        goodsChoose:[],//产品名称
        goodslist:[],//商品列表
				takegds: [],
//				multipleSelection: [],
				province: [], //省
				city: [], //市
				checkList:[],//取货点多选
				name:'',
				address:[],//取货点信息  团长信息
				addChoose:[]//选择的取货点  多选
			}
		},
		methods: {
      //获取产品列表
      async getGoodslist(){
        try{
          await getGoodsList().then(res=>{
            this.goodslist=res.data
          })
        }catch(err){
          console.log(err)
        }
      },
			// 合计操作
			getfetcollect(param) {
				const {
					columns,
					data
				} = param
				const sums = []
				columns.forEach((column, index) => {
					// 总计行的修改
					if(index <= 4) {
						sums[index] = ''
						return
					}
					if(index === 6) {
						sums[index] = '总价'
						return
					}
					const values = data.map(item => Number(item[column.property]))
					if(!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr)
							if(!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						sums[index] += ' 元'
					}
				})

				return sums
			},
			// 全选操作
			allcheck() {
				const ischeck = document.getElementsByTagName('input')
				for(var i = 0; i < ischeck.length; i++) {
					if(ischeck[i].checked === false) {
						ischeck[i].checked = true
						console.log(ischeck[i].checked)
					}
				}
			},
			// 取消全选
			allcheckr() {
				const ischeck = document.getElementsByTagName('input')
				for(var i = 0; i < ischeck.length; i++) {
					if(ischeck[i].checked === true) {
						ischeck[i].checked = false
					}
				}
			},
			//获取省
			async getProvince() {
				try {
					const res = await getPro(1)
					let data = res.data
					this.province = data
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
			//获取取货点信息
			async getAddress(){
				try{
					await getCommander().then(res=>{
						this.address=res.data
					})
				}catch(err){
					console.log(err)
				}
			},
			//获取取货点列表
			async getAddlist(){
				try{
					await getAddSale().then(res=>{
            this.takegds = res.data
					})
				}catch(err){
					console.log(err)
				}
			},
      //根据条件查询取货点列表信息
      async getpickupByCon(){
        let names = {}
        for(let i=0;i<this.goodsChoose.length;i++){
            names[i] = this.goodsChoose[i]
        }
        let adds = {}
        for(let j=0;j<this.addChoose.length;j++){
            adds[j] = this.addChoose[j]
        }
          try{
            await getPickupList(this.addChoose,this.start_at,this.end_at,this.province.province_id,this.city.city_id,this.goodsChoose).then(res=>{
              this.takegds = res.data
            })
          }catch(err){
             console.log(err)
          }
      }
		},
		mounted() {
			this.getProvince()
			this.getAddress()
			this.getAddlist()
      this.getGoodslist()
		}
	}
</script>

<style>
  /**备注**/
  .text-wanner{
    color:#9E9E9E;
    font-size:16px;
    margin-top:-30px;
  }
  .text-wanner>span{
    color:#b94a48;
    font-size:20px;
  }
	/* 统计 */

	.fetcollect-count {
		height: 65px;
		line-height: 65px;
		font-weight: 700;
		background-color: #E6E6E6;
	}

	.fetcollect-count span {
		padding-left: 80%;
	}

	.fetcollect-count i {
		padding-left: 2%;
		font-style: normal;
		color: #F91313;
	}
	/* 表格标题 */

	.fetcollect-dis {
		height: 65px;
		line-height: 61px;
		font-size: 18px;
		background-color: #F1FAFE;
		width: 100%;
	}

	.fetcollect-dis input {
		margin-left: 20px;
	}
	/* 标题间距 */

	.fetcollect-dis span {
		padding-left: 51px;
		font-weight: 600;
		width: 100%;
	}

	.fetcollect-dis {
		color: #116266;
		font-size: 18px;
		width: 99.8%;
	}

	.fetcollect-table {
		width: 100%;
	}
	/* th字体 */

	.fetcollect-titile th {
		font-size: 16px;
		color: #909399;
		font-weight: 600;
		line-height: 16px;
	}
	/* th间距 */

	.fetcollect-titile .id {
		padding-left: 5%;
		line-height: 16px;
    display:inline-block;
    text-align:center;
	}

	.fetcollect-titile .gdsid {
		padding-left: 3%;
    display:inline-block;
    text-align:center;
	}

	.fetcollect-titile .gdsname {
		padding-left: 3%;
    display:inline-block;
    text-align:center;
	}

	.fetcollect-titile .specification {
		padding-left: 3%;
    display:inline-block;
    text-align:center;
	}

	.fetcollect-titile .price {
		padding-left: 3%;
    display:inline-block;
    text-align:center;
	}

	.fetcollect-titile .volume {
		padding-left:3%;
    display:inline-block;
    text-align:center;
	}

	.fetcollect-titile .received {
		padding-left:3%;
    display:inline-block;
    text-align:center;
	}
	/* 设置距离边距 */

	.fetcollect-tile {
		background-color: rgb(48, 65, 86);
		padding: 20px;
		width: 99.8%;
	}

	.fetcollect-titile {
		height: 16px;
		line-height: 16px;
		width: 100%;
		font-size: 16px;
		font-weight: 600;
		margin-top: 20px;
		font-family: Arial;
		color: #909399;
	}
	/* 每行间距 */

	.fectcollect-row li {
		padding: 20px;
		height: 16px;
		line-height: 16px;
	}

	.fectcollect-row .rowid {
		padding-left: 3%;
    text-align:center;
	}

	.fectcollect-row .rowgdsid {
		padding-left: 3%;
    text-align:center;
	}

	.fectcollect-row .rowname {
		padding-left: 3%;
    text-align:center;
	}

	.fectcollect-row .rowspecti {
		padding-left:3%;
    text-align:center;
	}

	.fectcollect-row .rowprice {
		padding-left: 3%;
    text-align:center;
	}

	.fectcollect-row .rowvolume {
		padding-left: 3%;
    text-align:center;
	}

	.fectcollect-row .rowreceived {
		padding-left: 3%;
    text-align:center;
	}
	/* ul设置 */

	.fect-bgc ul {
		font-size: 16px;
		color: #606266;
		height: 65px;
	}
	/* 设置UI背景 */

	.fect-bgc ul:nth-child(odd) {
		background-color: #FDEEE4;
	}

	.fetcollect-dis input[type="checkbox"] {
		-webkit-appearance: none;
		vertical-align: middle;
		margin-top: 0;
		background: #fff;
		border: #999 solid 1px;
		min-height: 12px;
		min-width: 12px;
	}

	.fetcollect-dis input[type="checkbox"]:checked {
		background: #3190e8;
	}

	.fetcollect-dis input[type=checkbox]:checked::after {
		content: '';
		top: 3px;
		left: 3px;
		position: absolute;
		background: transparent;
		border: #fff solid 2px;
		border-top: none;
		border-right: none;
		height: 6px;
		width: 10px;
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}
	/* 取货点样式 */

	.fetcollect-content {
		height: 3.8rem;
		line-height: 3.8rem;
		width: 100%;
		margin-left: 80px;
		font-weight: 600;
		font-size: 1.3rem;
		text-align: center;
		color: #333333;
		background-color: #F1FAFE;
	}

	.export {
		display: inline;
	}
	/* 运动积分结束 */
	/* 消费详情页开始 */

	.fetcollect-tile .el-form-item__label {
		color: #fff;
	}

	.el-table .warning-row {
		background: oldlace;
	}
	/* 取货点ui样式 */

	.fetcollect-row li {
		list-style: none;
		float: left;
	}
</style>
