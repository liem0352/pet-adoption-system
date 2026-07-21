/**
 * 自定义日志中间件
 * 记录每个请求的URL、请求方式和请求时间
 */

/**
 * 日志记录中间件函数
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - 下一个中间件函数
 */
function loggerMiddleware(req, res, next) {
  // 获取当前时间
  const requestTime = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  // 记录请求URL、请求方式、请求时间到控制台
  console.log(`[日志] ${requestTime} | ${req.method} 请求 | URL: ${req.url} | IP: ${req.ip}`);
  // 继续执行下一个中间件
  next();
}

module.exports = loggerMiddleware;
