/**
 * 路由模块
 *  切割请求
 */
const router = require('koa-router')()

// 引入controller
const home = require('./../controller/home')
const articles = require('./../controller/article')
const users = require('./../controller/users')

// 鉴权中间件
const accessPermission = require('./../tools/accessPermission')

/**
 * reast api
 *  */
// public api
// 首页信息
router.get('/index', home.index)
// 根据文章唯一标识符获取文章
router.get('/articles/:id', articles.find)
// 用户登录
router.post('/users/signin', users.signin)
// 用户注册
router.post('/users', users.signup)

// need login
router.all('*', accessPermission.isSignin)
// 新建文章
router.post('/articles/:id', articles.create_article)
// 修改文章
router.put('/articles/:id', articles.update_article)
// 删除文章
router.delete('/articles/:id', articles.delete_article)
// 用户登出
router.post('/users/signout', users.signout)
// 根据token获取当前用户公开信息（用户名、头像等）
router.get('/users/public', users.public)
// 修改密码
router.put('/users', users.change_password)

module.exports = router.routes()