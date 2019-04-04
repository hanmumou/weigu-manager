<template>
	<el-table ref="goodslistTable" :data="tableData" align="center" stripe toggle-row-selection @expand-change="rowOpen" @selection-change="changeSel">
		<el-table-column type="expand" align="center">
			<template slot-scope="props">
				<el-form label-position="right" inline class="table-expand" hide-required-asterisk="true" label-width="120px">
					<el-form-item required label="团购价：" v-if="!props.row.goods_sku_status">
						<!--无规格时显示团购价及库存-->
						<el-input v-model="props.row.price" placeholder="请输入团购价" />
					</el-form-item>
					<el-form-item required label="库存：" v-if="!props.row.goods_sku_status">
						<el-input v-model="props.row.stock" placeholder="请输入商品库存" />
					</el-form-item>
					<el-form-item label="产品规格：" v-if="props.row.goods_sku_status">
						<!--有规格时显示规格-->
						<!--展示当前行规格的表格-->
						<el-table :data="specData" border class="tableWidth" size="mini" :span-method="objectSpanMethod">
							<!--:span-method="objectSpanMethod"-->
							<template v-for="col in cols">
								<el-table-column :label="col.label" :prop="col.prop"></el-table-column>
							</template>
							<!--团购价-->
							<el-table-column label="团购价" prop="price">
								<template slot-scope="scope">
									<el-input v-model="scope.row.price"></el-input>
								</template>
							</el-table-column>
							<!--库存-->
							<el-table-column label="库存" prop="stock">
								<template slot-scope="scope">
									<el-input v-model="scope.row.stock"></el-input>
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>
				</el-form>
				<!-- <el-button class="submit" @click="submitLine(props.row)">提交</el-button> -->
			</template>
		</el-table-column>
		<el-table-column type="selection" width="30" />
		<el-table-column label="产品ID" prop="id" />
		<el-table-column label="产品图片" prop="main_picture">
			<template slot-scope="scope">
				<img :src="scope.row.main_picture" width="100px" height="100px">
			</template>
		</el-table-column>
		<el-table-column label="产品名称" prop="name" />
		<el-table-column label="产品分类" prop="category_name[0].name" />
		<el-table-column label="发布时间" prop="start_at" />
		<!--<el-table-column label="展示区域" prop="show_region_type">
			<template slot-scope="scope">
				<div v-if="scope.row.show_region_type == 1">
					<span>全国</span>
				</div>
				<div v-if="scope.row.show_region_type == 0">
					<span>指定区域</span>
				</div>
			</template>
		</el-table-column>-->
		<el-table-column label="限购数量" prop="goods_limit_stock">
			<template slot-scope="scope">
				<el-input v-model="scope.row.goods_limit_stock" class="ipt" />
			</template>
		</el-table-column>
		<el-table-column label="虚拟销量" prop="virtual_sales_num">
			<template slot-scope="scope">
				<el-input v-model="scope.row.virtual_sales_num" class="ipt" />
			</template>
		</el-table-column>
		<el-table-column label="排序" prop="sort">
			<template slot-scope="scope">
				<el-input v-model="scope.row.sort" class="ipt" />
			</template>
		</el-table-column>
		<el-table-column label="首页推荐" prop="is_index">
			<template slot-scope="scope">
				<div v-if="scope.row.is_index == true">
					<el-button size="mini" @click="changeIndex(scope.row)">推荐</el-button>
				</div>
				<div v-else :key="index">
					<el-button size="mini" @click="changeIndex(scope.row)">取消</el-button>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="销售记录" prop="is_sales_record">
			<template slot-scope="scope">
				<div v-if="scope.row.is_sales_record == 1">
					<el-button size="mini" @click="submit(scope.$index, scope.row)">开启中</el-button>
				</div>
				<div v-else :key="index">
					<el-button size="mini" @click="submit(scope.$index, scope.row)">关闭中</el-button>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="操作" width="250px">
			<template slot-scope="scope">
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button size="mini" @click="saveStockPrice(scope.$index, scope.row)">保存</el-button>
				<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
	import { changeTj, delGoods, getSpecList, editGoods, getSkuById, editPriceStock } from '@/api/goodslist'
	import {bus} from '@/main.js'
	export default {
		name: 'GoodsTable',
		props: {
			tableData: {
				type: Array,
				required: true
			},
			checkAll: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				cols: [], //规格数据  规格列
				specData: [], //规格表格数据
				namesArr: [], // 一级要合并数组 [2,0,1,3,0,0] 代表第一二行合并,第三行不变,第四五六行合并,0代表原本的那一行被合并,因此这个列被消除
				namesPos: 0, // 一级要合并数组内容的序号
				fenleisArr: [], // 同上 二级
				fenleisPos: 0,
				checkTable: [],
				span1: '', //有两个一级规格时合并的行数
				span2: '', //有三个一级规格时合并的行数
				spanSku: '' //展开的当前行规格信息
			}
		},
		watch: {
			// 监听父组件传入得值实现全选
			checkAll: function(newValue, oldValue) {
				if(newValue) {
					this.tableData.forEach(row => {
						this.$refs.goodslistTable.toggleRowSelection(row)
					})
				} else {
					this.$refs.goodslistTable.clearSelection()
				}
			}
		},
		methods: {
			// 改变推荐状态
			async changeIndex(val) {
				try {
					await changeTj(val.id)
					this.$emit('ee')
				} catch(err) {
					console.log(err)
				}
			},
			// 表格合并
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				//有两个规格或者是三个规格时才可以合并
				if(this.spanSku.length == 2 && this.spanSku[1].detail.length >= 2 || this.spanSku.length == 3 && this.spanSku[2].detail.length == 1) { //两个规格时且二级规格有两个或者是多个时
					console.log(this.span1)
					//对第一列进行合并
					if(columnIndex == 0) {
						if((rowIndex + 1) % this.span1 == 1) {
							return {
								rowspan: this.span1,
								colspan: 1
							}
						} else {
							return {
								rowspan: 0,
								colspan: 0
							}
						}
					}
				} else if(this.spanSku.length == 3 && this.spanSku[2].detail.length >= 2) { //有三个规格且第三个规格的二级规格有两个或者是多个
					//第一列进行合并
					let ji = this.span1 * this.span2
					//对第一列进行合并
					if(columnIndex == 0) {
						if((rowIndex + 1) % ji == 1) {
							return {
								rowspan: ji,
								colspan: 1
							}
						} else {
							return {
								rowspan: 0,
								colspan: 0
							}
						}
					}
					//对第二列进行合并
					if(columnIndex == 1) {
						if((rowIndex + 1) % this.span2 == 1) {
							return {
								rowspan: this.span2,
								colspan: 1
							}
						} else {
							return {
								rowspan: 0,
								colspan: 0
							}
						}
					}
				}
			},
			// 删除当前行	
			async handleDelete(row) {
				const data = {
					'goods_id': row.id + ''
				}
				try {
					await delGoods(JSON.stringify(data)).then(res => {
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.$emit('headCallBack', 'delete') //子组件向父组件传递数据
					})
				} catch(err) {
					console.log(err)
				}
			},
			// 编辑
			handleEdit(index, row) {
				// 跳转页面
				this.$router.push({
					path: '/goodsmanage/exportgoods',
					query: {
						id: row.id
					}
				})
			},
			// 表格选中行
			changeSel(sel) {
				bus.$emit('clearGoods',sel)
			},
			// 提交当前行
			async submit(index, row) {
				const detail_picture = []
				var is_sales_record = 0
				for(let i = 0; i < row.detail_picture.length; i++) {
					detail_picture.push({
						'image': row.detail_picture[i].image
					})
				}
				var show_region = {}
				row.show_region.forEach(val => {
					delete val.id
					show_region = val
				})
				if(row.is_sales_record === 1) {
					is_sales_record = 0
				} else {
					is_sales_record = 1
				}
				try {
					await editGoods(row.id, row.category_id, row.show_region_type, JSON.stringify(show_region), row.name, row.introduce, row.main_picture, JSON.stringify(detail_picture),
						row.video_url, row.cost_price, row.original_price, row.price, Number(row.goods_sku_status), JSON.stringify(row.goods_sku), row.start_at,
						row.end_at, row.delivery_at, row.goods_limit_stock, row.commission, row.goods_type, row.details, row.sort, is_sales_record)
				} catch(err) {
					console.log(err)
				}
			},
			//点击保存  保存 当前商品规格和库存 笛卡尔积
			async saveStockPrice(index, row) {
				if(row.goods_sku) { //有规格
					//向后台提交笛卡尔积表格
					let cdata = []
					for(var i = 0; i < this.specData.length; i++) {
						let cobj = {
							'id': '',
							'price': '',
							'stock': ''
						}
						cobj.id = this.specData[i].id
						cobj.price = this.specData[i].price
						cobj.stock = this.specData[i].stock
						cdata.push(cobj)
					}
					cdata = JSON.stringify(cdata)
					console.log(cdata)
					try {
						await editPriceStock(cdata).then(res => {
							this.$message({
								message: '保存成功',
								type: 'success'
							})
						})
					} catch(err) {
						console.log(err)
					}
				} else if(!row.goods_sku) { //没有规格  调用修改商品接口
					const detail_picture = []
					for(let i = 0; i < row.detail_picture.length; i++) {
						detail_picture.push({
							'image': row.detail_picture[i].image
						})
					}
					try{
						await editGoods(row.id, row.category_id, row.show_region_type, JSON.stringify(show_region), row.name, row.introduce, row.main_picture, JSON.stringify(detail_picture),
						row.video_url, row.cost_price, row.original_price, row.price, Number(row.goods_sku_status), JSON.stringify(row.goods_sku), row.start_at,
						row.end_at, row.delivery_at, row.goods_limit_stock, row.commission, row.goods_type, row.details, row.stock)
					} catch(err) {
						console.log(err)
					}
					this.$message({
								message: '保存成功',
								type: 'success'
							})
				}
			},
			// table展示当前行 显示 规格  团购价 库存
			async rowOpen(row, expandedRows) {
				this.specData = []
				this.spanSku = row.goods_sku
				//获取当前行的规格信息
				let skus = row.goods_sku
				let id = row.id
				//商品有规格
				if(row.goods_sku) {
					//根据商品id获取该商品规格详情
					try {
						await getSkuById(id).then(res => {
							let tdata = res.data
							//分情况讨论
							if(skus.length == 1) { //只有一个一级规格
								this.cols = [{
									'label': skus[0].type,
									'prop': 'names'
								}]
								//渲染列表
								let sda = []
								for(var i = 0; i < skus[0].detail.length; i++) {
									let tObj = {
										'id': '',
										'names': '',
										'price': '',
										'stock': ''
									}
									tObj.names = skus[0].detail[i].name
									sda.push(tObj)
								}
								this.specData = sda
							} else if(skus.length == 2) { //有两个一级规格
								this.cols = [{
									'label': skus[0].type,
									'prop': 'names'
								}, {
									'label': skus[1].type,
									'prop': 'names2'
								}]
								//渲染列表
								let sda2 = []
								for(var i = 0; i < skus[0].detail.length; i++) {
									for(var j = 0; j < skus[1].detail.length; j++) {
										let tObj2 = {
											'id': '',
											'names': '',
											'names2': '',
											'price': '',
											'stock': ''
										}
										tObj2.names = skus[0].detail[i].name
										tObj2.names2 = skus[1].detail[j].name
										sda2.push(tObj2)
									}
								}
								this.specData = sda2
								this.span1 = parseInt(skus[1].detail.length)
							} else if(skus.length == 3) { //有三个一级规格
								this.cols = [{
									'label': skus[0].type,
									'prop': 'names'
								}, {
									'label': skus[1].type,
									'prop': 'names2'
								}, {
									'label': skus[2].type,
									'prop': 'names3'
								}]
								//渲染列表
								let sda3 = []
								for(var i = 0; i < skus[0].detail.length; i++) {
									for(var j = 0; j < skus[1].detail.length; j++) {
										for(var k = 0; k < skus[2].detail.length; k++) {
											let tObj3 = {
												'id': '',
												'names': '',
												'names2': '',
												'names3': '',
												'price': '',
												'stock': ''
											}
											tObj3.names = skus[0].detail[i].name
											tObj3.names2 = skus[1].detail[j].name
											tObj3.names3 = skus[2].detail[k].name
											sda3.push(tObj3)
										}
									}
								}
								this.specData = sda3
								this.span1 = parseInt(skus[1].detail.length)
								this.span2 = parseInt(skus[2].detail.length)
							}
							//渲染列表
							let ndata = this.specData
							for(var i = 0; i < tdata.length; i++) {
								ndata[i].id = tdata[i].id
								ndata[i].stock = tdata[i].stock
								ndata[i].price = tdata[i].price
							}
							this.specData = ndata
							console.log(this.specData)
						})
					} catch(err) {
						console.log(err)
					}
				}
			}
		}
	}
</script>
<style scoped>
	.table-expand .el-form-item {
		width: 100%;
	}
	
	.tableWidth {
		width: 500px;
	}
	
	.submit {
		margin-left: 120px;
	}
</style>