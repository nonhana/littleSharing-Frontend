<template>
  <div class="graphinfo-wrap">
    <div class="userinfo-charts">
      <div v-loading="loading[0]">
        <div
          v-if="!noKeyWords"
          ref="keywordschart"
          class="chart"
          style="width: 540px"
        />
        <div v-else class="chart" style="width: 540px">
          <div style="display: flex; justify-content: center">
            <h3>浏览文章关键词统计</h3>
          </div>
          <el-empty description="暂无数据" />
        </div>
      </div>

      <div v-loading="loading[1]">
        <div
          v-if="!noArticle"
          ref="articletagschart"
          class="chart"
          style="width: 540px"
        />
        <div v-else class="chart" style="width: 540px">
          <div style="display: flex; justify-content: center">
            <h3>发布文章类别统计</h3>
          </div>
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <br />
    <br />
    <div v-loading="loading[2]" ref="likedatachart" class="chart" />
    <br />
    <br />
    <div v-loading="loading[3]" ref="collectdatachart" class="chart" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import * as echarts from 'echarts'
import { formatDate } from '@/utils'
import {
  getUserKeywords,
  getUserArticleTags,
  getLikedArticles,
  getCollectedArticles
} from '@/api/user'

// 获取图表的DOM节点
const keywordschart = ref<HTMLDivElement>()
const articletagschart = ref<HTMLDivElement>()
const likedatachart = ref<HTMLDivElement>()
const collectdatachart = ref<HTMLDivElement>()

const route = useRoute()
const { userStore, keywordStore } = useStore()

const user_id = ref<number>(0)
const liked_articles = ref<any[]>([])
const collected_articles = ref<any[]>([])
const date_list = ref<any[]>([])
const like_num_list = ref<any[]>([])
const collect_num_list = ref<any[]>([])
const noKeyWords = ref<boolean>(false)
const noArticle = ref<boolean>(false)
const loading = ref<boolean[]>([false, false, false, false])

