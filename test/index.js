var test = require('tape')
var path = require('path')

var randomBytes = require('randombytes')
var randomBytesMock
;(function () {
  var key = path.join(__dirname, '..', 'node_modules', 'randombytes', 'index.js')
  require.cache[key].exports = function () {
    randomBytesMock.apply(null, arguments)
  }
})()

var RandomBytesStream = require('../')

test('create instance without constructor', function (t) {
  var stream = RandomBytesStream()
  t.true(stream instanceof RandomBytesStream)
  t.end()
})

test('call randomBytes with callback', function (t) {
  var buffer = randomBytes(42)
  randomBytesMock = function (size, callback) {
    t.equal(size, buffer.length)
    t.true(typeof callback === 'function')
    randomBytesMock = randomBytes
    callback(null, buffer)
  }

  var stream = new RandomBytesStream()
  stream._read(buffer.length)
  setTimeout(function () {
    t.equal(stream.read(buffer.length).toString('hex'), buffer.toString('hex'))
    t.end()
  }, 50)
})

test('emit error from randomBytes', function (t) {
  randomBytesMock = function (size, callback) {
    callback(new Error('Hola!'))
  }

  RandomBytesStream()
    .on('error', function (err) {
      t.true(err instanceof Error)
      t.equal(err.message, 'Hola!')
      t.end()
    })
    ._read(1)
})
