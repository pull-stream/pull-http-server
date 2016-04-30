const test = require('tape')

const pullHttpServer = require('../')

describe('pull-http-server', function(t) {
  t.ok(pullHttpServer, 'module is require-able')
  t.end()
})
