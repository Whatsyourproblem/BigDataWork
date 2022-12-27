<template>
  <div class="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
                <span>
                    <i class="iconfont icon-fenxi2"/>
                    中国各地空气质量及污染物分布
                </span>

      </div>

        <div>
            <button class="bubbly-button" @click="returnLevel">
                <span style="font-size: 20px">返回上一级</span>
            </button>
            <button style="margin-left: 8%" class="bubbly-button1" @click="getInfoByYear2013()">
                <span style="font-size: 20px">2013</span>
            </button>
            <button class="bubbly-button1" @click="getInfoByYear2014">
                <span style="font-size: 20px">2014</span>
            </button>
            <button class="bubbly-button1" @click="getInfoByYear2015">
                <span style="font-size: 20px">2015</span>
            </button>
            <button class="bubbly-button1" @click="getInfoByYear2016">
                <span style="font-size: 20px">2016</span>
            </button>
            <button class="bubbly-button1" @click="getInfoByYear2017">
                <span style="font-size: 20px">2017</span>
            </button>
            <button class="bubbly-button1" @click="getInfoByYear2018">
                <span style="font-size: 20px">2018</span>
            </button>
        </div>


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
import '@/api/index'
import {getCityInfoByProvince, getInfoByYear, getProvinceInfo} from "@/api";
import { useStore } from "vuex";
export default {
  name: "Left1",
  components: {},

  setup() {
    // 组件通信
    const store = useStore();

    const year_2013 = 2013;
    const year_2014 = 2014;
    const year_2015 = 2015;
    const year_2016 = 2016;
    const year_2017 = 2017;
    const year_2018 = 2018;
    let current_year = 2013;

    let dataResult = [];
    let cityInfos = [];
    //用来存放当前的地图名字
    let currentName = '';
    //用来存放下钻的历史记录
    var history = [];
    let options = {};
    let charts = '';
    onMounted(async () => {

        // 先发送当前年份
        store.commit('addYear',current_year);

        await getData();
        let myChart = await drawChina();
        // 这里可以进行数据下钻
        myChart.on('click', (params, myChart) => {
        getDown(params.name);
      })
    });

    // 根据年份获取信息
    const getInfoByYear2013 = () =>{
        history.pop();
      current_year = 2013;
      const param = {
          method: 'get',
          data: 2013
      };
      getInfoByYear(param).then(res=>{
          flushProvince(res.data.data);
          const s = res.data.data;
          dataResult = [];
          for (let i = 0;i < s.length;i++){
              const name = s[i].name;
              const value = s[i].value;
              const m = {
                  name: name,
                  value: value
              };
              dataResult.push(m)
          }
      });
    };

      const getInfoByYear2014 = () =>{
          history.pop();
          current_year = 2014;
          const param = {
              method: 'get',
              data: 2014
          };
          getInfoByYear(param).then(res=>{
              flushProvince(res.data.data);
              const s = res.data.data;
              dataResult = [];
              for (let i = 0;i < s.length;i++){
                  const name = s[i].name;
                  const value = s[i].value;
                  const m = {
                      name: name,
                      value: value
                  };
                  dataResult.push(m)
              }
          });

      };

      const getInfoByYear2015 = () =>{
          history.pop();
          current_year = 2015;
          const param = {
              method: 'get',
              data: 2015
          };
          getInfoByYear(param).then(res=>{
              flushProvince(res.data.data);
              const s = res.data.data;
              dataResult = [];
              for (let i = 0;i < s.length;i++){
                  const name = s[i].name;
                  const value = s[i].value;
                  const m = {
                      name: name,
                      value: value
                  };
                  dataResult.push(m)
              }
          });
      };

      const getInfoByYear2016 = () =>{
          history.pop();
          current_year = 2016;
          const param = {
              method: 'get',
              data: 2016
          };
          getInfoByYear(param).then(res=>{
              flushProvince(res.data.data);
              const s = res.data.data;
              dataResult = [];
              for (let i = 0;i < s.length;i++){
                  const name = s[i].name;
                  const value = s[i].value;
                  const m = {
                      name: name,
                      value: value
                  };
                  dataResult.push(m)
              }
          });
      };

      const getInfoByYear2017 = () =>{
          history.pop();
          current_year = 2017;
          const param = {
              method: 'get',
              data: 2017
          };
          getInfoByYear(param).then(res=>{
              flushProvince(res.data.data);
              const s = res.data.data;
              dataResult = [];
              for (let i = 0;i < s.length;i++){
                  const name = s[i].name;
                  const value = s[i].value;
                  const m = {
                      name: name,
                      value: value
                  };
                  dataResult.push(m)
              }
          });
      };

      const getInfoByYear2018 = () =>{
          history.pop();
          current_year = 2018;
          const param = {
              method: 'get',
              data: 2018
          };
          getInfoByYear(param).then(res=>{
              flushProvince(res.data.data);
              const s = res.data.data;
              dataResult = [];
              for (let i = 0;i < s.length;i++){
                  const name = s[i].name;
                  const value = s[i].value;
                  const m = {
                      name: name,
                      value: value
                  };
                  dataResult.push(m)
              }
          });
      };

      // 数据刷新
      const flushProvince = (data) =>{
          charts.clear();
          const dataList = JSON.parse(JSON.stringify(data));
          const option = {
              // 这里 visualMap 可以配置多个
              visualMap: [
                  {
                      type: "piecewise",//分段标签
                      textStyle: {
                          color: '#fff'
                      },
                      min: 0,//最小值
                      max: 500,//最大值，不设置为无限大
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
                              gte: 301,
                              lte: 500,
                              label: "严重污染",
                              color: 'rgb(130,1,42)',
                          },
                          {
                              gte: 201,
                              lte: 300,
                              label: "重度污染",
                              color: "rgb(152,0,75)",
                          },
                          {
                              gte: 151,
                              lte: 200,
                              label: "中度污染",
                              color: "red",
                          },
                          {
                              gte: 101,
                              lte: 150,
                              label: "轻度污染",
                              color: "orange",
                          },
                          {
                              gte: 51,
                              lt: 100,
                              label: "良",
                              color: "yellow",
                          },
                          {
                              gte: 0,
                              lt: 50,
                              label: "优",
                              color: "green",
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
                          color: ['green', 'yellow', 'orange', 'red','rgb(152,0,75)','rgb(130,1,42)']
                      },
                      textStyle: {
                          color: '#fff'
                      }
                  },


              ],
              // geo地图对象
              geo: {
                  show: true,
                  map: 'china',
                  roam: true, //是否允许缩放，拖拽
                  center: [105.194115019531, 35.582111640625],
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
                          color: 'red',//字体颜色
                          borderColor: '#5e84fd',
                          borderWidth: 2,
                      },
                  },
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
                  regions: [
                      { // 隐藏南海诸岛
                          name: '南海诸岛',
                          itemStyle: {
                              // 隐藏地图
                              normal: {
                                  opacity: 0 // 为 0 时不绘制该图形
                              }
                          },
                          label: {
                              show: false // 隐藏文字
                          }
                      }
                  ]
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
              title: {
                  text: '省市大气污染物分布图',
                  left: 'center',
              },
              // 标注数据
              series: [
                  {
                      type: 'effectScatter',
                      //type: 'scatter',
                      coordinateSystem: 'geo', //  指明绘制在geo坐标系上
                      z: 11,
                      data: dataList,
                      itemStyle: {
                          normal: {
                              color: '#FFFF00'
                          },
                      },
                      // 散点的大小 可以直接写大小，也可以通过函数配置
                      symbolSize: 8,
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
                              if (params.data.value[2] > 500) {
                                  s = '没救了';
                              } else if (params.data.value[2] >= 301 && params.data.value[2] <= 500) {
                                  s = '严重污染';
                              } else if (params.data.value[2] >= 201 && params.data.value[2] <= 300) {
                                  s = '重度污染';
                              } else if (params.data.value[2] >= 151 && params.data.value[2] <= 200) {
                                  s = '中度污染';
                              } else if (params.data.value[2] >= 101 && params.data.value[2] <= 150){
                                  s = '轻度污染';
                              } else if(params.data.value[2] >= 51 && params.data.value[2] <= 100){
                                  s = '良';
                              } else if (params.data.value[2] >= 0 && params.data.value[2] <= 50){
                                  s = '优';
                              }

                              let result = '<br>' + '<span style="font-size: 20px">' + params.name + ':' + '</span>' + '<span style="font-size: 22px;color: red">' + '质量' + s + '</span>' + '</br>' +
                                  '<br>' + '<span style="font-size: 20px">' + 'AQI:' + AQI + '</br>' +
                                  '<br>' + '<span style="font-size: 20px">' + 'PM2.5:' + pm2 + '</span>' + '<span style="font-size: 20px;">' + '    PM10:' + pm10 + '</span>' + '</br>' +
                                  '<br>' + '<span style="font-size: 20px">' + 'SO2:' + so2 + '</span>' + '<span style="font-size: 20px;">' + '    NO2:' + no2 + '</span>' + '</br>' +
                                  '<br>' + '<span style="font-size: 20px">' + 'CO:' + co + '</span>' + '<span style="font-size: 20px;">' + '    O3:' + o3 + '</span>' + '</br>'

                              return result;
                          },
                      }
                  },
              ],

          };
          options = option;
          charts.setOption(options, true);
      };

    // 初始化省份数据，发送请求
      const getData = async () =>{
          const param = {
              method: 'get',
          };
          await getProvinceInfo(param).then(res=>{
              //dataResult.value = res.data.data;
              const s = res.data.data;
              // s是数组对象
              for (let i = 0;i < s.length;i++){
                  const name = s[i].name;
                  const value = s[i].value;
                  const m = {
                      name: name,
                      value: value
                  };
                  dataResult.push(m)
              }
          });
      };

    // 绘图
      const drawChina = () => {
          const myChart = echarts.init(document.getElementById("chinaMap"));
          const dataList = JSON.parse(JSON.stringify(dataResult));
          charts = myChart;
          const json = require('@/assets/json/china.json')
          echarts.registerMap('china', json);//注册可用的地图
          const option = {
              // 这里 visualMap 可以配置多个
              visualMap: [
                  {
                      type: "piecewise",//分段标签
                      textStyle: {
                          color: '#fff'
                      },
                      min: 0,//最小值
                      max: 500,//最大值，不设置为无限大
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
                              gte: 301,
                              lte: 500,
                              label: "严重污染",
                              color: 'rgb(130,1,42)',
                          },
                          {
                              gte: 201,
                              lte: 300,
                              label: "重度污染",
                              color: "rgb(152,0,75)",
                          },
                          {
                              gte: 151,
                              lte: 200,
                              label: "中度污染",
                              color: "red",
                          },
                          {
                              gte: 101,
                              lte: 150,
                              label: "轻度污染",
                              //color: 'rgb(242,73,24)',
                              color: 'orange'
                          },
                          {
                              gte: 51,
                              lt: 100,
                              label: "良",
                              color: "yellow",
                          },
                          {
                              gte: 0,
                              lt: 50,
                              label: "优",
                              color: "green",
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
                          color: ['green', 'yellow', 'orange', 'red','rgb(152,0,75)','rgb(130,1,42)']
                      },
                      textStyle: {
                          color: '#fff'
                      }
                  },


              ],
              title: {
                  text: '全国大气污染物分布图',
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
                      data: dataList,
                      itemStyle: {
                          normal: {
                              color: '#FFFF00'
                          },
                      },
                      // 散点的大小 可以直接写大小，也可以通过函数配置
                      symbolSize: 8,
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
                              if (params.data.value[2] > 500) {
                                  s = '没救了';
                              } else if (params.data.value[2] >= 301 && params.data.value[2] <= 500) {
                                  s = '严重污染';
                              } else if (params.data.value[2] >= 201 && params.data.value[2] <= 300) {
                                  s = '重度污染';
                              } else if (params.data.value[2] >= 151 && params.data.value[2] <= 200) {
                                  s = '中度污染';
                              } else if (params.data.value[2] >= 101 && params.data.value[2] <= 150){
                                  s = '轻度污染';
                              } else if(params.data.value[2] >= 51 && params.data.value[2] <= 100){
                                  s = '良';
                              } else if (params.data.value[2] >= 0 && params.data.value[2] <= 50){
                                  s = '优';
                              }

                              let result = '<br>' + '<span style="font-size: 20px">' + params.name + ':' + '</span>' + '<span style="font-size: 22px;color: red">' + '质量' + s + '</span>' + '</br>' +
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
                  regions: [
                      { // 隐藏南海诸岛
                          name: '南海诸岛',
                          itemStyle: {
                              // 隐藏地图
                              normal: {
                                  opacity: 0 // 为 0 时不绘制该图形
                              }
                          },
                          label: {
                              show: false // 隐藏文字
                          }
                      }
                  ]

              },
          };
          options = option;
          charts.setOption(options);
          currentName = 'china';
          return charts;

      }

    // 下钻 先暂时实现河南 后续调用接口
    const getDown = async (name) => {

       // 判断history是否为空，不为空的话，说明已经下钻
       if (history.length === 0){

           // 判断name是否为单个直辖市或者香港、澳门、这些城市无法下钻
           if (name === '上海市' || name === '北京市' || name === '重庆市' || name === '天津市' || name === '香港特别行政区' || name === '澳门特别行政区' || name === '台湾省'){
               // 不进行任何操作
           } else {
               charts.clear();
               //获取地图数据之后，获取地图数据
               const mapname = name;

               if (!echarts.getMap(name)) {
                   const newMapJson = await getMapJson(name);
                   echarts.registerMap(mapname, newMapJson)
               }

               // 将当前的年份及省份发送到vuex
               store.commit('addYear',current_year);
               store.commit('addName',name);

               // 发送请求获取城市数据
               const param = {
                   method: 'get',
                   year: current_year,
                   name: name
               };
               await getCityInfoByProvince(param).then(res=>{
                   const s = res.data.data;
                   // s是数组对象
                   for (let i = 0;i < s.length;i++){
                       const name = s[i].name;
                       const value = s[i].value;
                       const m = {
                           name: name,
                           value: value
                       };
                       cityInfos.push(m)
                   }
               });
               // 调用后记得清空数组
               const cityList = JSON.parse(JSON.stringify(cityInfos));
               cityInfos = [];

               // 这里需要设置中心点、数据集、geo名称
               const option = {
                   // 这里 visualMap 可以配置多个
                   visualMap: [
                       {
                           type: "piecewise",//分段标签
                           textStyle: {
                               color: '#fff'
                           },
                           min: 0,//最小值
                           max: 500,//最大值，不设置为无限大
                           right: 40,//距离右侧位置
                           top: 20,//距离底部位置
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
                                   gte: 301,
                                   lte: 500,
                                   label: "严重污染",
                                   color: 'rgb(130,1,42)',
                               },
                               {
                                   gte: 201,
                                   lte: 300,
                                   label: "重度污染",
                                   color: "rgb(152,0,75)",
                               },
                               {
                                   gte: 151,
                                   lte: 200,
                                   label: "中度污染",
                                   color: "red",
                               },
                               {
                                   gte: 101,
                                   lte: 150,
                                   label: "轻度污染",
                                   color: "orange",
                               },
                               {
                                   gte: 51,
                                   lt: 100,
                                   label: "良",
                                   color: "yellow",
                               },
                               {
                                   gte: 0,
                                   lt: 50,
                                   label: "优",
                                   color: "green",
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
                               color: ['green', 'yellow', 'orange', 'red','rgb(152,0,75)','rgb(130,1,42)']
                           },
                           textStyle: {
                               color: '#fff'
                           }
                       },


                   ],
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
                   title: {
                       text: '省市大气污染物分布图',
                       left: 'center',
                   },
                   // 标注数据
                   series: [
                       {
                           type: 'effectScatter',
                           //type: 'scatter',
                           coordinateSystem: 'geo', //  指明绘制在geo坐标系上
                           z: 11,
                           data: cityList,
                           itemStyle: {
                               normal: {
                                   color: '#FFFF00'
                               },
                           },
                           // 散点的大小 可以直接写大小，也可以通过函数配置
                           symbolSize: 8,
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
                                   if (params.data.value[2] > 500) {
                                       s = '没救了';
                                   } else if (params.data.value[2] >= 301 && params.data.value[2] <= 500) {
                                       s = '严重污染';
                                   } else if (params.data.value[2] >= 201 && params.data.value[2] <= 300) {
                                       s = '重度污染';
                                   } else if (params.data.value[2] >= 151 && params.data.value[2] <= 200) {
                                       s = '中度污染';
                                   } else if (params.data.value[2] >= 101 && params.data.value[2] <= 150){
                                       s = '轻度污染';
                                   } else if(params.data.value[2] >= 51 && params.data.value[2] <= 100){
                                       s = '良';
                                   } else if (params.data.value[2] >= 0 && params.data.value[2] <= 50){
                                       s = '优';
                                   }

                                   let result = '<br>' + '<span style="font-size: 20px">' + params.name + ':' + '</span>' + '<span style="font-size: 22px;color: red">' + '质量' + s + '</span>' + '</br>' +
                                       '<br>' + '<span style="font-size: 20px">' + 'AQI:' + AQI + '</br>' +
                                       '<br>' + '<span style="font-size: 20px">' + 'PM2.5:' + pm2 + '</span>' + '<span style="font-size: 20px;">' + '    PM10:' + pm10 + '</span>' + '</br>' +
                                       '<br>' + '<span style="font-size: 20px">' + 'SO2:' + so2 + '</span>' + '<span style="font-size: 20px;">' + '    NO2:' + no2 + '</span>' + '</br>' +
                                       '<br>' + '<span style="font-size: 20px">' + 'CO:' + co + '</span>' + '<span style="font-size: 20px;">' + '    O3:' + o3 + '</span>' + '</br>'

                                   return result;
                               },
                           }
                       },
                   ],

               };
               options = option;
               //options.series[0].map = mapname;
               //然后重新绘制地图
               //history.push(currentName);
               //const myChart = echarts.init(document.getElementById('chinaMap'))
               charts.setOption(options, true);
               currentName = name
           }
       }
    };
    // 调用省级json数据，后续调用接口
    const getMapJson = async (name) => {
      const json = await require('../../assets/json/' + name + '.json')
      return json
    };
    // 回钻
    const returnLevel = async () => {
        cityInfos = [];
      // 回钻
      // 如果history的长度为1说明已经下钻，跨域会钻
      /*if (!(history.length === 0)){

      }*/
        store.commit('addYear',current_year);
        store.commit('addName','china');
        charts.clear();
        //先判断history有没有数据，能不能返回
        /*          if (history.length == 0) {
                      return false
                  }*/
        //取出要返回的那个名字
        //const name = history.pop();
        const name = 'china';
        const currentJson = echarts.getMap(name).geoJson;
        const dataList = JSON.parse(JSON.stringify(dataResult));
        //修改地图配置重新绘制地图
        const option = {
            // 这里 visualMap 可以配置多个
            visualMap: [
                {
                    type: "piecewise",//分段标签
                    textStyle: {
                        color: '#fff'
                    },
                    min: 0,//最小值
                    max: 500,//最大值，不设置为无限大
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
                            gte: 301,
                            lte: 500,
                            label: "严重污染",
                            color: 'rgb(130,1,42)',
                        },
                        {
                            gte: 201,
                            lte: 300,
                            label: "重度污染",
                            color: "rgb(152,0,75)",
                        },
                        {
                            gte: 151,
                            lte: 200,
                            label: "中度污染",
                            color: "red",
                        },
                        {
                            gte: 101,
                            lte: 150,
                            label: "轻度污染",
                            color: "orange",
                        },
                        {
                            gte: 51,
                            lt: 100,
                            label: "良",
                            color: "yellow",
                        },
                        {
                            gte: 0,
                            lt: 50,
                            label: "优",
                            color: "green",
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
                        color: ['green', 'yellow', 'orange', 'red','rgb(152,0,75)','rgb(130,1,42)']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },


            ],
            title: {
                text: '全国大气污染物分布图',
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
                    data: dataList,
                    itemStyle: {
                        normal: {
                            color: '#FFFF00'
                        },
                    },
                    // 散点的大小 可以直接写大小，也可以通过函数配置
                    symbolSize: 8,
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
                            if (params.data.value[2] > 500) {
                                s = '没救了';
                            } else if (params.data.value[2] >= 301 && params.data.value[2] <= 500) {
                                s = '严重污染';
                            } else if (params.data.value[2] >= 201 && params.data.value[2] <= 300) {
                                s = '重度污染';
                            } else if (params.data.value[2] >= 151 && params.data.value[2] <= 200) {
                                s = '中度污染';
                            } else if (params.data.value[2] >= 101 && params.data.value[2] <= 150){
                                s = '轻度污染';
                            } else if(params.data.value[2] >= 51 && params.data.value[2] <= 100){
                                s = '良';
                            } else if (params.data.value[2] >= 0 && params.data.value[2] <= 50){
                                s = '优';
                            }

                            let result = '<br>' + '<span style="font-size: 20px">' + params.name + ':' + '</span>' + '<span style="font-size: 22px;color: red">' + '质量' + s + '</span>' + '</br>' +
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
                map: name,
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
                regions: [
                    { // 隐藏南海诸岛
                        name: '南海诸岛',
                        itemStyle: {
                            // 隐藏地图
                            normal: {
                                opacity: 0 // 为 0 时不绘制该图形
                            }
                        },
                        label: {
                            show: false // 隐藏文字
                        }
                    }
                ]

            },
        };
        options = option;
        charts.setOption(options);
        //修改当前的层级，名字
        currentName = name
    };
    return {
      returnLevel,dataResult,year_2013,year_2014,year_2015,year_2016,year_2017,year_2018,
        getInfoByYear2013,getInfoByYear2014,getInfoByYear2015,getInfoByYear2016,getInfoByYear2017,
        getInfoByYear2018,flushProvince
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

.bubbly-button1 {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 1em;
    padding: 30px 20px;
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
