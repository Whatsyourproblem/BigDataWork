<template>
  <div class="center">
    <!-- 这里画地图 -->
<!--    <div class="d-flex pt-2 pl-2">
                <span style="font-size: 15px">
                    <i class="iconfont icon-tongji2"/>
                    空气质量分析柱状体
                </span>
    </div>-->
    <div style="height: 410px;">
      <div id="line" style="height: 100%"></div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'

export default {
  name: "center1",
  setup() {
    const drawLine = () => {
      const myChart = echarts.init(document.getElementById('line'))
      const option = {
        //测试数据
        /*xAxis: {
            data: ['2013', '2014', '2015', '2016', '2017', '2018']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [23, 24, 18, 25, 27, 28, 25]
            }
        ]*/
       /* title:{
          left:20,
          top:10,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)'
          },
          text: '全国AQI与温度，气压，温度的关系'
        },*/
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          top:8,
          right:5,
          feature: {
            //dataView: { show: true, readOnly: false },
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true},
          }
        },
        legend: {
          data: ['平均温度', '地面气压', '平均湿度', 'AQI'],
          itemGap: 6,
          top:20,
          left: 50,
          textStyle: {
            color: "rgba(255, 255, 255, 1)"
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['2013', '2014', '2015', '2016', '2017', '2018'],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 1)"
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '值',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}',
              color: "rgba(255, 255, 255, 1)"
            },
            nameTextStyle: {
              color: "rgba(255, 255, 255, 255)"
            }
          },
          {
            type: 'value',
            name: 'AQI',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}',
              color: "rgba(255, 255, 255, 1)"
            },
            nameTextStyle: {
              color: "rgba(255, 255, 255, 255)"
            }
          }
        ],
        series: [
          {
            name: '平均温度',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7
            ]
          },
          {
            name: '地面气压',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' KPa';
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7
            ]
          },
          {
            name: '平均湿度',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7
            ]
          },
          {
            name: 'AQI',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
          }
        ],
        grid:{
          top:90
        }

      }
      myChart.setOption(option);
    }
    onMounted(() => {
      drawLine()
    })
  }
}
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
}

.up {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.down {
  padding: 6px 4px;
  padding-bottom: 0;
  width: 100%;
  display: flex;
  height: 250px;
  justify-content: space-between;
}

</style>
