<template>
  <div style="padding-left:50px;padding-top:40px;">
    <el-table :data="tableList" style="width: 80%" border row-key="id" size="small" lazy :load="loadTree">
      <el-table-column prop="name" label="类目名称">
         <template slot-scope="scope">
           <img :src="scope.row.icon" alt="" style="width:20px;height:20px;">
           <span>{{scope.row.name}}</span>
         </template>
      </el-table-column>
      <el-table-column prop="top" label="置顶首页">
        <template slot-scope="scope">
          <span v-if="scope.row.top == 'Y'">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="fixed" label="使用年限"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editClass(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteClass(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getTableData, getTreeNode, deleteInfo } from '@/api/tabletree'
  export default {
     data(){
       return {
         tableList: [],
       }
     },
    methods:{
       //编辑表格信息
      editClass(row){
        let id = row.id
        this.$router.push({
          path:'/addclass',
          query:{
            id:id
          }
        })
      },
      //获取表格信息
      async getTableTree(){
        try{
         await getTableData().then(res=>{
           let data = res
          for(let i=0;i<data.length;i++){
            if(data[i].ischild == 0){//0表示有节点  1表示没有节点
               data[i].hasChildren = true
            }else if(data[i].ischild == 1){
              data[i].hasChildren = false
            }
          }
           this.tableList = data
         })
        }catch(err){
          console.log(err)
        }
      },
      //删除
      async deleteClass(row){
        let id = row.id
        await deleteInfo(id).then(res=>{
          this.$message.success('删除成功')
        })
      },
      //加载节点数据
      async loadTree(row, treeNode, resolve){
        let id = row.id
        try{
          await getTreeNode(id).then(res=>{
            let childData = res
            for(let i=0;i<childData.length;i++){
              if(childData[i].ischild == 0){
                childData[i].hasChildren = true
              }else if(childData[i].ischild == 1){
                childData[i].hasChildren = false
              }
            }
            resolve(childData)
          })
        }catch(err){
          console.log(err)
        }
      }
    },
    mounted(){
       this.getTableTree()
    }
  }
</script>

<style scoped lang="css">

</style>
