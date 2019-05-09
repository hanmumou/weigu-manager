<template>
  <div style="padding:20px;">
    <el-form ref="form"  label-width="80px">
      <el-form-item label="旧ID" style="width:40%;">
        <el-input placeholder="旧ID" v-model="oldid"></el-input>
      </el-form-item>
      <el-form-item label="编码" style="width:40%;">
        <el-input placeholder="编码" v-model="code"></el-input>
      </el-form-item>
      <el-form-item label="名称" style="width:40%;">
        <el-input placeholder="名称" v-model="names"></el-input>
      </el-form-item>
      <el-form-item label="类型" style="width:40%;">
        <el-input placeholder="类型" v-model="type"></el-input>
      </el-form-item>
      <el-form-item label="权重" style="width:40%;">
        <el-input placeholder="权重" v-model="weights"></el-input>
      </el-form-item>
    </el-form>
    <!--新增规格选项-->
    <el-button type="primary" size="small" @click="creatData">新增规格选项</el-button>
    <!--新增规格选项列表-->
    <el-table :data="tableData" style="width: 60%;margin-top:20px;" border size="mini">
      <el-table-column prop="name" label="规格选项" width="180">
        <template slot-scope="scope">
          <el-input placeholder="规格选项" size="small" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="权重" width="180">
        <template slot-scope="scope">
          <el-input placeholder="权重" v-model="scope.row.weight" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="sortOder" label="排序">
        <template slot-scope="scope">
          <el-input placeholder="排序" v-model="scope.row.sortOder" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteData">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" style="margin-top:20px;" @click="submitData">保存</el-button>
  </div>
</template>

<script>
  import {submitAdd, getDetailById, editDtail} from '@/api/dictionmanage'
    export default {
        data(){
          return{
            id:this.$route.query.id,
            tableData:[],
            oldid:'',
            code:'',
            names:'',
            type:'',
            weights:''
          }
        },
      methods:{
        //点击新增
        creatData(){
          let obj = {
            name:'',
            weight:'',
            sortOder:''
          }
          this.tableData.push(obj)
        },
        //点击删除
        deleteData(){
          this.tableData.splice(-1,1)
        },
        //根据id获得详情
        async getDetail(){
          if(this.id){
            try{
              await getDetailById(this.id).then(res=>{
                this.tableData = res.techItemList
                this.oldid = res.tech.oid
                this.code = res.tech.code
                this.names = res.tech.name
                this.type = res.tech.dictype
                this.weights = res.tech.weight
              })
            }catch(err){
              console.log(err)
            }
          }
        },
        //保存数据
        async submitData(){
          if(this.id){
            let datas={
              'tech':{
                id:this.id,
                oid:this.oldid,
                code:this.code,
                name:this.names,
                dictype:this.type,
                weight:this.weights
              },
              'techItemList':this.tableData
            }
            await editDtail(datas).then(res=>{
              console.log(res)
            })
          }else{
            let datas={
              'tech':{
                oid:this.oldid,
                code:this.code,
                name:this.names,
                dictype:this.type,
                weight:this.weights
              },
              'techItemList':this.tableData
            }
            await submitAdd(datas).then(res=>{
              console.log(res)
            })
          }
        }
      },
      mounted(){
        this.id = this.$route.query.id
        this.getDetail()
      }
    }
</script>

<style scoped>

</style>
