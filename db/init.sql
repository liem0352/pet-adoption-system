-- 宠物领养管理系统数据库初始化脚本
-- 创建用户表
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名',
  `password` VARCHAR(255) NOT NULL COMMENT '密码（加密存储）',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 创建宠物信息表
CREATE TABLE IF NOT EXISTS `pets` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '宠物ID',
  `category` VARCHAR(50) NOT NULL COMMENT '宠物分类',
  `name` VARCHAR(50) NOT NULL COMMENT '宠物名称',
  `gender` VARCHAR(10) NOT NULL COMMENT '宠物性别',
  `age` INT NOT NULL COMMENT '宠物年龄',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物信息表';
