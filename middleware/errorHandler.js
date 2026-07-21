/**
 * 统一错误处理中间件
 * 捕获应用异常并返回规范的错误信息格式
 */

/**
 * 错误处理中间件函数（必须放在所有路由之后注册）
 * @param {Error} err - 错误对象
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - 下一个中间件函数
 */
function errorHandler(err, req, res, next) {
  // 记录错误日志到控制台
  console.error(`[错误] ${new Date().toLocaleString('zh-CN')} | ${err.message}`);
  console.error(err.stack);
  // 返回统一的错误信息格式
  res.status(500).json({
    code: 500,
    message: '服务器内部错误：' + err.message,
    data: null
  });
}

module.exports = errorHandler;
