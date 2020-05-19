<template>
  <!-- 联想建议 -->
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
    <div v-if="isDeleteShow">
      <!-- prop数据 如果是引用类型（数组，对象）可以修改 注意，任何prop数据都不能重新赋值 -->
      <span @click="$emit('update-histories', [])">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow = false">完成</span>
    </div>
    <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon
        v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'

export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onDelete (history, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 持久化处理
        // 修改本地存储数据
        // 请求接口删除线上数据
        // 无论是否登录,都把数据持久化到本地
        // 如果已登录,者删除线上的历史记录
        // setItem('search-histories', this.searchHistories)
        return
      }

      this.$emit('search', history)
    }
  }
}
</script>
<style scoped lang="less">
</style>
