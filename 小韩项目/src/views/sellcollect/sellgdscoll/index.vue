<template>
  <div class="app-container">
    <div class="selgdscoll-from">
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-radio :label="3" @change="toggleSelection(tableData3)">全选</el-radio> -->
        <el-button class="select-all" @click="toggleSelection(tableData)">全选表格</el-button>
        <div class="export">
          <el-button size="medium" type="primary" @click="exportExcel">导出销售列表</el-button>
        </div>
        <!--省市选择-->
        <el-form-item label="所在区域：">
          <el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
						<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
					</el-select>
					<el-select placeholder="请选择所在区域" v-model="city.city_id">
						<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
					</el-select>
        </el-form-item>
        <!--选择产品-->
        <el-form-item label="选择产品">
          <el-select placeholder="全部" v-model="goodsChoose">
            <el-option v-for="item in goodslist" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-date-picker
          type="date"
          format="yyyy-MM-d"
          value-format="yyyy-MM-d"
          placeholder="开始日期" v-model="start_at"/>
        <span>&nbsp;</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-d"
          value-format="yyyy-MM-d"
          placeholder="结束时间" v-model="end_at"/>
        <span>&nbsp;</span>
        <el-button type="primary" @click="searchGoods">查询</el-button>
      </el-form>
    </div>
    <div class="sellg-table">
      <el-table
        id="#exportexcel"
        ref="multipleTable"
        :data="tableData"
        :row-class-name="tableRoWClassName"
        :summary-method="getsellgods"
        show-summary
        tooltip-effect="dark"
        border
        style="width:100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"/>
        <el-table-column
          prop="id"
          label="商品ID"
          align="center"/>
        <el-table-column
          prop="name"
          label="产品昵称"
          align="center"/>
          <el-table-column
          prop="goods_sku"
          align="center"
          label="规格"/>
        <el-table-column
          prop="price"
          align="center"
          label="单价"/>
        <el-table-column
          prop="sales_amount"
          align="center"
          label="数量"/>
        <el-table-column
          prop="sales_count"
          align="center"
          label="合计"/>
      </el-table>
    </div>

  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getPro, getSaleList, getGoodsList, getGoodsByCon} from '@/api/sellcollect'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      province:'',//省
      city:'',//市
      goodslist:[],//商品列表
      goodsChoose:'',//选择的商品
      start_at:'',//开始时间
      end_at:''//结束时间
    }
  },

  methods: {
  	//获取省
			async getProvince() {
				try {
					const res = await getPro(1)
					let data = res.data
					this.province = data
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
    // 合计操作

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
    // 合计操作
    getsellgods(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        // 总计行的修改
        if (index <= 2) {
          sums[index] = ''
          return
        }
        if (index === 3) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if(index === 5){
          	 sums[index]+=''
          }else{
          	sums[index] += ' 元'
          }
        }
      })

      return sums
    },
    //获取销售汇总列表
    async getSalelist(){
    	 try{
    	 	  await getSaleList().then(res=>{
    	 	  	let data=res.data
    	 	  	//处理数据
    	 	  	let tabled=[]
    	 	  	for(var i=0;i<data.length;i++){
    	 	  		if(data[i].goods_sku_sales){
    	 	  			 for(var j=0;j<data[i].goods_sku_sales.length;j++){
    	 	  			    let dObj={'id':'','name':'','goods_sku':'','price':'','sales_amount':'','sales_count':''}
    	 	  			    dObj.id=data[i].id
    	 	  			    dObj.name=data[i].name
    	 	  			    var str=data[i].goods_sku_sales[j].goods_sku_detail.split('|')
    	 	  			    if(str.length==1){
    	 	  			    	 dObj.goods_sku=str[0]
    	 	  			    }else if(str.length==2){
    	 	  			    	  dObj.goods_sku=str[0]+'/'+str[1]
    	 	  			    }else if(str.length==3){
    	 	  			    	  dObj.goods_sku=str[0]+'/'+str[1]+'/'+str[2]
    	 	  			    }
    	 	  			    dObj.price=data[i].goods_sku_sales[j].price
    	 	  			    dObj.sales_amount=data[i].goods_sku_sales[j].sales_amount
    	 	  			    dObj.sales_count=data[i].goods_sku_sales[j].sales_count
    	 	  			    tabled.push(dObj)
    	 	  	   	}
    	 	  		}
    	 	  	}
    	 	  	this.tableData=tabled
    	 	  })
    	 }catch(err){
    	 	  console.log(err)
    	 }
    },
    //获取产品列表
    async getGoodslist(){
    	try{
    		await getGoodsList().then(res=>{
    			 this.goodslist=res.data
    		})
    	}catch(err){
    		 console.log(err)
    	}
    },
    //根据条件查询商品
    async searchGoods(){
    	 let goods_id=this.goodsChoose,start_at=this.start_at,end_at=this.end_at, province_id=this.province.province_id,city_id=this.city.city_id
    	 try{
    	 	  await getGoodsByCon(goods_id, start_at, end_at, province_id, city_id).then(res=>{
    	 	  let data=res.data
    	 	  	//处理数据
    	 	  	let tabled=[]
    	 	  	for(var i=0;i<data.length;i++){
    	 	  		if(data[i].goods_sku_sales){
    	 	  			 for(var j=0;j<data[i].goods_sku_sales.length;j++){
    	 	  			    let dObj={'id':'','name':'','goods_sku':'','price':'','sales_amount':'','sales_count':''}
    	 	  			    dObj.id=data[i].id
    	 	  			    dObj.name=data[i].name
    	 	  			    var str=data[i].goods_sku_sales[j].goods_sku_detail.split('|')
    	 	  			    if(str.length==1){
    	 	  			    	 dObj.goods_sku=str[0]
    	 	  			    }else if(str.length==2){
    	 	  			    	  dObj.goods_sku=str[0]+'/'+str[1]
    	 	  			    }else if(str.length==3){
    	 	  			    	  dObj.goods_sku=str[0]+'/'+str[1]+'/'+str[2]
    	 	  			    }
    	 	  			    dObj.price=data[i].goods_sku_sales[j].price
    	 	  			    dObj.sales_amount=data[i].goods_sku_sales[j].sales_amount
    	 	  			    dObj.sales_count=data[i].goods_sku_sales[j].sales_count
    	 	  			    tabled.push(dObj)
    	 	  	   	}
    	 	  		}
    	 	  	}
    	 	  	this.tableData=tabled
    	 })
    	 }catch(err){
    	 	  console.log(err)
    	 }
    }
  },
  mounted(){
  	this.getProvince()
  	this.getSalelist()
  	this.getGoodslist()
  }
}
</script>
<style>
 .export{
   display: inline;
 }
 .selgdscoll-from{
   padding-top: 20px;
   padding-left: 82px;
   padding-bottom: 40px;
   width: 100%;
   background:rgb(48, 65, 86);
 }
.selgdscoll-from .el-form-item__label{
  color:#fff;
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

