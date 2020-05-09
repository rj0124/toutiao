// Postcss 是基于Node.js 运行的处理css的工具,它的配置文件也是运行在Node.js中

// Postcss配置文件需要导出一个对象
module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
