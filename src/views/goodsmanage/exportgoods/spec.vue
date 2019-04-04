<template>
	<div class="spec_add">
		<el-button type="primary" class="addSepc" @click="addSepc(index)">+创建规格</el-button>
		<div class="spec_add_top">
			<div v-for="(item, index) in specList" class="form_box">
				<el-form label-width="120px">
					<el-form-item label="规格名称">
						<el-input v-model="specList[index].name" placeholder="例如：重量" />
					</el-form-item>
					<el-form-item label="产品规格">
						<el-input v-model="specList[index].myItem" placeholder="例如：5斤装" class="ipt" />
						<div class="add" @click="typeClick(index)">+添加</div>
						<div v-for="(itemr, i) in specList[index].items" :key="i" class="dis-inline">
							<span class="squre">
                {{ itemr }}
                <i class="el-icon-circle-close-outline" @click="deleteName(i,index,itemr)"/>
              </span>
						</div>
					</el-form-item>
					<button class="btn2" @click="delBigClos(index)">删除规格</button>
				</el-form>
			</div>
		</div>
		<!--批量添加  团购价 库存-->
		<div class="piliang">
			<p>团购价：</p>
			<el-input v-model="pPrice" placeholder="请输入团购价" style="width:10em;float:left;"></el-input>
			<p style="margin-left:3em;">库存：</p>
		    <el-input v-model="pStock" placeholder="请输入库存" style="width:10em;float:left;margin-right:3em;"></el-input>
		    <el-button type="primary" @click="batchAdd">批量添加</el-button>
		</div>
		<el-table :data="tableData" :columns="cols" :show-header="ifShowHeader" style="width: 50%;margin-top:2em;" border :span-method="tableSpanMethod">
			<!--:span-method="tableSpanMethod"-->
			<template v-for="(item, index) in cols">
				<el-table-column :prop="item.prop" :label="item.label" :key="index" align="center"></el-table-column>
			</template>
			<el-table-column label="团购价" :prop="price">
				<template slot-scope='scope'>
					<el-input v-model="scope.row.price"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="库存" :prop="stock">
				<template slot-scope='scope'>
					<el-input v-model="scope.row.stock"></el-input>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" class="submit" @click="onSubmit()">确认提交</el-button>
	</div>
