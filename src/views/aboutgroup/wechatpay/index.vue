<template>
  <!--整个大盒子-->
  <div class="pay_dad">
    <!--input框-->
    <div class="pay_one">
      <div class="pay_dad_label">小程序名称：</div>
      <el-input v-model="miniprogram_name" class="pay_in"/>
    </div>
    <div class="pay_one">
      <div class="pay_dad_label">收款方名称：</div>
      <el-input v-model="payment_name" class="pay_in"/>
    </div>
    <div class="pay_one">
      <div class="pay_dad_label">小程序appid：</div>
      <el-input v-model="appid" class="pay_in"/>
    </div>
    <div class="pay_one">
      <div class="pay_dad_label">小程序appsecret：</div>
      <el-input v-model="appsecret" class="pay_in"/>
    </div>
    <div class="pay_one">
      <div class="pay_dad_label">微信支付商户号MCHID：</div>
      <el-input v-model="mch_id" class="pay_in"/>
    </div>
    <div class="pay_one">
      <div class="pay_dad_label">key[partnerKey]：</div>
      <el-input v-model="key" class="pay_in"/>
    </div>
    <!--input框结束-->
    <!--按钮-->
    <div class="pay_two">
      <div class="pay_dad_label">存储私钥文件[apiclient-cert]：</div>
      <el-button type="primary" class="two" @click="apiclientCert=true">上传文件</el-button>
      <template>
        <span v-if="apiclient_cert==''" class="unload-title upload-err">未上传</span>
        <span v-else class="unload-title upload-sucess">上传成功</span>
      </template>
    </div>
    <div class="pay_two">
      <div class="pay_dad_label">存储共钥文件[apiclient-key]：</div>
      <el-button type="primary" class="two" @click="apiclientKey=true" >上传文件</el-button>
      <template>
        <span v-if="apiclient_key==''" class="unload-title upload-err">未上传</span>
        <span v-else class="unload-title upload-sucess">上传成功</span>
      </template>
    </div>
    <!--按钮结束-->
    <!--支付协议-->
    <div class="pay_http">
      <div class="http_one pay_dad_label">支付协议：</div>
      <el-input :rows="10" v-model="agreement" type="textarea" readonly="readonly" class="box"/>
    </div>
    <!--支付协议结束-->
    <!--按钮-->
    <div class="agent-radio">
      <el-radio v-model="radioagent" label="1">我同意此协议</el-radio>
    </div>
    <div class="pay_btn">
      <el-button type="primary" class="btn" @click="sbumig">确认提交</el-button>
    </div>
    <!--按钮结束-->
    <!-- 上传存储私钥文件弹窗 -->
    <el-dialog
      :visible.sync="apiclientCert"
      title="上传存储私钥文件"
      center
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="apiclientCert = false">取 消</el-button>
        <el-button type="primary" @click="apiclientCert = false">确 定</el-button>
      </span>
      <el-upload
        :on-success="handleApiclientCert"
        :before-upload="beforeApiclientCert"
        :limit="1"
        class="upload-wexpay"
        action="https://community.suokekj.com/api/file/upload">
        <img v-if="showcass" :src="showcass" class="avatar">
        <i v-else class="el-icon-upload avatar-uploader-icon "/>
      </el-upload>
    </el-dialog>
    <!-- 上传存储公钥文件-->
    <el-dialog
      :visible.sync="apiclientKey"
      title="上传文件"
      center
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="apiclientKey = false">取 消</el-button>
        <el-button type="primary" @click="apiclientKey = false">确 定</el-button>
      </span>
      <el-upload
        :on-success="handleApiclientKey"
        :before-upload="beforeApiclientKey"
        :limit="1"
        class="upload-wexpay"
        action="https://community.suokekj.com/api/file/upload">
        <img v-if="showcass" :src="showcass" class="avatar">
        <i v-else class="el-icon-upload avatar-uploader-icon "/>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 支付协议
