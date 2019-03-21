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
              <!-- 设置一行 -->
              <el-row>
                <!-- 设置三列盛放各个表单元素 -->
                <el-col :span="10">
                  <!-- 团长所在区域 -->
                  <el-form-item label="所在区域：">
										<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
											<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
										</el-select>
										<el-select placeholder="请选择所在区域" v-model="city.city_id">
											<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
										</el-select>
									</el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- 团长姓名 -->
                  <el-form-item label="团长姓名：">
                    <el-input placeholder="请输入团长姓名"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- 团长电话 -->
                  <el-form-item label="团长电话：">
                    <el-input placeholder="请输入团长电话"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 重新设置一行 -->
              <el-row>
                <!-- 设置三列盛放各个表单元素 -->
                <el-col :span="8">
                  <!-- 申请时间 -->
                  <el-form-item label="申请时间：">
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-d"
                      value-format="yyyy-MM-d"
                      placeholder="请输入申请时间"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <!-- 团长状态 -->
                  <el-form-item label="团长状态：">
                    <el-select v-model="colonel_status"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <!-- 搜索 -->
                  <el-button type="primary" size="medium">搜索</el-button>
                  <!-- 清空搜索 -->
                  <el-button type="text">清空搜索</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <!-- 团长列表数据表格 -->
      <el-table
        ref="table"
        :data="teamList"
        border
        width="100%">
        <!-- 多选框 -->
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <!-- 团长ID -->
        <el-table-column
          label="团长ID"
          align="center"
          prop="id"/>
        <!-- 姓名 -->
        <el-table-column
          label="姓名"
          align="center"
          prop="name"/>
        <!-- 电话 -->
        <el-table-column
          label="电话"
          align="center"
          prop="phone"/>
        <!-- 地区 -->
        <el-table-column
          label="地区"
          align="center"
          prop="region"/>
        <!-- 团队总销售 -->
        <el-table-column
          label="团队总销售"
          align="center"
          prop="team_all_sales"/>
        <!-- 团队预得佣金 -->
        <el-table-column
          label="团队预得佣金"
          align="center"
          prop="team_adv_commission"/>
        <!-- 团队已得佣金 -->
        <el-table-column
          label="团队已得佣金"
          align="center"
          prop="team_have_commission"/>
        <!-- 推广佣金 -->
        <el-table-column
          label="推广佣金"
          align="center"
          prop="team_pro_commission"/>
        <!-- 已提佣金 -->
        <el-table-column
          label="已提佣金"
          align="center"
          prop="team_men_commission"/>
        <!-- 剩余佣金 -->
        <el-table-column
          label="剩余佣金"
          align="center"
          prop="team_rem_commission"/>
        <!-- 操作 -->
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="props">
            <el-button type="primary" @click="handleCheck(props.row)">展开</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="show"
          type="expand"
          width="100px">
          <template slot-scope="props">
            <el-table :data="props.row.nextList">
              <!-- 团长id -->
              <el-table-column
                label="团长ID"
                align="center"
                prop="id"/>
              <!-- 姓名 -->
              <el-table-column
                label="姓名"
                align="center"
                prop="name"/>
              <!-- 电话 -->
              <el-table-column
                label="电话"
                align="center"
                prop="phone"/>
              <!-- 地区 -->
              <el-table-column
                label="地区"
                align="center"
                prop="region"/>
              <!-- 总销售 -->
              <el-table-column
                label="总销售"
                align="center"
                prop="all_sales"/>
              <!-- 预得佣金 -->
              <el-table-column
                label="预得佣金"
                align="center"
                prop="adv_commission"/>
              <!-- 已得佣金 -->
              <el-table-column
                label="已得佣金"
                align="center"
                prop="have_commission"/>
              <!-- 已提佣金 -->
              <el-table-column
                label="已提佣金"
                align="center"
                prop="men_commission"/>
              <!-- 剩余佣金 -->
              <el-table-column
                label="剩余佣金"
                align="center"
                prop="rem_commission"/>
              <!-- 推广佣金 -->
              <el-table-column
                label="推广佣金"
                align="center"
                prop="pro_commission"/>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/colonelmanageteam'
import { getPro } from '@/api/colonelist'
export default {
  data() {
    return {
      teamList: [{
        id: '1', // 团长id
        name: '王小虎', // 姓名
        phone: '13032684132', // 电话
        region: '裕华区', // 地区
        team_all_sales: '1000', // 团队总销售
        team_adv_commission: '1000', // 团队预得佣金
        team_have_commission: '1000', // 团队已得佣金
        team_pro_commission: '1000', // 团队推广佣金
        team_men_commission: '1000', // 团队已提佣金
        team_rem_commission: '1000', // 团队剩余佣金
        nextList: [
          {
            id: '2', // 团长id
            name: '李小虎', // 姓名
            phone: '13032684133', // 电话
            region: '桥西区', // 地区
            all_sales: '2000', // 总销售
            adv_commission: '3000', // 预得佣金
            have_commission: '4000', // 已得佣金
            men_commission: '5000', // 已提佣金
            rem_commission: '6000', // 剩余佣金
            pro_commission: '7000' // 推广佣金
          },
          {
            id: '2', // 团长id
            name: '李小虎', // 姓名
            phone: '13032684133', // 电话
            region: '桥西区', // 地区
            all_sales: '2000', // 总销售
            adv_commission: '3000', // 预得佣金
            have_commission: '4000', // 已得佣金
            men_commission: '5000', // 已提佣金
            rem_commission: '6000', // 剩余佣金
            pro_commission: '7000' // 推广佣金
          }
        ]
      },
      {
        id: '3', // 团长id
        name: '王小虎', // 姓名
        phone: '13032684132', // 电话
        region: '裕华区', // 地区
        team_all_sales: '1000', // 团队总销售
        team_adv_commission: '1000', // 团队预得佣金
        team_have_commission: '1000', // 团队已得佣金
        team_pro_commission: '1000', // 团队推广佣金
        team_men_commission: '1000', // 团队已提佣金
        team_rem_commission: '1000', // 团队剩余佣金
        nextList: [{
          id: '4', // 团长id
          name: '李小虎', // 姓名
          phone: '13032684133', // 电话
          region: '桥西区', // 地区
          all_sales: '2000', // 总销售
          adv_commission: '3000', // 预得佣金
          have_commission: '4000', // 已得佣金
          men_commission: '5000', // 已提佣金
          rem_commission: '6000', // 剩余佣金
          pro_commission: '7000' // 推广佣金
        }]
      }
      ],
      show: true,
      tableSelect: [],
      colonel_region: '',
      colonel_status: '',
      expands: [],
      province:'',//省
      city:''//市
    }
  },
  mounted: function() {
    this.expands.push(this.teamList[0].id)
    this.getTeamList()
    this.getProvince()
  },
  methods: {
    handleCheck(row) {
      const $table = this.$refs.table
      $table.toggleRowExpansion(row)
      console.log(row)
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
      try {
        const res = await getList()
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
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
</style>

