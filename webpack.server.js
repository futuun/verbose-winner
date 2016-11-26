const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

let config = {}
try {
   // if there is no dll manifest it will throw error
  config = require('./webpack.config')
} catch (error) {
  if (/dll|manifest\.json/.test(error.message)) {
    console.error('dll manifest not found!')
    console.error('try: `yarn dll`')
    return
  }
}
const app = express()
const port = 3000
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    cache: true,
    assets: true,
    colors: true,
    version: true,
    hash: false,
    timings: true,
    chunks: true,
    chunkModules: false,
  },
}))

app.use(webpackHotMiddleware(compiler))

app.use('/', express.static(`${__dirname}/app/static`))
app.use('/dll', express.static(`${__dirname}/dll`))
app.get('*', (req, res) => {
  const filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      console.error(err)
      res.send(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    // eslint-disable-next-line no-console
    console.info('Open up http://localhost:%s/ in your browser.', port)
  }
})
