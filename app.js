/**
 * 宠物领养管理系统 - 应用入口文件
 * 整合所有中间件、路由、静态资源、错误处理
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 导入自定义中间件
const loggerMiddleware = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// 导入路由模块
const userRouter = require('./router/userRouter');
const petRouter = require('./router/petRouter');

// 创建Express应用实例
const app = express();

// 服务器端口
const PORT = 3000;

// ========== 中间件配置 ==========

// 配置CORS跨域中间件（解决前后端分离跨域问题）
app.use(cors());

// 配置body-parser中间件（解析JSON格式请求体）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 配置自定义日志中间件（记录请求URL、方式、时间）
app.use(loggerMiddleware);

// 静态资源托管（public目录）
app.use(express.static(path.join(__dirname, 'public')));

// ========== 路由配置 ==========

// 根路由 - 返回index.html测试页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 用户管理路由
app.use('/user', userRouter);

// 宠物管理路由
app.use('/pet', petRouter);

// 404处理（未匹配到任何路由）
app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: '请求的资源不存在：' + req.method + ' ' + req.url,
    data: null
  });
});

// 统一错误处理中间件（必须放在所有路由之后）
app.use(errorHandler);

// ========== 启动服务器 ==========

app.listen(PORT, () => {
  console.log('========================================');
  console.log('  宠物领养管理系统后端API');
  console.log('========================================');
  console.log(`  服务器已启动，运行端口：${PORT}`);
  console.log(`  访问地址：http://localhost:${PORT}`);
  console.log(`  启动时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
  console.log('========================================');
  console.log('  可用接口列表：');
  console.log('  [POST]   /user/register  用户注册');
  console.log('  [POST]   /user/login     用户登录');
  console.log('  [GET]    /user/info      获取用户信息（需认证）');
  console.log('  [POST]   /pet/add        添加宠物（需认证）');
  console.log('  [GET]    /pet/list       获取宠物列表');
  console.log('  [GET]    /pet/search     搜索宠物');
  console.log('  [DELETE] /pet/delete     删除宠物（需认证）');
  console.log('========================================');
});

// 捕获未处理的异常，防止进程崩溃
process.on('uncaughtException', (err) => {
  console.error('[未捕获异常]', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[未处理的Promise拒绝]', reason);
});

module.exports = app;
