var ReadableStream = require('stream').Readable
var inherits = require('inherits')
var randomBytes = require('randombytes')

function RandomBytesStream(max, options) {

  if (!(this instanceof RandomBytesStream)) {
    return new RandomBytesStream(max, options)
  } else {
    if (max != undefined) {
      this.count = 0
      this.max = max
    }
  }

  ReadableStream.call(this, options)
}

inherits(RandomBytesStream, ReadableStream)

RandomBytesStream.prototype._read = function(size) {
  var self = this
  randomBytes(size, function(err, buf) {

    if (err) self.emit('error', err)
    else {
      if (self.max == undefined) {
        self.push(buf)
      } else {
        if (self.count > self.max) {
          self.push(null)
        } else {

          if (self.count + size < self.max) {
            self.push(buf)
            self.count = self.count + size
          } else {
            var nbuf = new Buffer(self.max - self.count)
            for (var i = 0; i < buf.length; i++) {
              if (self.count < self.max) {
                nbuf[i] = buf[i]
                self.count = self.count + 1
              }
            }
            self.push(nbuf)
          }
        }
      }

    }

  })
}

module.exports = RandomBytesStream