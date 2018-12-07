/**
 * 统一捕获和处理http错误
 *  401: 权限不足
 *  404: 请求资源不存在
 *  400: 请求参数错误
 *  500: 服务器错误
 * 
 * ps: 目前看来，使用这种方式只能捕获主动抛出的http error (如: ctx.throw(400))
 *  错误处理还需要之后进一步研究
 */
const errorHander = {
  async errorHandle(ctx, next) {
    try {
      await next()
    } catch(error) {
      switch (error.status) {

        case 401: {
          ctx.status = 401
          ctx.body = {
            code: 1,
            status: 401,
            message: error.message || 'you do not have access'
          }
        } break
  
        case 404: {
          ctx.status = 404
          ctx.body = {
            code: 1,
            status: 404,
            message: error.message || 'not found'
          }
        } break
  
        case 500: {
          ctx.status = 500
          ctx.body = {
            code: 1,
            status: 500,
            message: error.message || 'server error'
          }
        } break
  
        case 400: {
          ctx.status = 400
          ctx.body = {
            code: 1,
            status: 400,
            message: error.message || 'bad request, check args please'
          }
        } break
  
        default: {
          throw error
        } break
      }
    }
  }
}

module.exports = errorHander.errorHandle