const compareDate = (d1: string, d2: string) => {
  return new Date(d1.replace(/-/g, '/')) > new Date(d2.replace(/-/g, '/'))
}
const doHandleMonth = (month: number) => {
  let m = String(month)
  if (month.toString().length === 1) {
    m = '0' + String(month)
  }
  return m
}
const getDay = (day: number) => {
  let today = new Date()
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds) //注意，这行是关键代码
  let tYear = today.getFullYear()
  let tMonth = today.getMonth()
  let tDate = today.getDate()
  const monthStr = doHandleMonth(tMonth + 1)
  const dateStr = doHandleMonth(tDate)
  return tYear + '-' + monthStr + '-' + dateStr
}
const getEchartKeyWords = async () => {
  // 1. 先用$refs获取到需要渲染echarts的div节点
  if (keywordschart.value) {
    loading.value[0] = true
    // 2. 初始化echarts
    const myChart = echarts.init(keywordschart.value as HTMLDivElement)
    // 3. 请求获取用户发布的文章类别数据
    if (user_id.value === userStore.userInfo.user_id) {
      if (keywordStore.keywordInfo.length > 0) {
        // 4. 处理数据，将类别名称和数量组成echarts需要的格式
        const data = keywordStore.keywordInfo
          .sort((a: any, b: any) => b.keywords_count - a.keywords_count)
          .slice(0, 5)
          .map((item: any) => {
            return { name: item.keywords_name, value: item.keywords_count }
          })
        // 5. 书写配置项
        const option = {
          title: {
            text: '浏览文章关键词统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '类别',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        // 6. 挂载配置项
        myChart.setOption(option)
      } else {
        noKeyWords.value = true
      }
    } else {
      const keywords = (await getUserKeywords({ user_id: user_id.value }))
        .result
      if (keywords.length > 0) {
        // 4. 处理数据，将类别名称和数量组成echarts需要的格式
        const data = keywords
          .sort((a: any, b: any) => b.keywords_count - a.keywords_count)
          .slice(0, 5)
          .map((item: any) => {
            return { name: item.keywords_name, value: item.keywords_count }
          })
        // 5. 书写配置项
        const option = {
          title: {
            text: '浏览文章关键词统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '类别',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        // 6. 挂载配置项
        myChart.setOption(option)
      } else {
        noKeyWords.value = true
      }
    }
    loading.value[0] = false
  }
}
const getEchartArticleTags = async () => {
  // 1. 先用$refs获取到需要渲染echarts的div节点
  if (articletagschart.value) {
    loading.value[1] = true
    // 2. 初始化echarts
    const myChart = echarts.init(articletagschart.value as HTMLDivElement)
    // 3. 请求获取用户发布的文章类别数据
    const res = await getUserArticleTags({ user_id: user_id.value })
    // 4. 处理数据，将类别名称和数量组成echarts需要的格式
    let data: any[] = []
    if (res.result_code === 0) {
      if (res.result.length > 0) {
        data = res.result.map((item: any) => {
          return { name: item.tag_name, value: item.count }
        })
      } else {
        noArticle.value = true
      }
    }

    // 5. 书写配置项
    const option = {
      title: {
        text: '发布文章类别统计',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '类别',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    // 6. 挂载配置项
    myChart.setOption(option)
    loading.value[1] = false
  }
}
const getEchartLikeData = () => {
  if (likedatachart.value) {
    loading.value[2] = true
    const myChart = echarts.init(likedatachart.value as HTMLDivElement)
    const option = {
      title: {
        text: '点赞数据'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['点赞量']
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date_list.value
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '点赞量',
          type: 'line',
          stack: 'Total',
          data: like_num_list.value,
          smooth: true,
          itemStyle: {
            color: 'skyblue' //改变折线点的颜色
          },
          lineStyle: {
            color: 'skyblue' //改变折线颜色
          }
        }
      ]
    }
    myChart.setOption(option)
    loading.value[2] = false
  }
}
const getEchartCollectData = () => {
  // 1.先用$refs获取到需要渲染echarts的div节点
  if (collectdatachart.value) {
    loading.value[3] = true
    // 2.初始化echarts
    const myChart = echarts.init(collectdatachart.value as HTMLDivElement)
    // 3.书写配置项
    const option = {
      // 图标标题
      title: {
        text: '收藏数据'
      },
      // axis:折线图
      tooltip: {
        trigger: 'axis'
      },
      // 标签
      legend: {
        data: ['收藏量']
      },
      // 图表位置调整
      grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // 工具栏，提供给用户一系列的操作功能
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      // 横轴
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date_list.value
      },
      // 竖轴
      yAxis: {
        type: 'value'
      },
      // 系列，数据源
      series: [
        {
          name: '收藏量',
          type: 'line',
          stack: 'Total',
          data: collect_num_list.value,
          smooth: true,
          itemStyle: {
            color: 'gray' //改变折线点的颜色
          },
          lineStyle: {
            color: 'gray' //改变折线颜色
          }
        }
      ]
    }
    // 挂载书写好的配置项
    myChart.setOption(option)
    loading.value[3] = false
  }
}

watch(
  () => route.params.user_id,
  (newV, _) => {
    user_id.value = Number(newV)
  },
  { immediate: true }
)

onMounted(async () => {
  // 获取最近10天的日期列表
  while (date_list.value.length < 10) {
    let date = getDay(date_list.value.length - 10)
    date_list.value.push(date)
  }

  const likedRes = await getLikedArticles({ user_id: user_id.value })
  likedRes.result.forEach((item: any) => {
    liked_articles.value.push(item)
  })
  // 获取最近10天的点赞量数量列表
  date_list.value.forEach((item1) => {
    let total_num = 0
    liked_articles.value.forEach((item2: any) => {
      if (compareDate(item1, formatDate(item2.createdAt))) {
        total_num++
      }
    })
    like_num_list.value.push(total_num)
  })

  const collectedRes = await getCollectedArticles({ user_id: user_id.value })
  collectedRes.result.forEach((item: any) => {
    collected_articles.value.push(item)
  })
  // 获取最近10天的收藏量数量列表
  date_list.value.forEach((item1) => {
    let total_num = 0
    collected_articles.value.forEach((item2: any) => {
      if (compareDate(item1, formatDate(item2.createdAt))) {
        total_num++
      }
    })
    collect_num_list.value.push(total_num)
  })

  setTimeout(() => {
    getEchartKeyWords()
    getEchartArticleTags()
    getEchartLikeData()
    getEchartCollectData()
  }, 100)
})
</script>

<style scoped lang="less">
.graphinfo-wrap {
  position: relative;
  padding: 30px 0;
  width: 100%;
  background: #fff;
  border-radius: 20px;

  .userinfo-charts {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 1240px;

    div {
      margin: 0;
    }
  }

  .chart {
    padding: 20px;
    margin: 0 auto;
    width: 1200px;
    height: 350px;
    border: 1px solid #9e9e9e;
    border-radius: 20px;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 8px 16px 0 rgb(0 0 0 / 24%);
    }
  }
}
</style>