import { agreement } from '@/api/agreement'
import { addwechat, getwechat, wechatUpdate } from '@/api/wechat'
export default{
  data() {
    return {
      showcass: '',
      payment_name: '',
      appid: '',
      appsecret: '',
      mch_id: '',
      key: '',
      apiclient_cert: '',
      apiclient_key: '',
      payment_agreement: '我已同意此内容',
      agreement: agreement,
      // 存贮私钥文件
      apiclientCert: false,
      apiclientKey: false,
      radioagent: '1',
      id: '',
      // 添加还是修改判断
      differ: null
    }
  },
  mounted: function() {
    this.getwechatlist()
  },
  methods: {
    // 存储公钥文件上传
    beforeApiclientCert(file) {
      const fil_name = file.name
      const pem = '.pem'
      if (fil_name.match(pem)) {
        this.apiclient_cert = ''
      } else {
        return this.$message({
          type: 'info',
          message: '请上传pem文件'
        })
      }
    },
    // 上传公钥文件成功后的钩子
    handleApiclientCert(res) {
      this.apiclient_cert = res.path
    },
    // 存储私钥文件上床
    beforeApiclientKey(file) {
      const fil_name = file.name
      const pem = '.pem'
      if (fil_name.match(pem)) {
        this.apiclient_key = ''
      } else {
        return this.$message({
          type: 'info',
          message: '请上传pem文件'
        })
      }
    },
    // 上传文件成功后的钩子
    handleApiclientKey(res) {
      this.apiclient_key = res.path
    },
    // 提交前判断
    sbumig() {
      if (this.differ) {
        this.wechatupdate()
      } else {
        this.subwechat()
      }
    },
    // 修改微信支付
    async wechatupdate() {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await wechatUpdate(this.id, this.payment_name, this.appid, this.appsecret, this.mch_id, this.key, this.apiclient_cert, this.apiclient_key, this.payment_agreement)
        this.differ = null
      } catch (err) {
        console.log(err)
      }
    },
    // 添加微信支付
    async subwechat() {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await addwechat(this.miniprogram_name, this.payment_name, this.appid, this.appsecret, this.mch_id, this.key, this.apiclient_cert, this.apiclient_key, this.payment_agreement)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取微信支付
    async getwechatlist() {
      try {
        const res = await getwechat()
        this.payment_name = res.payment_name
        this.appid = res.appid
        this.appsecret = res.appsecret
        this.key = res.key
        this.apiclient_cert = res.apiclient_cert
        this.apiclient_key = res.apiclient_key
        this.mch_id = res.mch_id
        this.differ = true
        this.id = res.id
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
  /*父元素*/
  .pay_dad{
    padding:40px 0 0 30px;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  /*input框*/
  .pay_in{
    width: 40%;
    margin-left: 30px;
  }
  .pay_dad_label{
    width:200px;
    text-align: right;
  }
  /*每一行元素*/
  .pay_one{
    display: flex;
    flex-direction: row;
    height: 70px;
  }
  .pay_one div:nth-child(1){
    float: right;
  }
 .pay_two{
   display: flex;
   flex-direction: row;
   height: 65px;
   line-height: 70px;
   align-items: center;
 }
  .two{
    height: 40px;
    margin-left: 5%;
  }
  /*协议样式*/
  .pay_http{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
  /*按钮样式*/
  .pay_btn{
    width: 100%;
    margin-left:15% ;
    margin-top: 50px;
  }
  .btn{
    width: 30%;
  }
  .http_one{
    width: 12%;
  }
  .box{
    width: 41%;
  }
/* 上传弹窗 */
.upload-wexpay .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.upload-wexpay .el-upload:hover {
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
  /* 提示文字 */
.unload-title{
  margin-left: 20px;
 font-family: "Hiragino Sans GB";
}
.upload-sucess{
  color: #67c23a;
}
.upload-wexpay{
  text-align: center;
}
.upload-err{
  color: rgb(236, 87, 87);
}
/*我同意 */
.agent-radio{
  margin-top: 10px;
  margin-left: 230px;
}
</style>
