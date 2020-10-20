
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less')
const withSourceMaps = require('@zeit/next-source-maps')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const withPlugins = require('next-compose-plugins');
var configfile = require('./config/config');
const logger = require("./tool_server/logger")(__filename);
logger.info('process.env.NODE_ENV : ', process.env.NODE_ENV);
let resourcePath = configfile.RESOURCE_PATH;

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

const plugins = [
  [ 
    withCSS,
    {
      cssModules: false,
      cssLoaderOptions: {
        importLoaders: 1,
        minimize:true,
        // localIdentName: "[local]___[hash:base64:5]",
      }
    }
  ],
  [
    /** 
     * The stylesheet is compiled to .next/static/css
     * 如果开启cssModule 会导致ant-design-mobile 样式匹配结果错乱；所以需要关闭
    */
    withLess,  
    {
      cssModules:false, //http://www.ruanyifeng.com/blog/2016/06/css_modules.html CSS Modules 用法教程
      cssLoaderOptions:{
        importLoaders: 1,
        minimize:true,
        // localIdentName: "[local]___[hash:base64:5]", //localIdentName  CSS-Module 定制哈希类名
      },
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
    }
  ],[
    withSourceMaps
  ]
]

const config = {
  async rewrites() {
    return [
      {
        source: resourcePath + '/_next/:slug*',
        destination: '/_next/:slug*',
      },
    ]
  },
  assetPrefix:  process.env.NODE_ENV === "production" ? resourcePath: "" ,

  // cssModules:false,
  // cssLoaderOptions:{
  //       importLoaders: 1,
  //       minimize:true,
  //     },
  // lessLoaderOptions: {
  //   javascriptEnabled: true,
  //   modifyVars: themeVariables, // make your antd custom effective
  // },
  webpack: (config, { isServer,buildId }) => {
    logger.info('buildId: ', buildId);
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }else {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }
    return config
  },
}

module.exports = withPlugins(plugins,config);