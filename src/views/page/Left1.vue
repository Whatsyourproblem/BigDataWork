<template>
  <div class="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
                <span>
                    <i class="iconfont icon-fenxi2"/>
                    中国各地空气质量及污染物分布
                </span>

      </div>

      <button class="bubbly-button" @click="returnLevel">
        <span style="font-size: 20px">返回上一级</span>
      </button>
      <!-- 这里画地图 -->
      <div style="height: 750px;">
        <div id="chinaMap" style="height: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>

import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'

export default {
  name: "Left1",
  components: {},

  setup() {
    /*const chinaProvinceData = [
        {name:'新疆',   value: [87.500966,  43.983832, 11,11]},
        {name:'西藏',   value: [90.959657,  29.881987, 22,22]},
        {name:'青海',   value: [101.703679, 36.733408, 33,33]},
        {name:'甘肃',   value: [103.764176, 36.198433, 44,44]},
        {name:'内蒙古', value: [111.711808, 40.98898,  55,55]},
        {name:'宁夏',   value: [106.192619, 38.605171, 66,66]},
        {name:'四川',   value: [103.984944, 30.712171, 77,77]},
        {name:'云南',   value: [102.733927, 25.025991, 88,88]},
        {name:'陕西',   value: [112.521289, 38.025365, 99,99]},
        {name:'山西',   value: [108.84183,  34.510421, 23,23]},
        {name:'重庆',   value: [106.413387, 29.689402, 54,54]},
        {name:'贵州',   value: [106.560565, 26.756654, 25,25]},
        {name:'广西',   value: [108.326706, 22.99805,  122,122]},
        {name:'海南',   value: [110.129641, 20.14162,  299,299]},
        {name:'广东',   value: [113.183592, 23.202287, 174,174]},
        {name:'澳门',   value: [113.551538, 22.109432, 172,172]},
        {name:'香港',   value: [114.066662, 22.588638, 44,44]},
        {name:'台湾',   value: [121.49917,  25.12653,  75,75]},
        {name:'福建',   value: [119.107522, 26.193691, 85,85]},
        {name:'江西',   value: [115.722419, 28.882959, 92,92]},
        {name:'湖南',   value: [112.778851, 28.363482, 26,26]},
        {name:'湖北',   value: [114.177046, 30.743959, 53,53]},
        {name:'安徽',   value: [117.120614, 31.943998, 84,84]},
        {name:'浙江',   value: [119.990592, 30.361806, 82,82]},
        {name:'江苏',   value: [118.665986, 32.194658, 76,76]},
        {name:'河南',   value: [113.441154, 34.8448,   55,55]},
        {name:'山东',   value: [116.973435, 36.763019, 93,93]},
        {name:'上海',   value: [121.315197, 31.314325, 21,21]},
        {name:'河北',   value: [114.397814, 38.170754, 17,17]},
        {name:'天津',   value: [117.194203, 39.180291, 22,22]},
        {name:'北京',   value: [116.384722, 39.977552, 51,51]},
        {name:'辽宁',   value: [123.412489, 41.875105, 66,66]},
        {name:'吉林',   value: [125.252219, 43.850841, 19,19]},
        {name:'黑龙江', value: [126.503235, 45.865719, 22,22]}
    ];*/
    // 测试数据
    const chinaNewProvinceData = [
      //name ,value [ x,y, aqi,pm2,pm10,so2,no2,co,o3]
      {name: '新疆', value: [87.500966, 43.983832, 55, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '西藏', value: [90.959657, 29.881987, 55, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '青海', value: [101.703679, 36.733408, 55, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '甘肃', value: [103.764176, 36.198433, 11, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '内蒙古', value: [111.711808, 40.98898, 127, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '宁夏', value: [106.192619, 38.605171, 99, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '四川', value: [103.984944, 30.712171, 263, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '云南', value: [102.733927, 25.025991, 122, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '陕西', value: [112.521289, 38.025365, 78, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '山西', value: [108.84183, 34.510421, 65, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '重庆', value: [106.413387, 29.689402, 77, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '贵州', value: [106.560565, 26.756654, 123, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '广西', value: [108.326706, 22.99805, 233, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '海南', value: [110.129641, 20.14162, 167, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '广东', value: [113.183592, 23.202287, 178, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '澳门', value: [113.551538, 22.109432, 66, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '香港', value: [114.066662, 22.588638, 123, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '台湾', value: [121.49917, 25.12653, 88, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '福建', value: [119.107522, 26.193691, 297, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '江西', value: [115.722419, 28.882959, 132, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '湖南', value: [112.778851, 28.363482, 167, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '湖北', value: [114.177046, 30.743959, 190, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '安徽', value: [117.120614, 31.943998, 32, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '浙江', value: [119.990592, 30.361806, 78, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '江苏', value: [118.665986, 32.194658, 46, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '河南', value: [113.441154, 34.8448, 278, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '山东', value: [116.973435, 36.763019, 235, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '上海', value: [121.315197, 31.314325, 189, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '河北', value: [114.397814, 38.170754, 267, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '天津', value: [117.194203, 39.180291, 49, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '北京', value: [116.384722, 39.977552, 178, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '辽宁', value: [123.412489, 41.875105, 232, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '吉林', value: [125.252219, 43.850841, 167, 20, 23, 8, 4, 0.29, 63.44]},
      {name: '黑龙江', value: [126.503235, 45.865719, 231, 20, 23, 8, 4, 0.29, 63.44]}
    ];
    //用来存放当前的地图名字
    let currentName = '';
    //用来存放下钻的历史记录
    let history = [];
    let options = {};
    let charts = '';
    // 绘图
    const drawChina = () => {
      const myChart = echarts.init(document.getElementById("chinaMap"));
      charts = myChart;
      const json = require('@/assets/json/china.json')
      echarts.registerMap('china', json);//注册可用的地图
      const option = {
        /*                    dataset:{
                                source : chinaProvinceData
                            },*/
        // 这里 visualMap 可以配置多个
        visualMap: [
          {
            type: "piecewise",//分段标签
            textStyle: {
              color: '#fff'
            },
            min: 0,//最小值
            max: 300,//最大值，不设置为无限大
            right: 40,//距离右侧位置
            bottom: 300,//距离底部位置
            orient: "vertical",//组件竖直放置
            align: "left",//色块在左
            textGap: 14,//文字主体之间的距离
            itemSymbol: "circle",//右下角映射组件使用圆点形状
            show: true,
            seriesIndex: 0,//指定取哪个系列的数据(series.data)，若不设置则会影响图上标点颜色设置。

            //一以下是分段式视觉映射组件的每一段的范围
            //gt：大于、gte：大于等于、lt：小于、lte：小于等于。
            pieces: [
              // 为离散点个数不同设置不同的颜色
              // 比如这里可以设置成五段，污染程度 优 良 中 合格 差
              {
                gt: 200,
                label: "空气质量差",
                color: "red",
              },
              {
                gte: 100,
                lte: 200,
                label: "空气质量中",
                color: "orange",
              },
              {
                gte: 50,
                lt: 100,
                label: "空气质量良",
                color: "yellow",
              },
              {
                gte: 0,
                lt: 50,
                label: "空气质量优",
                color: "rgb(255,252,200)",
              },
            ],
            /*
            pieces或者inRange内设置颜色试验时都能生效，个人认为需要传入组件控制颜色时
            再选择用inRange，两个都存在并给予不同的颜色，显示以pieces为主。
            */
            //inRange: {
            //    color: ["#99CBF9", "#59AAF5", "#1492FF"],
            //},
          },
          {
            type: 'continuous',
            // 使用 value[3]中的数据表示污染程度，散点颜色变化
            min: 0,
            max: 300,
            left: 30,
            bottom: 20,
            calculable: true,
            seriesIndex: 0,
            dimension: 2,
            inRange: {
              /*color: ['#ABCDEF', '#99CC99']*/
              // 为了方便测试 颜色调明显点
              color: ['rgb(255,252,200)', 'yellow', 'orange', 'red']
            },
            textStyle: {
              color: '#fff'
            }
          },


        ],
        title: {
          text: '大气污染物分布图',
          left: 'center',
        },
        // 小卡片展示
        tooltip: {
          trigger: 'item',
          show: false
          // 这里是geo组件上卡片信息，我们这里不展示
        },
        // 标注数据
        series: [
          {

            type: 'effectScatter',
            //type: 'scatter',
            coordinateSystem: 'geo', //  指明绘制在geo坐标系上
            z: 11,
            data: chinaNewProvinceData,
            itemStyle: {
              normal: {
                color: '#FFFF00'
              },
            },
            // 散点的大小 可以直接写大小，也可以通过函数配置
            symbolSize: 8,
            /*                            symbolSize: function (val) {
                                            console.log(val)
                                            return val[2] /10;
                                        },*/
            tooltip: {
              show: true,
              trigger: 'item',
              position: 'right',//提示框位置
              backgroundColor: "rgba(185,197,218,0.8)", //设置背景图片 rgba格式
              borderColor: '#9a9c9d',
              textStyle: {
                color: '#fff'
              },
              formatter: function (params) {
                let AQI = params.data.value[2]
                let pm2 = params.data.value[3]
                let pm10 = params.data.value[4]
                let so2 = params.data.value[5]
                let no2 = params.data.value[6]
                let co = params.data.value[7]
                let o3 = params.data.value[8]
                let s = '';
                if (params.data.value[2] >= 200) {
                  s = '差';
                } else if (params.data.value[2] >= 100 && params.data.value[2] < 200) {
                  s = '一般'
                } else if (params.data.value[2] >= 50 && params.data.value[2] < 100) {
                  s = '良'
                } else if (params.data.value[2] >= 0 && params.data.value[2] < 50) {
                  s = '优'
                }

                let result = '<br>' + '<span style="font-size: 20px">' + params.name + ':' + '</span>' + '<span style="font-size: 22px;color: red">' + '空气质量' + s + '</span>' + '</br>' +
                    '<br>' + '<span style="font-size: 20px">' + 'AQI:' + AQI + '</br>' +
                    '<br>' + '<span style="font-size: 20px">' + 'PM2.5:' + pm2 + '</span>' + '<span style="font-size: 20px;">' + '    PM10:' + pm10 + '</span>' + '</br>' +
                    '<br>' + '<span style="font-size: 20px">' + 'SO2:' + so2 + '</span>' + '<span style="font-size: 20px;">' + '    NO2:' + no2 + '</span>' + '</br>' +
                    '<br>' + '<span style="font-size: 20px">' + 'CO:' + co + '</span>' + '<span style="font-size: 20px;">' + '    O3:' + o3 + '</span>' + '</br>'

                return result;
              },
            }
          },
        ],
        // geo地图对象
        geo: {
          show: true,
          //设置中心点
          center: [105.194115019531, 35.582111640625],
          map: 'china',
          roam: true, //是否允许缩放，拖拽
          zoom: 1.5, //初始化大小
          //缩放大小限制
          scaleLimit: {
            min: 0.1, //最小
            max: 12, //最大
          },
          //各个省份模块样式设置
          itemStyle: {
            normal: {
              areaColor: '#3352c7',//背景色
              color: '#004981',//背景颜色
              borderColor: '#5e84fd',
              borderWidth: 2,
            },
          },
          //高亮状态
          emphasis: {
            label: {
              show: true,
              color: '#fff',
            },
          },
          // 显示层级
          z: 10,


        },

        //图例组件
        /*legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['pm2.5'],
            textStyle: {
                color: '#000'
            }
        },*/

      }
      options = option;
      charts.setOption(options);
      currentName = 'china';
      return charts;

    }
    onMounted(() => {
      let myChart = drawChina();

      // 这里可以进行数据下钻
      myChart.on('click', (params, myChart) => {
        getDown(params.name);
        console.log(params)
      })
    });

    // 下钻 先暂时实现河南 后续调用接口
    const getDown = async (name) => {
      //获取地图数据之后，修改地图options
      const mapname = name;
      if (!echarts.getMap(name)) {
        const newMapJson = await getMapJson(name);
        echarts.registerMap(mapname, newMapJson)
      }
      const option = {
        // geo地图对象
        geo: {
          show: true,
          map: name,
          roam: true, //是否允许缩放，拖拽
          zoom: 1, //初始化大小
          //缩放大小限制
          scaleLimit: {
            min: 0.1, //最小
            max: 12, //最大
          },
          //各个省份模块样式设置
          itemStyle: {
            normal: {
              areaColor: '#3352c7',//背景色
              color: 'red',//字体颜色
              borderColor: '#5e84fd',
              borderWidth: 2,
            },
          },
          /*itemStyle: {
              shadowColor: '#C3F4F4',
              shadowOffsetX:'-2px',
              shadowOffsetY: '10px',
              shadowBlur: '5px'
          },*/
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#ffc601',
            },
            label: {
              show: true,
              color: '#fff',
            },
          },
          // 显示层级
          z: 10,
        },
        // 小卡片展示
        tooltip: {
          show: true,
          // 这里是鼠标移入后，会触发信息窗格
          trigger: 'item',
          backgroundColor: 'rgba(11,182,165)',
          textStyle: {
            fontSize: '18',    // 文字字体大小
            lineHeight: '60',    // 行高
          },
        },

      }
      options = option
      //options.series[0].map = mapname;
      //然后重新绘制地图
      history.push(currentName)
      //const myChart = echarts.init(document.getElementById('chinaMap'))
      charts.setOption(options, true);
      currentName = name
    };
    // 调用省级json数据，后续调用接口
    const getMapJson = async (name) => {
      console.log(name)
      const json = await require('../../assets/json/' + name + '.json')
      return json
    };
    // 回钻
    const returnLevel = async () => {
      console.log("hhhh")
      //先判断history有没有数据，能不能返回
      if (history.length == 0) {
        return false
      }
      //取出要返回的那个名字
      const name = history.pop()
      const currentJson = echarts.getMap(name).geoJson
      //修改地图配置重新绘制地图
      const option = {

        // geo地图对象
        geo: {
          show: true,
          //设置中心点
          center: [105.194115019531, 35.582111640625],
          map: name,
          roam: true, //是否允许缩放，拖拽
          zoom: 1, //初始化大小
          //缩放大小限制
          scaleLimit: {
            min: 0.1, //最小
            max: 12, //最大
          },
          //各个省份模块样式设置
          itemStyle: {
            normal: {
              areaColor: '#3352c7',//背景色
              color: 'red',//字体颜色
              borderColor: '#5e84fd',
              borderWidth: 2,
            },
          },
          /*itemStyle: {
              shadowColor: '#C3F4F4',
              shadowOffsetX:'-2px',
              shadowOffsetY: '10px',
              shadowBlur: '5px'
          },*/
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#ffc601',
            },
            label: {
              show: true,
              color: '#fff',
            },
          },
          // 显示层级
          z: 10,
        },
        //左侧小导航图标
        /*visualMap: {
            show : true,
            x: 'left',
            y: 'center',
            splitList: [
                {start: 500, end:600},{start: 400, end: 500},
                {start: 300, end: 400},{start: 200, end: 300},
                {start: 100, end: 200},{start: 0, end: 100},
            ],
            color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
        },*/
        // 小卡片展示
        tooltip: {
          show: true,
          // 这里是鼠标移入后，会触发信息窗格
          trigger: 'item',
          backgroundColor: 'rgba(11,182,165)',
          textStyle: {
            fontSize: '18',    // 文字字体大小
            lineHeight: '60',    // 行高
          },
        },

        // 可以使用series和geo叠加生成阴影
        /*series: [
            {
                type: 'map',
                map: 'china',
                roam: false,
                tooltip:{
                    show:false
                },
                label: {
                    show:false,
                    color:'#fff'
                },
                itemStyle: {
                    areaColor:imageDom,
                    borderColor: '#C3F4F4',
                    borderWidth:'2px'
                },
                emphasis: {
                    itemStyle: {
                        areaColor:lightDom
                    },
                    label:{
                        show:false
                    }
                }
            }
        ]*/
      }
      options = option
      charts.setOption(options)
      //修改当前的层级，名字
      currentName = name
    }

    return {
      returnLevel
    }
  }
}
</script>

<style lang="scss" scoped>
/*$box-width: 300px;*/
$box-width: 100%;
$box-height: 900px;

.centreLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
  }

  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }

      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;

      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }

      i {
        font-size: 20px;
        line-height: 30px;
        margin-left: 20px;
      }

      .colorYellow {
        color: yellowgreen;
      }

      p {
        text-align: center;
      }
    }
  }
}

.bubbly-button {
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 1em;
  padding: 20px 20px;
  -webkit-appearance: none;
  appearance: none;
  background-color: rgb(14, 19, 37);
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(14, 19, 37);
}
</style>
