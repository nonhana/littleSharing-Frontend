<template>
  <div name="HomeAuthorList" class="HomeAuthorList-wrap">
    <el-row>
      <span class="title">浏览趋势</span>
    </el-row>
    <el-row style="margin: 10px 0 0 0">
      <div>
        <div ref="chart" style="width: 300px; height: 400px" />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getArticleTrendAPI } from "@/api/articles";
import * as echarts from "echarts";
import { ElNotification } from "element-plus";

interface SeriesInfo {
  name: string;
  type: string;
  stack: string;
  data: Array<number>;
}
interface TrendInfo {
  id: number;
  trend_name: string;
  value_list: Array<number>;
}

const chart = ref<HTMLDivElement>();

let trend_name: string[] = [];
let trend_value: number[][] = [];
let trend_series: SeriesInfo[] = [];

const fetchArticleTrend = async () => {
  const res = await getArticleTrendAPI();
  console.log(res.data);
  if (res.data.result_code == 0) {
    if (res.data.result.topFiveTrends) {
      trend_name = res.data.result.topFiveTrends.map(
        (item: TrendInfo) => item.trend_name
      );
      trend_value = res.data.result.topFiveTrends.map(
        (item: TrendInfo) => item.value_list
      );
      trend_name.forEach((item, index) => {
        trend_series.push({
          name: item,
          type: "line",
          stack: "Total",
          data: trend_value[index],
        });
      });
      getEchartData(); // 在数据加载完成后调用渲染函数
    }
  } else {
    ElNotification({
      title: "获取文章趋势失败",
      message: res.data.message,
      type: "error",
    });
  }
};

const getEchartData = () => {
  if (chart) {
    const myChart = echarts.init(chart.value as HTMLDivElement);
    const option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: trend_name,
      },
      grid: {
        left: "0%",
        right: "1%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: trend_series,
    };
    myChart.setOption(option);
  }
};

watch(
  () => trend_name,
  () => {
    if (trend_name.length > 0) {
      getEchartData();
    }
  }
);

onMounted(() => {
  fetchArticleTrend();
});
</script>

<style scoped lang="less">
.HomeAuthorList-wrap {
  margin-top: 20px;
  padding: 10px;
  position: relative;
  width: 300px;
  border-radius: 20px;
  opacity: 1;
  background: #ffffff;

  .title {
    height: 35px;
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  }
}
</style>
