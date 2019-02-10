/* eslint-disable no-console */
const fs = require('fs')
const Gun = require('gun')

let config = {
  port: process.env.PORT || process.argv[2] || 8765,
}

if (process.env.HTTPS_KEY) {
  config.key = fs.readFileSync(process.env.HTTPS_KEY)
  config.cert = fs.readFileSync(process.env.HTTPS_CERT)
  config.server = require('https').createServer(config, Gun.serve(__dirname))
} else {
  config.server = require('http').createServer(Gun.serve(__dirname))
}

const gun = new Gun({
  web: config.server,
})

config.server.listen(config.port)
console.log(`Server started on port ${config.port} with /gun`)
