<template>
    <div class="center">
        <!-- 这里画地图 -->
        <div class="d-flex pt-2 pl-2">
                <span style="font-size: 20px">
                    <i class="iconfont icon-fenxi7" />
                    空气质量分析散点图
                </span>
        </div>
        <div style="height: 410px;">
            <div id="spot" style="height: 100%"></div>
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import * as echarts from 'echarts'
    export default {
        name: "center2",
        setup() {
            const drawSpot =() =>{
                const myChart = echarts.init(document.getElementById('spot'))
                const option = {

                    xAxis: {
                        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    },
                    yAxis: {},
                    series: [
                        {
                            type: 'scatter',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            symbolSize: 20,
                            symbol:
                                'path://M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z'
                        }
                    ]
                }
                myChart.setOption(option);
            }
            onMounted(()=>{
                drawSpot()
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
