<template>
  <div class="app-container">
    <!-- 绑定小程序整体容器 -->
    <div class="bindWechat">

      <!-- 判断状态，如果为0，显示绑定页面 -->
      <div v-if="status===0" class="bind">
        <!-- 授权图片 -->
        <el-row>
          <el-col :span="5" :offset="9">
            <img class="bindImage" src="@/assets/bind_wechat/bind.png">
          </el-col>
        </el-row>
        <!-- 授权按钮 -->
        <el-row style="marginTop:60px;">
          <el-col :span="5" :offset="9" class="authorization">
            <el-button type="success" round @click="grantApp">去授权小程序</el-button>
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
        <p class="content">小程序以授权成功、提交微信审核、需2-3天！</p>
      </div>
      <!-- 判断状态，如果为2，显示审核失败页面 -->
      <div v-if="status===2" class="Not_review">
        <!-- 二维码图片 -->
        <el-row>
          <el-col :span="4" :offset="10" class="NotImg">
            <img src="@/assets/bind_wechat/Not_review.png">
          </el-col>
        </el-row>
        <!-- 审核成功内容 -->
        <p class="content">您的小程序未通过微信审核！请注意微信审核通知！</p>
      </div>

      <!-- 判断状态，如果为3，显示审核成功页面 -->
      <div v-if="status===3" class="qrcode">
        <!-- 二维码图片 -->
        <el-row>
          <el-col :span="4" :offset="10" class="qrcodeImg">
            <img src="@/assets/bind_wechat/qrcode.png">
          </el-col>
        </el-row>
        <!-- 审核成功内容 -->
        <p class="content">小程序以授权成功、可以正常使用！祝生意兴隆！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status:0
    }
  },
  methods:{
     //绑定小程序  点击绑定小程序 跳转到绑定页面
    grantApp:function(){
      window.location.href="https://www.suokekj.com/wechat/auth/test"
    }
  },
  mounted(){

  }
}
</script>
