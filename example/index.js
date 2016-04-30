var summary = require('server-summary')
var createServer = require('../')
var pull = require('pull-stream')

var server = createServer(function (stream) {
  console.log('method', stream.source.method)
  console.log('url', stream.source.url)
  console.log('headers', JSON.stringify(stream.source.headers, null, 2))

  pull(
    stream,
    pull.map(function (buffer) {
      var string = buffer.toString()
      var upper = string.toUpperCase()
      return Buffer(upper)
    }),
    stream
  )
})

server.listen(5000, summary(server))
