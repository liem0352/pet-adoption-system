# 宠物领养管理系统

基于 Node.js + Express + MySQL + JWT 的宠物领养管理后端 API 系统。提供完整的用户认证与宠物信息管理功能，包含前端 API 测试页面。

## 项目简介

本项目是一个宠物领养管理系统的后端服务，采用分层架构（路由层 → 模型层 → 数据库层），集成 JWT 身份认证、bcrypt 密码加密、统一日志与错误处理机制。前端附带一个基于 Apple HIG + Liquid Glass 风格设计的 API 测试页面，方便接口调试与功能演示。

## 技术栈

- **运行环境**：Node.js
- **Web 框架**：Express 5.2
- **数据库**：MySQL（通过 mysql2 连接池驱动）
- **身份认证**：jsonwebtoken (JWT)
- **密码加密**：bcryptjs
- **跨域处理**：cors
- **请求体解析**：body-parser
- **环境变量管理**：dotenv

## 功能特性

- 用户注册登录（bcrypt 密码加密、JWT token 认证，有效期 24 小时）
- 宠物信息管理（CRUD：增、删、查）
- 关键字搜索宠物（按名称或分类模糊匹配）
- 统一日志中间件（记录请求 URL、方式、时间、IP）
- 全局错误处理（统一 500 错误响应格式）
- 404 路由兜底处理
- 未捕获异常与未处理 Promise 拒绝兜底
- 前端 API 测试页面（支持 Token 管理、密码可见性切换、Toast 通知）

## API 接口说明

### 用户管理

| 方法 | 路径 | 说明 | 是否需要认证 |
| --- | --- | --- | --- |
| POST | /user/register | 用户注册 | 否 |
| POST | /user/login | 用户登录，返回 JWT token | 否 |
| GET | /user/info | 获取当前登录用户信息 | 是 |

### 宠物管理

| 方法 | 路径 | 说明 | 是否需要认证 |
| --- | --- | --- | --- |
| POST | /pet/add | 添加宠物信息 | 是 |
| GET | /pet/list | 获取宠物列表（按创建时间倒序） | 否 |
| GET | /pet/search?keyword=xxx | 按关键字搜索宠物 | 否 |
| DELETE | /pet/delete?id=xxx | 删除指定 ID 的宠物 | 是 |

### 统一响应格式

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

### 认证方式

在请求头携带 JWT token：

```
Authorization: Bearer <your_token>
```

## 项目结构

```
pet-adoption-system/
├── config/
│   └── db.config.js          # 数据库连接配置（从环境变量读取）
├── db/
│   ├── index.js              # MySQL 连接池封装
│   └── init.sql              # 数据库初始化 SQL 脚本
├── middleware/
│   ├── auth.js               # JWT 身份认证中间件
│   ├── errorHandler.js       # 全局错误处理中间件
│   └── logger.js             # 请求日志中间件
├── models/
│   ├── petModel.js           # 宠物数据模型
│   └── userModel.js          # 用户数据模型
├── public/
│   └── index.html            # 前端 API 测试页面
├── router/
│   ├── petRouter.js          # 宠物路由
│   └── userRouter.js         # 用户路由
├── app.js                    # 应用入口
├── package.json              # 项目依赖与脚本
├── .env.example              # 环境变量示例
└── .gitignore                # Git 忽略配置
```

## 安装运行步骤

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd pet-adoption-system
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制示例文件并修改为你的本地配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 MySQL 数据库信息与 JWT 密钥：

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pet_adoption
DB_PORT=3306
JWT_SECRET=change_me_in_production
```

### 4. 初始化数据库

先在 MySQL 中创建数据库：

```sql
CREATE DATABASE IF NOT EXISTS pet_adoption DEFAULT CHARACTER SET utf8mb4;
```

然后执行初始化脚本创建数据表：

```bash
mysql -u root -p < db/init.sql
```

### 5. 启动服务

```bash
npm start
```

或使用开发模式（需要全局安装 nodemon）：

```bash
npm run dev
```

启动成功后控制台会输出可用接口列表。

## 默认端口

- **3000**

启动后访问根路径 `http://localhost:3000/` 即可打开 API 测试页面。

## 作者

**liem**

## License

MIT
