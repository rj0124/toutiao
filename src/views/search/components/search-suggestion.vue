<template>
  <!-- 联想建议 -->
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestion"
      :key="index"
      @click="$emit('search', str)"
    >
    <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

// // 函数防抖
// const fn = _.debounce(function () {
//   console.log('hello')
// }, 1000)

// fn()

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 联想建议数据列表
      suggestion: [],
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestion = data.data.options
      }, 50),
      // 该回调将会在侦听开始之后立即调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (str) {
      // console.log(str)
      // RegExp是正则表达式的构造函数
      // 参数1:字符串
      // 参数2:匹配模式
      // 返回值:正则对象
      // new RegExp(this.searchText, 'gi')
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>
<style scoped lang="less">
</style>
