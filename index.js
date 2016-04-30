var http = require('http')
var toPull = require('stream-to-pull-stream')

module.exports = createServer

function createServer (requestListener) {
  return http.createServer(function (req, res) {
    var duplex = createDuplex(req, res)
    requestListener(duplex)
  })
}

function createDuplex (req, res) {
  return {
    source: createSource(req),
    sink: createSink(res)
  }
}

function createSource (req) {
  var source = toPull.source(req)
  return assign(source, req)
}

function createSink (res) {
  var sink = toPull.sink(res)
  return assign(sink, res)
}

// util
function assign (target, source) {
  for (var key in source) {
    var value = source[key]
    if (typeof value === 'function') {
      target[key] = value.bind(source)
    } else {
      target[key] = value
    }
  }
  return target
}
