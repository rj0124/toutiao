// Postcss 是基于Node.js 运行的处理css的工具,它的配置文件也是运行在Node.js中

// Postcss配置文件需要导出一个对象
module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 把px转换为rem
    'postcss-pxtorem': {
      // 转换的根元素的基准值
      // 750宽的设计稿 750/10 = 75
      // 375宽的设计稿 375/10 = 37.5
      // 注意 Vant组件库基于逻辑像素375宽写的
      rootValue: 37.5,
      // 需要转换的css属性, *就是所有属性都要转换
      propList: ['*']
    }
  }
}
