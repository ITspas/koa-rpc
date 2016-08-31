var options = {
        url: '/rpc'
      , methodNames: [ 'foo' ]
      , timeout: 5 * 1000 // optional, defaults to 30 seconds
    }

  , client = require('rpc-http')(options)

client.foo('world1111',"123", function (err, message,hha) {
  console.log("fdsfsl",message,hha)
})