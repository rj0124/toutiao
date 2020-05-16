<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="isRefreshLoading"
    :success-text="refreshSuccessText"
    :success-duration="1000"
    @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      // 下拉刷新的loading状态
      isRefreshLoading: false,
      // 下拉刷新成功的提示文本
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticles({
        // 频道id
        channel_id: this.channel.id,
        // 时间戳 类似于页码,请求最新数据使用当前最新时间戳,下一页数据使用上一次返回数据中的时间戳
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶 1--置顶 0--不置顶
        with_top: 1
      })
      console.log(data)
      // 2.把数据放在list数组中
      const { results } = data.data
      this.articles.push(...results)
      // 3.设置本次加载状态结束,他才可以判定是否需要加载下一次,否则就会永远停留在这里
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了,把加载状态设置为结束,不在触发加载更多
        this.finished = true
      }
    },

    async onRefresh () {
      // 下拉刷新,组件自己就会展示loading状态
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 2.把数据放在数据列表中
      const { results } = data.data
      this.articles.unshift(...results)
      // 3.关闭刷新的状态
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 固定定位
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
