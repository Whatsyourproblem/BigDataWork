<template>
    <div class="centreLeft1">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <i class="iconfont icon-fenxi2" />
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

    import { onMounted, ref } from 'vue'
    import * as echarts from 'echarts'
    export default {
        name: "Left1",
        components: {
        },

        setup(){
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
                {name:'新疆',   value: [87.500966,  43.983832,55,20,23,8,4,0.29,63.44]},
                {name:'西藏',   value: [90.959657,  29.881987,55,20,23,8,4,0.29,63.44]},
                {name:'青海',   value: [101.703679, 36.733408,55,20,23,8,4,0.29,63.44]},
                {name:'甘肃',   value: [103.764176, 36.198433,11,20,23,8,4,0.29,63.44]},
                {name:'内蒙古', value: [111.711808, 40.98898,127,20,23,8,4,0.29,63.44]},
                {name:'宁夏',   value: [106.192619, 38.605171,99,20,23,8,4,0.29,63.44]},
                {name:'四川',   value: [103.984944, 30.712171,263,20,23,8,4,0.29,63.44]},
                {name:'云南',   value: [102.733927, 25.025991,122,20,23,8,4,0.29,63.44]},
                {name:'陕西',   value: [112.521289, 38.025365,78,20,23,8,4,0.29,63.44]},
                {name:'山西',   value: [108.84183,  34.510421,65,20,23,8,4,0.29,63.44]},
                {name:'重庆',   value: [106.413387, 29.689402,77,20,23,8,4,0.29,63.44]},
                {name:'贵州',   value: [106.560565, 26.756654,123,20,23,8,4,0.29,63.44]},
                {name:'广西',   value: [108.326706, 22.99805,233,20,23,8,4,0.29,63.44]},
                {name:'海南',   value: [110.129641, 20.14162,167,20,23,8,4,0.29,63.44]},
                {name:'广东',   value: [113.183592, 23.202287,178,20,23,8,4,0.29,63.44]},
                {name:'澳门',   value: [113.551538, 22.109432,66,20,23,8,4,0.29,63.44]},
                {name:'香港',   value: [114.066662, 22.588638,123,20,23,8,4,0.29,63.44]},
                {name:'台湾',   value: [121.49917,  25.12653,88,20,23,8,4,0.29,63.44]},
                {name:'福建',   value: [119.107522, 26.193691,297,20,23,8,4,0.29,63.44]},
                {name:'江西',   value: [115.722419, 28.882959,132,20,23,8,4,0.29,63.44]},
                {name:'湖南',   value: [112.778851, 28.363482,167,20,23,8,4,0.29,63.44]},
                {name:'湖北',   value: [114.177046, 30.743959,190,20,23,8,4,0.29,63.44]},
                {name:'安徽',   value: [117.120614, 31.943998,32,20,23,8,4,0.29,63.44]},
                {name:'浙江',   value: [119.990592, 30.361806,78,20,23,8,4,0.29,63.44]},
                {name:'江苏',   value: [118.665986, 32.194658,46,20,23,8,4,0.29,63.44]},
                {name:'河南',   value: [113.441154, 34.8448,278,20,23,8,4,0.29,63.44]},
                {name:'山东',   value: [116.973435, 36.763019,235,20,23,8,4,0.29,63.44]},
                {name:'上海',   value: [121.315197, 31.314325,189,20,23,8,4,0.29,63.44]},
                {name:'河北',   value: [114.397814, 38.170754,267,20,23,8,4,0.29,63.44]},
                {name:'天津',   value: [117.194203, 39.180291,49,20,23,8,4,0.29,63.44]},
                {name:'北京',   value: [116.384722, 39.977552,178,20,23,8,4,0.29,63.44]},
                {name:'辽宁',   value: [123.412489, 41.875105,232,20,23,8,4,0.29,63.44]},
                {name:'吉林',   value: [125.252219, 43.850841,167,20,23,8,4,0.29,63.44]},
                {name:'黑龙江', value: [126.503235, 45.865719,231,20,23,8,4,0.29,63.44]}
            ];
            //用来存放当前的地图名字
            let currentName = '';
            //用来存放下钻的历史记录
            let history = [];
            let options = {};
            let charts = '';
            let data = [
                { name: '海门', value: 9 },
                { name: '鄂尔多斯', value: 12 },
                { name: '招远', value: 12 },
                { name: '舟山', value: 12 },
                { name: '齐齐哈尔', value: 14 },
                { name: '盐城', value: 15 },
                { name: '赤峰', value: 16 },
                { name: '青岛', value: 18 },
                { name: '乳山', value: 18 },
                { name: '金昌', value: 19 },
                { name: '泉州', value: 21 },
                { name: '莱西', value: 21 },
                { name: '日照', value: 21 },
                { name: '胶南', value: 22 },
                { name: '南通', value: 23 },
                { name: '拉萨', value: 24 },
                { name: '云浮', value: 24 },
                { name: '梅州', value: 25 },
                { name: '文登', value: 25 },
                { name: '上海', value: 25 },
                { name: '攀枝花', value: 25 },
                { name: '威海', value: 25 },
                { name: '承德', value: 25 },
                { name: '厦门', value: 26 },
                { name: '汕尾', value: 26 },
                { name: '潮州', value: 26 },
                { name: '丹东', value: 27 },
                { name: '太仓', value: 27 },
                { name: '曲靖', value: 27 },
                { name: '烟台', value: 28 },
                { name: '福州', value: 29 },
                { name: '瓦房店', value: 30 },
                { name: '即墨', value: 30 },
                { name: '抚顺', value: 31 },
                { name: '玉溪', value: 31 },
                { name: '张家口', value: 31 },
                { name: '阳泉', value: 31 },
                { name: '莱州', value: 32 },
                { name: '湖州', value: 32 },
                { name: '汕头', value: 32 },
                { name: '昆山', value: 33 },
                { name: '宁波', value: 33 },
                { name: '湛江', value: 33 },
                { name: '揭阳', value: 34 },
                { name: '荣成', value: 34 },
                { name: '连云港', value: 35 },
                { name: '葫芦岛', value: 35 },
                { name: '常熟', value: 36 },
                { name: '东莞', value: 36 },
                { name: '河源', value: 36 },
                { name: '淮安', value: 36 },
                { name: '泰州', value: 36 },
                { name: '南宁', value: 37 },
                { name: '营口', value: 37 },
                { name: '惠州', value: 37 },
                { name: '江阴', value: 37 },
                { name: '蓬莱', value: 37 },
                { name: '韶关', value: 38 },
                { name: '嘉峪关', value: 38 },
                { name: '广州', value: 38 },
                { name: '延安', value: 38 },
                { name: '太原', value: 39 },
                { name: '清远', value: 39 },
                { name: '中山', value: 39 },
                { name: '昆明', value: 39 },
                { name: '寿光', value: 40 },
                { name: '盘锦', value: 40 },
                { name: '长治', value: 41 },
                { name: '深圳', value: 41 },
                { name: '珠海', value: 42 },
                { name: '宿迁', value: 43 },
                { name: '咸阳', value: 43 },
                { name: '铜川', value: 44 },
                { name: '平度', value: 44 },
                { name: '佛山', value: 44 },
                { name: '海口', value: 44 },
                { name: '江门', value: 45 },
                { name: '章丘', value: 45 },
                { name: '肇庆', value: 46 },
                { name: '大连', value: 47 },
                { name: '临汾', value: 47 },
                { name: '吴江', value: 47 },
                { name: '石嘴山', value: 49 },
                { name: '沈阳', value: 50 },
                { name: '苏州', value: 50 },
                { name: '茂名', value: 50 },
                { name: '嘉兴', value: 51 },
                { name: '长春', value: 51 },
                { name: '胶州', value: 52 },
                { name: '银川', value: 52 },
                { name: '张家港', value: 52 },
                { name: '三门峡', value: 53 },
                { name: '锦州', value: 54 },
                { name: '南昌', value: 54 },
                { name: '柳州', value: 54 },
                { name: '三亚', value: 54 },
                { name: '自贡', value: 56 },
                { name: '吉林', value: 56 },
                { name: '阳江', value: 57 },
                { name: '泸州', value: 57 },
                { name: '西宁', value: 57 },
                { name: '宜宾', value: 58 },
                { name: '呼和浩特', value: 58 },
                { name: '成都', value: 58 },
                { name: '大同', value: 58 },
                { name: '镇江', value: 59 },
                { name: '桂林', value: 59 },
                { name: '张家界', value: 59 },
                { name: '宜兴', value: 59 },
                { name: '北海', value: 60 },
                { name: '西安', value: 61 },
                { name: '金坛', value: 62 },
                { name: '东营', value: 62 },
                { name: '牡丹江', value: 63 },
                { name: '遵义', value: 63 },
                { name: '绍兴', value: 63 },
                { name: '扬州', value: 64 },
                { name: '常州', value: 64 },
                { name: '潍坊', value: 65 },
                { name: '重庆', value: 66 },
                { name: '台州', value: 67 },
                { name: '南京', value: 67 },
                { name: '滨州', value: 70 },
                { name: '贵阳', value: 71 },
                { name: '无锡', value: 71 },
                { name: '本溪', value: 71 },
                { name: '克拉玛依', value: 72 },
                { name: '渭南', value: 72 },
                { name: '马鞍山', value: 72 },
                { name: '宝鸡', value: 72 },
                { name: '焦作', value: 75 },
                { name: '句容', value: 75 },
                { name: '北京', value: 79 },
                { name: '徐州', value: 79 },
                { name: '衡水', value: 80 },
                { name: '包头', value: 80 },
                { name: '绵阳', value: 80 },
                { name: '乌鲁木齐', value: 84 },
                { name: '枣庄', value: 84 },
                { name: '杭州', value: 84 },
                { name: '淄博', value: 85 },
                { name: '鞍山', value: 86 },
                { name: '溧阳', value: 86 },
                { name: '库尔勒', value: 86 },
                { name: '安阳', value: 90 },
                { name: '开封', value: 90 },
                { name: '济南', value: 92 },
                { name: '德阳', value: 93 },
                { name: '温州', value: 95 },
                { name: '九江', value: 96 },
                { name: '邯郸', value: 98 },
                { name: '临安', value: 99 },
                { name: '兰州', value: 99 },
                { name: '沧州', value: 100 },
                { name: '临沂', value: 103 },
                { name: '南充', value: 104 },
                { name: '天津', value: 105 },
                { name: '富阳', value: 106 },
                { name: '泰安', value: 112 },
                { name: '诸暨', value: 112 },
                { name: '郑州', value: 113 },
                { name: '哈尔滨', value: 114 },
                { name: '聊城', value: 116 },
                { name: '芜湖', value: 117 },
                { name: '唐山', value: 119 },
                { name: '平顶山', value: 119 },
                { name: '邢台', value: 119 },
                { name: '德州', value: 120 },
                { name: '济宁', value: 120 },
                { name: '荆州', value: 127 },
                { name: '宜昌', value: 130 },
                { name: '义乌', value: 132 },
                { name: '丽水', value: 133 },
                { name: '洛阳', value: 134 },
                { name: '秦皇岛', value: 136 },
                { name: '株洲', value: 143 },
                { name: '石家庄', value: 147 },
                { name: '莱芜', value: 148 },
                { name: '常德', value: 152 },
                { name: '保定', value: 153 },
                { name: '湘潭', value: 154 },
                { name: '金华', value: 157 },
                { name: '岳阳', value: 169 },
                { name: '长沙', value: 175 },
                { name: '衢州', value: 177 },
                { name: '廊坊', value: 193 },
                { name: '菏泽', value: 194 },
                { name: '合肥', value: 229 },
                { name: '武汉', value: 273 },
                { name: '大庆', value: 279 }
            ];
            let geoCoordMap = {

                '海门': [121.15, 31.89],
                '鄂尔多斯': [109.781327, 39.608266],
                '招远': [120.38, 37.35],
                '舟山': [122.207216, 29.985295],
                '齐齐哈尔': [123.97, 47.33],
                '盐城': [120.13, 33.38],
                '赤峰': [118.87, 42.28],
                '青岛': [120.33, 36.07],
                '乳山': [121.52, 36.89],
                '金昌': [102.188043, 38.520089],
                '泉州': [118.58, 24.93],
                '莱西': [120.53, 36.86],
                '日照': [119.46, 35.42],
                '胶南': [119.97, 35.88],
                '南通': [121.05, 32.08],
                '拉萨': [91.11, 29.97],
                '云浮': [112.02, 22.93],
                '梅州': [116.1, 24.55],
                '文登': [122.05, 37.2],
                '上海': [121.48, 31.22],
                '攀枝花': [101.718637, 26.582347],
                '威海': [122.1, 37.5],
                '承德': [117.93, 40.97],
                '厦门': [118.1, 24.46],
                '汕尾': [115.375279, 22.786211],
                '潮州': [116.63, 23.68],
                '丹东': [124.37, 40.13],
                '太仓': [121.1, 31.45],
                '曲靖': [103.79, 25.51],
                '烟台': [121.39, 37.52],
                '福州': [119.3, 26.08],
                '瓦房店': [121.979603, 39.627114],
                '即墨': [120.45, 36.38],
                '抚顺': [123.97, 41.97],
                '玉溪': [102.52, 24.35],
                '张家口': [114.87, 40.82],
                '阳泉': [113.57, 37.85],
                '莱州': [119.942327, 37.177017],
                '湖州': [120.1, 30.86],
                '汕头': [116.69, 23.39],
                '昆山': [120.95, 31.39],
                '宁波': [121.56, 29.86],
                '湛江': [110.359377, 21.270708],
                '揭阳': [116.35, 23.55],
                '荣成': [122.41, 37.16],
                '连云港': [119.16, 34.59],
                '葫芦岛': [120.836932, 40.711052],
                '常熟': [120.74, 31.64],
                '东莞': [113.75, 23.04],
                '河源': [114.68, 23.73],
                '淮安': [119.15, 33.5],
                '泰州': [119.9, 32.49],
                '南宁': [108.33, 22.84],
                '营口': [122.18, 40.65],
                '惠州': [114.4, 23.09],
                '江阴': [120.26, 31.91],
                '蓬莱': [120.75, 37.8],
                '韶关': [113.62, 24.84],
                '嘉峪关': [98.289152, 39.77313],
                '广州': [113.23, 23.16],
                '延安': [109.47, 36.6],
                '太原': [112.53, 37.87],
                '清远': [113.01, 23.7],
                '中山': [113.38, 22.52],
                '昆明': [102.73, 25.04],
                '寿光': [118.73, 36.86],
                '盘锦': [122.070714, 41.119997],
                '长治': [113.08, 36.18],
                '深圳': [114.07, 22.62],
                '珠海': [113.52, 22.3],
                '宿迁': [118.3, 33.96],
                '咸阳': [108.72, 34.36],
                '铜川': [109.11, 35.09],
                '平度': [119.97, 36.77],
                '佛山': [113.11, 23.05],
                '海口': [110.35, 20.02],
                '江门': [113.06, 22.61],
                '章丘': [117.53, 36.72],
                '肇庆': [112.44, 23.05],
                '大连': [121.62, 38.92],
                '临汾': [111.5, 36.08],
                '吴江': [120.63, 31.16],
                '石嘴山': [106.39, 39.04],
                '沈阳': [123.38, 41.8],
                '苏州': [120.62, 31.32],
                '茂名': [110.88, 21.68],
                '嘉兴': [120.76, 30.77],
                '长春': [125.35, 43.88],
                '胶州': [120.03336, 36.264622],
                '银川': [106.27, 38.47],
                '张家港': [120.555821, 31.875428],
                '三门峡': [111.19, 34.76],
                '锦州': [121.15, 41.13],
                '南昌': [115.89, 28.68],
                '柳州': [109.4, 24.33],
                '三亚': [109.511909, 18.252847],
                '自贡': [104.778442, 29.33903],
                '吉林': [126.57, 43.87],
                '阳江': [111.95, 21.85],
                '泸州': [105.39, 28.91],
                '西宁': [101.74, 36.56],
                '宜宾': [104.56, 29.77],
                '呼和浩特': [111.65, 40.82],
                '成都': [104.06, 30.67],
                '大同': [113.3, 40.12],
                '镇江': [119.44, 32.2],
                '桂林': [110.28, 25.29],
                '张家界': [110.479191, 29.117096],
                '宜兴': [119.82, 31.36],
                '北海': [109.12, 21.49],
                '西安': [108.95, 34.27],
                '金坛': [119.56, 31.74],
                '东营': [118.49, 37.46],
                '牡丹江': [129.58, 44.6],
                '遵义': [106.9, 27.7],
                '绍兴': [120.58, 30.01],
                '扬州': [119.42, 32.39],
                '常州': [119.95, 31.79],
                '潍坊': [119.1, 36.62],
                '重庆': [106.54, 29.59],
                '台州': [121.420757, 28.656386],
                '南京': [118.78, 32.04],
                '滨州': [118.03, 37.36],
                '贵阳': [106.71, 26.57],
                '无锡': [120.29, 31.59],
                '本溪': [123.73, 41.3],
                '克拉玛依': [84.77, 45.59],
                '渭南': [109.5, 34.52],
                '马鞍山': [118.48, 31.56],
                '宝鸡': [107.15, 34.38],
                '焦作': [113.21, 35.24],
                '句容': [119.16, 31.95],
                '北京': [116.46, 39.92],
                '徐州': [117.2, 34.26],
                '衡水': [115.72, 37.72],
                '包头': [110, 40.58],
                '绵阳': [104.73, 31.48],
                '乌鲁木齐': [87.68, 43.77],
                '枣庄': [117.57, 34.86],
                '杭州': [120.19, 30.26],
                '淄博': [118.05, 36.78],
                '鞍山': [122.85, 41.12],
                '溧阳': [119.48, 31.43],
                '库尔勒': [86.06, 41.68],
                '安阳': [114.35, 36.1],
                '开封': [114.35, 34.79],
                '济南': [117, 36.65],
                '德阳': [104.37, 31.13],
                '温州': [120.65, 28.01],
                '九江': [115.97, 29.71],
                '邯郸': [114.47, 36.6],
                '临安': [119.72, 30.23],
                '兰州': [103.73, 36.03],
                '沧州': [116.83, 38.33],
                '临沂': [118.35, 35.05],
                '南充': [106.110698, 30.837793],
                '天津': [117.2, 39.13],
                '富阳': [119.95, 30.07],
                '泰安': [117.13, 36.18],
                '诸暨': [120.23, 29.71],
                '郑州': [113.65, 34.76],
                '哈尔滨': [126.63, 45.75],
                '聊城': [115.97, 36.45],
                '芜湖': [118.38, 31.33],
                '唐山': [118.02, 39.63],
                '平顶山': [113.29, 33.75],
                '邢台': [114.48, 37.05],
                '德州': [116.29, 37.45],
                '济宁': [116.59, 35.38],
                '荆州': [112.239741, 30.335165],
                '宜昌': [111.3, 30.7],
                '义乌': [120.06, 29.32],
                '丽水': [119.92, 28.45],
                '洛阳': [112.44, 34.7],
                '秦皇岛': [119.57, 39.95],
                '株洲': [113.16, 27.83],
                '石家庄': [114.48, 38.03],
                '莱芜': [117.67, 36.19],
                '常德': [111.69, 29.05],
                '保定': [115.48, 38.85],
                '湘潭': [112.91, 27.87],
                '金华': [119.64, 29.12],
                '岳阳': [113.09, 29.37],
                '长沙': [113, 28.21],
                '衢州': [118.88, 28.97],
                '廊坊': [116.7, 39.53],
                '菏泽': [115.480656, 35.23375],
                '合肥': [117.27, 31.86],
                '武汉': [114.31, 30.52],
                '大庆': [125.03, 46.58]
            };
            let flowLine = [
                { coords: [[116.496437, 39.913523], [123.499706, 41.857793]] },
                { coords: [[116.496437, 39.913523], [86.113232, 43.684254]] },
                { coords: [[116.496437, 39.913523], [87.343701, 35.720308]] },
                { coords: [[116.496437, 39.913523], [101.406201, 24.177443]] },
                { coords: [[116.496437, 39.913523], [111.249951, 24.976714]] },
                { coords: [[116.496437, 39.913523], [107.206982, 33.843608]] },
                { coords: [[116.496437, 39.913523], [115.468701, 43.557002]] },
                { coords: [[116.496437, 39.913523], [107.031201, 37.134586]] },
                { coords: [[116.496437, 39.913523], [99.648388, 38.522914]] },
                { coords: [[116.496437, 39.913523], [124.081982, 49.361353]] },
            ];
            // 绘图
            const drawChina =() =>{
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
                                color: ['rgb(255,252,200)','yellow','orange','red']
                            },
                            textStyle: {
                                color: '#fff'
                            }
                        },


                    ],
                    title:{
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
                            z:11,
                            data: chinaNewProvinceData,
                            itemStyle:{
                                normal: {
                                    color:'#FFFF00'
                                },
                            },
                            // 散点的大小 可以直接写大小，也可以通过函数配置
                            symbolSize : 8,
/*                            symbolSize: function (val) {
                                console.log(val)
                                return val[2] /10;
                            },*/
                            tooltip:{
                                show: true,
                                trigger: 'item',
                                position: 'right',//提示框位置
                                backgroundColor: "rgba(185,197,218,0.8)", //设置背景图片 rgba格式
                                borderColor: '#9a9c9d',
                                textStyle: {
                                    color: '#fff'
                                },
                                formatter: function(params) {
                                    let AQI = params.data.value[2]
                                    let pm2 = params.data.value[3]
                                    let pm10 = params.data.value[4]
                                    let so2 = params.data.value[5]
                                    let no2 = params.data.value[6]
                                    let co = params.data.value[7]
                                    let o3 = params.data.value[8]
                                    let s = '';
                                    if (params.data.value[2] >= 200){
                                        s = '差';
                                    }else if (params.data.value[2] >= 100 && params.data.value[2] < 200){
                                        s = '一般'
                                    }else if(params.data.value[2] >= 50 && params.data.value[2] < 100){
                                        s = '良'
                                    }else if(params.data.value[2] >= 0 && params.data.value[2] < 50){
                                        s = '优'
                                    }

                                    let result = '<br>'+ '<span style="font-size: 20px">' +  params.name + ':'+ '</span>' +'<span style="font-size: 22px;color: red">' +'空气质量' + s +'</span>' + '</br>' +
                                            '<br>'+'<span style="font-size: 20px">'+ 'AQI:'+AQI +'</br>'+
                                            '<br>'+'<span style="font-size: 20px">'+ 'PM2.5:'+pm2+'</span>' + '<span style="font-size: 20px;">'+ '    PM10:'+pm10+'</span>' +'</br>'+
                                            '<br>'+'<span style="font-size: 20px">'+ 'SO2:'+so2+'</span>' + '<span style="font-size: 20px;">'+ '    NO2:'+no2+'</span>' +'</br>'+
                                            '<br>'+'<span style="font-size: 20px">'+ 'CO:'+co+'</span>' + '<span style="font-size: 20px;">'+ '    O3:'+o3+'</span>' +'</br>'

                                    return  result;
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
            onMounted(()=>{
                let myChart = drawChina();

                // 这里可以进行数据下钻
                myChart.on('click',(params,myChart) =>{
                    getDown(params.name);
                    console.log(params)
                })
            });
            // 下钻 先暂时实现河南 后续调用接口
            const getDown = async (name)=>{
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
                charts.setOption(options,true);
                currentName = name
            };
            // 调用省级json数据，后续调用接口
            const getMapJson = async (name)=>{
                console.log(name)
                const json = await require('../../assets/json/'+name+'.json')
                return json
            };
            // 回钻
            const returnLevel = async ()=> {
                console.log("hhhh")
                //先判断history有没有数据，能不能返回
                if(history.length == 0){
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

            return{
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
        background-color: rgb(14,19,37);
        color: #fff;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
        box-shadow: 0 2px 25px rgba(14,19,37);
    }
</style>
