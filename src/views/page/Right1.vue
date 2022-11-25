<template>
    <div class="centreRight1">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <i class="iconfont icon-tongji4" />
                    空气质量分析饼图
                </span>
            </div>
            <!-- 总共高为820 -->
            <!-- 这里画地图 -->
            <div style="height: 500px;">
                <div id="pie" style="height: 100%"></div>
            </div>
            <span style="font-size: 20px">
                    <i class="iconfont icon-fenxi7" />
                    空气质量分析表格
                </span>
            <dv-scroll-board :config="config" style="width:100%;height:290px" />
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import * as echarts from 'echarts'
    export default {
        name: "Right1",
        setup() {
            const headerHeight = 50;
            const headerBGC = ''
            const header = [
                '列1', '列2', '列3'
            ]
            const data = [
                ['行1列1', '行1列2', '行1列3'],
                ['行2列1', '行2列2', '行2列3'],
                ['行3列1', '行3列2', '行3列3'],
                ['行4列1', '行4列2', '行4列3'],
                ['行5列1', '行5列2', '行5列3'],
                ['行6列1', '行6列2', '行6列3'],
                ['行7列1', '行7列2', '行7列3'],
                ['行8列1', '行8列2', '行8列3'],
                ['行9列1', '行9列2', '行9列3'],
                ['行10列1', '行10列2', '行10列3']
            ]
            const config = {headerHeight:headerHeight,header:header,data:data}
            const makeRandomData = () =>{
                return [
                    {
                        value: Math.random(),
                        name: 'A'
                    },
                    {
                        value: Math.random(),
                        name: 'B'
                    },
                    {
                        value: Math.random(),
                        name: 'C'
                    }
                ];
            }
            const drawPie =() =>{
                const myChart = echarts.init(document.getElementById('pie'))
                const option = {
                    series: [
                        {
                            type: 'pie',
                            radius: [0, '50%'],
                            data: makeRandomData()
                        }
                    ]
                }
                myChart.setOption(option);
            }
            onMounted(()=>{
                drawPie();
            })
            return{
                config
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
