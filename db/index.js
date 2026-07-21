/**
 * 数据库连接池模块
 * 使用mysql2创建连接池，并封装Promise异步查询方法
 */

const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// 创建MySQL数据库连接池
const pool = mysql.createPool(dbConfig);

/**
 * 执行SQL查询的Promise封装方法
 * @param {string} sql - 要执行的SQL语句
 * @param {Array} params - SQL参数数组
 * @returns {Promise} 返回Promise对象，resolve查询结果，reject错误信息
 */
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    // 从连接池获取连接执行查询
    pool.query(sql, params, (error, results) => {
      if (error) {
        // 查询出错，reject错误对象
        reject(error);
      } else {
        // 查询成功，resolve结果
        resolve(results);
      }
    });
  });
}

module.exports = {
  pool,
  query
};
