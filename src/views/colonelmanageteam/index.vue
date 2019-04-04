<template>
  <div class="app-container">
    <!-- 团长团队总容器 -->
    <div class="team-container">
      <!-- 导出和搜索 -->
      <div class="teamSearch">
        <!-- 将它们设置为一行 -->
        <el-row>
          <!-- 导出和全选 -->
          <el-col :span="4" style="padding:22px;">
            <!-- 全选框 -->
            <el-button class="select-all" style="margin:0;" @click="getList(teamList)">全选表格</el-button>
            <!-- 导出团长列表 -->
            <el-button type="primary" style="margin:0;" size="medium">导出团队列表</el-button>
          </el-col>
          <!-- 搜索 -->
          <el-col :span="20" style="padding:22px;">
            <!-- 表单元素查询 -->
            <el-form :inline="true">
                  <!-- 团长所在区域 -->
                  <el-form-item label="所在区域：">
										<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
											<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
										</el-select>
										<el-select placeholder="请选择所在区域" v-model="city.city_id">
											<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
										</el-select>
									</el-form-item>
                  <!-- 团长姓名 -->
                  <el-form-item label="团长姓名：">
                    <el-input placeholder="请输入团长姓名" v-model="com_name"/>
                  </el-form-item>
                  <!-- 团长电话 -->
                  <el-form-item label="团长电话：">
                    <el-input placeholder="请输入团长电话" v-model="com_phone"/>
                  </el-form-item>
                  <!-- 搜索 -->
                  <el-button type="primary" size="medium" @click="seachTeamList">搜索</el-button>
                  <!-- 清空搜索 -->
                  <el-button type="text" @click="clearCon">清空搜索</el-button>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <!-- 团长列表数据表格 -->
      <el-table ref="table" :data="teamList"  width="100%" row-class-name="rowClass">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55" align="center"/>
        <!-- 团长ID -->
        <el-table-column label="团长ID" align="center" prop="commander_id"/>
        <!-- 姓名 -->
        <el-table-column label="姓名" align="center" prop="commander_name"/>
        <!-- 电话 -->
        <el-table-column label="电话" align="center" prop="commander_phone"/>
        <!-- 地区 -->
        <el-table-column label="地区" align="center" prop="commander_address"/>
        <!-- 团队总销售 -->
        <el-table-column label="团队总销售" align="center" prop="team_sale_total"/>
        <!-- 团队预得佣金 -->
        <el-table-column label="团队预得佣金" align="center" prop="team_commission_total"/>
        <!-- 团队已得佣金 -->
        <el-table-column label="团队可提佣金" align="center" prop="team_actually_commission_total"/>
        <!-- 推广佣金 -->
        <el-table-column label="队长推荐佣金" align="center" prop="commander_recommend_total"/>
        <!-- 已提佣金 -->
        <el-table-column label="队长已提佣金" align="center" prop="commander_pull_total"/>
        <!-- 剩余佣金 -->
        <el-table-column label="队长剩余佣金" align="center" prop="commander_surplus_total"/>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="props">
            <el-button type="primary" @click="handleCheck(props.row)">展开</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="show" type="expand" width="100px">
          <template slot-scope="props">
            <el-table :data="props.row.team_user_list">
              <!-- 团长id -->
              <el-table-column label="团长ID" align="center" prop="team_user_id"/>
              <!-- 姓名 -->
              <el-table-column label="姓名" align="center" prop="team_user_name"/>
              <!-- 电话 -->
              <el-table-column label="电话" align="center" prop="team_user_phone"/>
              <!-- 地区 -->
              <el-table-column label="地区" align="center" prop="tean_user_address"/>
              <!-- 总销售 -->
              <el-table-column label="总销售" align="center" prop="team_user_sale_total"/>
              <!-- 预得佣金 -->
              <el-table-column label="预得佣金" align="center" prop="team_actually_commission_amount"/>
              <!-- 已得佣金 -->
              <el-table-column label="已得佣金" align="center" prop="team_user_get_total"/>
              <!-- 已提佣金 -->
              <el-table-column label="已提佣金" align="center" prop="team_user_pull_total"/>
              <!-- 剩余佣金 -->
              <el-table-column label="剩余佣金" align="center" prop="commission_amount"/>
              <!-- 推广佣金 -->
              <el-table-column label="队长可提佣金" align="center" prop="team_commander_user_total"/>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getListByCon } from '@/api/colonelmanageteam'
import { getPro } from '@/api/colonelist'
export default {
  data() {
    return {
      teamList:[],
      show: true,
      tableSelect: [],
      colonel_region: '',
      colonel_status: '',
      expands: [],
      province:'',//省
      city:'',//市
      com_name:'',//团长姓名
      com_phone:''//团长电话
    }
  },
  mounted: function() {
    //this.expands.push(this.teamList[0].id)
    this.getTeamList()
    this.getProvince()
  },
  methods: {
    //清楚搜索
    clearCon(){
      this.province = ''
      this.city = ''
      this.com_name = ''
      this.com_phone = ''
      this.getTeamList()
    },
    handleCheck(row) {
      const $table = this.$refs.table
      $table.toggleRowExpansion(row)
      if (this.show === true) {
        this.show = false
      }
    },
    handleSelectionChange(val) {
      this.tableSelect = val
    },
    getList(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    openList(row) {
      if (row.isTrusted === true) {
        row.isTrusted = false
      }
    },
    // 获取列表
    async getTeamList() {
       try{
          await getList().then(res=>{
             this.teamList = res.data
          })
       }catch(err){
         console.log(err)
       }
    },
    //根据条件搜索团队
    async seachTeamList(){
      try{
        await getListByCon(this.province.province_id,this.city.city_id,this.com_name,this.com_phone).then(res=>{
          this.teamList = res.data
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
  }
}
</script>

<style>
.team-container .teamSearch{
  background:rgb(48, 65, 86);
}
.team-container .teamSearch .el-form-item__label{
  color:#fff;
}
.el-table__expand-column .cell {
  display: none;
}
.rowClass{
  background-color:#c5c9cf !important;
}
</style>


