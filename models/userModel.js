/**
 * 用户模型模块
 * 封装用户相关的数据库操作方法
 */

const { query } = require('../db');

/**
 * 根据用户名查询用户
 * @param {string} username - 用户名
 * @returns {Promise<Array>} 用户记录数组
 */
function findUserByUsername(username) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  return query(sql, [username]);
}

/**
 * 根据用户ID查询用户
 * @param {number} id - 用户ID
 * @returns {Promise<Array>} 用户记录数组
 */
function findUserById(id) {
  const sql = 'SELECT id, username, create_time FROM users WHERE id = ?';
  return query(sql, [id]);
}

/**
 * 创建新用户
 * @param {Object} user - 用户对象 {username, password}
 * @returns {Promise<Object>} 数据库操作结果
 */
function createUser(user) {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  return query(sql, [user.username, user.password]);
}

module.exports = {
  findUserByUsername,
  findUserById,
  createUser
};
