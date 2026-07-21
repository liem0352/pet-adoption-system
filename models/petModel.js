/**
 * 宠物模型模块
 * 封装宠物相关的数据库操作方法
 */

const { query } = require('../db');

/**
 * 添加宠物信息
 * @param {Object} pet - 宠物对象 {category, name, gender, age}
 * @returns {Promise<Object>} 数据库操作结果
 */
function addPet(pet) {
  const sql = 'INSERT INTO pets (category, name, gender, age) VALUES (?, ?, ?, ?)';
  return query(sql, [pet.category, pet.name, pet.gender, pet.age]);
}

/**
 * 查询所有宠物信息
 * @returns {Promise<Array>} 宠物记录数组
 */
function getAllPets() {
  const sql = 'SELECT * FROM pets ORDER BY create_time DESC';
  return query(sql);
}

/**
 * 根据关键字搜索宠物（模糊匹配名称或分类）
 * @param {string} keyword - 搜索关键字
 * @returns {Promise<Array>} 宠物记录数组
 */
function searchPets(keyword) {
  const sql = 'SELECT * FROM pets WHERE name LIKE ? OR category LIKE ? ORDER BY create_time DESC';
  const likeKeyword = `%${keyword}%`;
  return query(sql, [likeKeyword, likeKeyword]);
}

/**
 * 根据ID删除宠物
 * @param {number} id - 宠物ID
 * @returns {Promise<Object>} 数据库操作结果
 */
function deletePetById(id) {
  const sql = 'DELETE FROM pets WHERE id = ?';
  return query(sql, [id]);
}

module.exports = {
  addPet,
  getAllPets,
  searchPets,
  deletePetById
};
