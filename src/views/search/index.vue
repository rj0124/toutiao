<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultsShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-results
      v-if="isResultsShow"
      :search-text="searchText"
    />

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />

    <!-- 历史记录 -->
    <search-history
      v-else
      @search="onSearch"
      :search-histories="searchHistories"
      @update-histories="searchHistories = $event"
    />
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResults from './components/search-results'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResults
  },
  props: {},
  data () {
    return {
      // 搜索输入框的内容
      searchText: '',
      // 控制搜索结果的显示状态
      isResultsShow: false,
      searchHistories: [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () {},
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)
      // setItem('search-history', this.searchHistories)
      this.isResultsShow = true
    },
    async loadSearchHistories () {
      const searchHistories = getItem('search-history') || []
      //   if (this.user) {
      //     const { data } = await getSearchHistories()
      //     searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      //   }
      this.searchHistories = searchHistories
    }
  }
}
</script>
<style scoped lang="less">
</style>
