<template>
  <div class="app-container">
    <div class="usermana-from">
      <el-form :model="userForm" :inline="true" class="demo-form-inline">
        <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
        <el-button class="select-all" @click="toggleSelection(tableData3)">全选表格</el-button>
        <div class="export">
          <el-button size="medium" type="primary" @click="exportExcel">导出会员列表</el-button>
        </div>
        <el-form-item label="用户ID：">
          <el-input v-model="userForm.id" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item label="用户姓名：">
          <el-input v-model="userForm.name" placeholder="请输入用户姓名"/>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="userForm.phone" placeholder="请输入用户电话"/>
        </el-form-item>
        <el-form-item label="条件查询：">
          <!-- <el-select :model="status" placeholder="全部">
            <el-option value="" label="全部"/>
            <el-option value="0" label="消费金额"/>
            <el-option value="1" label="注册时间"/>
          </el-select> -->
          <el-button type="primary" @click="chanagelist">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      id="#exportexcel"
      ref="multipleTable"
      :data="tableData3"
      :row-class-name="tableRoWClassName"
      tooltip-effect="dark"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"/>
      <el-table-column
        prop="id"
        label="用户ID"
        align="center"/>
      <el-table-column
        prop="avatar_url"
        label="微信头像"
        align="center">
        <template slot-scope="props">
          <img :src="props.row.avatar_url" width="80%">
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="微信昵称"
        align="center"/>
      <el-table-column
        prop="name"
        align="center"
        label="姓名"
        show-overflow-tooltip/>
      <el-table-column
        prop="phone"
        align="center"
        label="电话"
        show-overflow-tooltip/>
      <el-table-column
        align="center"
        width="400"
        label="所属团长"
        show-overflow-tooltip>
        <template slot-scope="props">
          <p>{{ props.row.regimental_commander_data.name }}</p>
          <p>{{ props.row.regimental_commander_data.phone }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="400"
        label="取货地址"
        show-overflow-tooltip>
        <template slot-scope="props">
          <p v-for="userList in props.row.user_adress_data" :key="userList">{{ userList.complete_address }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="消费次数"
        show-overflow-tooltip/>
      <el-table-column
        prop="phone"
        align="center"
        label="消费金额"
        show-overflow-tooltip/>
      <el-table-column
        prop="created_at"
        align="center"
        label="注册时间"
        show-overflow-tooltip/>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getuserlist, getlistofconditions } from '@/api/usermanage'

export default {
  data() {
    return {
      userForm: {
        id: '', // 用户id
        name: '', // 用户姓名
        phone: '', // 用户电话
        conditions: '' // 条件查询
      }, // 绑定数据
      tableData3: [{
        date: '',
        name: '',
        address: '',
        phone: ''
      }],
      multipleSelection: [],
      status: '',
      selection: ''
    }
  },
  // 钩子函数
  created() {
    this.getUserList()
  },
  methods: {
    // 表格隔行显示不同颜色
    tableRoWClassName({ row, rowIndex }) {
      if ((rowIndex % 2) === 1) {
        return 'success-row'
      } else if ((rowIndex % 2) === 0) {
        return 'warning-row'
      }
    },
    // 表格全选操作
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 取消选择操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 导出Excel
    exportExcel() {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.getElementById('#exportexcel'))
      /* get binary string as output */
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '会员列表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    // 获取用户列表
    async getUserList() {
      try {
        const res = await getuserlist()
        this.tableData3 = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 通过条件查询列表
    async chanagelist() {
      const id = this.userForm.id
      const name = this.userForm.name
      const phone = this.userForm.phone
      console.log(this.userForm)
      try {
        const res = await getlistofconditions(id, name, phone)
        this.tableData3 = res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
 .export{
   display: inline;
 }
 .usermana-from{
   width: 100%;
   padding-top: 20px;
   padding-left: 82px;
   background:rgb(48, 65, 86);
 }
/* label绑定字的样式 */
.usermana-from .el-form-item__label{
  color:#FFFFFF;
}
.el-table .warning-row {
  background: #FDEEE4;
}

.el-table .success-row {
  background: #FFFFFF;
}
.select-all{
  margin-right: 30px;
}
</style>

