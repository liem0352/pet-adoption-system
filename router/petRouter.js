/**
 * 宠物路由模块
 * 提供宠物添加、列表、搜索、删除接口
 */

const express = require('express');
const router = express.Router();
const petModel = require('../models/petModel');
const { authMiddleware } = require('../middleware/auth');

/**
 * 添加宠物信息接口
 * 请求地址：POST /pet/add
 * 参数：category, name, gender, age
 * 需要JWT认证
 */
router.post('/add', authMiddleware, async (req, res, next) => {
  try {
    const { category, name, gender, age } = req.body;
    // 参数校验
    if (!category || !name || !gender || age === undefined) {
      return res.json({
        code: 400,
        message: '宠物分类、名称、性别、年龄不能为空',
        data: null
      });
    }
    // 添加宠物
    const result = await petModel.addPet({ category, name, gender, age });
    res.json({
      code: 200,
      message: '添加成功',
      data: { id: result.insertId, category, name, gender, age }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 获取宠物列表接口
 * 请求地址：GET /pet/list
 */
router.get('/list', async (req, res, next) => {
  try {
    const pets = await petModel.getAllPets();
    res.json({
      code: 200,
      message: '查询成功',
      data: pets
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 关键字搜索宠物接口
 * 请求地址：GET /pet/search?keyword=xxx
 */
router.get('/search', async (req, res, next) => {
  try {
    const { keyword } = req.query;
    // 参数校验
    if (!keyword) {
      return res.json({
        code: 400,
        message: '搜索关键字不能为空',
        data: null
      });
    }
    const pets = await petModel.searchPets(keyword);
    res.json({
      code: 200,
      message: '搜索成功',
      data: pets
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 删除宠物信息接口
 * 请求地址：DELETE /pet/delete?id=xxx
 * 需要JWT认证
 */
router.delete('/delete', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    // 参数校验
    if (!id) {
      return res.json({
        code: 400,
        message: '宠物ID不能为空',
        data: null
      });
    }
    const result = await petModel.deletePetById(id);
    if (result.affectedRows === 0) {
      return res.json({
        code: 400,
        message: '宠物不存在或已被删除',
        data: null
      });
    }
    res.json({
      code: 200,
      message: '删除成功',
      data: null
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
