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
import {onMounted, watch ,computed} from 'vue'
import * as echarts from 'echarts'
import {getCityAqiByAsc, getSomeAvageCount, getSomeCityAvageCount} from "@/api";
import { useStore } from "vuex";
export default {
  name: "center1",
  setup() {
    // 组件通信
    const store = useStore();
    var current_year = '';
    var current_name = '';
    const aqiArr = [];
    const tempArr = [];
    const psfcArr = [];
    const rhArr = [];

    let charts = '';

    // 获取数据
    const getData= async () =>{

      const param = {
        method: 'get',
      };
      await getSomeAvageCount(param).then(res =>{
        const s = res.data.data;
        console.log(s);
        for(let i = 0;i < s.aqi.length;i++){
          // 为了让数据更直观，这里做了一些调节
          aqiArr.push(s.aqi[i]);
          // 气压单位用 巴
          psfcArr.push((s.psfc[i]/100-500).toFixed(2));
          rhArr.push(s.rh[i]);
          tempArr.push(s.temp[i]);
        }

      });


    };
    // 重载
    const reloadLine = async (province_aqi,province_psfc,province_rh,province_temp)=>{
      charts.clear();
      // 深拷贝
      const option = {
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
            max: 500,
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
                return value + ' °K';
              }
            },
            data: province_temp
          },
          {
            name: '地面气压',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' bar';
              }
            },
            data: province_psfc
          },
          {
            name: '平均湿度',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: province_rh
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
            data: province_aqi
          }
        ],
        grid:{
          top:90
        }

      }
      charts.setOption(option);
    };

    const drawLine = async () => {
      const myChart = echarts.init(document.getElementById('line'));
      charts = myChart;
      // 深拷贝
      const data_aqi = JSON.parse(JSON.stringify(aqiArr));
      const data_psfc = JSON.parse(JSON.stringify(psfcArr));
      const data_rh = JSON.parse(JSON.stringify(rhArr));
      const data_temp = JSON.parse(JSON.stringify(tempArr));
      const option = {
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
            max: 500,
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

    const flush = async () =>{
      console.log(current_year + ':' + current_name)
      const param = {
        name: current_name,
        method: 'get'
      };
      await getSomeCityAvageCount(param).then(res=>{
        const s = res.data.data;
        // 刷新
        let province_aqi = [];
        let province_psfc = [];
        let province_rh = [];
        let province_temp = [];
        for(let i = 0;i < s.aqi.length;i++){
          // 为了让数据更直观，这里做了一些调节
          province_aqi.push(s.aqi[i]);
          // 气压单位用 巴
          province_psfc.push((s.psfc[i]/100-500).toFixed(2));
          province_rh.push(s.rh[i]);
          province_temp.push(s.temp[i]);
        }

        // 调用重载方法
        reloadLine(province_aqi,province_psfc,province_rh,province_temp)
      });

    };

    // 监听vuex里面的值可以及时发送数据
    const getYearTask = computed(()=>{
      // 监听 year
      return store.state.year;
    });
    const getNameTask = computed(()=>{
      // 监听 name
      return store.state.name;
    });
    // 监听
    watch(getYearTask,(newVal,oldVal) =>{
      current_year = newVal;
    });
    watch(getNameTask,(newVal,oldVal) =>{
      current_name = newVal;
      if (newVal === oldVal){
        // 说明没有变化 不用操作
      }else {
        flush();
      }
    });


    onMounted(async () => {
      await getData();
      await drawLine()
    });

    return {
      flush,reloadLine
    }
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
