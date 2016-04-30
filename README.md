# pull-http-server

create http servers in pull streamy ways

```shell
npm install --save pull-http-server
```

## example

```javascript
var summary = require('server-summary')
var pull = require('pull-stream')
var createServer = require('pull-http-server')

var server = createServer(function (stream) {
  console.log('method', stream.source.method)
  console.log('url', stream.source.url)
  console.log('headers', stream.source.headers)

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
```

```shell
curl -d "asdfjkl" http://localhost:5000
```

## usage

### `createServer = require('pull-http-server')`

### `server = createServer(requestHandler)`

`requestHandler` receives `duplex` pull stream (with `source` and `sink` properties).

- `source` has same properties as [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
- `sink` has same properties as [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse)

returns node [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server).

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
