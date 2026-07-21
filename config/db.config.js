/**
 * 数据库配置文件
 * 集中管理MySQL数据库连接参数
 */

// 加载环境变量配置（支持通过.env文件覆盖默认配置）
require('dotenv').config();

// 数据库连接配置参数
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',          // 数据库主机地址
  user: process.env.DB_USER || 'root',               // 数据库用户名
  password: process.env.DB_PASSWORD || 'your_password',  // 数据库密码
  database: process.env.DB_NAME || 'pet_adoption',   // 数据库名称
  port: process.env.DB_PORT || 3306,                 // 数据库端口
  waitForConnections: true,   // 等待可用连接
  connectionLimit: 10,        // 连接池最大连接数
  queueLimit: 0               // 排队等待上限（0为不限制）
};

module.exports = dbConfig;
