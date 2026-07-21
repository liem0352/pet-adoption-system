/**
 * 用户路由模块
 * 提供用户注册、登录、获取用户信息接口
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { authMiddleware, SECRET_KEY } = require('../middleware/auth');

/**
 * 用户注册接口
 * 请求地址：POST /user/register
 * 参数：username, password
 */
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // 参数校验
    if (!username || !password) {
      return res.json({
        code: 400,
        message: '用户名和密码不能为空',
        data: null
      });
    }
    // 检查用户名是否已存在
    const existUsers = await userModel.findUserByUsername(username);
    if (existUsers.length > 0) {
      return res.json({
        code: 400,
        message: '用户名已存在',
        data: null
      });
    }
    // 密码加密
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // 创建用户
    const result = await userModel.createUser({ username, password: hashedPassword });
    res.json({
      code: 200,
      message: '注册成功',
      data: { id: result.insertId, username }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 用户登录接口
 * 请求地址：POST /user/login
 * 参数：username, password
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // 参数校验
    if (!username || !password) {
      return res.json({
        code: 400,
        message: '用户名和密码不能为空',
        data: null
      });
    }
    // 查询用户
    const users = await userModel.findUserByUsername(username);
    if (users.length === 0) {
      return res.json({
        code: 400,
        message: '用户名或密码错误',
        data: null
      });
    }
    const user = users[0];
    // 验证密码
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.json({
        code: 400,
        message: '用户名或密码错误',
        data: null
      });
    }
    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        id: user.id,
        username: user.username,
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 获取用户信息接口
 * 请求地址：GET /user/info
 * 需要JWT认证
 */
router.get('/info', authMiddleware, async (req, res, next) => {
  try {
    // 从认证中间件获取用户ID
    const userId = req.user.id;
    const users = await userModel.findUserById(userId);
    if (users.length === 0) {
      return res.json({
        code: 400,
        message: '用户不存在',
        data: null
      });
    }
    res.json({
      code: 200,
      message: '查询成功',
      data: users[0]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
