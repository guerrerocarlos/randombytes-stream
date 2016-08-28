var ReadableStream = require('stream').Readable
var inherits = require('inherits')
var randomBytes = require('randombytes')

function RandomBytesStream (options) {
  if (!(this instanceof RandomBytesStream)) {
    return new RandomBytesStream(options)
  }

  ReadableStream.call(this, options)
}

inherits(RandomBytesStream, ReadableStream)

RandomBytesStream.prototype._read = function (size) {
  var self = this
  randomBytes(size, function (err, buf) {
    if (err) self.emit('error', err)
    else self.push(buf)
  })
}

module.exports = RandomBytesStream
