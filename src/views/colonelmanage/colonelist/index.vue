<template>
	<div class="app-container">
		<!-- 团长列表整体容器 -->
		<div class="colonelmanage-container">
			<!-- 团长列表的搜索和导出 -->
			<div class="seaAndExp">
				<!-- 设定一列 -->
				<el-row>
					<!-- 占位4 -->
					<el-col :span="4" class="allExport">
						<!-- 全选和导出 -->
						<el-button @click="toggleSelection(coloneList)">全选</el-button>
						<el-button type="primary">导出团长列表</el-button>
					</el-col>
					<!-- 占位20 -->
					<el-col :span="20" class="conditions">
						<!-- 查询表单 -->
						<el-form ref="coloneForm" :inline="true" :model="coloneForm">
							<!-- 创建一列 -->
							<el-row>
								<!-- 平均分成三份 -->
								<el-col :span="10">
									<!-- 团长所在区域 -->
									<!--省市选择-->
									<el-form-item label="所在区域：">
										<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
											<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
										</el-select>
										<el-select placeholder="请选择所在区域" v-model="city.city_id">
											<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<!-- 团长姓名 -->
									<el-form-item label="团长姓名：">
										<el-input v-model="coloneForm.name" placeholder="请输入团长姓名" />
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<!-- 团长电话 -->
									<el-form-item label="团长电话：">
										<el-input v-model="coloneForm.phone" placeholder="请输入团长电话" />
									</el-form-item>
								</el-col>
							</el-row>
							<!-- 创建一列 -->
							<el-row>
								<!-- 平均分成三份 -->
								<el-col :span="8">
									<!-- 申请时间 -->
									<el-form-item label="申请时间：">
										<el-date-picker v-model="coloneForm.created_at" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<!-- 团长状态 -->
									<el-form-item label="团长状态：">
										<el-select v-model="coloneForm.status" placeholder="全部">
											<el-option :value="''" label="全部" />
											<el-option label="禁用" value="0" />
											<el-option label="启用" value="1" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<!-- 搜索和清空 -->
									<el-button type="primary" @click="setcolonelist()">搜索</el-button>
									<el-button type="text" @click="emptysearch('coloneForm')">清空搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</el-col>
				</el-row>
			</div>
			<!-- 数据表格 -->
			<el-table id="#exportexcel" ref="multipleTable" :data="coloneList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :xs="20" :row-class-name="tableRoWClassName" tooltip-effect="dark" border style="width: 100%">
				<el-table-column type="selection" align="center" />
				<el-table-column prop="community_user_id" label="团长ID" align="center" />
				<el-table-column label="微信头像" align="center">
					<template slot-scope="props">
						<img :src="props.row.community_user_data.avatar_url" height="80%" width="80%">
					</template>
				</el-table-column>
				<el-table-column prop="community_user_data.nickname" label="微信昵称" align="center" />
				<el-table-column prop="name" label="姓名" align="center" />
				<el-table-column prop="phone" label="电话" align="center" />
				<el-table-column prop="area_id" label="地区" align="center" />
				<el-table-column prop="residential_quarters" label="申请小区" align="center" />
				<el-table-column prop="address" label="取货点地址" align="center" />
				<el-table-column prop="created_at" label="申请时间" align="center" />
				<el-table-column prop="status" label="状态" align="center">
					<template slot-scope="props">
						<span v-if="props.row.status===0" style="color:#f56c6c;">禁用</span>
						<span v-if="props.row.status===1" style="color:#67c23a;">启用</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="240">
					<template slot-scope="props">
						<el-button v-if="props.row.status===1" type="danger" size="small" @click="handlestatus(props.row)">关闭</el-button>
						<el-button v-if="props.row.status===0" type="success" size="small" @click="handlestatus(props.row)">开启</el-button>
						<el-button type="primary" size="small" @click="chanagecolone(props.row)">编辑</el-button>
						<el-button type="info" size="small" @click="delColone(props.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="block">
				<el-pagination :total="total" :pager-count="5" :page-size="pagesize" background layout="prev, pager, next" @current-change="current_change" />
			</div>
			<!-- 分页结束 -->
			<!-- 编辑团长资料 -->
			<el-dialog :visible.sync="colonelistDialog" title="编缉团长资料" width="27%" center>
				<el-form ref="coloneData" :model="coloneData" :inline="true" align="center">
					<!-- 团长姓名 -->
					<el-form-item :rules="[
              { required: true, message: '团长姓名不得为空' , trigger: 'blur'}
            ]" prop="name" label="团长姓名：">
						<el-input v-model="coloneData.name" placeholder="请输入团长姓名" />
					</el-form-item>
					<!-- 团长电话 -->
					<el-form-item :rules="[
              { required: true, message: '团长电话不得为空' , trigger: 'blur'}
            ]" prop="phone" label="团长电话：">
						<el-input v-model="coloneData.phone" placeholder="请输入团长电话" />
					</el-form-item>
					<!-- 申请小区 -->
					<el-form-item :rules="[
              { required: true, message: '团长申请小区不得为空' , trigger: 'blur'}
            ]" prop="residential_quarters" label="申请小区：">
						<el-input v-model="coloneData.residential_quarters" placeholder="请输入团长申请小区" />
					</el-form-item>
					<!-- 取货地址 -->
					<el-form-item :rules="[
              { required: true, message: '取货地址不得为空' , trigger: 'blur'}
            ]" prop="address" label="取货地址：">
						<el-input v-model="coloneData.address" placeholder="请输具体提货地点" />
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="submitForm('coloneData')">确 定</el-button>
          <el-button type="info" @click="cancelManage()">取 消</el-button>
        </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { chanagecolone, getPro } from '@/api/colonelist'

	export default {
		data() {
			return {
				coloneForm: {
					area_id: '', // 区域
					name: '', // 姓名
					phone: '', // 电话
					created_at: '', // 开始时间
					status: '' // 状态
				}, // 绑定表单数据
				stardate: '', // 申请时间
				coloneList: [{
					id: '', // ID
					community_user_id: '', // 团长ID
					mini_program_open_appid: '', // 微信小程序ID
					city_id: '', // 城市ID
					province_id: '', // 省ID
					invite_data: [],
					community_user_data: {
						id: 1, // id
						recommender_id: 1, // 推荐id
						regimental_commander_id: '', // 团长ID
						openid: '', // 用户信息
						unionid: '',
						nickname: '', // 微信昵称
						name: '', // 姓名
						phone: '', // 电话
						gender: '',
						city: '', // 城市
						province: '', // 省份
						country: '', // 国家
						avatar_url: '', // 头像地址
						balance: '',
						integral: '',
						mini_program_open_appid: '', // APPID
						created_at: '', // 注册时间
						updated_at: '' // 更新时间
					}, // 团长数据
					area_id: '', // 区域ID
					phone: '', // 申请时间
					name: '', // 姓名
					sort: '', // 排序
					status: '', // 状态
					residential_quarters: '', // 申请小区
					address: '', // 取货点地址
					created_at: '', // 注册时间
					updated_at: '' // 更新时间
				}], // 团长列表表单
				colonelistDialog: false, // 团长列表弹窗
				coloneData: {
					name: '', // 团长姓名
					phone: '', // 团长电话
					community: '', // 申请小区
					goods_address: '' // 取货地址
				}, // 团长编辑
				multipleSelection: [],

				allData: false,
				setstatus: {
					id: '',
					status: ''
				}, // 更改启用禁用的状态
				colone_id: '', // 团长ID
				total: 0, // 获取列表数据的长度
				pagesize: 200, // 每页的数据列表
				currentPage: 1, // 默认开始页面
				province:'',//省
				city:''//市
			}
		},
		// 钩子函数
		created() {
			this.getlist()
			this.getProvince()
		},
		methods: {
			//获取省
			async getProvince() {
				try {
					await getPro(1).then(res=>{
						 let data = res.data
					   this.province = data
					   console.log(this.province) 
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
			// currentpage改变时会触发
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
			// 表格隔行显示不同颜色
			tableRoWClassName({
				row,
				rowIndex
			}) {
				if((rowIndex % 2) === 1) {
					return 'success-row'
				} else if((rowIndex % 2) === 0) {
					return 'warning-row'
				}
			},
			// 表格全选
			toggleSelection(rows) {
				if(rows) {
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
			// 获取团长列表
			async getlist() {
				this.$store.dispatch('getlist').then(() => {
					const res = this.$store.getters.colonelistRes
					this.coloneList = res.data
					this.total = this.coloneList.length
				}).catch((err) => {
					console.log(err)
				})
			},
			// 根据条件查询团长列表
			async setcolonelist() {
				this.$store.dispatch('setcolonelist', this.coloneForm).then(() => {
					const res = this.$store.getters.coloneList
					this.coloneList = res.data
				}).catch((err) => {
					console.log(err)
				})
			},
			// 团长禁用启用
			async handlestatus(row) {
				// 改变状态的值
				if(row.status === 0) {
					row.status = 1
				} else if(row.status === 1) {
					row.status = 0
				}
				// 获取id
				const id = row.id
				// 设定一个对象获取id和status状态码
				this.setstatus.id = id
				this.setstatus.status = row.status
				// 调用接口
				this.$store.dispatch('setconloneStatus', this.setstatus).then(() => {
					if(row.status === 0) {
						this.$message({
							message: '禁用成功',
							type: 'success'
						})
					} else if(row.status === 1) {
						this.$message({
							message: '启用成功',
							type: 'success'
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 删除团长
			async delColone(row) {
				this.$store.dispatch('hadledelcolone', row.id).then(() => {
					this.getlist()
					this.$message({
						message: '删除成功',
						type: 'success'
					})
				}).catch((err) => {
					console.log(err)
				})
			},
			// 判断修改条件是否匹配
			async submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.chanageColoneList()
						this.colonelistDialog = false
						this.$message({
							message: '修改成功',
							type: 'success'
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			// 获取单个团长信息
			chanagecolone(row) {
				this.coloneData = row
				console.log(this.coloneData)
				this.colonelistDialog = true
			},
			// 修改条件
			async chanageColoneList() {
				const id = this.coloneData.id
				const name = this.coloneData.name
				const phone = this.coloneData.phone
				const residential_quarters = this.coloneData.residential_quarters
				const address = this.coloneData.address
				try {
					await chanagecolone(id, name, phone, residential_quarters, address)
				} catch(err) {
					console.log(err)
				}
			},
			// 清空搜索
			emptysearch(coloneForm) {
				this.$refs[coloneForm].resetFields()
			},
			// 取消编辑
			cancelManage() {
				this.colonelistDialog = false
				this.$message('取消修改')
			}
		}
	}
</script>

<style>
	/* 团长列表的搜索和导出容器的样式 */
	
	.colonelmanage-container .seaAndExp {
		background: rgb(48, 65, 86);
		color: #fff;
	}
	/* 团长列表导出全选样式 */
	
	.colonelmanage-container .seaAndExp .allExport {
		padding: 22px;
	}
	/* 团长列表 条件查询 */
	
	.colonelmanage-container .seaAndExp .conditions {
		padding: 22px;
	}
	/* 团长列表条件查询的label标签样式 */
	
	.colonelmanage-container .seaAndExp .el-form-item__label {
		width: 110px;
		color: #fff;
	}
	/* 团长列表条件查询的表单元素样式 */
	
	.colonelmanage-container .seaAndExp .el-select {
		width: 185px;
	}
	
	.colonelmanage-container .seaAndExp .el-date-editor {
		width: 185px;
	}
	/* 团长列表弹窗头部样式 */
	
	.colonelmanage-container .el-dialog__header {
		background: rgb(48, 65, 86);
	}
	/* 团长列表弹窗头部内容样式 */
	
	.colonelmanage-container .el-dialog__title {
		color: #fff;
	}
	/* 分页设置 */
	
	.block {
		text-align: center;
		margin-top: 20px;
		margin-right: 144px;
	}
</style>