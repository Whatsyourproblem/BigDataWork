const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
    // 解决跨域问题
    proxy: {
      '/api': {
        //target: 'http://localhost:9099/api',//这里填入你要请求的接口的前缀
        target: 'http://43.139.123.66:9099/api',//这里填入你要请求的接口的前缀
        ws: true,//代理websocked
        changeOrigin: true,//虚拟的站点需要更管origin
        secure: true,                   //是否https接口
        pathRewrite: {
          '^/api': ''//重写路径
        },
        headers: {
          //referer: 'http://localhost:9099/api', //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
          referer: 'http://43.139.123.66:9099/api', //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
        }
      }
    }
  }
})
