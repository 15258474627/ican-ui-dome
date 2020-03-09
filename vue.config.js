const utils = require('./config/utils')
// const cacheGroups = require('./config/cacheGroups')
const devServer = require('./config/devServer')

const isProduction = process.env.NODE_ENV === 'production'

const commonCss = [
  // '/cdn/animate/animate.css',
  // '/cdn/iconfont/index.css',
  // '/cdn/iep/index.css',
  // '/cdn/avue.index.css',
  // '/cdn/element-ui.css',
  // '//at.alicdn.com/t/font_1036949_blov5gxa678.css'
]
const commonJs = [
  // '//at.alicdn.com/t/font_1184303_mhqvids4u2k.js'
]
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [...commonCss],
    js: [...commonJs]
  },
  // 生产环境
  build: {
    css: [
      ...commonCss
    ],
    js: [
      ...commonJs
    ]
  }
}

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '国脉我能内部智慧平台'
      args[0].url = 'home.woneng.net'
      if (isProduction) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 删除打印
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }
    config
      .plugin('webpack-context-replacement')
      .use(require('webpack').ContextReplacementPlugin, [
        /moment[/\\]locale$/,
        /zh-cn/,
      ])
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        BUILD_PROJECT: JSON.stringify(utils.getProject()),
        BUILD_TEAM_NAME: JSON.stringify(utils.getProjectTeam()),
        BUILD_PRO_NAME: JSON.stringify(utils.getProjectName()),
        BUILD_VER_TAG: JSON.stringify(utils.getCurrentTag()),
        BUILD_GIT_HASH: JSON.stringify(utils.getGitHash()),
        BUILD_PRO_DESC: JSON.stringify(utils.getProjectDesc()),
        BUILD_TIME: Date.parse(new Date()),
        IS_ICAN: false,
      })
      return definitions
    })
    return config
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.optimization = {
        splitChunks: {
          // cacheGroups: cacheGroups.cacheGroups
        }
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    // sourceMap: false,
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#BA1B21',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
      // pass options to sass-loader
      // sass: {
      // 引入全局变量样式,@使我们设置的别名,执行src目录
      // prependData: `
      //     @import "@/styles/approval.scss";
      //     @import "@/styles/variables.scss";
      // `,
      // },
    },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    host: devServer.host, // can be overwritten by process.env.HOST
    open: false,
    port: devServer.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: devServer.proxy,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pwa: {
    name: 'ican-3.0',
    themeColor: '#BA1B21',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
}
