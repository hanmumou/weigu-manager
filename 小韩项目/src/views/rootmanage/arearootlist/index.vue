<template>
  <div class="app-container">
    <!-- 权限管理页面总容器 -->
    <div class="permissions-container">
      <!-- 添加和搜索的容器 -->
      <div class="addAndSearch">
        <el-row>
          <!-- 搜索查询 -->
          <el-col :span="18" :offset="1" class="search_management">
            <!-- 表单搜索查询 -->
            <el-form :inline="true">
              <!-- 搜索查询第一行 -->
              <el-row style="marginTop:25px;">
                <!-- 管理员编号查询 -->
                <el-col :span="6">
                  <el-form-item label="管理员编号：">
                    <el-input />
                  </el-form-item>
                </el-col>
                <!-- 管理员姓名查询 -->
                <el-col :span="6">
                  <el-form-item label="管理员姓名：">
                    <el-input />
                  </el-form-item>
                </el-col>
                <!-- 管理员电话查询 -->
                <el-col :span="6">
                  <el-form-item label="管理员电话：">
                    <el-input />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 搜索查询第二行 -->
              <el-row>
                <!-- 管理员账号查询 -->
                <el-col :span="6">
                  <el-form-item label="管理员账号：">
                    <el-input />
                  </el-form-item>
                </el-col>
                <!-- 管理元区域，三级联动下拉菜单 -->
                <el-col :span="16">
                  <el-form-item label="管理员区域：">
                    <el-select placeholder="请选择所在省" v-model="province_id" @change="changePro">
                      <el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id" />
                    </el-select>
                    <el-select placeholder="请选择所在区域" v-model="city_id">
                      <el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id" />
                    </el-select>
                  </el-form-item>
                  <el-button type="primary">搜索</el-button>
                  <a style="margin-left:10px;">清除搜索记录</a>
                </el-col>
              </el-row>
            </el-form>
            <!-- 查询表单结束 -->
          </el-col>
        </el-row>
      </div>

      <!-- 数据表单 -->
      <el-table
        class="rootTable"
        style="width: 100%">
        <el-table-column label="管理员编号" />
        <el-table-column label="管理员姓名" />
        <el-table-column label="管理员电话" />
        <el-table-column label="管理员帐号" />
        <el-table-column label="管理员密码" />
        <el-table-column label="管理员区域" />
        <el-table-column label="管理权限" />
        <el-table-column label="操作" />
      </el-table>

      <!-- 添加管理员弹窗 -->
      <el-dialog
        :visible.sync="addRoot"
        title="添加管理员"
        width="56%"
        class="addRoot_dialog"
        center>
        <!-- 管理员表单数据 -->
        <el-form
          :inline="true"
          class="">
          <!-- 表单数据第一行 -->
          <el-row>
            <el-col :span="12">
              <!-- 管理员编号 -->
              <el-form-item
                :rules="[
                  { required: true, message: '管理员编号不能为空', trigger: 'blur' }
                ]"
                prop="id"
                label="管理员编号：">
                <el-input v-model="addRootForm.id" placeholder="请入输管理员编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 管理员姓名 -->
              <el-form-item
                :rules="[
                  { required: true, message: '管理员姓名不能为空', trigger: 'blur' }
                ]"
                prop="name"
                label="管理员姓名：">
                <el-input v-model="addRootForm.name" placeholder="请入输管理员姓名"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 表单数据第二行 -->
          <el-row>
            <el-col :span="12">
              <!-- 管理员账号 -->
              <el-form-item
                :rules="[
                  { required: true, message: '管理员账号不能为空', trigger: 'blur' }
                ]"
                prop="account"
                label="管理员账号：">
                <el-input v-model="addRootForm.account" placeholder="请入输管理员账号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 管理员电话 -->
              <el-form-item
                :rules="[
                  { required: true, message: '管理员电话不能为空' , trigger: 'blur'}
                ]"
                prop="phone"
                label="管理员电话：">
                <el-input v-model="addRootForm.phone" placeholder="请入输管理员电话"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 表单数据第三行 -->
          <el-row>
            <el-col :span="12">
              <!-- 管理员密码 -->
              <el-form-item
                :rules="[
                  { required: true, message: '管理员密码不能为空' , trigger: 'blur'}
                ]"
                prop="password"
                label="管理员密码：">
                <el-input v-model="addRootForm.password" placeholder="请入输管理员密码"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 管理区域 -->
              <el-form-item
                :rules="[
                  { required: true }
                ]"
                label="管理区域："/>
              <!-- <el-select style="width:150px;" :vaule="provinces"></el-select>
                —
              <el-select style="width:150px;" :vaule="city"></el-select>
                —
              <el-select style="width:150px;margin-right:20px;" :value="area"></el-select> -->
            </el-col>
          </el-row>
          <!-- 管理员权限 -->
          <p>管理员权限：</p>
          <!-- 权限第一层 -->
          <el-row class="management">
            <!-- 小程序管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>小程序管理</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>绑定小程序</el-checkbox><el-checkbox>更新小程序</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
            <!-- 数据分析 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>数据分析</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
            <!-- 基础设置 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>基础设置</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>全局设置</el-checkbox><el-checkbox>会员卡设置</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <!-- 权限第二层 -->
          <el-row class="management">
            <!-- 关于我们 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>关于我们</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>绑定小程序</el-checkbox>
                  <el-checkbox>更新小程序</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
            <!-- 权限管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>权限管理</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
            <!-- 商品管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>商品管理</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>发布商品</el-checkbox>
                  <el-checkbox>商品分类</el-checkbox>
                  <el-checkbox>商品列表</el-checkbox>
                  <el-checkbox>商品展示区域</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <!-- 权限第三层 -->
          <el-row class="management">
            <!-- 订单管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>订单管理</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
            <!-- 权限管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>销售汇总</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>取货点汇总</el-checkbox>
                  <el-checkbox>商品销售汇总</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
            <!-- 物流管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>物流管理</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
          </el-row>
          <!-- 权限第四层 -->
          <el-row class="management">
            <!-- 团长管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>团长管理</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>团长列表</el-checkbox>
                  <el-checkbox>资金管理</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
            <!-- 团长团队管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>团长团队管理</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
            <!-- 储值会员管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>储值会员管理</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>取货点汇总</el-checkbox>
                  <el-checkbox>商品销售汇总</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <!-- 权限第五层 -->
          <el-row class="management">
            <!-- 营销管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>营销管理</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>优惠管理</el-checkbox>
                  <el-checkbox>运动积分管理</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
            <!-- 供就商信息 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>供就商信息</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
            <!-- 用户管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>用户管理</el-checkbox>
                </el-header>
                <el-main class="rootMain"/>
              </el-container>
            </el-col>
          </el-row>
          <!-- 权限第六层 -->
          <el-row class="management">
            <!-- 广告管理 -->
            <el-col :span="8" class="rootContent">
              <el-container>
                <el-header height="40px" class="rootHeader">
                  <el-checkbox>广告管理</el-checkbox>
                </el-header>
                <el-main class="rootMain">
                  <el-checkbox>自定义广告</el-checkbox>
                  <el-checkbox>轮播图列表</el-checkbox>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </el-form>
        <!-- 页脚提交按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" >确认提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {getPro} from '@/api/ordermanage'
  export default {
    data() {
      return {
        provinces: '', // 省份选择
        city: '', // 城市选择
        area: '', // 区域选择
        addRoot: false, // 添加管理员弹窗
        addRootForm: [{
          id: '', // 编号
          name: '', // 姓名
          account: '', // 账号
          phone: '', // 电话
          password: '', // 密码
          area: '' // 区域
        }],
        province:'',//省
        city:'',//市
        province_id:'',//选择的省
        city_id:''//选择的市
      }
    },
    methods:{
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
          'province_id': this.province_id
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
      }
    },
    mounted(){
       this.getProvince()
    }
  }
</script>
<style>
  /* 添加管理员弹窗的头部样式 */
  .permissions-container .addRoot_dialog .el-dialog__header{
    background:rgb(48, 65, 86);
  }
  /* 添加管理员弹窗的title样式 */
  .permissions-container .addRoot_dialog .el-dialog__title{
    color:#fff;
  }
  /* 权限管理容器头部样式 */
  .permissions-container .addRoot_dialog .rootHeader{
    background:rgb(48, 65, 86);
    line-height: 40px;
  }
  /* 权限管理容器头部内容样式 */
  .permissions-container .addRoot_dialog .rootHeader .el-checkbox{
    color:#fff;
  }
  /* 权限管理容器内容样式 */
  .permissions-container .addRoot_dialog .rootMain{
    height:98px;
    border: 1px solid #979797;
    border-top:none;
  }
  .permissions-container .addRoot_dialog .rootMain .el-checkbox{
    margin:0;
    margin-right:10px;
  }
  /* 权限管理容器内容样式 */
  .permissions-container .addRoot_dialog .rootContent{
    padding: 0 2px;
  }
  /* 权限管理格局分布 */
  .permissions-container .addRoot_dialog .management{
    margin-top:25px;
  }
</style>
