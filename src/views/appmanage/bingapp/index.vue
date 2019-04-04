<template>
  <div class="app-container">
    <!-- 绑定小程序整体容器 -->
    <div class="bindWechat">

      <!-- 判断状态，如果为0，显示绑定页面 -->
      <div v-if="status === 0" class="bind">
        <!-- 授权图片 -->
        <el-row>
          <el-col :span="5" :offset="9">
            <img class="bindImage" src="@/assets/bind_wechat/bind.png">
          </el-col>
        </el-row>
        <!-- 授权按钮 -->
        <el-row style="marginTop:60px;">
          <el-col :span="5" :offset="9" class="authorization">
            <el-button type="success" round @click="grantApp" class="bind_btn">去授权小程序</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 判断状态，如果为1，显示审核中页面 -->
      <div v-if="status===1" class="reviewing">
        <!-- 审核中图片 -->
        <el-row>
          <el-col :span="4" :offset="10" class="reviewImg">
            <img src="@/assets/bind_wechat/reviewing.png">
          </el-col>
        </el-row>
        <!-- 审核中内容 -->
        <p class="content">小程序已授权、提交微信审核、需2-3天！</p>
      </div>
      <!-- 判断状态，如果为2，显示审核失败页面 -->
      <div v-if="status===2" class="Not_review">
        <!-- 二维码图片 -->
        <el-row>
          <el-col :span="4" :offset="10" class="NotImg">
            <img src="@/assets/bind_wechat/Not_review.png">
          </el-col>
        </el-row>
        <!-- 审核失败内容 -->
        <p class="content">您的小程序未通过微信审核！请注意微信审核通知！</p>
      </div>

      <!-- 判断状态，如果为3，显示审核成功页面 -->
      <div v-if="status===3" class="qrcode">
        <!-- 二维码图片 -->
        <el-row>
        <el-col :span="4" :offset="10" class="qrcodeImg">
          <img :src="imgurl">
        </el-col>
      </el-row>
        <!-- 审核成功内容 -->
        <p class="content">小程序以授权成功、可以正常使用！祝生意兴隆！</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAuthcode} from '@/api/bingapp'
export default {
  data() {
    return {
      status:0,
      imgurl:''//审核成功的小程序二维码
    }
  },
  methods:{
     //绑定小程序  点击绑定小程序 跳转到绑定页面
     grantApp(){
       $.ajax({
         url: 'https://suokekj.com/api/api/wechat/authorize?reback=https://suokekj.com/community-admin/index.html',
         type:'GET',
         success:function(res){
           window.location.href = res
         }
       });
       //console.log(this.$store.getters.token)
    },
    //获取小程序二维码  判断页面状态
    getMiniErweima(){
       var _this = this
       $.ajax({
         headers:{
           'Authorization':'Bearer'+ ' ' +  _this.$store.getters.token
         },
         url:'https://suokekj.com/api/api/wechat/authorize/mini-program/qrcode',
         type:'POST',
         success:function(res){
           //0表示审核成功   1审核失败  2审核中  3已撤回  4已发布
            if(res.wachet_status == 2){
              _this.status = 1
            }else if(res.wachet_status == 0){
              _this.status = 3
              //审核成功  显示小程序二维码
              _this.imgurl = res.mini_program_qrcode
            }else if(res.wachet_status == 1){
              _this.status = 2
            }
         }
       })
    }
  },
  mounted(){
     this.getMiniErweima()
  }
}
</script>
