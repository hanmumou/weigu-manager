<template>
	<div class="app-container">
		<div class="goods-container">
			<div class="goodslist-box">
				<el-tabs v-model="activeName" type="card" @tab-click="changeTab">
					<el-tab-pane label="未上架产品" name="first">
						<div class="first_form">
							<el-form :inline="true">
								<el-form-item label="">
									<el-checkbox v-model="checked" label="全选" name="type" />
								</el-form-item>
								<el-form-item label="开始时间：">
									<el-date-picker v-model="firstForm.start_at" type="date" placeholder="选择开始时间" />
								</el-form-item>
								<el-form-item label="结束时间：">
									<el-date-picker v-model="firstForm.end_at" type="date" placeholder="选择结束时间" />
								</el-form-item>
								<el-form-item label="配送时间：">
									<el-date-picker v-model="firstForm.delivery_at" type="date" placeholder="选择配送时间" />
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="moreUp">批量上架</el-button>
								</el-form-item>
								<el-form-item>
									<el-button type="danger" @click="delForever">永久删除</el-button>
								</el-form-item>
              </el-form>
            </div>
              <!--检索行-->
              <div style="background:#4F5E70;padding-top:10px;padding-left:10px;">
                <el-form :inline="true">
                  <el-form-item label="产品ID：">
                    <el-input v-model="firstForm.id" style="width:80px;"/>
                  </el-form-item>
                  <el-form-item label="产品分类：">
                    <el-select v-model="firstForm.category_id" placeholder="请选择" style="width:150px;">
                      <el-option v-for="item in classifyOptions" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产品名称：">
                    <el-input v-model="firstForm.name" />
                  </el-form-item>
                  <el-form-item label="展示区域：">
                    <el-select v-model="provinceId" @change="selChange"  style="width:120px;">
                      <el-option label="全国" value="" />
                      <el-option v-for="item in regionOptions" :key="item.province_id" :label="item.name" :value="item.province_id" />
                    </el-select>
                    <el-select v-model="firstForm.show_region" placeholder="市" class="area"  style="width:120px;">
                      <el-option v-for="item in cityList" :key="item.city_id" :label="item.name" :value="item.city_id" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="发布时间：">
                    <el-date-picker v-model="firstForm.created_at" type="date" placeholder="请选择发布时间" />
                  </el-form-item>
                  <el-form-item label="开始时间：">
                    <el-date-picker v-model="firstForm.start_time" type="date" placeholder="选择开始时间" />
                  </el-form-item>
                  <el-form-item label="结束时间：">
                    <el-date-picker v-model="firstForm.end_time" type="date" placeholder="选择结束时间" />
                  </el-form-item>
                  <!-- <el-form-item label="上下架状态：">
                    <el-select v-model="firstForm.type">
                      <el-option value="0" label="全部状态"/>
                      <el-option value="1" label="下架状态"/>
                      <el-option value="2" label="上架状态"/>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('firstForm')">搜索</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="text" @click="resetForm('firstForm')">清空搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
						<GoodsTable :table-data="notShevelsGoods" :check-all.sync="checked" @headCallBack="headCall" @clearGoods="delForever"/>
					</el-tab-pane>
          <!--预售商品-->
					<el-tab-pane label="预售中商品" name="second">
						<div class="second_form">
							<el-form :inline="true" >
								<el-form-item label="">
									<el-checkbox v-model="checked" label="全选" name="type" />
								</el-form-item>
								<el-form-item label="开始时间：">
									<el-date-picker v-model="firstForm.start_at" type="date" placeholder="选择开始时间" />
								</el-form-item>
								<el-form-item label="结束时间：">
									<el-date-picker v-model="firstForm.end_at" type="date" placeholder="选择结束时间" />
								</el-form-item>
								<el-form-item label="配送时间：">
									<el-date-picker v-model="firstForm.delivery_at" type="date" placeholder="选择配送时间" />
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="moreUp">批量上架</el-button>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="moreDown">批量下架</el-button>
								</el-form-item>
								<el-form-item>
									<el-button type="danger" @click="delForever">永久删除</el-button>
								</el-form-item>
              </el-form>
            </div>
              <div  style="background:#4F5E70;padding-top:10px;padding-left:10px;">
                <el-form :inline="true">
                  <el-form-item label="产品ID：">
                    <el-input v-model="firstForm.specId" />
                  </el-form-item>
                  <el-form-item label="产品分类：">
                    <el-select v-model="firstForm.classify" placeholder="请选择">
                      <el-option v-for="item in classifyOptions" :key="item.val" :label="item.label" :value="item.val" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产品名称：">
                    <el-input v-model="firstForm.name" />
                  </el-form-item>
                  <el-form-item label="展示区域：">
                    <el-select v-model="firstForm.region">
                      <el-option v-for="item in regionOptions" :key="item.val" :label="item.label" :value="item.val" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="发布时间：">
                    <el-date-picker v-model="firstForm.releaseTime" type="date" placeholder="请选择发布时间" />
                  </el-form-item>
                  <el-form-item label="开始时间：">
                    <el-date-picker v-model="firstForm.start_time" type="date" placeholder="选择开始时间" />
                  </el-form-item>
                  <el-form-item label="结束时间：">
                    <el-date-picker v-model="firstForm.end_time" type="date" placeholder="选择结束时间" />
                  </el-form-item>
                  <el-form-item label="上下架状态：">
                    <el-select v-model="firstForm.type">
                      <el-option value="0" label="全部状态" />
                      <el-option value="1" label="下架状态" />
                      <el-option value="2" label="上架状态" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('firstForm')">搜索</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="text" @click="resetForm('firstForm')">清空搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
						<GoodsTable :table-data="advanceSale" :check-all.sync="checked" @headCallBack="headCall" @clearGoods="delForever"/>
					</el-tab-pane>
          <!--已上架商品-->
					<el-tab-pane label="已上架商品" name="three">
						<div class="three_form">
							<el-form  :inline="true">
								<el-form-item label="">
									<el-checkbox v-model="checked" label="全选" name="type" />
								</el-form-item>
								<el-form-item label="开始时间：">
                <el-date-picker v-model="firstForm.start_at" type="date" placeholder="选择开始时间" />
              </el-form-item>
                <el-form-item label="结束时间：">
                  <el-date-picker v-model="firstForm.end_at" type="date" placeholder="选择结束时间" />
                </el-form-item>
								<el-form-item label="配送时间：">
									<el-date-picker v-model="firstForm.delivery_at" type="date" placeholder="选择配送时间" />
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="moreUp">批量上架</el-button>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="moreDown">批量下架</el-button>
								</el-form-item>
								<el-form-item>
									<el-button type="danger" @click="delForever">永久删除</el-button>
								</el-form-item>
              </el-form>
            </div>
            <div style="background:#4F5E70;padding-top:10px;padding-left:10px;">
              <el-form  :inline="true">
                <el-form-item label="产品ID：">
                  <el-input v-model="firstForm.specId" />
                </el-form-item>
                <el-form-item label="产品分类：">
                  <el-select v-model="firstForm.classify" placeholder="请选择">
                    <el-option v-for="item in classifyOptions" :key="item.val" :label="item.label" :value="item.val" />
                  </el-select>
                </el-form-item>
                <el-form-item label="产品名称：">
                  <el-input v-model="firstForm.name" />
                </el-form-item>
                <el-form-item label="展示区域：">
                  <el-select v-model="firstForm.region">
                    <el-option v-for="item in regionOptions" :key="item.val" :label="item.label" :value="item.val" />
                  </el-select>
                </el-form-item>
                <el-form-item label="发布时间：">
                  <el-date-picker v-model="firstForm.releaseTime" type="date" placeholder="请选择发布时间" />
                </el-form-item>
                <el-form-item label="开始时间：">
                  <el-date-picker v-model="firstForm.start_time" type="date" placeholder="选择开始时间" />
                </el-form-item>
                <el-form-item label="结束时间：">
                  <el-date-picker v-model="firstForm.end_time" type="date" placeholder="选择结束时间" />
                </el-form-item>
                <el-form-item label="上下架状态：">
                  <el-select v-model="firstForm.type">
                    <el-option value="0" label="全部状态" />
                    <el-option value="1" label="下架状态" />
                    <el-option value="2" label="上架状态" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('firstForm')">搜索</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="text" @click="resetForm('firstForm')">清空搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
						<GoodsTable :table-data="onShelvesGoods" :check-all.sync="checked" @headCallBack="headCall" @clearGoods="delForever"/>
					</el-tab-pane>
				</el-tabs>
				<el-button type="primary">返回</el-button>
				<!-- 分页 -->
				<div class="block">
					<el-pagination :total="total" :pager-count="5" :page-size="pagesize" background layout="prev, pager, next" @current-change="current_change" />
				</div>
				<!-- 分页结束 -->
			</div>
		</div>
	</div>
