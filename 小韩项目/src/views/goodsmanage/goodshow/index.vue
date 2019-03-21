<template>
  <div class="app-container">
    <div class="dad">
      <!--顶部-->
      <div class="top">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="btn" @click="addGoods">添加产品</el-button>
        <!--输入框-->
        <el-input v-model="goods_name" type="text" placeholder="产品名称" class="product_name" placeholder-class="ddd" />
        <!--下拉框-->
        <el-select v-model="provinceValue" placeholder="省" class="area" @change="selChange">
          <el-option v-for="item in area_province" :key="item.province_id" :label="item.name" :value="item.province_id"/>
        </el-select>
        <el-select v-model="cityValue" placeholder="市" class="area" @change="cityChange">
          <el-option v-for="item in area_city" :key="item.city_id" :label="item.name" :value="item.city_id"/>
        </el-select>
        <!--下拉框-->
        <el-select v-model="commander_name" placeholder="团长" class="team">
          <el-option v-for="cc in dizhi" :value="cc.name" :label="cc.name" :key="cc.id"/>
        </el-select>
        <el-button type="primary" @click="getTable()">搜索</el-button>
        <div class="clear">清空搜索</div>
      </div>
      <!--顶部设置完毕-->
      <!--内容-->
      <div class="content">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="images" label="商品图片" width="250" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.images" width="100px" height="100px">
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="440" align="center"/>
            <el-table-column prop="team" label="售卖团长" width="250" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.commanders" :key="index">
                  <div>{{ item.commander_name }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="area" label="显示区域" width="250" align="center"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit()">
                  编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handledelete(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--弹出框-->
      <el-dialog :visible.sync="dialogFormVisible" custom-class="customWidth">
        <!--弹出框头部设置-->
        <el-scrollbar style="height: 100%">
          <div class="pop_top">
            <div class="title">选择商品</div>
            <template>
              <el-checkbox-group v-model="checkList">
                <div class="www">
                  <el-checkbox v-for="item1 in goods" :label="item1.id" :key="item1.id" class="kuai">{{ item1.name }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
          </div>
        </el-scrollbar>
        <!--弹出框头部设置完毕-->
        <div class="pop_all">
          <!--显示区域-->
          <div class="pop_area">
            <div class="area_title">显示区域</div>
            <div class="area_left">
              <div class="area_tt">省份</div>
              <div class="pop_province">
                <div v-for="(pro,index) in area_province" :key="index" :class="provinceid==pro.province_id?'red':''" class="line_ys" @click="change(pro.province_id,pro.name)">{{ pro.name }}</div>
              </div>
            </div>

            <div class="area_right">
              <div class="area_cc">城市</div>
              <div class="pop_cities">
                <!-- <div v-if="hh==''" class="checkk">请选择城市</div> -->
                <div v-for="(item,index) in area_city" :key="index" :class="ing1==item.city_id?'red':''" class="line_ys" @click="danji(item.city_id,item.name)">{{ item.name }}</div>
              </div>
            </div>
            <div class="pop_anniu">
              <el-button type="primary" size="mini" @click="shiftin(provinceName,cityName,provinceid,ing1)">移入</el-button>
              <el-button type="primary" size="mini" class="yichu" @click="shiftout()">移除</el-button>
            </div>
            <div class="pop_city">
              <div class="city_title">
                显示城市
              </div>
              <div v-if="kong==''"/>
              <div class="showcity">
                <div v-for="(sz,index) in shuzu" :key="index" :class="ing2==cityid?'red':''" class="line_ys" @click="remove(sz,index)">
                  {{ sz.p }}{{ sz.k }}
                </div>
              </div>
            </div>
          </div>
          <!--显示区域完毕-->
          <!--团长-->
          <div class="pop_team">
            <div class="team_title">允许售卖此商品的团长：</div>
            <view class="pop_introuduce">
              选择可售卖此商品的院长
            </view>
            <el-checkbox-group v-model="dz">
              <el-checkbox v-for="people in dizhi" :label="people.id" :key="people.id" class="pop_msg">{{ people.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ people.residential_quarters }}</el-checkbox>
            </el-checkbox-group>
          </div>
        <!--团长完毕-->
        </div>
        <!-- 按钮设置 -->
        <div class="pop_bottom">
          <el-button type="primary" class="bottom_btn" @click="saveGoods()">保存设置</el-button>
        </div>
      <!-- 按钮设置完毕 -->
      </el-dialog>
    <!--弹出框完毕-->
    </div>
  <!--内容设置完毕-->
  </div>
</template>
<script>
import { getList, saveList, goodsList, getProvince, getTeem, delList } from '@/api/goodshow'
export default {
  data() {
    return {
      options: [],
      provinceValue: '',
      cityValue: '',
      commander_name: '', // 选择的团长
      tableData: [],
      dialogFormVisible: false, // 弹窗是否显示
      checkList: [],
      goods: [],
      dizhi: [], // 弹窗团长列表
      dz: [],
      area_province: [], // 弹窗省列表
      area_city: [], // 弹窗城市列表
      provinceid: '', // 选择的城市id
      cityid: '',
      city_id: [],
      provinceName: '',
      cityName: '',
      kong: '',
      shuzu: [],
      delshuzu: [],
      zonghe: {},
      removeid: '',
      ing: '',
      ing1: '',
      ing2: '',
      show_region_data: {},
      showArr: [],
      goods_name: '' // 查询名称
    }
  },
  mounted: function() {
    this.getTable()
    this.getPro()
  },
  methods: {
    // 城市改变
    selChange(val) {
      this.provinceid = val
      this.getCity()
      this.show_region_data.province_id = val
    },
    cityChange(val) {
      this.show_region_data.city_id = val
      const data = JSON.stringify({ 'city_id': val })
      this.getTeemList(data)
    },
    // 获取列表
    async getTable() {
      try {
        const res = await getList(this.goods_name, this.show_region_data, this.commander_name)
        this.tableData = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 添加商品弹窗展示
    async addGoods() {
      this.getGoods()
      this.dialogFormVisible = true
    },
    // 获取商品列表
    async getGoods() {
      try {
        const res = await goodsList()
        this.goods = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 获取省市县
    async getPro() {
      try {
        const res = await getProvince(1)
        this.area_province = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async getCity() {
      const data = JSON.stringify({ 'province_id': this.provinceid })
      try {
        const res = await getProvince(2, data)
        this.area_city = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 根据id查询省市
    // chaName(province_id, city_id) {
    //   const cityData = []
    //   this.area_province.forEach(function(key) {
    //     if (key.province_id === province_id) {
    //       cityData.push({
    //         name: key.name
    //       })
    //     }
    //   })
    //   // this.area_city.forEach(function(key) {
    //   //   if (key.city_id === city_id) {
    //   //     cityData.push(key)
    //   //   }
    //   // })
    //   return cityData
    // },
    // 获取团长列表
    async getTeemList(data) {
      try {
        const res = await getTeem(data)
        console.log(res)
        this.dizhi = res.data.community_regimental_commanders
      } catch (err) {
        console.log(err)
      }
    },
    // 新增
    saveGoods() {
      console.log(this.dz)
      let goods_data = []
      this.checkList.forEach(function(c) {
        goods_data.push({
          'goods_id': c
        })
      })
      goods_data = JSON.stringify(goods_data)
      let commander_data = []
      this.dz.forEach(function(val) {
        commander_data.push({
          'commander_id': val
        })
      })
      commander_data = JSON.stringify(commander_data)
      this.showArr = JSON.stringify(this.showArr)
      try {
        saveList(goods_data, this.showArr, commander_data)
        this.dialogFormVisible = false
        this.getTable()
      } catch (err) {
        console.log(err)
      }
    },
    handleEdit() {
      this.dialogFormVisible = true
    },
    // 取消
    async handledelete(row) {
      let goods_data = []
      goods_data.push({
        'goods_id': row.id
      })
      goods_data = JSON.stringify(goods_data)
      let show_region = []
      row.show_region.forEach(function(d) {
        show_region.push({
          'province_id': d.province_id,
          'city_id': d.city_id,
          'area_id': d.area_id
        })
      })
      show_region = JSON.stringify(show_region)
      let commanders = []
      row.commanders.forEach(function(e) {
        commanders.push({ 'commander_id': e.commander_id })
      })
      commanders = JSON.stringify(commanders)
      try {
        await delList(goods_data, show_region, commanders)
      } catch (err) {
        console.log(err)
      }
      this.getTable()
    },
    // 省市点击事件
    change(id, name) {
      this.provinceid = id
      this.provinceName = name
      this.getCity()
    },
    danji(cityid, name) {
      this.ing1 = cityid
      this.cityName = name
    },
    shiftin(val, vall, provinceid, cityid) {
      this.city_id = []
      this.show_region_data = {}
      this.show_region_data['province_id'] = provinceid
      this.show_region_data['city_id'] = cityid
      this.show_region_data['area_id'] = ''
      this.showArr.push(this.show_region_data)
      this.zonghe = {}
      this.zonghe['p'] = val
      this.zonghe['k'] = vall
      this.shuzu.push(this.zonghe)
      this.kong = '123'
      for (let i = 0; i < this.showArr.length; i++) {
        this.city_id.push(this.showArr[i].city_id)
      }
      this.getTeemList(JSON.stringify(this.city_id))
    },
    shiftout() {
      this.shuzu.splice(this.removeid, 1)

      // console.log('新的数组', newData)
    },
    remove(sz, h) {
      this.ing2 = h
      console.log(h)
      this.removeid = h
    }
  }
}
</script>
<style>
.red{
  background: #FDEEE4;
}
  .dad{
    width:100%;
    height:100%;
  }
  /*顶部样式*/
  .dad .top{
    width: 100%;
    height: 5.9375rem;
    background:rgb(48, 65, 86);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  /*按钮*/
  .dad .btn{
    margin-left: 1.9375rem;
    margin-right: 19.1875rem;
  }
  .dad .product_name{
    width: 11.3125rem;
    height: 2.375rem;
  }
 .dad .area{
   width:14.875rem;
   height: 2.375rem;
   margin-left: 2.0625rem;
 }
  .dad .team{
    width: 14.875rem;
    height: 2.375rem;
    margin-left: 2.0625rem;
    margin-right:3.5625rem ;
  }
  .dad .clear{
    color: #fff;
    margin-left: 1.25rem;
    font-size:1rem ;
  }
  /*内容*/
  .dad .content{
    width: 100%;
    margin-top: 3%;
  }
  /*弹出框样式*/
  /*头部*/
  .dad .pop_top{
    width: 90.8125rem;
    height: 23.9375rem;
    border-bottom:2px solid #4D4D4D ;
  }
  .dad .title{
    font-size: 20px;
    width: 100%;
    background: #D3F1FD;
    padding-left: 2em;
    height: 3.8125rem;
    line-height: 3.8125rem;
  }
  .dad .customWidth{
    width: 93.8125rem;
    height: 62rem;
  }
  .dad .www{
     width: 100%;
    line-height: 3.4375rem;
    background: #FDEEE4;
  }
.dad .kuai{
  width: 80%;
  height: 3.4375rem;
}
  .dad .kuai:nth-child(1){
    margin-left: 30px;
  }
  /*头部完毕*/
  .dad .pop_all{
    display: flex;
    flex-direction: row;
  }
  /*区域*/
  .dad .pop_area{
    width:48% ;
    margin-right: 16%;
    height: 26rem;
    margin-top: 3rem;
    margin-left: 3%;
  }
  .dad .lihai{
    overflow-x: hidden;
  }
  .dad .area_title{
    width: 100%;
    height: 3.875rem;
    background: #00B4FF;
    color: white;
    line-height: 3.875rem;
    padding-left:2rem ;
  }
  .dad .area_left{
    width: 11.875rem;
    height: 21.75rem;
    float: left;
    margin-left: 2rem;
    border: 1px solid #999999;
    margin-top: 16px;
  }
  .dad .checkk{
    width: 100%;
    text-align: center;
    margin-top: 0.8rem;
  }
.dad .area_right{
  width: 9.3125rem;
  float: left;
   height: 21.75rem;
  margin-left: 1.5rem;
  margin-top: 16px;
  border: 1px solid #999999;
}
.dad .area_tt{
  width: 11.75rem;
  height: 2.8125rem;
  background: #D3F1FD;
  text-align: center;
  line-height: 2.8125rem;
  border: none;
}
.dad .yichu{
  margin-left: 0!important;
  margin-top: 0.5rem;
}
.dad .area_cc{
  width: 9.3125rem;
  height: 2.8125rem;
  background: #D3F1FD;
  text-align: center;
  line-height: 2.8125rem;
}
.dad .pop_province{
  width: 11.875rem;
  height: 18.75rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.dad .pop_cities{
  width: 9.3125rem ;
  height: 18.75rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.dad .line_ys{
  width: 100%;
  text-align: center;
  height: 2.5rem;
  line-height: 2.5rem;
}
.dad .pop_city{
  width: 11.125rem;
   height: 21.75rem;
  float: left;
  border: 1px solid #999999;
   margin-top: 16px;

}
.dad .city_title{
  width: 11rem;
  background: #D3F1FD;
  height: 2.8125rem;
  line-height:2.8125rem;
  text-align: center;
}
.showcity{
  width: 11.125rem;
  height: 18.8rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.dad .pop_anniu{
  float: left;
  width: 5rem;
  display: flex;
  flex-direction: column;
  height: 21.75rem;
  align-items: center;
  justify-content: center;
}
  /*区域完毕*/
  /*团长*/
  .dad .pop_team{
    width: 25%;
    height: 26rem;
    margin-top: 3.5rem;
    border: 1px solid #ccc;
  }
  .pop_introuduce{
    width: 25%;
    height: 18.8rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .dad .team_title{
    width: 100%;
    height: 3.875rem;
    background: #00B4FF;
    color: white;
    line-height: 3.875rem;
    padding-left:2rem ;
  }
  .dad .pop_msg{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
  }
  .dad .pop_msg:nth-child(1){
    padding-left: 30px;
  }
  /*团长完毕*/
  /* 按钮设置 */
  .dad .pop_bottom{
    width: 100%;
    height: 6.4375rem;
    line-height:6.4375rem;
    text-align: center;
  }
  .dad .bottom_btn{
    width: 10.5rem;
    height: 3.4375rem;
    margin: 0 auto;
    color: white;
    background:#00B4FF;
    font-size: 24px;
    text-align: center;
    line-height: 1.4375rem;
  }
  /* 按钮设置完毕 */
</style>
