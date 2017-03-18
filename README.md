# randombytes-stream

[![NPM Package](https://img.shields.io/npm/v/randombytes-stream.svg?style=flat-square)](https://www.npmjs.org/package/randombytes-stream)
[![Build Status](https://img.shields.io/travis/fanatid/randombytes-stream.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/randombytes-stream)
[![Dependency status](https://img.shields.io/david/fanatid/randombytes-stream.svg?style=flat-square)](https://david-dm.org/fanatid/randombytes-stream#info=dependencies)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A [crypto.randomBytes][1] as infinity [Readable Stream][2].

For example `/dev/random` generator can be implemented as:

```js
#!/usr/bin/env node
const RandomBytesStream = require('randombytes-stream')

RandomBytesStream()
  .on('data', (data) => process.stdout.write(data.toString()))
```

Specific byte size:

```js
#!/usr/bin/env node
const RandomBytesStream = require('randombytes-stream')

RandomBytesStream(33 * 1024) // will output exactly 33 Kb of random data 
  .on('data', (data) => process.stdout.write(data.toString()))
```

## LICENSE

MIT

[1]: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
[2]: https://nodejs.org/api/stream.html#stream_readable_streams
