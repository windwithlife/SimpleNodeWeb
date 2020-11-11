
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less')
const withSourceMaps = require('@zeit/next-source-maps')
const lessToJS = require('less-vars-to-js')
const withPlugins = require('next-compose-plugins');
const path = require('path')

var configfile = require('./config/config');
const logger = require("./tool_server/logger")(__filename);
logger.info('process.env.NODE_ENV : ', process.env.NODE_ENV);
let resourcePath = configfile.RESOURCE_PATH;

const plugins = [
  [ 
    withCSS,
    {
      cssModules: false,
      cssLoaderOptions: {
        importLoaders: 1,
        minimize:true,
      }
    }
  ],
  [
    withLess,  
    {
      cssModules:false,
      cssLoaderOptions:{
        importLoaders: 1,
        minimize:true,
        
      },
      lessLoaderOptions: {
        javascriptEnabled: true
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