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
import {getSomeAvageCount} from "@/api";

export default {
  name: "center1",
  setup() {

    const aqiArr = [];
    const tempArr = [];
    const psfcArr = [];
    const rhArr = [];

    // 获取数据
    const getData= async () =>{
      const param = {
        method: 'get',
      };
      await getSomeAvageCount(param).then(res =>{
        const s = res.data.data;
        for(let i = 0;i < s.aqi.length;i++){
          // 为了让数据更直观，这里做了一些调节
          aqiArr.push(s.aqi[i]);
          // 气压单位用 巴
          psfcArr.push(s.psfc[i]/100-500);
          rhArr.push(s.rh[i]);
          tempArr.push(s.temp[i]);
        }

      })
    };

    const drawLine = async () => {
      const myChart = echarts.init(document.getElementById('line'));
      // 深拷贝
      const data_aqi = JSON.parse(JSON.stringify(aqiArr));
      const data_psfc = JSON.parse(JSON.stringify(psfcArr));
      const data_rh = JSON.parse(JSON.stringify(rhArr));
      const data_temp = JSON.parse(JSON.stringify(tempArr));
      console.log(data_aqi)
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
            max: 1000,
            interval: 100,
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
            max: 100,
            interval: 20,
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
            data: data_temp
          },
          {
            name: '地面气压',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' bar';
              }
            },
            data: data_psfc
          },
          {
            name: '平均湿度',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: data_rh
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
            data: data_aqi
          }
        ],
        grid:{
          top:90
        }

      }
      myChart.setOption(option);
    };
    onMounted(async () => {
      await getData();
      await drawLine()
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