</template>
<script>
	import GoodsTable from './goodsTable'
	import { getGoodsList, getSpecList, changeGoods, getClassList, getArea, getCity, delGoods } from '@/api/goodslist'
    import {bus} from '@/main.js'
	export default {
		components: {
			GoodsTable
		},
		data() {
			return {
				provinceId: '',
				checked: false,
				activeName: 'first',
				firstForm: {
					start_at: '',
					end_at: '',
          start_time: '',
          end_time: '',
					delivery_at: '',
					id: '',
					category_id: '',
					name: '',
					show_region: '',
					created_at: '',
					goods_status: ''
				},
				classifyOptions: [],
				regionOptions: [],
				cityList: [],
				namesArr: [], // 一级要合并数组 [2,0,1,3,0,0] 代表第一二行合并,第三行不变,第四五六行合并,0代表原本的那一行被合并,因此这个列被消除
				namesPos: 0, // 一级要合并数组内容的序号
				fenleisArr: [], // 同上 二级
				fenleisPos: 0,
				checkTable: [],
				goods_status: 1,
				goods_id: [],
				provinceid: '',
				total: 0, // 获取列表数据的长度
				pagesize: 2, // 每页的数据列表
				currentPage: 1, // 默认开始页面
				notShevelsGoods: [], //未上架商品
				advanceSale: [], //预售中商品
				onShelvesGoods: [], //已上架商品
				tabs: '', //切换标签时   标记标签
				sels:''//多选表格时  子组件向父组件传值
			}
		},
		created:function(){
			bus.$on('clearGoods',(sel)=>{
					this.sels=sel
		    })
		},
		mounted: function() {
			this.goodsList(this.currentPage, {
				'goods_status': this.goods_status
			})
			this.getClass()
			this.getP()
		},
		methods: {
			//切换标签时
			async changeTab(tab, ev) {
				this.tabs = tab
				if(tab.name == 'first') {
					this.goods_status = 1
				} else if(tab.name == 'second') {
					this.goods_status = 2
				} else if(tab.name == 'three') {
					this.goods_status = 0
				}
				try {
					const res = await getGoodsList(this.currentPage, {
						'goods_status': this.goods_status
					})
					if(this.goods_status == 1) {
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
						this.notShevelsGoods = res.data
					} else if(this.goods_status == 2) {
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
						this.advanceSale = res.data
					} else if(this.goods_status == 0) {
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
						this.onShelvesGoods = res.data
					}
				} catch(err) {
					console.log(err)
				}

				this.currentPage = 1
			},
			// currentpage改变时会触发
			current_change: function(currentPage) {
				this.currentPage = currentPage
				this.goodsList(this.currentPage, {
					'goods_status': this.goods_status
				})
			},
			// 产品分类列表
			async getClass() {
				try {
					const res = await getClassList()
					this.classifyOptions = res.data
				} catch(err) {
					console.log(err)
				}
			},
			// 获取省市
			async getP() {
				try {
					const res = await getArea(1)
					this.regionOptions = res.data
				} catch(err) {
					console.log(err)
				}
			},
			async selChange(val) {
				const province_id = {
					'province_id': val
				}
				try {
					const res = await getCity(2, JSON.stringify(province_id))
					this.cityList = res.data
				} catch(err) {
					console.log(err)
				}
			},
			// 查询
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this[formName].goods_status = this.goods_status
						this.goodsList(this.currentPage, this[formName])
					}
				})
			},
			// 清空查询项
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			//永久删除  表格中的一行或者是多行
			async delForever(){
				//获取行中商品id
				let ids=[]
				for(let i=0;i<this.sels.length;i++){
					let oid={'goods_id':''}
					oid.goods_id=this.sels[i].id
					ids.push(oid)
				}
				ids=JSON.stringify(ids)
				try{
					await delGoods(ids).then(res=>{
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						//重新渲染列表
						this.headCall()
					})
				}catch(err){
					console.log(err)
				}
			},
			// 接受子组件参数   在子组件中删除表格中的一行商品  修改表格中的商品
			async headCall(msg) { // 回调方法，接收子组件传的参数
				//重新渲染页面
				if(this.tabs) {
					if(this.tabs.name == 'first') {
						this.goods_status = 1
					} else if(this.tabs.name == 'second') {
						this.goods_status = 2
						console.log(this.advanceSale)
					} else if(this.tabs.name == 'three') {
						this.goods_status = 0
					}
				} else {
					this.goods_status = 1
				}
				try {
					const res = await getGoodsList(this.currentPage, {
						'goods_status': this.goods_status
					})
					if(this.goods_status == 1) {
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
						this.notShevelsGoods = res.data
					} else if(this.goods_status == 2) {
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
						this.advanceSale = res.data
					} else if(this.goods_status == 0) {
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
						this.onShelvesGoods = res.data
					}
				} catch(err) {
					console.log(err)
				}
			},
			// 批量上架
			async moreUp() {
				//批量上架   获取id_json
				let gids=[]
				for(let i=0;i<this.sels.length;i++){
					let gido={'goods_id':''}
					gido.goods_id=this.sels[i].id
					gids.push(gido)
				}
				gids=JSON.stringify(gids)
				try {
					await changeGoods(gids, 0).then(res=>{
						this.$message({
							message: '操作成功',
							type: 'success'
						})
						this.headCall()
					})
				} catch(err) {
					console.log(err)
				}
			},
			// 批量下架
			async moreDown() {
				//批量下架
				let gids=[]
				for(let i=0;i<this.sels.length;i++){
					let gido={'goods_id':''}
					gido.goods_id=this.sels[i].id
					gids.push(gido)
				}
				gids=JSON.stringify(gids)
				try {
					await changeGoods(gids, 1).then(res=>{
						this.headCall()
						this.$message({
							message: '操作成功',
							type: 'success'
						})
					})

				} catch(err) {
					console.log(err)
				}
			},
			// 列表
			async goodsList(dev, data) {
				try {
					await getGoodsList(this.currentPage, {
						'goods_status': this.goods_status
					}).then(res=>{
            for(let i=0;i<res.data.length;i++){
              var areaStr = ''
              var comStr = ''
              for(let akey in res.data[i].goods_show_region){
                areaStr += res.data[i].goods_show_region[akey] + ','
              }
              for(let ckey in res.data[i].goods_show_commander){
                comStr += res.data[i].goods_show_commander[ckey] + ','
              }
              res.data[i].goods_show_region = areaStr
              res.data[i].goods_show_commander = comStr
            }
            this.notShevelsGoods = res.data
            this.pagesize = res.meta.pagination.per_page
            this.total = res.meta.pagination.total
          })
				} catch(err) {
					console.log(err)
				}

			}
		}
	}
