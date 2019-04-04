<template>
	<div class="app-container">
		<div class="order-container">
			<!-- 分级卡片 -->
			<div class="order-content">
				<div class="order-card">
					<img src="@/assets/ordermanage/market.png"><span class="oerder-sales">总销量</span>
					<p class="order-text"><span>￥</span>{{ sales.total_sales }}</p>
				</div>
			</div>
			<div class="order-content">
				<div class="order-card">
					<img src="@/assets/ordermanage/salesvolume.png"><span class="oerder-day">当日销售</span>
					<p class="order-text"><span/>{{ sales.today_sales }}</p>
				</div>
			</div>
			<div class="order-content">
				<div class="order-card">
					<img src="@/assets/ordermanage/drop-shipping.png"><span class="oerder-cargo">待发货</span>
					<p class="order-text"><span/>{{ sales.ready_for_refund }}</p>
				</div>
			</div>
			<div class="order-content">
				<div class="order-card">
					<img src="@/assets/ordermanage/undecided.png"><span class="oerder-affirm">待确认</span>
					<p class="order-text"><span/>{{ sales.ready_for_delivery }}</p>
				</div>
			</div>
			<div class="order-content">
				<div class="order-card">
					<img src="@/assets/ordermanage/reimburse.png"><span class="oerder-refund">待退款</span>
					<p class="order-text"><span/>{{ sales.ready_for_confirm }}</p>
				</div>
			</div>
			<div class="order-clear" />
		</div>
		<!-- 查询条件开始 -->
		<div class="order-list">
			<el-form :inline="true" class="demo-form-inline">
				<div class="order-mbtn">
					<el-button type="primary" @click="chanageChecked()">全选表格</el-button>
					<el-button type="danger" @click="EscChecked()">取消全选</el-button>
					<div class="export">
						<el-button size="medium" type="primary" @click="exportExcel">导出订单</el-button>
					</div>
					<el-button type="primary">批量发货</el-button>
					<el-button type="primary">永久删除</el-button><br>
				</div>
				<el-form-item label="订单号">
					<el-input style="width:132px" />
				</el-form-item>
				<el-form-item label="订单状态：">
					<el-select placeholder="请选择订单状态" value="">
						<el-option label="全部" value="" />
						<el-option label="退款中" value="" />
						<el-option label="已退款" value="" />
						<el-option label="已发货" value="" />
						<el-option label="已完成" value="" />
					</el-select>
				</el-form-item>
				<el-form-item label="产品名称：">
					<el-input placeholder="请输入产品名称" />
				</el-form-item>
				<el-form-item label="团长姓名">
					<el-select placeholder="请选择团长" v-model="comid">
						<el-option v-for="item in comList" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="取货地点">
					<el-select placeholder="请选择取货点" v-model="addid">
						<el-option v-for="item in comList" :label="item.residential_quarters" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="所在区域：">
					<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
						<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
					</el-select>
					<el-select placeholder="请选择所在区域" v-model="city.city_id">
						<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
					</el-select>
				</el-form-item>
				<el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="开始日期" />
				<el-date-picker type="date" format="yyyy-MM-d" value-format="yyyy-MM-d" placeholder="结束时间" />
				<el-button type="primary">查询</el-button>
			</el-form>
		</div>
		<!-- 假表头 -->
		<div class="order-faketable">
			<el-table style="width: 100%">
				<el-table-column align="center" width="200" label="订单号" />
				<el-table-column align="center" label="产品名称" />
				<el-table-column align="center" label="单价" />
				<el-table-column align="center" label="规格" />
				<el-table-column align="center" label="数量" />
				<el-table-column align="center" label="联系人" />
				<el-table-column align="center" label="取货点" />
				<el-table-column align="center" label="配送地址" />
				<el-table-column align="center" label="归属团长" />
				<el-table-column align="center" label="状态" />
				<el-table-column align="center" label="实收款" />
				<el-table-column align="center" label="交易时间" />
				<el-table-column :width="226" align="center" label="操作" />
			</el-table>
		</div>
		<!-- 假表头结束 -->
		<!-- 表格开始 -->
		<!-- foritem和表作为一组循环 并且表头隐藏-->
		<div v-for="(item, index) in tableData" :key="index" class="ordermanage">
			<el-form v-model="item.id" :inline="true">
				<el-form-item label="快递公司">
					<el-select v-model="ary[index]" placeholder="请选择快递公司" value="">
						<el-option v-for="(cou, cous) in courier" :key="cous" :value="cou.code" :label="cou.name" />
					</el-select>
				</el-form-item>
				<el-form-item label="输入快递编号">
					<el-input v-model="delivery[index]" />
				</el-form-item>
				<!-- button 按钮-->
				<el-button type="primary" @click="getdelivery(ary[index],delivery[index],item.id)">确定</el-button>
			</el-form>
			<!-- 第一层循环结束 -->
			<table v-for="order in tableData[index].order_items" class="ordermanage-table">
				<!--:key="index" :data="tableData"-->
				<tr>
					<td id="color-input-red">
						<input :checked="checkbox" class="allcheckbox" type="checkbox">
					</td>
					<td class="gds-order">{{ item.order_no }}</td>
					<td class="gds-name">{{ order.name }}</td>
					<td class="gds-price">{{ order.price }}</td>
					<!--{{ items.order_items[0].price }}-->
					<td class="gds-detail" v-if="order.goods_sku">{{order.goods_sku.goods_sku_detail}}</td>
					<!--{{ items.order_items[0].goods_sku.goods_sku_detail }}-->
					<td class="gds-detail" v-if="!order.goods_sku">无</td>
					<td class="gds-virtual">{{ order.virtual_sales_num }}</td>
					<!--{{ items.order_items[0].virtual_sales_num }}-->
					<td class="gds-phonename">
						<p>{{ item.user_address_receiver_name }}</p>
						<p>{{ item.user_address_phone }}</p>
					</td>
					<td class="gds-addressid">{{ item.user_address_id }}</td>
					<td class="gds-address">{{ item.user_address_detail }}</td>
					<td class="gds-marke">{{ item.regimental_commander.name}}</td>
					<td class="gds-status">
						<span v-if="item.status===0">未支付</span>
						<span v-if="item.status===1">已支付</span>
						<span v-if="item.status===2">已发货</span>
						<span v-if="item.status===3">退款中</span>
						<span v-if="item.status===4">已退款</span>
						<span v-if="item.status===5">已完成</span>
					</td>
					<td class="gds-money">{{ item.total_money }}</td>
					<td class="gds-created">{{ item.created_at }}</td>
					<td :width="226">
						<template style="text-align:center;">
							<el-button v-if="item.status===1" type="primary" size="mini" @click="sendGoods(item.id)">发货</el-button>
							<el-button v-if="item.status===5" type="warning" size="mini">已完成</el-button>
							<el-button v-if="item.status===1" type="danger" size="mini" @click="refund(item.id)">退款</el-button>
							<el-button v-if="item.status===4" type="text" style="color:#f56c6c;" size="mini">已退款</el-button>
							<el-button v-if="item.status==4||item.status==5" type="info" size="mini" @click="delmsg(item.id)">删除</el-button>
						</template>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
	import { getorderlist, getcourierlist, getsaleslist, wechatRefund, SetDelivery, delOrder, getCommander, getPro } from '@/api/ordermanage'

	export default {
		data() {
			return {
				ary: [],
				delivery: [],
				tableData: [{
					id: '',
					order_no: '',
					regimental_commander_id: '',
					regimental_commander: '',
					user_id: '',
					username: '',
					user_address_id: '',
					user_address_receiver_name: '',
					user_address_phone: '',
					user_address_detail: '',
					delivery_goods_location_id: '',
					delivery_goods_location: '',
					order_items: [{
						id: '',
						name: '',
						introduce: '',
						main_picture: '',
						video_url: '',
						cost_price: '',
						original_price: '',
						price: '',
						virtual_sales_num: '',
						stock: '',
						commission: '',
						goods_sku: {
							id: '',
							goods_sku_detail: '',
							goods_sku_index: '',
							price: '',
							stock: ''
						}
					}],
					total_money: '',
					express_company_code: '',
					express_no: '',
					remark: '',
					status: '',
					home_delivery_fee: '',
					payment_method: "",
					created_at: "",
					updated_at: "",
					created_at_diff_for_humans: ""
				}],
				courier: [{
					code: '', // 快递公司代码
					name: '' // 快递公司名称
				}],
				checkbox: false,
				allcheckbox: true,
				sales: {
					total_sales: '', // 总销量
					today_sales: '', // 今日销量
					ready_for_refund: '', // 待发货
					ready_for_delivery: '', // 待确认
					ready_for_confirm: '' // 待退款
				},
				ifchooseAll: false, //是否点击全选表格
				comList: [], //团长列表
				comid: '', //团长id
				addid: '', //团长对应的取货点id
				province:'',//省
                city:''//市
			}
		},
		created() {
			this.GetOrderList()
			this.GetCourierList()
			this.GetSales()
			this.getComName()
			this.getProvince()
		},
		methods: {
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
			// 点击删除提示信息
			async delmsg(id) {
				try {
					await delOrder(id).then(res => {
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.GetOrderList()
					})
				} catch(err) {
					console.log(err)
				}
			},
			//退货  微信退款
			async refund(id) {
				const thatid = id
				try {
					await wechatRefund(thatid).then(res => {
						this.$message({
							message: '操作成功',
							type: 'success'
						})
						this.GetOrderList()
					})
				} catch(err) {
					console.log(err)
				}
			},
			// 获取销量列表
			async GetSales() {
				try {
					const res = await getsaleslist()
					this.sales = res.data
				} catch(err) {
					console.log(err)
				}
			},
			// 获取订单列表
			async GetOrderList() {
				try {
					const res = await getorderlist()
					this.tableData = res.data
					for(const i in this.tableData) {
						this.ary.push('')
						this.delivery.push('')
						//console.log(i)
					}
				} catch(err) {
					console.log(err)
				}
			},
			// 获取快递列表
			async GetCourierList() {
				try {
					const res = await getcourierlist()
					this.courier = res.data
				} catch(err) {
					console.log(err)
				}
			},
			// 全选表格
			chanageChecked() {
				const ischeck = document.getElementsByClassName('allcheckbox')
				for(var i = 0; i < ischeck.length; i++) {
					if(ischeck[i].checked === false) {
						ischeck[i].checked = true
					}
				}
				this.ifchooseAll = true
			},
			// 取消全选
			EscChecked() {
				const ischeck = document.getElementsByClassName('allcheckbox')
				for(var i = 0; i < ischeck.length; i++) {
					if(ischeck[i].checked === true) {
						ischeck[i].checked = false
					}
				}
				this.ifchooseAll = false
			},
			// 发货
			async sendGoods(id, aryindex, delivery) {
				const express_company_code = ''
				const express_no = ''
				const order_id = id
				try {
					await SetDelivery(express_company_code, express_no, order_id)
					this.GetOrderList()
					this.$message({
						message: '操作成功',
						type: 'success'
					})
				} catch(err) {
					console.log(err)
				}
			},
			//导出订单
			exportExcel: function() {
				//全部导出  
				if(this.ifchooseAll == true) {
					window.location.href = "https://community.suokekj.com/api/orders/export?order_ids=[]"
				} else {
					//批量导出订单
					let ids = []
					const ischeck = document.getElementsByClassName('allcheckbox')
					for(let i = 0; i < ischeck.length; i++) {
						if(ischeck[i].checked === true) {
							let idsObj = {
								'order_id': ''
							}
							idsObj.order_id = this.tableData[i].id
							ids.push(idsObj)
						}
					}
					ids = JSON.stringify(ids)
					console.log(this.tableData)
					window.location.href = "https://community.suokekj.com/api/orders/export?order_ids=" + ids
				}
				this.EscChecked()
			},
			//获取团长列表
			async getComName() {
				try {
					await getCommander().then(res => {
						this.comList = res.data
					})
				} catch(err) {
					console.log(err)
				}
			}
		}
	}
