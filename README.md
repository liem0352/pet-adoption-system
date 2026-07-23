<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="pet-adoption-system 宠物领养管理系统,Node.js + Express + MySQL + JWT 分层架构后端">
</p>

# 宠物领养管理系统

基于 Node.js + Express + MySQL + JWT 的宠物领养管理后端 API 系统。采用分层架构（路由层 → 模型层 → 数据库层），集成 JWT 身份认证、bcrypt 密码加密、统一日志与错误处理。前端附带一个基于 Apple HIG + Liquid Glass 风格设计的 API 测试页面，方便接口调试与功能演示。

## 核心特性

- 用户注册登录（bcrypt 加密、JWT token，有效期 24 小时）
- 宠物信息管理（增、删、查）
- 关键字搜索（按名称或分类模糊匹配）
- 统一日志中间件（URL、方式、时间、IP）
- 全局错误处理 + 404 路由兜底
- 未捕获异常与未处理 Promise 拒绝兜底
- 前端 API 测试页面（Token 管理、密码可见性切换、Toast 通知）

## 技术栈

- **Web 框架**：Express 5.2
- **数据库**：MySQL（mysql2 连接池）
- **认证**：jsonwebtoken (JWT)
- **加密**：bcryptjs
- **跨域**：cors
- **解析**：body-parser
- **配置**：dotenv

## API 接口

### 用户管理

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|:----:|
| POST | /user/register | 用户注册 | 否 |
| POST | /user/login | 登录，返回 JWT token | 否 |
| GET | /user/info | 当前登录用户信息 | 是 |

### 宠物管理

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|:----:|
| POST | /pet/add | 添加宠物 | 是 |
| GET | /pet/list | 宠物列表（按时间倒序） | 否 |
| GET | /pet/search?keyword=xxx | 关键字搜索 | 否 |
| DELETE | /pet/delete?id=xxx | 删除宠物 | 是 |

### 统一响应格式

```json
{ "code": 200, "message": "操作成功", "data": {} }
```

认证方式：请求头携带 `Authorization: Bearer <your_token>`

## 项目结构

```
pet-adoption-system/
├── config/db.config.js          # 数据库配置（环境变量）
├── db/{index.js, init.sql}      # 连接池封装 + 初始化脚本
├── middleware/
│   ├── auth.js                  # JWT 认证中间件
│   ├── errorHandler.js          # 全局错误处理
│   └── logger.js                # 请求日志
├── models/{petModel.js, userModel.js}
├── public/index.html            # 前端 API 测试页面
├── router/{petRouter.js, userRouter.js}
├── app.js                       # 应用入口
├── package.json
├── .env.example
└── .gitignore
```

## 安装运行

1. 克隆并安装
   ```bash
   git clone <your-repo-url>
   cd pet-adoption-system
   npm install
   ```
2. 配置环境变量
   ```bash
   cp .env.example .env
   ```
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=pet_adoption
   DB_PORT=3306
   JWT_SECRET=change_me_in_production
   ```
3. 初始化数据库
   ```sql
   CREATE DATABASE IF NOT EXISTS pet_adoption DEFAULT CHARACTER SET utf8mb4;
   ```
   ```bash
   mysql -u root -p < db/init.sql
   ```
4. 启动
   ```bash
   npm start          # 生产
   npm run dev        # 开发（需 nodemon）
   ```

启动后访问 `http://localhost:3000/` 打开 API 测试页面。**默认端口 3000**。

## 作者

**liem**

## License

MIT

---

<p align="center"><sub>作者 liem · 宠物领养管理系统</sub></p>
