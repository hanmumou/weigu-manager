<template>
  <!--列表-->
  <div>
     <div class="list-title">
        <div>
          <el-button type="primary" size="mini" @click="creatNew">新建</el-button>
          <el-button type="primary" size="mini" @click="deleteItem">删除</el-button>
          <el-button type="primary" size="mini">刷新</el-button>
        </div>
       <div>
         <el-form :inline="true"  class="demo-form-inline">
           <el-form-item label="名称">
             <el-input  placeholder="名称"></el-input>
           </el-form-item>
           <el-form-item label="编码">
             <el-input  placeholder="编码"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary">查询</el-button>
           </el-form-item>
         </el-form>
       </div>
     </div>
     <!--列表数据-->
    <el-table :data="dictionlist" tooltip-effect="dark" style="width: 90%;margin-left:20px;"
      @selection-change="handleSelectionChange" border size="mini">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="ID"  width="100" prop="id"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="dictype" label="类型"></el-table-column>
      <el-table-column prop="weight" label="权重"></el-table-column>
      <el-table-column prop="oid" label="旧ID" width="250"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editData(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div style="margin-top:20px;">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
      style="width:15%;margin-left:25%;" @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import {getDictionList, deleteData} from '@/api/dictionmanage'
    export default {
        data(){
          return{
            dictionlist:[],
            currentPage:1,
            total:0,
            pageSize:5,
            chooseItem:[]
          }
        },
      methods:{
          //换页
        changePage(page){
          this.currentPage = page
          this.getList()
        },
        handleSelectionChange(sel){
          this.chooseItem = sel
        },
        //新建
        creatNew(){
          this.$router.push('/adddiction/index')
        },
        //删除
        async deleteItem(){
          let ids = []
          if(this.chooseItem.length != 0){
            this.chooseItem.forEach((item)=>{
              ids.push(item.id)
            })
          }
          console.log(ids)
          try{
            await deleteData(ids).then(res=>{
              console.log(res)
              this.getList()
            })
          }catch(err){
            console.log(err)
          }
        },
        //修改
        editData(row){
          let id = row.id
          this.$router.push({
            path:'/adddiction/index',
            query:{
              id:id
            }
          })
        },
        async getList(){
          try{
            await getDictionList(this.currentPage).then(res=>{
              this.dictionlist = res.items
              this.total = res.total
            })
          }catch(err){
            console.log(err)
          }
        }
      },
      mounted(){
        this.getList()
      }
    }
</script>

<style scoped>
.list-title{
  display:flex;
  flex-direction: row;
  justify-content:space-between ;
  margin-top:20px;
  padding:0 20px;
}
</style>
