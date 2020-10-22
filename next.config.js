const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withPlugins = require('next-compose-plugins');
// const fs = require('fs')
const path = require('path')
const generateTheme = require('next-dynamic-antd-theme/plugin');

var configfile = require('./config/config');
let resourcePath = configfile.RESOURCE_PATH;

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
// )
const withAntdTheme = generateTheme({
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './theme'),
  varFile: path.join(__dirname, './theme/vars.less'),
  outputFilePath: path.join(__dirname, './.next/static/color.less'), // where to output color.less
  // lessFilePath: // default is `${prefix}_next/static/color.less`, color.less path in broswer
  // lessJSPath: // default is 'https://cdnjs.cloudflare.com/ajax/libs/less.js/3.11.3/less.min.js', less.js path
});

module.exports = withPlugins([withLess, withAntdTheme],{

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
  lessLoaderOptions: {
    javascriptEnabled: true,
    // modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
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
    }
    return config
  },
})