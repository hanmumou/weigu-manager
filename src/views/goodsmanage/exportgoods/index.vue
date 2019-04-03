<template>
  <div class="goodsmanage-box">
    <el-form :model="goodsForm"  label-width="120px" hide-required-asterisk="true">
      <el-form-item required label="选择分类：">
        <el-select v-model="goodsForm.category_id">
          <el-option v-for="item in categoryList" :value="item.id" :label="item.name" :key="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item required label="展示区域：">
        <el-select v-model="province_id" @change="changeP">
          <el-option value='1' label="全国"/>
          <el-option v-for="item in provinceList" :value="item.province_id" :label="item.name" :key="item.province_id" />
        </el-select>
        <el-select v-model="city_id">
          <el-option v-for="item in cityList" :value="item.city_id" :label="item.name" :key="item.city_id" />
        </el-select>
        <el-button type="primary" size="mini" @click="addArea">添加</el-button>
         <!--选择的展示区域列表-->
        <div style="margin-top:10px;">
          <el-table :data="areaList"  style="width: 40%" size="mini">
            <el-table-column prop="province" label="省" ></el-table-column>
            <el-table-column prop="city" label="市"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteArea(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <!--展示团长-->
      <el-form-item required label="展示团长：">
        <el-select v-model="commander" multiple collapse-tags>
          <el-option value="all" label="全部"/>
          <el-option v-for="item in coloneList" :value="item.id" :label="item.name" :key="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item required label="产品名称：">
        <el-input v-model="goodsForm.name" class="inp" placeholder="请输入所售产品名称"/>
      </el-form-item>
      <el-form-item label="产品副标题：">
        <el-input v-model="goodsForm.introduce" class="inp" placeholder="对产品的简单简介"/>
      </el-form-item>
      <el-form-item required label="产品主图：">
        <el-upload
          :show-file-list="false"
          :data="banner"
          :headers="GetToken()"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="https://community.suokekj.com/api/images/upload">
          <img v-if="goodsForm.main_picture" :src="goodsForm.main_picture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div class="tips">图片大小控制在2M以内，宽686*高420象素</div>
      </el-form-item>
      <el-form-item label="产品详情图：">
        <el-upload
          :multiple="true"
          :data="AddImageUrl"
          :headers="GetToken()"
          :on-success="addImageSuccess"
          :on-remove="handleRemove"
          :before-upload="addImageBefore"
          :file-list="dialogImageUrl"
          action="https://community.suokekj.com/api/images/upload"
          list-type="picture-card">
          <!--<img :src="item.url" class="avatars">-->
          <i class="el-icon-plus"/>
        </el-upload>
        <div class="tips">图片大小控制在2M以内，宽750*高512象素</div>
      </el-form-item>
      <el-form-item label="主图视频链接：">
        <el-input v-model="goodsForm.video_url" class="inp" />
      </el-form-item>
      <el-form-item required label="商品团购价：" v-if="spec==0">
        <el-input v-model="goodsForm.price" class="inp" placeholder="请输入产品团购价" />
      </el-form-item>
       <el-form-item required label="商品库存：" v-if="spec==0">
        <el-input v-model="goodsForm.stock" class="inp" placeholder="填入商品库存" />
      </el-form-item>
      <el-form-item required label="商品原价：">
        <el-input v-model="goodsForm.original_price" class="inp" placeholder="请输入产品原价" />
      </el-form-item>
      <el-form-item required label="成本价：">
        <el-input v-model="goodsForm.cost_price" class="inp" placeholder="请输入成本价" />
      </el-form-item>
      <el-form-item required label="商品规格：">
        <el-radio v-model="spec" label="1">开启规格</el-radio>
        <el-radio v-model="spec" label="0">关闭规格</el-radio>
      </el-form-item>
      <el-form-item required label="开始时间：">
        <el-date-picker v-model="start_date" value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期" /> -
        <el-time-select  placeholder="选择开始时间" format="HH:mm:ss" v-model="start_at_time" :picker-options='timeOption'> </el-time-select>
      </el-form-item>
      <el-form-item required label="结束时间：">
        <el-date-picker v-model="end_date" value-format="yyyy-MM-dd" type="date" placeholder="选择结束日期" /> -
        <el-time-select  placeholder="选择结束时间" format="HH:mm:ss" v-model="end_at_time" :picker-options='timeOption'> </el-time-select>
      </el-form-item>
      <el-form-item label="预配送日期：">
        <el-date-picker v-model="delivery_date" value-format="yyyy-MM-dd" type="date" placeholder="选择预配送日期" /> -
        <el-time-select  placeholder="选择预配送时间" format="HH:mm:ss" v-model="delivery_at_time" :picker-options='timeOption'> </el-time-select>
        <div class="tips">预配送时间为选填项</div>
      </el-form-item>
      <el-form-item label="商品限购量：">
        <el-input v-model="goodsForm.goods_limit_stock" class="inp" placeholder="填入商品限购数量" />
        <div class="tips">限购数量为0时，不限购</div>
      </el-form-item>
      <el-form-item required label="团长佣金：">
        <el-input v-model="goodsForm.commission" class="inp" placeholder="10" /> 元
        <div class="tips">团长佣金以元为单为计算，可保留小数点后两位</div>
      </el-form-item>
      <el-form-item  label="团长推荐佣金：">
        <el-input  class="inp" placeholder="10" v-model="goodsForm.commander_leader_commission"/> 元<!--v-model="goodsForm.commission"-->
        <div class="tips">推荐团长佣金以元为单为计算，可保留小数点后两位</div>
      </el-form-item>
      <el-form-item label="商品状态：">
        <el-input v-model="goodsForm.goods_type" class="inp" placeholder="例：自营，特价" />
        <div class="tips">词最多不要超四字，每个词间用逗号隔开</div>
      </el-form-item>
      <el-form-item label="商品详情：">
        <tinymce ref="box" v-model="content" class="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="onSubmit(goodsForm)">{{ btnText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce'
import { getFenlei, getP, addGoods, goodsView } from '@/api/exportgoods'
import { editGoods } from '@/api/goodslist'
import { getToken } from '@/utils/auth'

export default {
  components: { tinymce },
  data() {
    return {
      id:this.$route.query.id,//商品id
      areaList:[],//选择的区域列表
      timeOption:{
        start: '00:00',
        step: '01:00',
        end: '24:00'
      },//时间选择默认选择时间格式
      start_at_time:'',//开始时间
      end_at_time:'',//结束时间
      delivery_at_time:'',//预配送时间
      commander:'',//展示团长
      province_id: '',//选择的省
      city_id: '',//选择的市
      goodsForm: {
        category_id: '',
        name: '',
        introduce: '',
        main_picture: '',//产品主图
        detail_picture: [],//产品详情图
        video_url: '',
        price: '',
        original_price: '',
        cost_price: '',
        goods_sku_status: '0',
        //goods_sku: [],//当选择关闭规格时   这个字段是不需要传的  index=12
        start_at: '',
        end_at: '',
        delivery_at: '',
        goods_limit_stock: '',
        stock: '',
        commission: '',
        commander_leader_commission:'',//团长推荐佣金
        goods_type: '',
        details: '',
        address_ids:[],//城市多选
        regimental_ids:[]//团长多选
      },
      headers: { // 图片请求头部
        Authorization: ''
      },
      banner: {
        dirname: 'companies',
        images: ''
      },
      categoryList: '', // 分类集合
      provinceList: '', // 省集合
      cityList: '', // 市集合
      content: '', // 富文本
      dialogImageUrl: [], // 多图上传
      AddImageUrl: {
        dirname: 'companies',
        images: ''
      },
      start_date:'',
      end_date:'',
      delivery_date:'',
      btnText: '确认提交',
      spec: '0',
      coloneList:[]//团长列表
    }
  },
  watch: {
    spec(val) {
      if (val === '1') {
        this.btnText = '下一步 填写规格'
      }else{
      	 this.btnText = '确认提交'
      }
    }
  },
  created: function() {
    if (this.$route.query.id) {
      this.getView()
    }
  },
  mounted: function() {
    this.getLei()
    this.getProvince()
    this.getCommander()
  },
  methods: {
    //区域列表删除
    deleteArea:function(index){
      this.areaList.splice(index,1)
      this.goodsForm.address_ids.splice(index,1)
     },
    //选择完省市之后 点击添加
    addArea:function(){
        if(this.province_id && this.city_id){
           //获取选择省市的名称
          let area={'province_id':'','province':'','city_id':'','city':''}
          let obj={}
          for(let i=0;i<this.provinceList.length;i++){
             if(this.provinceList[i].province_id == this.province_id){
               area.province = this.provinceList[i].name
               area.procince_id = this.provinceList[i].province_id
               break
             }
          }
          for(let j=0;j<this.cityList.length;j++){
             if(this.cityList[j].city_id == this.city_id){
                 area.city = this.cityList[j].name
                 area.city_id = this.cityList[j].city_id
                 break
             }
          }
          obj[this.province_id] = this.city_id
          this.goodsForm.address_ids.push(obj)
          this.areaList.push(area)
        }
    },
    //获取团长信息
    async getCommander(){
      this.$store.dispatch('getlist').then(() => {
        const res = this.$store.getters.colonelistRes
        this.coloneList = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    // 编辑获取信息
    async getView() {
      var subids = []
      this.areaList = []
      this.commander = []
      try {
         await goodsView(this.$route.query.id).then(res=>{
           this.goodsForm = res
            var cnames = Object.values(res.goods_show_region)
           //城市列表渲染
            for(let k=0;k<res.show_region.length;k++){
              var area={'province_id':'','province':'','city_id':'','city':''}
              var obj = {}
              area.province_id = res.show_region[k].province_id
              area.city_id = res.show_region[k].city_id
              area.province = cnames[k].split(' ')[0]
              area.city = cnames[k].split(' ')[1]
              this.areaList.push(area)
              obj[area.province_id] = area.city_id
              subids.push(obj)
            }
           this.goodsForm.address_ids = subids
            //团长列表渲染
            for(let s=0;s<res.show_commander.length;s++){
              this.commander.push(res.show_commander[s].commander_id)
            }
           if (res.show_region_type === 0) {
             this.goodsForm.show_region.province_id = '1'
           }
           if (res.goods_sku_status === true) {
             this.spec = '1'
           }
           this.$refs.box.setContent(res.details)
           //产品详情图
           if (res.detail_picture.length > 0) {
             for (let a = 0; a < res.detail_picture.length; a++) {
               this.dialogImageUrl.push({
                 'name': res.detail_picture[a].id,
                 'url': res.detail_picture[a].image
               })
             }
           }
           //商品开始时间 结束时间处理
           this.start_date =  res.start_at.split(' ')[0]
           this.start_at_time = res.start_at.split(' ')[1].slice(0,5)
           this.end_date = res.end_at.split(' ')[0]
           this.end_at_time = res.end_at.split(' ')[1].slice(0,5)
           if(res.delivery_at){
             this.delivery_date = res.delivery_at.split(' ')[0]
             this.delivery_at_time = res.delivery_at.split(' ')[1].slice(0,5)
           }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 获取分类
    async getLei() {
      try {
        const res = await getFenlei()
        this.categoryList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 获取省
    async getProvince() {
      try {
        const res = await getP(1)
        this.provinceList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    changeP() {
      this.getCity()
      this.city_id = ''
    },
    async getCity() {
      const data = JSON.stringify({ 'province_id': this.province_id })
      try {
        const res = await getP(2, data)
        this.cityList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 添加路径到imageUrl之前
    beforeAvatarUpload(res) {
      this.banner['images'] = res
    },
    // 添加路径到ImageUrl中
    handleAvatarSuccess(res) {
      this.goodsForm.main_picture = res.path
    },
    // 图片上传获取到token
    GetToken() {
      const res = getToken()
      this.headers.Authorization = 'Bearer ' + res
      return this.headers
    },
    // 路径添加到this.dialogImageUrl的数组中
    handleAdd(file, fileList) {
      this.dialogImageUrl.push(fileList.url)
    },
    handleRemove(file, fileList) {
      // 文件列表移除
      this.dialogImageUrl = this.dialogImageUrl.splice(this.remove(this.dialogImageUrl, file.response.path), 1)
    },
    remove(arr, value) {
      var i = arr.length
      while (i--) {
        if (arr[i] === value) {
          return i
        }
      }
      return false
    },
    // 详情图
    addImageSuccess(res) {
      this.dialogImageUrl.push({ 'url': res.path })
    },
    addImageBefore(res) {
      this.AddImageUrl['images'] = res
    },
    // 提交
    async onSubmit(val) {
      val.start_at = this.start_date + ' ' + this.start_at_time + ':00'
      val.end_at = this.end_date + ' ' + this.end_at_time + ':00'
      if (this.delivery_date && this.delivery_at_time) {
        val.delivery_at = this.delivery_date + ' ' + this.delivery_at_time + ':00'
      }
      val.detail_picture = Object.prototype.toString.apply(val.detail_picture) === '[object String]' ? val.detail_picture : JSON.stringify(this.dialogImageUrl)
      val.details = this.content
      val.goods_sku_status = this.spec
      // val.cost_price = 10
      // 多选的城市 格式处理
      if (this.province_id) {
        val.address_ids = []
      }
      val.address_ids = Object.prototype.toString.apply(val.address_ids) === '[object Array]' ? JSON.stringify(val.address_ids) : val.address_ids
      // 团长格式处理
      if (this.commander.includes('all')) { // 返回true  or false
        // 选择了全部
        val.regimental_ids = ''
      } else {
        val.regimental_ids = JSON.stringify(this.commander)
      }
      if (this.spec == '0') { // 无规格
        // 发布商品
        if (!this.$route.query.id) {
          try {
            await addGoods(val)
            this.goodsForm.start_at = ''
            this.goodsForm.end_at = ''
            this.goodsForm.delivery_at = ''
            this.$message({
              message: '商品发布成功',
              type: 'success'
            })
          } catch (err) {
            console.log(err)
          }
        } else if (this.$route.query.id) {
          // 重新编辑商品
          try {
            await editGoods(
              this.$route.query.id, val.category_id, val.name, val.introduce, val.main_picture, val.detail_picture, val.video_url, val.price, val.original_price, val.cost_price,
              val.goods_sku_status, val.start_at, val.end_at, val.delivery_at, val.goods_limit_stock, val.stock, val.commission, val.commander_leader_commission, val.goods_type,
              val.details, val.address_ids, val.regimental_ids).then(res => {
              this.goodsForm.start_at = ''
              this.goodsForm.end_at = ''
              this.goodsForm.delivery_at = ''
              this.$message({
                message: '商品修改成功',
                type: 'success'
              })
            })
          } catch (err) {
            console.log(err)
          }
        }
      } else {
        // 跳转添加规格
        this.$router.push({ name: 'spec', params: val })
      }
    }
  }
}
</script>

<style scoped>
  .goodsmanage-box{
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 40px 0 0 60px;
  }
  .inp{
    width: 40em;
  }
  .textarea{
    width: 45em;
  }
  .tips{
    font-size: 14px;
    color: #999999;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
