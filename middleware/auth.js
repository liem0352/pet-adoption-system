/**
 * JWT身份认证中间件
 * 验证请求头中携带的token有效性
 */

const jwt = require('jsonwebtoken');

// JWT密钥（从环境变量读取，生产环境必须修改）
const SECRET_KEY = process.env.JWT_SECRET || 'change_me_in_production';

/**
 * JWT认证中间件函数
 * 从请求头Authorization字段获取token并验证
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - 下一个中间件函数
 */
function authMiddleware(req, res, next) {
  // 从请求头获取Authorization字段
  const authHeader = req.headers.authorization;
  // 判断token是否存在
  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: '未提供认证token，请先登录',
      data: null
    });
  }
  // 提取token（格式：Bearer <token>）
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  try {
    // 验证token并解码
    const decoded = jwt.verify(token, SECRET_KEY);
    // 将解码后的用户信息挂载到req对象
    req.user = decoded;
    // 继续执行下一个中间件
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'token无效或已过期，请重新登录',
      data: null
    });
  }
}

module.exports = {
  authMiddleware,
  SECRET_KEY
};
