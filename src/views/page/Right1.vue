<template>
    <div class="centreRight1">

        <div class="bg-color-black">
            <!-- 总共高为820 -->
            <div style="height: 820px">
              <div id="container" style="height: 100%"></div>
            </div>
        </div>
    </div>
</template>

<script>

    import { onMounted,computed,watch } from 'vue'
    import * as echarts from 'echarts'
    import {getSixAverage, getSixAverageByProvince} from "@/api";
    import { useStore } from "vuex";
    export default {
        name: "Right1",
        components: {},
        setup() {
            // 组件通信
            const store = useStore();
            const dataList = [];
            let chars = '';
            var current_year = '';
            var current_name = '';
            const co = [];
            const no2 = [];
            const o3 = [];
            const pm2 = [];
            const pm10 = [];
            const so2 = [];
            const data = [
              //测试数据
              ['year', '2013', '2014', '2015', '2016', '2017', '2018'],
              ['CO', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ['NO2', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ['O3', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ['PM2.5', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
              ['PM10',38.2, 45.1, 22.7, 57.7, 33.9, 11.8],
              ['SO2', 10.2, 30.1, 22.2, 11, 8.8, 11.7]
          ];
            // 获取数据
            const getData = async () =>{
              const param = {
                  method: 'get',
              };
              await getSixAverage(param).then(res=>{
                  const s = res.data.data;
                  const header = ['year', '2013', '2014', '2015', '2016', '2017', '2018'];
                  dataList.push(header);
                  co.push('CO');
                  no2.push('NO2');
                  o3.push('O3');
                  pm2.push('PM2.5');
                  pm10.push('PM10');
                  so2.push('SO2');
                  for (let i = 0;i < s.length;i++){
                    for (let j = 0;j < s[i].length;j++){
                        // 判断i属于哪一个
                        switch (i) {
                            case 0:
                                pm2.push(s[i][j]);
                                break;
                            case 1:
                                pm10.push(s[i][j]);
                                break;
                            case 2:
                                so2.push(s[i][j]);
                                break;
                            case 3:
                                no2.push(s[i][j]);
                                break;
                            case 4:
                                co.push(s[i][j]);
                                break;
                            case 5:
                                o3.push(s[i][j]);
                                break;
                            default:
                                break;
                        }
                    }
                  }
                  dataList.push(co);
                  dataList.push(no2);
                  dataList.push(o3);
                  dataList.push(pm2);
                  dataList.push(pm10);
                  dataList.push(so2);
              })
          };
            const drawLine = () =>{
            const myChart = echarts.init(document.getElementById('container'), 'dark', {
              renderer: 'canvas',
              useDirtyRect: false
            });
            chars = myChart;
            var option = {
                legend:{},
                tooltip:{
                  //折线图显示框，待添加
                  trigger: 'axis',
                },
                dataset: {
                  source: dataList
                },
                xAxis: { type: 'category' },
                yAxis: { gridIndex : 0 },
                grid: { top: '55%' },
                series: [
                  {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series'}
                  },
                  {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series'}
                  },
                  {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series'}
                  },
                  {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series'}
                  },
                  {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series'}
                  },
                  {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series'}
                  },
                  {
                    type: 'pie',
                    id: 'pie',
                    radius : '40%',
                    center: ['50%', '25%'],
                    emphasis: {
                      focus: 'self'
                    },
                    label: {
                      formatter: '{b}: {@2013} ({d}%)'
                    },
                    encode: {
                      itemName: 'year',
                      value: '2013',
                      tooltip: '2013'
                    }
                  }
                ]
              };
            myChart.on('updateAxisPointer', function (event) {
                const xAxisInfo = event.axesInfo[0];
                if(xAxisInfo){
                  const dimension = xAxisInfo.value + 1;
                  myChart.setOption({

                    series: {
                      id : 'pie',
                      label: {
                        formatter: '{b}: {@[' + dimension +']} ({d}%)'
                      },
                      encode: {
                        value: dimension,
                        tooltip: dimension
                      }
                    }
                  })
                }
              });

            if (option && typeof option === 'object') {
              myChart.setOption(option);
            }
            window.addEventListener('resize', myChart.resize());
          }

            // 刷新请求
            const flush = async () =>{
                const param = {
                    name: current_name,
                    method: 'get'
                };
                await getSixAverageByProvince(param).then(res=>{
                    const provinceList = [];
                    const s = res.data.data;
                    const header = ['year', '2013', '2014', '2015', '2016', '2017', '2018'];
                    provinceList.push(header);
                    const province_co = [];
                    const province_no2 = [];
                    const province_o3 = [];
                    const province_pm2 = [];
                    const province_pm10 = [];
                    const province_so2 = [];
                    province_co.push('CO');
                    province_no2.push('NO2');
                    province_o3.push('O3');
                    province_pm2.push('PM2.5');
                    province_pm10.push('PM10');
                    province_so2.push('SO2');
                    // 处理数据
                    for (let i = 0;i < s.length;i++){
                        for (let j = 0;j < s[i].length;j++){
                            // 判断i属于哪一个
                            switch (i) {
                                case 0:
                                    province_pm2.push(s[i][j]);
                                    break;
                                case 1:
                                    province_pm10.push(s[i][j]);
                                    break;
                                case 2:
                                    province_so2.push(s[i][j]);
                                    break;
                                case 3:
                                    province_no2.push(s[i][j]);
                                    break;
                                case 4:
                                    province_co.push(s[i][j]);
                                    break;
                                case 5:
                                    province_o3.push(s[i][j]);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    provinceList.push(province_co);
                    provinceList.push(province_no2);
                    provinceList.push(province_o3);
                    provinceList.push(province_pm2);
                    provinceList.push(province_pm10);
                    provinceList.push(province_so2);
                    reloadLine(provinceList);

                })
            };
            // 重载
            const reloadLine = async (provinceList)=>{
                chars.clear();
                var option = {
                    legend:{},
                    tooltip:{
                        //折线图显示框，待添加
                        trigger: 'axis',
                    },
                    dataset: {
                        source: provinceList
                    },
                    xAxis: { type: 'category' },
                    yAxis: { gridIndex : 0 },
                    grid: { top: '55%' },
                    series: [
                        {
                            type: "line",
                            smooth: true,
                            seriesLayoutBy: 'row',
                            emphasis: { focus: 'series'}
                        },
                        {
                            type: "line",
                            smooth: true,
                            seriesLayoutBy: 'row',
                            emphasis: { focus: 'series'}
                        },
                        {
                            type: "line",
                            smooth: true,
                            seriesLayoutBy: 'row',
                            emphasis: { focus: 'series'}
                        },
                        {
                            type: "line",
                            smooth: true,
                            seriesLayoutBy: 'row',
                            emphasis: { focus: 'series'}
                        },
                        {
                            type: "line",
                            smooth: true,
                            seriesLayoutBy: 'row',
                            emphasis: { focus: 'series'}
                        },
                        {
                            type: "line",
                            smooth: true,
                            seriesLayoutBy: 'row',
                            emphasis: { focus: 'series'}
                        },
                        {
                            type: 'pie',
                            id: 'pie',
                            radius : '40%',
                            center: ['50%', '25%'],
                            emphasis: {
                                focus: 'self'
                            },
                            label: {
                                formatter: '{b}: {@2013} ({d}%)'
                            },
                            encode: {
                                itemName: 'year',
                                value: '2013',
                                tooltip: '2013'
                            }
                        }
                    ]
                };
                chars.setOption(option);
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

          onMounted(async () =>{
            await getData();
            await drawLine()
          })

          return{
              flush,
          }
        }
    }


</script>

<style lang="scss" scoped>
    /*$box-width: 300px;*/
    $box-width: 100%;
    $box-height: 900px;

    .centreRight1 {
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
</style>