</template>
<script>
	import { addStock, addGoods, getSku } from '@/api/exportgoods'
	export default {
		data() {
			return {
				specList: [{ //添加的二级分类
					name: '',
					items: [],
					myItem: '' //input框中输入的二级标签名称
				}],
				myItem: '',
				cols: [{
					label: '',
					prop: 'names'
				}], // 标题数组
				tableData: [],
				goodsForm: {
					category_id: this.$route.params.category_id,
					show_region_type: this.$route.params.show_region_type,
					show_region: this.$route.params.show_region,
					name: this.$route.params.name,
					introduce: this.$route.params.introduce,
					main_picture: this.$route.params.main_picture,
					detail_picture: this.$route.params.detail_picture,
					video_url: this.$route.params.video_url,
					price: this.$route.params.price,
					original_price: this.$route.params.original_price,
					cost_price: this.$route.params.cost_price,
					goods_sku_status: this.$route.params.goods_sku_status,
					goods_sku: '',//传过来的val中没有这个字段
					start_at: this.$route.params.start_at,
					end_at: this.$route.params.end_at,
					delivery_at: this.$route.params.delivery_at,
					goods_limit_stock: this.$route.params.goods_limit_stock,
					commission: this.$route.params.commission,
					goods_type: this.$route.params.goods_type,
					details: this.$route.params.detailss
				},
				stockList: [],
				data: [],
				spanNum: '', //只有两个规格时合并的行数
				spanNum2: '', //三个规格时 合并的行数
				ifShowHeader: false,
				pPrice:'',//批量添加输入的价格
				pStock:''//批量添加输入的库存
			}
		},
		methods: {
			async onSubmit() {
                //提交商品的时候 先调用发布商品接口,将一级规格名称和二级规格名称传过去  调笛卡尔积接口获取对应的排列的id 获得id之后传库存和价格 
                //提交之前 先将商品的规格转换成正确的格式
                //[{"type":"版本","detail":[{"name":"iPhone X"},{"name":"iPhone XS"}]},{"type":"网络类型","detail":[{"name":"无合约版"}]}]
                let specJson=[]
                for(var i=0;i<this.specList.length;i++){
                	let specObj={'type':'','detail':[]}
                	for(var j=0;j<this.specList[i].items.length;j++){
                		let sObj={'name':''}
                		sObj.name=this.specList[i].items[j]
                		specObj.detail.push(sObj)
                	}
                	specObj.type=this.specList[i].name
                	specJson.push(specObj)
                }
                this.goodsForm.goods_sku=JSON.stringify(specJson)
                try{
                	await addGoods(this.goodsForm).then(res=>{
                           //调取 商品所有属性笛卡尔积接口
                           let id=res.data.id 
             			getSku(id).then(res=>{
             				let table=res.data
             				//返回的是笛卡尔积列表  且与tableData的表格相符   将id赋值
             				for(var j=0;j<table.length;j++){
             					this.tableData[j].id=table[j].id
             				}
             				//添加商品价格及库存  调取商品价格及库存接口
             				let priSto=[]
             				for(var k=0;k<this.tableData.length;k++){
             					let psObj={'id':'','price':'','stock':''}
             					psObj.id=this.tableData[k].id
             					psObj.price=this.tableData[k].price
             					psObj.stock=this.tableData[k].stock
             					priSto.push(psObj)
             				}
             				priSto=JSON.stringify(priSto)
             				addStock(priSto).then(res=>{
             					console.log(res)
             					this.$message({
							             message: '商品发布成功',
							             type: 'success'
					});
             				})
             			})
                	})
                }catch(err){
                	console.log(err)
                }
			},
			typeClick(index) {
				this.ifShowHeader = true
				this.specList[index].items.push(this.specList[index].myItem)
				this.specList[index].myItem = ''
				//第一个规格添加
				// 保存输入项后清空
				if(this.specList.length == 1) { //第一个规格的添加
					//点击添加创建表格  添加规格 创建列
					this.cols[0].label = this.specList[index].name
					let data = []
					for(var i = 0; i < this.specList[index].items.length; i++) {
						data.push({
							id:'',
							names: this.specList[index].items[i],
							price:'',
							stock:''
						})
					}
					let newArr = data.reduce((pre, cur) => {
						if(!pre.includes(cur)) {
							return pre.concat(cur)
						} else {
							return pre
						}
					}, [])
					this.tableData = newArr
				} else if(this.specList.length == 2) { //第二个规格的添加
					if(index == 0) { //添加第一个规格中的标签
						//重新渲染表格
						let dtable = []
						for(var i = 0; i < this.specList[0].items.length; i++) {
							for(var j = 0; j < this.specList[1].items.length; j++) {
								dtable.push({
									id:'',
									names: this.specList[0].items[i],
									names2: this.specList[1].items[j],
									price:'',
							        stock:''
								})
							}
						}
						this.tableData = dtable
					} else if(index == 1) { //添加第二个规格中的标签
						//将第二列的二级规格  添加到表格中  只有一个二级规格的时候
						if(this.specList[index].items.length == 1) {
							//添加第二列内容   在cols插入新的一列
							this.cols.push({
								label: this.specList[index].name,
								prop: 'names2'
							})
							let data2 = [] //第二列的数据  
							for(var i = 0; i < this.specList[index - 1].items.length; i++) {
								data2.push({
									id:'',
									names: this.specList[index - 1].items[i],
									names2: this.specList[index].items[0],
									price:'',
							        stock:''
								})
							}
							this.tableData = data2
						} else { //第二列的二级规格 有两个或者是多个的时候
							let datas = []
							for(var k = 0; k < this.specList[index - 1].items.length; k++) {
								for(var j = 0; j < this.specList[index].items.length; j++) {
									datas.push({
										id:'',
										names: this.specList[index - 1].items[k],
										names2: this.specList[index].items[j],
										price:'',
							            stock:''
									})
								}
							}
							this.tableData = datas
							this.spanNum = this.specList[index].items.length
						}
					}
				} else if(this.specList.length == 3) { //第三个规格的添加   
					if(index == 0) { //添加的是第一个规格中的二级标签
						//重新渲染表格
						let datass = []
						for(var k = 0; k < this.specList[0].items.length; k++) {
							for(var j = 0; j < this.specList[1].items.length; j++) {
								for(var i = 0; i < this.specList[2].items.length; i++) {
									datass.push({
										id:'',
										names: this.specList[0].items[k],
										names2: this.specList[1].items[j],
										names3: this.specList[2].items[i],
										price:'',
							            stock:''
									})
								}
							}
						}
						this.tableData = datass
					} else if(index == 1) { //添加的是第二个规格中的标签
						//重新渲染表格
						let datass2 = []
						for(var k = 0; k < this.specList[0].items.length; k++) {
							for(var j = 0; j < this.specList[1].items.length; j++) {
								for(var i = 0; i < this.specList[2].items.length; i++) {
									datass2.push({
										id:'',
										names: this.specList[0].items[k],
										names2: this.specList[1].items[j],
										names3: this.specList[2].items[i],
										price:'',
							            stock:''
									})
								}
							}
						}
						this.tableData = datass2
						this.spanNum = this.specList[1].items.length
					} else if(index == 2) { //添加的是第三个规格中的标签
						//将第三列的  规格名称  添加到表格的列名中 
						if(this.specList[index].items.length == 1) { //第三列的规格中只有一个 二级规格时
							//添加第三列内容  在cols 中插入新的一列
							this.cols.push({
								label: this.specList[index].name,
								prop: 'names3'
							})
							let data3 = []
							for(var e = 0; e < this.specList[index - 2].items.length; e++) {
								for(var s = 0; s < this.specList[index - 1].items.length; s++) {
									data3.push({
										id:'',
										names: this.specList[index - 2].items[e],
										names2: this.specList[index - 1].items[s],
										names3: this.specList[index].items[0],
										price:'',
							            stock:''
									})
								}
							}
							this.tableData = data3
						} else { //第三列规格  有两个或者是多个二级规格
							let datass = []
							for(var k = 0; k < this.specList[index - 2].items.length; k++) {
								for(var j = 0; j < this.specList[index - 1].items.length; j++) {
									for(var i = 0; i < this.specList[index].items.length; i++) {
										datass.push({
											id:'',
											names: this.specList[index - 2].items[k],
											names2: this.specList[index - 1].items[j],
											names3: this.specList[index].items[i],
											price:'',
							                stock:''
										})
									}
								}
							}
							this.tableData = datass
							this.spanNum2 = this.specList[index].items.length
						}
					}
				}

			},
			//合并单元格
			tableSpanMethod: function({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(this.specList.length == 2 && this.specList[1].items.length >= 2 || this.specList.length == 3 && this.specList[2].items.length <= 1 && this.specList[1].items.length >= 2) { //只有添加了第二个规格  且第二个规格的二级分类有两个或者是多个时  才需要合并单元格
					if(columnIndex === 0) {
						this.spanNum = parseInt(this.spanNum)
						if((rowIndex + 1) % this.spanNum == 1) {
							return {
								rowspan: this.spanNum, //合并的行数
								colspan: 1
							}
						} else {
							return {
								rowspan: 0,
								colspan: 0
							}
						}
					}
				} else if(this.specList.length == 3 && this.specList[2].items.length >= 2 && this.specList[1].items.length >= 2) {
					//需要对两列  进行  行合并
					//第一列的行合并
					this.spanNum = parseInt(this.spanNum)
					this.spanNum2 = parseInt(this.spanNum2)
					let heNum = this.spanNum * this.spanNum2
					if(columnIndex === 0) {
						if((rowIndex + 1) % heNum == 1) {
							return {
								rowspan: heNum,
								colspan: 1
							}
						} else {
							return {
								rowspan: 0,
								colspan: 0
							}
						}
					}
					if(columnIndex === 1) {
						if((rowIndex + 1) % this.spanNum2 == 1) {
							return {
								rowspan: this.spanNum2,
								colspan: 1
							}
						} else {
							return {
								rowspan: 0,
								colspan: 0
							}
						}
					}
				} else if(this.specList.length == 3 && this.specList[2].items.length >= 2 && this.specList[1].items.length == 1) { //第二个二级规格 只有一个产品规格时   
					//只需要按照第三个规格中的产品规格名称的个数进行合并
					this.spanNum2 = parseInt(this.spanNum2)
					//对第一列 跟第二列 进行合并
					if(columnIndex === 0 || columnIndex === 1) {
						if((rowIndex + 1) % this.spanNum2 == 1) {
							return {
								rowspan: this.spanNum2,
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
			addSepc(index) {
				// 如果是第三个就不增加输入框
				if(this.tableData.length > 0 || this.cols.length >= 2) {
					if(this.specList.length === 3) {
						this.$message({
							message: '最多只能添加三个规格',
							type: 'warning'
						});
						return
					} else {
						this.specList.push({
							name: '',
							items: []
						})
					}
				}else {
					this.$message({
							message: '请正确添加规格信息',
							type: 'warning'
					});
				}
			},
			// 规格中 二级规格的删除(小标签的删除)
			deleteName(i, index, itemr) { //i表示items[]中的索引  index表示specList中的索引 itemr //对应的标签值
				//只有一个规格时
				if(this.specList.length == 1) {
					this.specList[index].items.splice(i, 1)
					//只有一个二级规格时
					//将表格中的对应项删除
					for(var q = 0; q < this.tableData.length; q++) {
						if(itemr == this.tableData[q].names) {
							this.tableData.splice(q, 1)
							return
						}
					}
					this.cols[0].label = ''
					this.ifShowHeader = false
				} else if(this.specList.length == 2) { //有两个规格时
					if(index == 0) { //删的是第一个规格中的二级规格名称
						//如果第一个规格只有一个二级产品规格时
						if(this.specList[index].items.length == 1) {
							//只有一个标签时  就删除整个列
							let newCols = [{
								label: this.specList[1].name, //显示的第二列的内容
								prop: 'names'
							}]
							this.cols = newCols
							this.specList.splice(index, 1)
							//重新渲染表格
							let tablet = []
							for(var i = 0; i < this.tableData.length; i++) {
								let nameObj = {
									id:'',
									names: '',
									price:'',
							        stock:''
								}
								nameObj.names = this.tableData[i].names2
								tablet.push(nameObj)
							}
							this.tableData = tablet
						} else if(this.specList[index].items.length >= 2) { //第一个规格中有两个或者是两个以上产品规格时
							this.specList[0].items.splice(i, 1)
							//重新渲染表格数据
							let _table = []
							for(var k = 0; k < this.specList[0].items.length; k++) {
								for(var j = 0; j < this.specList[1].items.length; j++) {
									_table.push({
										id:'',
										names: this.specList[0].items[k],
										names2: this.specList[1].items[j],
										price:'',
							            stock:''
									})
								}
							}
							this.tableData = _table
						}
					} else if(index == 1) { //删的是第二个规格中的二级规格
						//第二个二级规格中只有一个产品规格名称
						if(this.specList[1].items.length == 1) {
							//删除表格的一列
							this.cols.splice(index, 1)
							this.specList.splice(index, 1)
						} else if(this.specList[1].items.length >= 2) { //有两个或者是多个二级规格
							this.specList[1].items.splice(i, 1)
							let table = this.tableData
							for(var a = 0; a < this.tableData.length; a++) {
								if(itemr == table[a].names2) {
									table.splice(a, 1)
								}
							}
							this.tableData = table
							this.spanNum = this.specList[1].items.length
						}
					}
				} else if(this.specList.length == 3) { //有三个规格时
					if(index == 0) { //删除第一个规格中的标签时
						if(this.specList[0].items.length == 1) { //如果第一个规格中 只有一个二级规格  删除整列
							//重新渲染列
							let nCols = [{
								label: this.specList[1].name, //显示的第二列的内容  和第三列的名称
								prop: 'names'
							}, {
								label: this.specList[2].name,
								prop: 'names2'
							}]
							this.cols = nCols
							//重新渲染列表数据
							let ntable = []
							for(var j = 0; j < this.tableData.length; j++) {
								let _obj = {
									id:'',
									names: '',
									names2: '',
									price:'',
							        stock:''
								}
								_obj.names = this.tableData[j].names2
								_obj.names2 = this.tableData[j].names3
								ntable.push(_obj)
							}
							this.tableData = ntable
							this.specList.splice(index, 1)
							this.spanNum = this.spanNum2
						} else if(this.specList[0].items.length >= 2) {
							this.specList[0].items.splice(i, 1)
							//重新渲染表格
							let _data = []
							for(var k = 0; k < this.specList[0].items.length; k++) {
								for(var j = 0; j < this.specList[1].items.length; j++) {
									for(var s = 0; s < this.specList[2].items.length; s++) {
										_data.push({
											id:'',
											names: this.specList[0].items[k],
											names2: this.specList[1].items[j],
											names3: this.specList[2].items[s],
											price:'',
							                stock:''
										})
									}

								}
							}
							this.tableData = _data
						}
					} else if(index == 1) { //删除第二个规格中的标签
						//如果第二个规格中只有一个二级规格时
						if(this.specList[1].items.length == 1) {
							//重新渲染第二列
							let _cols = [{ //显示第一列和第三列的名称内容
								label: this.specList[0].name,
								prop: 'names'
							}, {
								label: this.specList[2].name,
								prop: 'names2'
							}]
							this.cols = _cols
							//重新渲染表格
							let _tdata = []
							for(var j = 0; j < this.tableData.length; j++) {
								let _objs = {
									id:'',
									names: '',
									names2: '',
									price:'',
							        stock:''
								}
								_objs.names = this.tableData[j].names
								_objs.names2 = this.tableData[j].names3
								_tdata.push(_objs)
							}
							this.tableData = _tdata
							this.specList.splice(index, 1)
							this.spanNum = this.spanNum2
						} else if(this.specList[1].items.length >= 2) { //第二个规格中 有两个或者是两个以上的二级规格时
							this.specList[index].items.splice(i, 1) //删除第二个规格中的标签
							//重新渲染表格  不需要渲染列  需要渲染三列
							//重新渲染表格
							let _datas = []
							for(var k = 0; k < this.specList[0].items.length; k++) {
								for(var j = 0; j < this.specList[1].items.length; j++) {
									for(var s = 0; s < this.specList[2].items.length; s++) {
										_datas.push({
											id:'',
											names: this.specList[0].items[k],
											names2: this.specList[1].items[j],
											names3: this.specList[2].items[s],
											price:'',
							                stock:''
										})
									}

								}
							}
							this.tableData = _datas
							this.spanNum = this.specList[1].items.length
						}
					} else if(index == 2) { //删除第三个规格中的标签
						//第三个规格下边  只有一个产品规格  删除产品规格  相当于删除第三列
						if(this.specList[2].items.length == 1) {
							//删除表格的一列
							this.cols.splice(index, 1)
							this.specList.splice(2, 1) //删除第三列
							this.cols.pop({
								label: this.specList[2].name,
								prop: 'names3'
							})
							//重新渲染 table表格
							let tbls = []
							for(var j = 0; j < this.tableData.length; j++) {
								let _obj = {
									id:'',
									names: '',
									names2: '',
									price:'',
							        stock:''
								}
								_obj.names = this.tableData[j].names
								_obj.names2 = this.tableData[j].names2
								tbls.push(_obj)
							}
							this.tableData = tbls
						} else if(this.specList[2].items.length >= 2) { //第三个规格中有两个或者是多个二级规格时
							this.specList[index].items.splice(i, 1) //删除第二个规格中的标签
							//重新渲染表格
							let _newData = []
							for(var k = 0; k < this.specList[0].items.length; k++) {
								for(var j = 0; j < this.specList[1].items.length; j++) {
									for(var s = 0; s < this.specList[2].items.length; s++) {
										_newData.push({
											id:'',
											names: this.specList[0].items[k],
											names2: this.specList[1].items[j],
											names3: this.specList[2].items[s],
											price:'',
							                stock:''
										})
									}

								}
							}
							this.tableData = _newData
							this.spanNum2 = this.specList[2].items.length
						}
					}
				}
			},
			//删除一级规格  
			delBigClos: function(index) {
				//只有一个一级规格时
				if(this.specList.length == 1) {
					if(this.specList[0].items.length > 0) {
						//删除二级标签  删除一级规格
						this.specList[0].items = []
						this.specList[0].name = ''
						this.tableData = []
					}
				} else if(this.specList.length == 2) { //有两个一级规格
					if(index == 0) { //如果删除的是第一个一级规格
						//重新渲染列
						this.cols = [{
							label: this.specList[1].name, //显示第二个一级规格的名字
							prop: 'names'
						}]
						//重新渲染表格
						let btable = []
						//表格显示第二列的数据
						for(var i = 0; i < this.specList[1].items.length; i++) {
							let bObj = {
								id:'',
								names: '',
								price:'',
							    stock:''
							}
							bObj.names = this.specList[1].items[i]
							btable.push(bObj)
						}
						this.tableData = btable
						this.specList.splice(0, 1)
					} else if(index == 1) { //如果删除的是第二个
						//重新渲染列
						this.cols = [{
							label: this.specList[0].name, //显示第一列一级规格的名字
							prop: 'names'
						}]
						//重新渲染表格
						let btable = []
						//表格显示第二列的数据
						for(var i = 0; i < this.specList[0].items.length; i++) {
							let bObj = {
								id:'',
								names: '',
								price:'',
							    stock:''
							}
							bObj.names = this.specList[0].items[i]
							btable.push(bObj)
						}
						this.tableData = btable
						this.specList.splice(1, 1)
					}
				} else if(this.specList.length == 3) { //有三个一级规格
					if(index == 0) { //删除的是第一个一级规格   
						//重新渲染列  
						this.cols = [{
							label: this.specList[1].name, //显示第二个一级规格的名字
							prop: 'names'
						}, {
							label: this.specList[2].name, //显示第san个一级规格的名字
							prop: 'names2'
						}]
						//重新渲染表格
						let _ttable = []
						for(let i = 0; i < this.specList[1].items.length; i++) {
							for(let j = 0; j < this.specList[2].items.length; j++) {
								let _bo = {
									id:'',
									names: '',
									names2: '',
									price:'',
							        stock:''
								}
								_bo.names = this.specList[1].items[i]
								_bo.names2 = this.specList[2].items[j]
								_ttable.push(_bo)
							}
						}
						this.tableData = _ttable
						this.specList.splice(0, 1)
						this.spanNum = this.specList[1].items.length
					} else if(index == 1) {
                        //删除的是第二个一级规格
                        //重新渲染列
                        this.cols = [{
							label: this.specList[0].name, //显示第一个一级规格的名字
							prop: 'names'
						}, {
							label: this.specList[2].name, //显示第三个一级规格的名字
							prop: 'names2'
						}]
                        //重新渲染表格
                        let _ttables = []
						for(let i = 0; i < this.specList[0].items.length; i++) {
							for(let j = 0; j < this.specList[2].items.length; j++) {
								let _bos = {
									id:'',
									names: '',
									names2: '',
									price:'',
							        stock:''
								}
								_bos.names = this.specList[0].items[i]
								_bos.names2 = this.specList[2].items[j]
								_ttables.push(_bos)
							}
						}
						this.tableData = _ttables
						this.specList.splice(1, 1)
						this.spanNum = this.specList[2].items.length
					} else if(index == 2) {
                        //删除的是第三个一级规格
                        this.cols = [{
							label: this.specList[0].name, //显示第一个一级规格的名字
							prop: 'names'
						}, {
							label: this.specList[1].name, //显示第三个一级规格的名字
							prop: 'names2'
						}]
                        //重新渲染表格
                        let _ttabless = []
						for(let i = 0; i < this.specList[0].items.length; i++) {
							for(let j = 0; j < this.specList[1].items.length; j++) {
								let _boss = {
									id:'',
									names: '',
									names2: '',
									price:'',
							        stock:''
								}
								_boss.names = this.specList[0].items[i]
								_boss.names2 = this.specList[1].items[j]
								_ttabless.push(_boss)
							}
						}
						this.tableData = _ttabless
						this.specList.splice(2, 1)
					}
				}
			},
			//批量添加
			batchAdd:function(){
				if(this.pPrice || this.pStock){
					//点击批量添加  渲染表格
					for(var i=0;i<this.tableData.length;i++){
						this.tableData[i].price = this.pPrice
						this.tableData[i].stock = this.pStock
					}
				}
			}
		}
	}
</script>
<style scoped>
	.spec_add {
		width: 100%;
		height: 100%;
		font-size: 14px;
		padding: 40px 0 0 60px;
	}
	
	.spec_add_top {
		display: flex;
		align-items: flex-start;
	}
	
	.form_box {
		width: 30%;
		display: inline-block;
	}
	
	.spec_add .form_box .el-form {
		height: 100%;
	}
	
	.ipt {
		width: 80%;
	}
	
	.add {
		font-size: 1em;
		color: #00b4ff;
		display: inline-block;
		cursor: pointer;
		width: 10%;
	}
	
	.addSepc {
		/* width: 32em; */
		height: 2.75em;
		border: 1px solid #00b4ff;
		color: #ffffff;
		background-color: #00b4ff;
		margin-left: .5em;
		margin-bottom: 1em
	}
	
	.submit {
		margin-top: 3em;
	}
	
	.squre {
		display: inline-block;
		min-width: 6em;
		height: 2em;
		line-height: 2em;
		text-align: center;
		border-radius: 2em;
		border: 1px solid #999999;
	}
	
	.spec_add .squre i {
		margin-left: 0.5em;
	}
	
	.dis-inline {
		display: inline;
	}
	
	.btn {
		width: 6em;
		height: 2em;
		border: 0;
		background: #00b4ff;
		color: #fff;
		border-radius: .5em;
		margin-left: 24%;
	}
	
	.btn2 {
		width: 6em;
		height: 2em;
		border: 0;
		background: #FF3144;
		color: #fff;
		border-radius: .5em;
		margin-left: 10%;
		outline: none
	}
	.piliang{
		width:100%;
		margin-top:2em;
		margin-bottom:2em;
		margin-left:3em;
		content:'';
		block:table;
		clear:both;
	}
	.piliang p{
		float:left;
	}
</style>