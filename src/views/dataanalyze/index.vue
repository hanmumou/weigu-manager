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

    <!-- 销售统计 -->
    <div class="SalesEcharts" style="padding:0 1.2%;margin-top:20px;">
      <!-- 统计Echarts -->
      <el-container>
        <el-header style="background:#050507;color:#fff;height:56px;line-height: 56px;">销售详情</el-header>
        <el-main style="height:448px;">
          <Echarts :chart-data="lineChartData"/>
        </el-main>
      </el-container>
    </div>

    <!--图表层-->
    <div class="chartrow">
      <el-row>
        <el-col :span="15">
          <!-- 销售趋势 -->
          <el-container>
            <el-header style="background:#050507;color:#fff;height:56px;line-height: 56px;">销售趋势</el-header>
            <el-main style="height:448px;">
              <Echarts :chart-data="lineChartData"/>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="9">
          <!-- 会员分析 -->
          <el-container>
            <el-header style="background:#03B06C;color:#fff;height:56px;line-height: 56px;">会员分析</el-header>
            <el-main style="height:448px;">
              <round-echarts/>
            </el-main>
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
            <el-main style="height:448px;">
              <!-- 商品销售排行表格 -->
              <el-table :max-height="408">
                <!-- 图片 -->
                <el-table-column
                  label="图片"
                  align="center"/>
                <!-- 商品名称 -->
                <el-table-column
                  label="商品名称"
                  align="center"/>
                <!-- 价格 -->
                <el-table-column
                  label="价格"
                  align="center"/>
                <!-- 销售数量 -->
                <el-table-column
                  label="销售数量"
                  align="center"/>
              </el-table>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="12">
          <el-container>
            <el-header style="background:#ED0305;color:#fff;height:56px;line-height: 56px;">团长销售排行</el-header>
            <el-main style="height:448px;">
              <!-- 团长销售排行 -->
              <el-table :max-height="408">
                <!-- 姓名 -->
                <el-table-column
                  label="姓名"
                  align="center"/>
                <!-- 电话 -->
                <el-table-column
                  label="电话"
                  align="center"/>
                <!-- 城市 -->
                <el-table-column
                  label="城市"
                  align="center"/>
                <!-- 小区 -->
                <el-table-column
                  label="小区"
                  align="center"/>
                <!-- 销售总额 -->
                <el-table-column
                  label="销售总额"
                  align="center"/>
                <!-- 已得佣金 -->
                <el-table-column
                  label="已得佣金"
                  align="center"/>
              </el-table>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
    <!--排行榜结束-->
  </div>
</template>

<script>
import Echarts from '@/components/Echarts/index'
import RoundEcharts from '@/components/roundEcharts/index'

const lineChartData = {
  newVisitis: {
    expectedData: [50, 60, 70, 80, 60, 90, 120, 115, 160, 135, 155, 130],
    actualData: [120, 110, 105, 125, 133, 142, 105, 135, 114, 115, 150, 1000]
  }
}

export default {
  components: {
    Echarts,
    RoundEcharts
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
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