</script>
<style>
	.goodslist-box {
		width: 100%;
		height: 100%;
		font-size: 14px;
	}

	.goodslist-box .el-tabs__header {
		margin: 0 !important;
	}

	.goodslist-box .first_form,
	.goodslist-box .second_form,
	.goodslist-box .three_form {
		width: 100%;
		background-color: rgb(48, 65, 86);
		padding: 20px;
	}

	.goodslist-box .first_form .el-form-item__label,
	.goodslist-box .second_form .el-form-item__label,
	.goodslist-box .three_form .el-form-item__label {
		color: #fff;
	}
  .goodslist-box .el-form-item__label{
    color: #fff;
  }
	/* .first_form .el-form-item__label{
  color: #ffffff !important;
} */

	.goodslist-box .ipt {
		width: 7em;
	}

	.goodslist-box .tips {
		font-size: 14px;
		color: #999999;
	}

	.goodslist-box #tab-first,
	.goodslist-box #tab-second,
	.goodslist-box #tab-three {
		border-radius: 4px 4px 0 0;
	}

	.goodslist-box #tab-first {
		background: #a6a9ad;
	}

	.goodslist-box #tab-second {
		/*background: #67c23a;*/
		background: #a6a9ad;
	}

	.goodslist-box #tab-three {
		background: #a6a9ad;
	}

	.goodslist-box .el-checkbox__label {
		color: #fff;
	}

	.goodslist-box .el-select {
		width: 185px;
	}

	.goodslist-box .el-tabs__nav .is-active {
		color: #fff;
	}

	.goodslist-box .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		background: #67c23a !important;
	}

	.goodslist-box .el-tabs__item {
		color: #fff;
	}

	.goodslist-box .el-tabs__item:hover {
		/*color:#409EFF;*/
	}
	/* 分页设置 */

	.block {
		text-align: center;
		margin-top: 20px;
		margin-right: 144px;
	}
</style>
<!--<style lang="css" scoped>-->
  <!--.el-form-item__label{-->
    <!--color:#000 !important;-->
  <!--}-->
<!--</style>-->
