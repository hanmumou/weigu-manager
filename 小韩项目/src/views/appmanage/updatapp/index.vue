<template>
  <div class="app-container">
    <!-- 更新小程序页面整体容器 -->
    <div class="update-continer">
      <!-- 通过状态判断是否更新版本，若为1，就是有更新 -->
      <div v-if="status===1" class="hasAdd">
        <!-- 更新版本图片 -->
        <el-row>
          <el-col :span="6" :offset="9" class="updateImg">
            <img src="@/assets/update_wechat/update.png">
          </el-col>
        </el-row>
        <!-- 更新版本按钮 -->
        <el-row style="marginTop:26px;">
          <el-col :span="6" :offset="9" class="updateBtn">
            <el-button type="success">去升级小程序</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 通过状态判断是否更新版本，若为0，就是无更新 -->
      <div v-if="status===0" class="notAdd">
        <!-- 无更新版本图片 -->
        <el-row>
          <el-col :span="6" :offset="9" class="notImg">
            <img src="@/assets/update_wechat/Not_update.png">
          </el-col>
        </el-row>
        <p class="content">您使用的版本为最新版本，无需升级！</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      status: 0
    }
  },
  methods: {
  }
}
</script>
