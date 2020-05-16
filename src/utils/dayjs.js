// 初始化  dayjs 相关配置
import dayjs from 'dayjs'

import Vue from 'vue'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// console.log(dayjs('2020-05-04').from(dayjs()))