</script>

<style>
	/* table样式 */
	
	.ordermanage-table {
		font-size: 14px;
		color: #606266;
	}
	
	.ordermanage-table td {
		text-align: center;
	}
	
	.gds-order {
		width: 150px;
	}
	
	.gds-name {
		width: 140px;
		padding-left: 2%;
	}
	
	.gds-price {
		width: 90px;
		padding-left: 1.5%;
	}
	
	.gds-detail {
		width: 140px;
		padding-left: 1.5%;
	}
	
	.gds-virtual {
		width: 80px;
		padding-left: 1.5%;
	}
	
	.gds-phonename {
		width: 140px;
		padding-left: 1.5%;
	}
	
	.gds-addressid {
		width: 80px;
		padding-left: 1%;
	}
	
	.gds-address {
		width: 140px;
		padding-left: 2.5%;
	}
	
	.gds-marke {
		width: 120px;
	}
	
	.gds-status {
		width: 80px;
		padding-left: 1%;
	}
	
	.gds-money {
		width: 80px;
		padding-left: 4%;
	}
	
	.gds-created {
		padding-left: 2%;
	}
	/* 结束 */
	/* 卡片样式 */
	
	.order-card {
		width: 100%;
		height: 120px;
		padding-left: 30px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.5);
		border-radius: 8px;
	}
	
	.order-content {
		width: 20%;
		padding: 1.2%;
		float: left;
	}
	
	.order-card img {
		padding-top: 20px;
		padding-right: 10px;
		width: 50px;
		height: 60px;
	}
	/* 字体大小 及颜色处理*/
	
	.oerder-sales {
		font-size: 20px;
		color: #FF0000;
	}
	
	.order-text {
		font-size: 24px;
		margin: 0;
		margin-top: 15px;
		color: #2E2D2D;
	}
	
	.order-text span {
		color: #f00;
	}
	
	.oerder-day {
		font-size: 20px;
		color: #26A98F;
	}
	
	.oerder-cargo {
		font-size: 20px;
		color: #B74B03;
	}
	
	.oerder-affirm {
		font-size: 20px;
		color: #ACBC03;
	}
	
	.oerder-refund {
		color: #777777;
		font-size: 20px;
	}
	
	.order-clear {
		clear: both;
	}
	/* 列表样式 */
	
	.order-list {
		width: 100%;
		padding: 20px;
		margin-top: 20px;
		background-color: rgb(48, 65, 86);
		box-sizing: border-box;
	}
	
	.order-list .el-form-item__label {
		color: #fff;
	}
	/*  */
	
	.order-list .export {
		display: inline;
	}
	
	.order-mbtn {
		margin-bottom: 24px;
	}
	
	.ordermanage {}
	
	.ordermanage .el-form {
		background: #FDEEE4;
		height: 44px;
		padding-left: 40px;
	}
	/* 假表头样式 */
	
	.order-faketable .el-table__empty-block {
		display: none;
	}
	/* 订单页面input多选框样式 */
	
	.ordermanage #color-input-red input[type="checkbox"] {
		-webkit-appearance: none;
		-moz-appearance: none;
		border-radius: 0;
		min-height: 14px;
		min-width: 14px;
		border-radius: 2px;
		background: #fff;
		outline: none;
		cursor: pointer;
		border: 1px solid #ebeef5;
	}
	
	.ordermanage #color-input-red input[type="checkbox"]:hover {
		border: #409EFF 1px solid;
	}
	
	.ordermanage #color-input-red input[type="checkbox"]:checked::before {
		display: block;
		content: "\2714";
		text-align: center;
		font-size: 9px;
		font-weight: 100;
		background: #409EFF;
		color: white;
	}
</style>