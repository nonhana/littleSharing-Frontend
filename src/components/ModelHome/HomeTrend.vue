<template>
  <div class="homeauthorlist-wrap">
    <el-row>
      <span class="title">浏览趋势</span>
    </el-row>
    <el-row style="margin: 10px 0 0">
      <div>
        <div ref="chart" style="width: 300px; height: 400px" />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getArticleTrend } from '@/api/article'
import * as echarts from 'echarts'

const chart = ref<HTMLDivElement>()

let trend_name: string[] = []
let trend_value: number[][] = []
let trend_series: {
  name: string
  type: string
  stack: string
  data: number[]
}[] = []

const fetchArticleTrend = async () => {
  const res = await getArticleTrend()
  if (res.result_code == 0) {
    trend_name = res.result.map((item) => item.trend_name)
    trend_value = res.result.map((item) => item.value_list)
    trend_name.forEach((item, index) => {
      trend_series.push({
        name: item,
        type: 'line',
        stack: 'Total',
        data: trend_value[index]
      })
    })
    getEchartData() // 在数据加载完成后调用渲染函数
  }
}

const getEchartData = () => {
  if (chart.value) {
    const myChart = echarts.init(chart.value as HTMLDivElement)
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: trend_name
      },
      grid: {
        left: '0%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: trend_series
    }
    myChart.setOption(option)
  }
}

watch(
  () => trend_name,
  () => {
    if (trend_name.length > 0) {
      getEchartData()
    }
  }
)

onMounted(() => {
  fetchArticleTrend()
})
</script>

<style scoped lang="less">
.homeauthorlist-wrap {
  position: relative;
  padding: 10px;
  margin-top: 20px;
  width: 300px;
  background: #fff;
  border-radius: 20px;
  opacity: 1;

  .title {
    height: 35px;
    font-size: 24px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    color: #3d3d3d;
    font-weight: bold;
  }
}
</style>
