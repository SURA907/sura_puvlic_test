/**
 * koa-jwt 相关配置
 */
const koa_jwt = require('koa-jwt')
const fs = require('fs')
const PRIVATE_KEY = require('./../config').TOKEN_KEY.PRIVATE_KEY


// 不需要token就可以访问的url
const public_path = [
  /^\/articles/,
  /^\/users\/signin$/,
  /^\/users$/,
  /^\/mail\/signup$/,
  /^\/comments/,
]

const jwt_config = koa_jwt({
  secret: PRIVATE_KEY
}).unless({
  path: public_path
})

module.exports = jwt_config
