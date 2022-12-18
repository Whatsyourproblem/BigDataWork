<template>
  <div class="center">
    <!-- 这里画地图 -->
    <div class="d-flex pt-2 pl-2">
<!--                <span style="font-size: 15px">
                    <i class="iconfont icon-fenxi7"/>
                    空气质量分析散点图
                </span>-->
    </div>
    <div style="height: 410px;">
      <div id="spot" style="height: 100%"></div>
    </div>
  </div>
</template>

<script>
import {onMounted,  watch ,computed} from 'vue'
import * as echarts from 'echarts'
import {getAqiByAsc, getCityAqiByAsc} from "@/api";
import {reactive} from 'vue';
import { useStore } from "vuex";

export default {
  name: "center2",
  setup() {
      // 引入vuex
      // 组件通信
      const store = useStore();
      var current_year = '';
      var current_name = '';
      let charts = '';


      const pronvice_2013 = [];
      const pronvice_2014 = [];
      const pronvice_2015 = [];
      const pronvice_2016 = [];
      const pronvice_2017 = [];
      const pronvice_2018 = [];

      var aqiObj = reactive({});
      var pm2Obj = reactive({});
      var pm10Obj = reactive({});
      var so2Obj = reactive({});
      var no2Obj = reactive({});
      var coObj = reactive({});
      var o3Obj = reactive({});

      var aqiCityObj = reactive({});
      var pm2CityObj = reactive({});
      var pm10CityObj = reactive({});
      var so2CityObj = reactive({});
      var no2CityObj = reactive({});
      var coCityObj = reactive({});
      var o3CityObj = reactive({});

       // 获取数据
      const getData = async () =>{
         const param = {
             method: 'get'
         };
         await getAqiByAsc(param).then(res=>{
             const s = res.data.data;
             // 数据装入
             for(let year = 2013;year <= 2018;year++){
                 for(let i = 0;i < s[0][year].length;i++){
                     switch (year) {
                         case 2013:
                             pronvice_2013.push(s[0][year][i]);
                             break;
                         case 2014:
                             pronvice_2014.push(s[0][year][i]);
                             break;
                         case 2015:
                             pronvice_2015.push(s[0][year][i]);
                             break;
                         case 2016:
                             pronvice_2016.push(s[0][year][i]);
                             break;
                         case 2017:
                             pronvice_2017.push(s[0][year][i]);
                             break;
                         case 2018:
                             pronvice_2018.push(s[0][year][i]);
                             break;
                     }
                 }
             }
             aqiObj = s[1];
             pm2Obj = s[2];
             pm10Obj = s[3];
             so2Obj = s[4];
             no2Obj = s[5];
             coObj = s[6];
             o3Obj = s[7];
         })
     };


      const drawSpot = async () => {

      const myChart = echarts.init(document.getElementById('spot'));
      charts = myChart;
      let dataMap = {};
      function dataFormatterAQI(obj) {
        // prettier-ignore
        var pList = [];
        pList.push(pronvice_2013);
        pList.push(pronvice_2014);
        pList.push(pronvice_2015);
        pList.push(pronvice_2016);
        pList.push(pronvice_2017);
        pList.push(pronvice_2018);
        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataFormatterNO2(obj) {
        // prettier-ignore
          var pList = [];
          pList.push(pronvice_2013);
          pList.push(pronvice_2014);
          pList.push(pronvice_2015);
          pList.push(pronvice_2016);
          pList.push(pronvice_2017);
          pList.push(pronvice_2018);

        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataFormatterCO(obj) {
        // prettier-ignore
          var pList = [];
          pList.push(pronvice_2013);
          pList.push(pronvice_2014);
          pList.push(pronvice_2015);
          pList.push(pronvice_2016);
          pList.push(pronvice_2017);
          pList.push(pronvice_2018);
        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataFormatterSO2(obj) {
        // prettier-ignore
          var pList = [];
          pList.push(pronvice_2013);
          pList.push(pronvice_2014);
          pList.push(pronvice_2015);
          pList.push(pronvice_2016);
          pList.push(pronvice_2017);
          pList.push(pronvice_2018);        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataFormatterO3(obj) {
        // prettier-ignore
          var pList = [];
          pList.push(pronvice_2013);
          pList.push(pronvice_2014);
          pList.push(pronvice_2015);
          pList.push(pronvice_2016);
          pList.push(pronvice_2017);
          pList.push(pronvice_2018);        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataFormatterPM2(obj) {
        // prettier-ignore
          var pList = [];
          pList.push(pronvice_2013);
          pList.push(pronvice_2014);
          pList.push(pronvice_2015);
          pList.push(pronvice_2016);
          pList.push(pronvice_2017);
          pList.push(pronvice_2018);        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataFormatterPM10(obj) {
        // prettier-ignore
          var pList = [];
          pList.push(pronvice_2013);
          pList.push(pronvice_2014);
          pList.push(pronvice_2015);
          pList.push(pronvice_2016);
          pList.push(pronvice_2017);
          pList.push(pronvice_2018);        var temp;
        for (var year = 2013; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = 10; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[year-2013][i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      // prettier-ignore
      dataMap.dataAQI = dataFormatterAQI(aqiObj);

      // prettier-ignore
      dataMap.dataNO2 = dataFormatterNO2(no2Obj);

      // prettier-ignore
      dataMap.dataCO = dataFormatterCO(coObj);
      // prettier-ignore
      dataMap.dataSO2 = dataFormatterSO2(so2Obj);
      // prettier-ignore
      dataMap.dataO3 = dataFormatterO3(o3Obj);
      // prettier-ignore
      dataMap.dataPM2 = dataFormatterPM2(pm2Obj);

      dataMap.dataPM10 = dataFormatterPM10(pm10Obj);

      var option = {
        //公共设置
        baseOption: {
          title:{
            left:20,
            top:10,
            textStyle: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 1000,
            data: [
              '2013-01-01',
              '2014-01-01',
              '2015-01-01',
              /* {
                 value: '2005-01-01',
                 tooltip: {
                   formatter: '{b} GDP达到一个高度'
                 },
                 symbol: 'diamond',
                 symbolSize: 16
               },*/
              '2016-01-01',
              '2017-01-01',
              '2018-01-01',
              /* '2008-01-01',
               '2009-01-01',
               '2010-01-01',
                {
                  value: '2011-01-01',
                  tooltip: {
                    formatter: function (params) {
                      return params.name + 'GDP达到又一个高度';
                    }
                  },
                  symbol: 'diamond',
                  symbolSize: 18
                }
               '2011-01-01'*/
            ],
            label: {
              color: "rgba(255, 255, 255, 1)",
              formatter: function (s) {
                return new Date(s).getFullYear();
              }
            }
          },
          tooltip: {},
          legend: {
            itemWidth: 20,
            top:40,
            left: 40,
            //data: ['第一产业', '第二产业', '第三产业', 'GDP', '金融', '房地产'],
            data: ['AQI', 'NO2', 'CO', 'SO2', 'O3', 'PM2', 'PM10'],
            selected: {
              NO2: false,
              CO: false,
              SO2: false,
              O3: false,
              PM2: false,
              PM10: false
            },
            textStyle: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          calculable: true,
          grid: {
            top: 80,
            bottom: 100,
            left:60,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value.replace('\n', '');
                  }
                }
              }
            }
          },
          yAxis: [
            {
              type: 'category',
              axisLabel: {
                interval: 0,
                color: "rgba(255, 255, 255, 1)"
              },
              splitLine: {show: false}
            }
          ],
          xAxis: [
            {
              type: 'value',
              //name: 'GDP（亿元）'
              axisLabel: {
                color: "rgba(255, 255, 255, 1)"
              },
            }
          ],
          series: [
            /*{name: 'GDP', type: 'bar'},
            {name: '金融', type: 'bar'},
            {name: '房地产', type: 'bar'},
            {name: '第一产业', type: 'bar'},
            {name: '第二产业', type: 'bar'},
            {name: '第三产业', type: 'bar'},*/
            /*{
              name: 'GDP占比',
              type: 'pie',
              center: ['75%', '35%'],
              radius: '28%',
              z: 100
            }*/
            {name: 'AQI', type: 'bar'},
            {name: 'NO2', type: 'bar'},
            {name: 'CO', type: 'bar'},
            {name: 'SO2', type: 'bar'},
            {name: 'O3', type: 'bar'},
            {name: 'PM2', type: 'bar'},
            {name: 'PM10', type: 'bar'}
          ]
        },

        //时间轴每一年数据对应一个option
        options: [
          {
            yAxis: [
              {
                // 前十名的省市名称
                data: pronvice_2013,
              }
            ],
            title: {
              text: '2013年AQI全国前10'
            },
            series: [
               // 2013年的所有污染物数据
              {data: dataMap.dataAQI['2013']},
              {data: dataMap.dataNO2['2013']},
              {data: dataMap.dataCO['2013']},
              {data: dataMap.dataSO2['2013']},
              {data: dataMap.dataO3['2013']},
              {data: dataMap.dataPM2['2013']},
              {data: dataMap.dataPM10['2013']}
              //饼图的数据
              /*{
                data: [
                  {name: '第一产业', value: dataMap.dataNO2['2013sum']},
                  {name: '第二产业', value: dataMap.dataCO['2013sum']},
                  {name: '第三产业', value: dataMap.dataSO2['2013sum']}
                ]
              }*/
            ]
          },
          {
            yAxis: [
              {
                // 2014年前十省
                data: pronvice_2014
              }
            ],
            title: {text: '2014年AQI全国前10'},
            series: [
              {data: dataMap.dataAQI['2014']},
              {data: dataMap.dataNO2['2014']},
              {data: dataMap.dataCO['2014']},
              {data: dataMap.dataSO2['2014']},
              {data: dataMap.dataO3['2014']},
              {data: dataMap.dataPM2['2014']},
              {data: dataMap.dataPM10['2014']}
              /*{
                data: [
                  {name: '第一产业', value: dataMap.dataNO2['2014sum']},
                  {name: '第二产业', value: dataMap.dataCO['2014sum']},
                  {name: '第三产业', value: dataMap.dataSO2['2014sum']}
                ]
              }*/
            ]
          },
          {
            yAxis: [
              {
                data: pronvice_2015
              }
            ],
            title: {
              text: '2015年AQI全国前10',
            },
            series: [
              {data: dataMap.dataAQI['2015']},
              {data: dataMap.dataNO2['2015']},
              {data: dataMap.dataCO['2015']},
              {data: dataMap.dataSO2['2015']},
              {data: dataMap.dataO3['2015']},
              {data: dataMap.dataPM2['2015']},
              {data: dataMap.dataPM10['2015']}
              /*{
                data: [
                  {name: '第一产业', value: dataMap.dataNO2['2015sum']},
                  {name: '第二产业', value: dataMap.dataCO['2015sum']},
                  {name: '第三产业', value: dataMap.dataSO2['2015sum']}
                ]
              }*/
            ]
          },
          {
            yAxis: [
              {
                data: pronvice_2016
              }
            ],
            title: {text: '2016年AQI全国前10'},
            series: [
              {data: dataMap.dataAQI['2016']},
              {data: dataMap.dataNO2['2016']},
              {data: dataMap.dataCO['2016']},
              {data: dataMap.dataSO2['2016']},
              {data: dataMap.dataO3['2016']},
              {data: dataMap.dataPM2['2016']},
              {data: dataMap.dataPM10['2016']}
              /*{
                data: [
                  {name: '第一产业', value: dataMap.dataNO2['2016sum']},
                  {name: '第二产业', value: dataMap.dataCO['2016sum']},
                  {name: '第三产业', value: dataMap.dataSO2['2016sum']}
                ]
              }*/
            ]
          },
          {
            yAxis: [
              {
                data: pronvice_2017
              }
            ],
            title: {text: '2017年AQI全国前10'},
            series: [
              {data: dataMap.dataAQI['2017']},
              {data: dataMap.dataNO2['2017']},
              {data: dataMap.dataCO['2017']},
              {data: dataMap.dataSO2['2017']},
              {data: dataMap.dataO3['2017']},
              {data: dataMap.dataPM2['2017']},
              {data: dataMap.dataPM10['2017']}
              /*{
                data: [
                  {name: '第一产业', value: dataMap.dataNO2['2017sum']},
                  {name: '第二产业', value: dataMap.dataCO['2017sum']},
                  {name: '第三产业', value: dataMap.dataSO2['2017sum']}
                ]
              }*/
            ]
          },
          {
            yAxis: [
              {
                data: pronvice_2018
              }
            ],
            title: {text: '2018年AQI全国前10'},
            series: [
              {data: dataMap.dataAQI['2018']},
              {data: dataMap.dataNO2['2018']},
              {data: dataMap.dataCO['2018']},
              {data: dataMap.dataSO2['2018']},
              {data: dataMap.dataO3['2018']},
              {data: dataMap.dataPM2['2018']},
              {data: dataMap.dataPM10['2018']}
              /*{
                data: [
                  {name: '第一产业', value: dataMap.dataNO2['2018sum']},
                  {name: '第二产业', value: dataMap.dataCO['2018sum']},
                  {name: '第三产业', value: dataMap.dataSO2['2018sum']}
                ]
              }*/
            ]
          }
        ]
      };
      // myChart.setOption(option);
      option && myChart.setOption(option);
      //myChart.resize();
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

      // 刷新
      const flush = async () =>{
          const param = {
              name: current_name
          };
          await getCityAqiByAsc(param).then(res=>{
             console.log(res)
              const s = res.data.data;
              // 数据装入
              const cList = [];
              const city_2013 = [];
              const city_2014 = [];
              const city_2015 = [];
              const city_2016 = [];
              const city_2017 = [];
              const city_2018 = [];
              for(let year = 2013;year <= 2018;year++){
                  for(let i = 0;i < s[0][year].length;i++){
                      switch (year) {
                          case 2013:
                              city_2013.push(s[0][year][i]);
                              break;
                          case 2014:
                              city_2014.push(s[0][year][i]);
                              break;
                          case 2015:
                              city_2015.push(s[0][year][i]);
                              break;
                          case 2016:
                              city_2016.push(s[0][year][i]);
                              break;
                          case 2017:
                              city_2017.push(s[0][year][i]);
                              break;
                          case 2018:
                              city_2018.push(s[0][year][i]);
                              break;
                      }
                  }
              }
              aqiCityObj = s[1];
              pm2CityObj = s[2];
              pm10CityObj = s[3];
              so2CityObj = s[4];
              no2CityObj = s[5];
              coCityObj = s[6];
              o3CityObj = s[7];
              cList.push(city_2013);
              cList.push(city_2014);
              cList.push(city_2015);
              cList.push(city_2016);
              cList.push(city_2017);
              cList.push(city_2018);
              // 重载
              reloadLine(cList,aqiCityObj,pm2CityObj,pm10CityObj,so2CityObj,no2CityObj,coCityObj,o3CityObj);
          });
      };

      // 重载
      const reloadLine = async (cList,aqiCityObj,pm2CityObj,pm10CityObj,so2CityObj,no2CityObj,coCityObj,o3CityObj)=>{
          console.log(cList);
          charts.clear();
          let dataMap = {};
          function dataFormatterAQI(obj) {
              // prettier-ignore
              var pList = cList;
              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[j][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          function dataFormatterNO2(obj) {
              // prettier-ignore
              var pList = cList;

              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[j][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          function dataFormatterCO(obj) {
              // prettier-ignore
              var pList = cList;
              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[j][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          function dataFormatterSO2(obj) {
              // prettier-ignore
              var pList = cList;
              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[year-2013][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          function dataFormatterO3(obj) {
              // prettier-ignore
              var pList = cList;
              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[year-2013][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          function dataFormatterPM2(obj) {
              // prettier-ignore
              var pList = cList;
              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[j][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          function dataFormatterPM10(obj) {
              // prettier-ignore
              var pList = cList;
              var temp;
              var j = 0;
              for (var year = 2013; year <= 2018; year++) {
                  var max = 0;
                  var sum = 0;
                  temp = obj[year];
                  for (var i = 0, l = 10; i < l; i++) {
                      max = Math.max(max, temp[i]);
                      sum += temp[i];
                      obj[year][i] = {
                          name: pList[j][i],
                          value: temp[i]
                      };
                  }
                  j++;
                  obj[year + 'max'] = Math.floor(max / 100) * 100;
                  obj[year + 'sum'] = sum;
              }
              return obj;
          }

          // prettier-ignore
          dataMap.dataAQI = dataFormatterAQI(aqiCityObj);

          // prettier-ignore
          dataMap.dataNO2 = dataFormatterNO2(no2CityObj);

          // prettier-ignore
          dataMap.dataCO = dataFormatterCO(coCityObj);
          // prettier-ignore
          dataMap.dataSO2 = dataFormatterSO2(so2CityObj);
          // prettier-ignore
          dataMap.dataO3 = dataFormatterO3(o3CityObj);
          // prettier-ignore
          dataMap.dataPM2 = dataFormatterPM2(pm2CityObj);

          dataMap.dataPM10 = dataFormatterPM10(pm10CityObj);

          var option = {
              //公共设置
              baseOption: {
                  title:{
                      left:20,
                      top:10,
                      textStyle: {
                          color: 'rgba(255, 255, 255, 1)'
                      }
                  },
                  timeline: {
                      axisType: 'category',
                      autoPlay: true,
                      playInterval: 1000,
                      data: [
                          '2013-01-01',
                          '2014-01-01',
                          '2015-01-01',
                          /* {
                             value: '2005-01-01',
                             tooltip: {
                               formatter: '{b} GDP达到一个高度'
                             },
                             symbol: 'diamond',
                             symbolSize: 16
                           },*/
                          '2016-01-01',
                          '2017-01-01',
                          '2018-01-01',
                          /* '2008-01-01',
                           '2009-01-01',
                           '2010-01-01',
                            {
                              value: '2011-01-01',
                              tooltip: {
                                formatter: function (params) {
                                  return params.name + 'GDP达到又一个高度';
                                }
                              },
                              symbol: 'diamond',
                              symbolSize: 18
                            }
                           '2011-01-01'*/
                      ],
                      label: {
                          color: "rgba(255, 255, 255, 1)",
                          formatter: function (s) {
                              return new Date(s).getFullYear();
                          }
                      }
                  },
                  tooltip: {},
                  legend: {
                      itemWidth: 20,
                      top:40,
                      left: 40,
                      //data: ['第一产业', '第二产业', '第三产业', 'GDP', '金融', '房地产'],
                      data: ['AQI', 'NO2', 'CO', 'SO2', 'O3', 'PM2', 'PM10'],
                      selected: {
                          NO2: false,
                          CO: false,
                          SO2: false,
                          O3: false,
                          PM2: false,
                          PM10: false
                      },
                      textStyle: {
                          color: "rgba(255, 255, 255, 1)"
                      }
                  },
                  calculable: true,
                  grid: {
                      top: 80,
                      bottom: 100,
                      left:60,
                      tooltip: {
                          trigger: 'axis',
                          axisPointer: {
                              type: 'shadow',
                              label: {
                                  show: true,
                                  formatter: function (params) {
                                      return params.value.replace('\n', '');
                                  }
                              }
                          }
                      }
                  },
                  yAxis: [
                      {
                          type: 'category',
                          axisLabel: {
                              interval: 0,
                              color: "rgba(255, 255, 255, 1)"
                          },
                          splitLine: {show: false}
                      }
                  ],
                  xAxis: [
                      {
                          type: 'value',
                          //name: 'GDP（亿元）'
                          axisLabel: {
                              color: "rgba(255, 255, 255, 1)"
                          },
                      }
                  ],
                  series: [
                      /*{name: 'GDP', type: 'bar'},
                      {name: '金融', type: 'bar'},
                      {name: '房地产', type: 'bar'},
                      {name: '第一产业', type: 'bar'},
                      {name: '第二产业', type: 'bar'},
                      {name: '第三产业', type: 'bar'},*/
                      /*{
                        name: 'GDP占比',
                        type: 'pie',
                        center: ['75%', '35%'],
                        radius: '28%',
                        z: 100
                      }*/
                      {name: 'AQI', type: 'bar'},
                      {name: 'NO2', type: 'bar'},
                      {name: 'CO', type: 'bar'},
                      {name: 'SO2', type: 'bar'},
                      {name: 'O3', type: 'bar'},
                      {name: 'PM2', type: 'bar'},
                      {name: 'PM10', type: 'bar'}
                  ]
              },

              //时间轴每一年数据对应一个option
              options: [
                  {
                      yAxis: [
                          {
                              // 前十名的省市名称
                              data: cList[0],
                          }
                      ],
                      title: {
                          text: '2013年AQI全国前10'
                      },
                      series: [
                          // 2013年的所有污染物数据
                          {data: dataMap.dataAQI['2013']},
                          {data: dataMap.dataNO2['2013']},
                          {data: dataMap.dataCO['2013']},
                          {data: dataMap.dataSO2['2013']},
                          {data: dataMap.dataO3['2013']},
                          {data: dataMap.dataPM2['2013']},
                          {data: dataMap.dataPM10['2013']}
                          //饼图的数据
                          /*{
                            data: [
                              {name: '第一产业', value: dataMap.dataNO2['2013sum']},
                              {name: '第二产业', value: dataMap.dataCO['2013sum']},
                              {name: '第三产业', value: dataMap.dataSO2['2013sum']}
                            ]
                          }*/
                      ]
                  },
                  {
                      yAxis: [
                          {
                              // 2014年前十省
                              data: cList[1]
                          }
                      ],
                      title: {text: '2014年AQI全国前10'},
                      series: [
                          {data: dataMap.dataAQI['2014']},
                          {data: dataMap.dataNO2['2014']},
                          {data: dataMap.dataCO['2014']},
                          {data: dataMap.dataSO2['2014']},
                          {data: dataMap.dataO3['2014']},
                          {data: dataMap.dataPM2['2014']},
                          {data: dataMap.dataPM10['2014']}
                          /*{
                            data: [
                              {name: '第一产业', value: dataMap.dataNO2['2014sum']},
                              {name: '第二产业', value: dataMap.dataCO['2014sum']},
                              {name: '第三产业', value: dataMap.dataSO2['2014sum']}
                            ]
                          }*/
                      ]
                  },
                  {
                      yAxis: [
                          {
                              data: cList[2]
                          }
                      ],
                      title: {
                          text: '2015年AQI全国前10',
                      },
                      series: [
                          {data: dataMap.dataAQI['2015']},
                          {data: dataMap.dataNO2['2015']},
                          {data: dataMap.dataCO['2015']},
                          {data: dataMap.dataSO2['2015']},
                          {data: dataMap.dataO3['2015']},
                          {data: dataMap.dataPM2['2015']},
                          {data: dataMap.dataPM10['2015']}
                          /*{
                            data: [
                              {name: '第一产业', value: dataMap.dataNO2['2015sum']},
                              {name: '第二产业', value: dataMap.dataCO['2015sum']},
                              {name: '第三产业', value: dataMap.dataSO2['2015sum']}
                            ]
                          }*/
                      ]
                  },
                  {
                      yAxis: [
                          {
                              data: cList[3]
                          }
                      ],
                      title: {text: '2016年AQI全国前10'},
                      series: [
                          {data: dataMap.dataAQI['2016']},
                          {data: dataMap.dataNO2['2016']},
                          {data: dataMap.dataCO['2016']},
                          {data: dataMap.dataSO2['2016']},
                          {data: dataMap.dataO3['2016']},
                          {data: dataMap.dataPM2['2016']},
                          {data: dataMap.dataPM10['2016']}
                          /*{
                            data: [
                              {name: '第一产业', value: dataMap.dataNO2['2016sum']},
                              {name: '第二产业', value: dataMap.dataCO['2016sum']},
                              {name: '第三产业', value: dataMap.dataSO2['2016sum']}
                            ]
                          }*/
                      ]
                  },
                  {
                      yAxis: [
                          {
                              data: cList[4]
                          }
                      ],
                      title: {text: '2017年AQI全国前10'},
                      series: [
                          {data: dataMap.dataAQI['2017']},
                          {data: dataMap.dataNO2['2017']},
                          {data: dataMap.dataCO['2017']},
                          {data: dataMap.dataSO2['2017']},
                          {data: dataMap.dataO3['2017']},
                          {data: dataMap.dataPM2['2017']},
                          {data: dataMap.dataPM10['2017']}
                          /*{
                            data: [
                              {name: '第一产业', value: dataMap.dataNO2['2017sum']},
                              {name: '第二产业', value: dataMap.dataCO['2017sum']},
                              {name: '第三产业', value: dataMap.dataSO2['2017sum']}
                            ]
                          }*/
                      ]
                  },
                  {
                      yAxis: [
                          {
                              data: cList[5]
                          }
                      ],
                      title: {text: '2018年AQI全国前10'},
                      series: [
                          {data: dataMap.dataAQI['2018']},
                          {data: dataMap.dataNO2['2018']},
                          {data: dataMap.dataCO['2018']},
                          {data: dataMap.dataSO2['2018']},
                          {data: dataMap.dataO3['2018']},
                          {data: dataMap.dataPM2['2018']},
                          {data: dataMap.dataPM10['2018']}
                          /*{
                            data: [
                              {name: '第一产业', value: dataMap.dataNO2['2018sum']},
                              {name: '第二产业', value: dataMap.dataCO['2018sum']},
                              {name: '第三产业', value: dataMap.dataSO2['2018sum']}
                            ]
                          }*/
                      ]
                  }
              ]
          };
          // myChart.setOption(option);
          charts.setOption(option);
          //myChart.resize();
      };


      onMounted(async () => {
        await getData();
        await drawSpot();
    });

    return{
        aqiObj,pm2Obj,pm10Obj,so2Obj,no2Obj,coObj,o3Obj,flush,reloadLine
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
