<template>
  <div class="sales-continer">
    <!--销售列表-->
    <el-row class="salesAll">
      <el-col :span="8">
        <div class="sales" style="background:#000;">
          <el-select v-model="Def" placeholder="请选择">
            <el-option-group
              v-for="group in city"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.cityName"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-option-group>
          </el-select>
          <p style="color:#fff;">请选择您想搜索的城市</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="sales">
          <div class="sale-select">
            <img src="@/assets/sales_images/Group7.png">
          </div>
          <div class="sale-select">
            <img src="@/assets/sales_images/Group8.png">
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="sales">
          <div class="sale-select">
            <img src="@/assets/sales_images/Group11.png">
          </div>
          <div class="sale-select">
            <img src="@/assets/sales_images/Group12.png">
          </div>
        </div>
      </el-col>
    </el-row>
    <!--销售列表结束-->

    <!--图表层-->
    <div class="chart">
      <el-row>
        <el-col :span="15">
          <el-container>
            <el-header style="background:#050507;color:#fff;height:56px;line-height: 56px;">销售趋势</el-header>
            <el-main style="height:448px;">
              <div id="main" style="width: 100%;height:488px;"/>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="9">
          <el-container>
            <el-header style="background:#03B06C;color:#fff;height:56px;line-height: 56px;">会员分析</el-header>
            <el-main style="height:448px;">2</el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
    <!--图标层结束-->

    <!--分割层-->
    <div class="hr-container">
      <div class="hr"/>
    </div>
    <!--分割层结束-->

    <!--排行榜-->
    <div class="ranList">
      <el-row>
        <el-col :span="12">
          <el-container>
            <el-header style="background:#03B06C;color:#fff;height:56px;line-height: 56px;">商品销售排行</el-header>
            <el-main style="height:448px;">2</el-main>
          </el-container>
        </el-col>
        <el-col :span="12">
          <el-container>
            <el-header style="background:#ED0305;color:#fff;height:56px;line-height: 56px;">团长销售排行</el-header>
            <el-main style="height:448px;">2</el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
    <!--排行榜结束-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: [
        {
          label: '热门城市',
          cityName: [
            {
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '城市名',
          cityName: [
            {
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      Def: ''
    }
  },
  methods: {

  }
}
</script>

