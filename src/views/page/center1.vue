<template>
    <div class="center">
        <!-- 这里画地图 -->
        <div class="d-flex pt-2 pl-2">
                <span style="font-size: 20px">
                    <i class="iconfont icon-tongji2" />
                    空气质量分析柱状体
                </span>
        </div>
        <div style="height: 410px;">
            <div id="line" style="height: 100%"></div>
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import * as echarts from 'echarts'
    export default {
        name: "center1",
        setup() {
            const drawLine =() =>{
                const myChart = echarts.init(document.getElementById('line'))
                const option = {
                    xAxis: {
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {},
                    series: [
                        {
                            type: 'bar',
                            data: [23, 24, 18, 25, 27, 28, 25]
                        }
                    ]
                }
                myChart.setOption(option);
            }
            onMounted(()=>{
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
