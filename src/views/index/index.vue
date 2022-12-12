<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">

          <!-- 第一行头部信息 -->
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColors" />
            <div class="title">
<!--
              <span class="title-text">{{ title }}</span>
-->
              <span class="title-text">大气污染可视化</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColors"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>
        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-before"></span>
              <span class="text">全国各省市空气质量可视化分析</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">梁鑫 许文杰 吴家俊  赵睿睿</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span  class="text" >
                {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
                {{ timeInfo.dateDay }}
                   <!-- 这里可以写组员 -->
              </span>
            </div>
          </div>
        </div>
          <!-- 上面两行不需要动 -->

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
                <dv-border-box12>
                    <Left1></Left1>
                </dv-border-box12>
            </div>
            <!-- 中间 -->
            <div>
                <dv-border-box12>
                    <Center1></Center1>
                    <Center2></Center2>
                </dv-border-box12>
            </div>
            <!-- 右一 -->
            <div>
              <dv-border-box-13>
                <Right1></Right1>
              </dv-border-box-13>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
} from 'vue'
import { formatTime } from '@/utils/index'
import { WEEK } from '@/constant/index'
import useDraw from '@/utils/useDraw'
import { title, subtitle, moduleInfo } from '@/constant/index'
import Center1 from '../page/center1.vue'
import Center2 from '../page/center2.vue'
import Left1 from '../page/Left1.vue'
import Right1 from '../page/Right1.vue'

export default defineComponent({
  components: {
     Center1,Center2,Left1,Right1
  },
  setup() {
    // * 颜色
    const decorationColors = ['#568aea', '#000000']
    // * 加载标识
    const loading = ref<boolean>(true)
    // * 时间内容
    const timeInfo = reactive({
      setInterval: 0,
      dateDay: '',
      dateYear: '',
      dateWeek: ''
    })
    // * 适配处理
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
    // 生命周期
    onMounted(() => {
      cancelLoading()
      handleTime()
      // todo 屏幕适应
      windowDraw()
      calcRate()
    })

    onUnmounted(() => {
      unWindowDraw()
      clearInterval(timeInfo.setInterval)
    })

    // methods
    // todo 处理 loading 展示
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    }

    // todo 处理时间监听
    const handleTime = () => {
      timeInfo.setInterval = setInterval(() => {
        const date = new Date()
        timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
        timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
        timeInfo.dateWeek = WEEK[date.getDay()]
      }, 1000)
    }

    // return
    return {
      loading,
      timeInfo,
      appRef,
      title,
      subtitle,
      moduleInfo
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>
