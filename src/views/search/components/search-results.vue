<template>
  <!-- 联想建议 -->
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'

export default {
  name: 'SearchResults',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      const { data } = await getSearchResults({
        page: this.page, // 页码
        per_page: this.per_page, // 每页大小
        q: this.searchText // 搜索的字符
      })
      // 请求获取数据
      // 将数据放在数据列表中
      const { results } = data.data
      this.list.push(...results)
      // 关闭本次的loading
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
      // 如果有,则更新获取下一页数据的页码
      // 如果没有,则把finished设置为true,关闭加载更多
    }
  }
}
</script>
<style scoped lang="less">
.search-results {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
