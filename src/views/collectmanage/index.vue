<template>
  <div class="app-container">
    <!-- 按钮 -->
    <div class="route_btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addroute();dialogVisible=true">添加线路</el-button>
    </div>
    <p class="z-text">
       <span>*</span> 注：可一键导出每条线路下各取货点的已支付订单详情
    </p>
    <!-- 按钮结束 -->
    <div class="collectmanage-title">
      <div class="collectmanage-content">
        <el-form :inline="true" class="demo-form-inline">
          <el-button type="primary" @click="alinputcheck">全选</el-button>
          <el-button size="medium" type="primary">导出物流列表</el-button><!--@click="exportExcel"-->
          <el-form-item label="所在区域：">
					<el-select placeholder="请选择所在省" v-model="province.province_id" @change="changePro">
						<el-option v-for="item in province"  :label="item.name" :value="item.province_id" />
					</el-select>
					<el-select placeholder="请选择所在区域" v-model="city.city_id">
						<el-option v-for="item in city" :label="item.name" :value="item.city_id" />
					</el-select>
				</el-form-item>
          <el-form-item label="线路名称">
            <el-select v-model="lineChoose" multiple collapse-tags>
              <el-option
                v-for="item in tableData"
                :label="item.line_name"
                :value="item.id">
                <el-checkbox :value="item.id"/>
                {{ item.line_name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择产品">
            <el-select v-model="proChoose" multiple class="selectlength" collapse-tags>
              <el-option
                v-for="item1 in produce"
                :label="item1.name"
                :value="item1.id">
                <el-checkbox :label="item1.name"/>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="司机姓名">
            <el-input placeholder="请输入司机姓名"/>
          </el-form-item>
          <el-date-picker v-model="val" type="date" placeholder="请输入订单开始时间" class="in"/>
          <el-date-picker v-model="val1" type="date" placeholder="请输入订单结束时间" class="in"/>
          <el-button type="primary" @click="inquire()">查询</el-button>
          <span style="cursor:pointer;font-weight:bold;" @click="clearValue">清空记录</span>
        </el-form>
      </div>
    </div>
    <!-- 查找线路结束 -->
    <!-- 线路 -->
    <el-table :data="tableData" style="width:82%" class="collectmanage">
      <el-table-column label="取货点名称" min-width="25%" align="center">
        <template slot-scope="scope" class="jianju">
          <div class="big">
            <input type="checkbox">
            {{ scope.row.line_name }}
          </div>
          <div class="xingzhi">
            <ul v-for="(i,index) in scope.row.commanders"  class="xz">
              <li>{{ i.commander_info.address }}</li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="取货点姓名" min-width="25%" align="center">
        <template slot-scope="scope">
          <div class="big">
            {{ scope.row.driver_name }}
          </div>
          <div class="xingzhi">
            <ul v-for="(i,index) in scope.row.commanders"  class="xz">
              <li>{{ i.commander_info.name }}</li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="取货点电话" min-width="25%" align="center">
        <template slot-scope="scope">
          <div class="big">
            {{ scope.row.driver_phone }}
          </div>
          <div class="xingzhi">
            <ul v-for="(i,index) in scope.row.commanders" class="xz">
              <li>{{ i.commander_info.phone }}</li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="25%" align="center">
        <template slot-scope="scope">
          <div class="big">
            <el-button size="mini" type="primary" @click="handEdit(scope.$index,scope.row);dialogVisible = true">
              编辑
            </el-button>
            <el-button size="mini" type="danger" @click="deleteEdit(scope.$index,scope.row)">
              删除
            </el-button>
          </div>
          <div class="xingzhi">
            <ul v-for="(i,index) in scope.row.commanders"  class="xz">
              <li>
                <el-button size="mini" type="danger" @click="deleteEdithouse(scope.$index,scope.row)">
                  删除
                </el-button>
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 线路结束 -->
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :total="total"
        :pager-count="5"
        :page-size="pagesize"
        background
        layout="prev, pager, next"
        @current-change="current_change"/>
    </div>
    <!-- 分页结束 -->
    <!-- 编辑弹出框 -->
    <el-dialog :visible.sync="dialogVisible" custom-class="customWidth">
      <!-- 顶部信息 -->
      <div class="cllectmsg">
        <div class="msg1">
          <div class="msg1name">司机姓名:</div>
          <div class="driverinput"><el-input v-model="alertcontent.driver_name" type="text" placeholder="请输入司机姓名" class="inname"/></div>
        </div>
        <div class="msg1">
          <div class="msg1name">司机电话：</div>
          <div class="driverinput"><el-input v-model="alertcontent.driver_phone" placeholder="请输入司机电话" class="inname"/></div>
        </div>
        <!-- 当是添加的时候 -->
        <div class="msg1">
          <div class="msg1name">所属地区：</div>
          <div class="inname">
            <el-select v-model="val" placeholder="请选择所属省">
              <el-option v-for="(item,id) in checkpro"  :label="item.name" :value="item.province_id" @click.native="belongs(item.province_id)"/>
            </el-select>
            <el-select v-model="belongcity" placeholder="请选择所属市">
              <el-option v-for="(ite,id) in checkcitys"  :label="ite.name" :value="ite.city_id" />
            </el-select>
          </div>
        </div>
        <div class="msg1">
          <div class="msg1name">线路名称:</div>
          <div class="driverinput"><el-input v-model="alertcontent.line_name" type="text" placeholder="请输入线路名称" class="inname"/></div>
        </div>
      </div>
      <!-- 顶部信息结束 -->
      <!-- 底部信息 -->
      <div class="checkout">
        <div class="cleft">
          <div class="checkleft">
            <div class="checktitle">省份</div>
            <div class="checktitle_child">
              <div v-for="(item,id) in checkpro"  :class="ing1==item.province_id?'red':''" class="line_ys" @click="sf(item.province_id,item.name,item,item.province_id)">{{ item.name }}</div>
            </div>
          </div>
          <div class="checkmiddle">
            <div class="middletitle">城市</div>
            <div class="checktitle_child1">
              <div v-if="hh==''" class="line_ys">请选择城市</div>
              <template v-if="hh!==''">
                <div v-for="(itemm,id) in shuzu"  :class="ing2==id?'red':''" class="line_ys" @click="cs(itemm.name,itemm,id,itemm.city_id)">{{ itemm.name }}</div>
              </template>
            </div>
          </div>
          <div class="checkbtn">
            <el-button size="mini" @click="yiru(csid,sfid,areaid,prolist,cilist,areaname)">移入</el-button>
            <el-button size="mini" class="yichu" @click="yichu">移除</el-button>
          </div>
          <div class="checkright">
            <div class="righttitle">显示城市</div>
            <div class="checktitle_child2">
              <div v-for="(item,id) in bigshuzu" id="getelement"  :class="ing3==id?'red':''" class="line_ys" @click="xianshi(id,item.city_id)">
                {{ item.province_name }}{{ item.city_name }}
              </div>
            </div>
          </div>
        </div>
        <!--编辑线路取货点-->
        <div class="cright">
          <div class="poproute">
            <div class="routetitle">线路内取货点</div>
            <div class="checktitle_child3">
              <el-checkbox-group v-model="checkedValue">
                <el-checkbox v-for="people in goods" :label="people"  class="pop_msg">{{ people.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ people.address }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <!--线路取货点完毕-->
      </div>
      <!-- 底部信息结束 -->
      <!-- 按钮设置 -->
      <div class="pop_bottom">
        <!-- 当是修改时进行点击保存 -->
        <el-button v-if="gaibian" type="primary" class="bottom_btn" @click="updateset()">保存设置</el-button>
        <!-- 当是添加时进行点击保存 -->
        <el-button v-else type="primary" class="bottom_btn" @click="saveset()">保存设置</el-button>
      </div>
      <!-- 按钮设置完毕 -->
    </el-dialog>
    <!-- 弹出框结束 -->
  </div>
</template>
<script>
import { logistic, addlogistic, getPro, routedetail, province, city, updateroute, pickuppoints, deleteroute, getgoods, getGoodsName} from '@/api/logistics'
export default{
  data() {
    return {
      province:'',//省
      city:'',//市
      background: '', // 分页背景颜色
      input: '',
      val: '',
      val1: '',
      value: '',
      belongcity: '', // 城市的默认值
      // 选择产品
      produce: [],
      // 设置弹出框
      dialogVisible: false,
      // 表格列表
      tableData: [
        {
          id: '',
          line_name: '',
          driver_name: '',
          driver_phone: '',
          commanders: [
            { id: '',
              commander_info: {
                name: '',
                phone: '',
                address: ''
              }
            }
          ]
        }
      ],

      // 弹出框内容设置
      alertcontent: {
        driver_name: '', // 司机名称
        driver_phone: '', // 司机电话
        show_region: [// 显示城市信息
          { 'id': '',
            'province_id': '' }
        ],
        line_name: '', // 线路名称
        commanders: [// 线路内取货点信息
          { 'commander_info': { 'name': '',
            'residential_quarters': ''
          }
          }
        ]
      },
      // 省份
      checkpro: [
        {
          'id': '',
          'name': '',
          'province_id': ''
        }
      ],
      // 城市
      checkcity: [
        {
          'city_id': '',
          'id': '',
          'name': '',
          'province_id': ''
        }
      ],
      // 所属地区城市列表
      checkcitys: [
        {
          'city_id': '',
          'id': '',
          'name': '',
          'province_id': ''
        }
      ],
      shuzu: [], // 获取到所有城市的信息
      csid: '', // 城市id
      sfid: '', // 省份id
      bigshuzu: [], // 点击移入的时候创建一个新的数组
      newshuzu: {}, // 点击移入的时候创建一个新的对象
      ycid: '', // 在点击显示城市时获取点击的显示城市的id
      ing1: '', // 点击省份时添加颜色
      ing2: '', // 点击城市时添加颜色
      ing3: '', // 点击显示城市时添加颜色
      hh: '', // 进行判断
      protype: 1, // 省份类型
      citytype: 2, // 城市类型
      ff: '',
      shengfen: '',
      gaibian: false, // 判断按钮是添加还是修改
      shengfenid: '',
      chengshiid: '',
      provincename: '', // 省份名称
      cityname: '', // 城市名称
      commander_ids: {}, // 修改的所有id的集合，为了进行修改传参
      commander_msg: [],
      cilist: '', // 点击的城市的id
      areaid: '', // 传入的地区的id，是为了传参
      prolist: '', // 点击的省份的id
      areaname: '', // 传入的地区的name,也是为了传参
      cityids: '', // 从后台获取的所有的城市id
      allcityid: [], // 获取到的所有的城市的id
      goods: [], // 获取显示城市的信息，包括省，城市等等，还有后台返回来的数据的信息
      // yichucityid: '',
      answer: [], // 线路内取货点信息
      checkedValue: [], // 线路内取货点默认显示信息
      deleteid: '', // 获取列表页面小区删除的id
      total: 0, // 获取列表数据的长度
      pagesize: 0, // 每页的数据列表
      currentPage: 1, // 默认开始页面
      lineChoose: '',//查询时 选择的路线
      proChoose:''//查询时选择的产品
    }
  },
  watch: {
    // 监听富选框的选择
    checkedValue: function(new_v, old_v) {
      this.answer = this.checkedValue
    }
  },
  // 钩子函数
  mounted() {
    this.wuliulist()// 显示物流列表的方法
    this.provincelist()// 显示城市列表的
    this.getcitys()// 获取所有的城市列表
    this.getProvince()
    this.getGoodsInfo()
  },
  methods: {
      //根据条件查询
    async inquire(){

    },
       //清空记录
      clearValue:function(){
         this.province = ''
         this.city = ''
         this.lineChoose = ''
         this.proChoose = ''
         this.val = ''
         this.vall = ''

      },
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
    // 顶部查询
    // currentpage改变时会触发
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.wuliulist()
    },
    // 点击编辑按钮
    async handEdit(index, row) {
      this.bigshuzu = []
      this.goods = []
      this.gaibian = true
      // 调出配送路线详情
      try {
        const res = await routedetail(row.id)
        this.alertcontent = res
      } catch (err) {
        console.log(err)
      }
      for (const i in this.alertcontent.show_region) {
        // 通过后台获取的省份id获取到省份名称
        for (const ii in this.checkpro) {
          if (this.alertcontent.show_region[i].province_id === this.checkpro[ii].province_id) {
            this.provincename = this.checkpro[ii].name
            this.provinceids = this.checkpro[ii].province_id
          }
        }
        // 获取市的集合this.alertcontent.show_region[i].province_id
        const res = await city(this.citytype, { province_id: this.alertcontent.show_region[i].province_id })
        // 通过后台的城市id获取到城市名称
        for (const iii in res.data) {
          if (this.alertcontent.show_region[i].city_id === res.data[iii].city_id) {
            this.cityname = res.data[iii].name
            this.cityids = res.data[iii].city_id
          }
        }
        this.newshuzu = {}
        this.newshuzu['city_id'] = ''
        this.newshuzu['province_name'] = this.provincename
        this.newshuzu['city_name'] = this.cityname
        this.newshuzu['area_name'] = this.areaname
        this.newshuzu['province_id'] = this.provinceids
        this.newshuzu['city_id'] = this.cityids
        this.newshuzu['area_id'] = this.areaid
        this.bigshuzu.push(this.newshuzu)
        this.ing3 = this.bigshuzu.length - 1
        // 显示线路内取货点
        for (const i in this.bigshuzu) {
          this.allcityid.push(this.bigshuzu[i].city_id)
          this.getcitys()
        }
      }
    },
    // 线路删除
    async deleteEdit(index, row) {
      try {
        await deleteroute(row.id).then(res =>{
           this.wuliulist()
           this.$message('删除成功')
        })

      } catch (err) {
        console.log(err)
      }
    },
    // 小区的删除
    async deleteEdithouse(index, row) {
      for (const i in row.commanders) {
        this.deleteid = row.commanders[i].commander_id
      }
      try {
        await getgoods(this.deleteid, row.id).then(res=>{
          this.wuliulist()
          this.$message('删除成功')
        })

      } catch (err) {
        console.log(err)
      }
    },
    // 点击添加线路
    addroute() {
      this.alertcontent.driver_name = ''
      this.alertcontent.driver_phone = ''
      this.alertcontent.line_name = ''
      this.bigshuzu = []
      this.goods = []
    },
    // 点击省份时
    async sf(e, sfid, item, id) {
      // 调取获取城市信息的接口
      const citylist = await city(this.citytype, { province_id: e })
      this.checkcity = citylist.data
      this.csid = ''
      this.ing1 = id
      this.ing2 = 0
      this.hh = 1
      this.shuzu = []
      this.prolist = e
      this.sfid = sfid
      for (const i in this.checkcity) {
        if (this.checkcity[i].province_id === e) {
          this.shuzu.push(this.checkcity[i])
        }
      }
      this.csid = this.shuzu[0].name
    },
    // 点击城市时
    cs: function(e, itemm, id, cilist) {
      this.ing2 = id
      this.cilist = cilist
      this.csid = e
    },
    // 点击移入时
    yiru: function(i, l, areaid) {
      this.allcityid = []
      this.newshuzu = {}
      this.newshuzu['province_name'] = l
      this.newshuzu['city_name'] = i
      this.newshuzu['area_name'] = this.areaname
      this.newshuzu['province_id'] = this.prolist
      this.newshuzu['city_id'] = this.cilist
      this.newshuzu['area_id'] = this.areaid
      if (this.newshuzu.city_id === '') {
        this.newshuzu.city_id = this.shuzu[0].city_id
      }
      this.bigshuzu.push(this.newshuzu)
      this.ing3 = this.bigshuzu.length - 1
      // 获取到所有的城市id，用来调取线路内取货点接口
      for (const i in this.bigshuzu) {
        this.allcityid.push(this.bigshuzu[i].city_id)
      }
      this.getcitys()
    },
    // 点击显示城市时
    xianshi: function(e, cityid) {
      this.ing3 = e
      this.ycid = e
      // this.yichucityid = cityid
    },
    // 当点击移除时
    yichu: function() {
      if (this.ycid === '') {
        this.bigshuzu.splice(this.bigshuzu.length - 1, 1)
      } else if (this.ycid === 0) {
        this.bigshuzu.splice(this.ycid, 1)
        this.ycid = ''
      } else {
        this.bigshuzu.splice(this.ycid, 1)
      }
      this.ing3 = this.bigshuzu.length - 1
      // 获取数组中元素，然后进行移除
      this.allcityid = []
      for (const i in this.bigshuzu) {
        this.allcityid.push(this.bigshuzu[i].city_id)
      }
      this.getcitys()
    },
    alinputcheck() {
      const ischeck = document.getElementsByTagName('input')
      for (var i = 0; i < ischeck.length; i++) {
        ischeck[i].checked = !ischeck[i].checked
      }
    },
    // 显示物流列表
    async wuliulist() {
      try {
       await logistic(this.currentPage).then(res=>{
        	  this.tableData = res.data
            this.total = res.meta.pagination.total
            this.pagesize = res.meta.pagination.per_page
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 获取省份
    async provincelist() {
      try {
        const res = await province(this.protype)
        this.checkpro = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 修改点击保存时
    async updateset() {
      try {
        for (const i in this.answer) {
          this.commander_msg.push({
            'commander_id': this.answer[i].id
          })
        }
        await updateroute(this.alertcontent.id, this.alertcontent.driver_name, this.alertcontent.driver_phone, this.alertcontent.line_name, JSON.stringify(this.bigshuzu), JSON.stringify(this.commander_msg)).then(res=>{
          this.$message('修改成功')
          this.wuliulist()
          this.dialogVisible = false

        })
      } catch (err) {
        console.log(err)
      }
    },
    // 点击保存设置进行添加线路
    async saveset() {
      try {
        for (const i in this.answer) {
          this.commander_msg.push({
            'commander_id': this.answer[i].id
          })
        }
        await addlogistic(this.alertcontent.driver_name, this.alertcontent.driver_phone, this.alertcontent.line_name, JSON.stringify(this.bigshuzu), JSON.stringify(this.commander_msg)).then(res=>{
          this.$message('添加成功')
          this.wuliulist()
          this.dialogVisible = false
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 所属地区列表
    async belongs(pid) {
      try {
        const citylist = await city(this.citytype, { province_id: pid })
        this.checkcitys = citylist.data
      } catch (err) {
        console.log(err)
      }
    },
    // 获取线路内取货点
    async getcitys() {
      try {
        const res = await pickuppoints(JSON.stringify(this.allcityid))
        this.goods = res.data.community_regimental_commanders
      } catch (err) {
        console.log(err)
      }
    },
    //获取商品 名称 列表
    async getGoodsInfo(){
    	try{
        await getGoodsName().then(res => {
          this.produce = res.data
        })
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>
<style>
  /***备注样式***/
  .z-text{
    color:#aaaaaa;
    font-size:14px;
  }
  .z-text>span{
     color:red;
  }
/* 顶部按钮 */
.red{
  background: #FDEEE4;
}
.route_btn{
  margin-bottom: 0.2rem;
}
.seek{
    width: 82%;
    margin-left: 80px;
    background: #D3F1FD;
    margin-bottom: 2rem;
  }
  .selectlength{
    width: 25rem;
  }
/* 顶部按钮结束 */
/* 搜索第一行 */
.seek_line1{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 8px;
}
.seek_area{
  margin-left: 33px;
}
.seek_name,.seek_check{
  margin-left: 60px;
}
/* 搜索第一行结束 */
/* 搜索第二行显示 */
.seek_line2{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

}
.in{
  width: 11.3125rem;
  height: 2.375rem;
}
.sname{
  margin-left: 33px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.sphone,.sstartdate,.senddate{
  margin-left: 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ss{
  margin-left: 2rem
}
.clearss{
  margin-left: 20px;
}
/* 搜索第二行显示结束 */
.xingzhi{
  /* padding-left: 10px; */
}
.xingzhi ul li{
  list-style: none;
  height: 28px;
}
.jianju{
  padding-left: 0!important;
  padding-right: 0!important;
}
.xz{
 padding: 17px 0px;
  margin: 0;
}
.big{
  height: 28px;
}
.qhmc{
  padding: 0!important
}
/* 弹出框样式 */
 .customWidth{
  min-width: 80%;
}

/* 顶部样式 */
.cllectmsg{
  width: 100%;
  height: 25.3125rem;
  display: flex;
  flex-direction: column;
 /* margin: 0 auto; */
 padding-left: 19%;
 padding-right: 19%;
 border-bottom: 1px solid #ccc;
}
.msg1{
  display: flex;
  flex-direction: row;
  height: 4.4375rem;
  align-items: center;
  justify-content: center;
  width: 45rem;
}
.msg1name{
  width: 72px;
  font-size: 14px;
  margin-right: 0.8rem;
}
.inname{
  width: 33.25rem;
  height: 2.5rem;
}
/* 顶部样式结束 */
/* 底部样式 */
.checkout{
  width: 100%;
  margin-top: 26px;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  }
.checkleft{
 width: 11.875rem;
    height: 21.75rem;
    float: left;
    margin-left: 2rem;
    border: 1px solid #999999;
    margin-top: 16px;

    }
.checktitle{
 width: 11.72rem;
  height: 2.8125rem;
  background: rgb(48, 65, 86);
  text-align: center;
  line-height: 2.8125rem;
  border: none;
  color: white;
}
.checktitle_child{
  width: 11.875rem;
    height: 18.85rem;
   overflow-x:hidden;
    overflow-y:scroll;
}
.checktitle_child1{
  width: 9.2rem;
   height: 18.85rem;
   overflow-x:hidden;
    overflow-y:scroll;
}
.checktitle_child2{
  width: 11rem;
    height: 18.85rem;
    overflow-x: hidden;
    overflow-y: scroll;
}
.checktitle_child3{
  width: 16.125rem;
  height: 18.8rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.checkmiddle{
  width: 9.3125rem;
  float: left;
   height: 21.75rem;
  margin-left: 1.5rem;
  margin-top: 16px;
  border: 1px solid #999999;
}
.middletitle{
    width: 9.2rem;
  height: 2.8125rem;
  background: rgb(48, 65, 86);
  text-align: center;
  line-height: 2.8125rem;
  color: white;
  display: block;
}
.checkbtn{
  float: left;
  width: 5rem;
  display: flex;
  flex-direction: column;
  height: 21.75rem;
  align-items: center;
  justify-content: center;
}
.checkright{
  width: 11.125rem;
   height: 21.75rem;
  float: left;
  border: 1px solid #999999;
   margin-top: 16px;
   }
   .righttitle{
     width: 11rem;
  background: rgb(48, 65, 86);
  height: 2.8125rem;
  line-height:2.8125rem;
  text-align: center;
  color: white;
  }
  .yichu{
  margin-left: 0!important;
  margin-top: 0.5rem;
}
 /*线路*/
  .poproute{
  width: 16.125rem;
   height: 21.75rem;
  float: left;
  border: 1px solid #999999;
   margin-top: 16px;
   }
   .routetitle{
  width: 16rem;
  background: rgb(48, 65, 86);
  height: 2.8125rem;
  line-height:2.8125rem;
  text-align: center;
  color: white;
  }
  .line_ys{
  width: 100%;
  text-align: center;
  height: 2.5rem;
  line-height: 2.5rem;
}
.pop_msg{
  width: 100%;
  height: 2rem;
  line-height: 2rem;
}
.pop_msg:nth-child(1){
  padding-left: 30px;
}
/*线路完毕*/
/* 底部样式结束 */
.collectmanage .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
padding-left: 0px;
}
.collectmanage .cell, .el-table th div{
padding-right: 0px;
}
.big{
height: 44px;
line-height: 44px;
color: #233214;
background-color: #FDEEE4;
font-size: 15px;
font-weight: 600;
}
.collectmanage{
margin-left: 80px;
}
.collectmanage td, .el-table th.is-leaf{
  border: 0px;
}
/* input样式 */
.big input[type="checkbox"]{
-webkit-appearance: none;
vertical-align:middle;
margin-top:0;
background:#fff;
border:#999 solid 1px;
min-height: 12px;
min-width: 12px;
}
.big input[type="checkbox"]:checked {
background: #3190e8;
}
.big input[type=checkbox]:checked::after{
content: '';
top: 0px;
left: 0px;
position: absolute;
background: transparent;
border: #fff solid 2px;
border-top: none;
border-right: none;
height: 6px;
width: 8px;
-moz-transform: rotate(-45deg);
-ms-transform: rotate(-45deg);
-webkit-transform: rotate(-45deg);
transform: rotate(-45deg);
}
/* btn 浮动 */
.big{
  position: relative;
}
.big input{
  position: absolute;
  top: 14px;
  left: 2rem;
}
/* 搜索背景 */
.collectmanage-title{
  width: 100%;
  margin-top: 20px;
  padding-left: 20px;
  background-color: rgb(48, 65, 86);
  padding: 20px;

}
.collectmanage-content{
  color: white;
  margin-left: 20px;
  margin-top: 10px;
}
.collectmanage-content .el-form-item__label{
  color: white
}
/* 按钮设置 */
.pop_bottom{
  width: 100%;
  height: 6.4375rem;
  line-height:6.4375rem;
  text-align: center;
}
.bottom_btn{
  width: 10.5rem;
  height: 3.4375rem;
  margin: 0 auto;
  color: white;
  background:#00B4FF;
  font-size: 18px;
  text-align: center;
  line-height: 1.4375rem;
}
/* 按钮设置完毕 */
/* 页面input框 */
@media screen and (max-width: 1024px) {
.el-dialog--small{
    width: 380px !important;
  }
}
/* 弹出框input框 */
.driverinput .el-input__inner{
  width: 80%;
}
/* 分页设置 */
.block{
  text-align: center;
  margin-top: 20px;
  margin-right: 144px;
}
</style>

