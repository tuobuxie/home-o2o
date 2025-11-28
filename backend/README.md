# 后端服务 - 家政无忧 App

## 功能说明

该后端服务提供了支付宝网页支付功能，用于对接前端的下单支付流程。

## 技术栈

- Node.js
- Express
- TypeScript
- 支付宝 SDK

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env` 文件并填写相关配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填写以下支付宝配置信息：

```
# 服务器配置
PORT=3001

# 支付宝配置
ALIPAY_APP_ID=your_alipay_app_id
ALIPAY_PRIVATE_KEY=your_alipay_private_key
ALIPAY_PUBLIC_KEY=alipay_public_key
ALIPAY_GATEWAY=https://openapi.alipaydev.com/gateway.do
ALIPAY_RETURN_URL=http://localhost:5173/PaymentResult
ALIPAY_NOTIFY_URL=http://your_server_ip:3001/api/payment/alipay/notify
```

**注意**：
- `ALIPAY_APP_ID`：您的支付宝应用ID
- `ALIPAY_PRIVATE_KEY`：您的应用私钥（PKCS1格式）
- `ALIPAY_PUBLIC_KEY`：支付宝公钥
- `ALIPAY_GATEWAY`：支付宝网关地址（沙箱环境：https://openapi.alipaydev.com/gateway.do）
- `ALIPAY_RETURN_URL`：支付成功后跳转的前端页面
- `ALIPAY_NOTIFY_URL`：支付宝异步通知地址

### 3. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3001` 上运行。

### 4. 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 5. 启动生产服务器

#### 方式1：直接启动
```bash
npm start
```

#### 方式2：使用PM2进程管理（推荐生产环境）

**简化部署步骤**：

1. **安装PM2**（如果未安装）：
   ```bash
   npm install -g pm2
   ```

2. **构建并启动服务**：
   ```bash
   npm run build && pm2 start dist/index.js --name home-o2o-backend
   ```

3. **设置开机自启**：
   ```bash
   pm2 startup
   pm2 save
   ```

4. **常用PM2命令**：
   ```bash
   # 查看服务状态
   pm2 status
   
   # 查看日志
   pm2 logs home-o2o-backend
   
   # 重启服务
   pm2 restart home-o2o-backend
   
   # 停止服务
   pm2 stop home-o2o-backend
   ```

#### 方式3：使用一键部署脚本

1. **创建部署脚本**：
   ```bash
   chmod +x deploy.sh
   ```

2. **执行部署脚本**：
   ```bash
   ./deploy.sh
   ```

## API 接口

### 1. 健康检查

```
GET /api/health
```

响应：
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

**curl 测试命令**：
```bash
curl -X GET http://localhost:3001/api/health
```

### 2. 创建支付宝支付

```
POST /api/payment/alipay/create
```

请求体：
```json
{
  "orderId": "string",
  "totalAmount": number,
  "subject": "string",
  "body": "string"
}
```


响应：
```json
{
  "success": boolean,
  "paymentUrl": "string",
  "error": "string" // 仅在失败时返回
}
```

**curl 测试命令**：
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"orderId":"test123","totalAmount":100,"subject":"测试订单","body":"测试订单描述"}' \
  http://localhost:3001/api/payment/alipay/create
```

### 3. 支付宝回调通知

```
POST /api/payment/alipay/notify
```

**curl 测试命令**：
```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'key1=value1&key2=value2' \
  http://localhost:3001/api/payment/alipay/notify
```

### 4. 支付宝返回结果

```
GET /api/payment/alipay/return
```

**curl 测试命令**：
```bash
curl -X GET "http://localhost:3001/api/payment/alipay/return?param1=value1&param2=value2"
```

### 5. 创建支付宝手机网站支付

```
POST /api/payment/alipay/wap/create
```

请求体：
```json
{
  "orderId": "string",
  "totalAmount": number,
  "subject": "string",
  "body": "string"
}
```

响应：
```json
{
  "success": boolean,
  "paymentUrl": "string",
  "error": "string" // 仅在失败时返回
}
```

**curl 测试命令**：
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"orderId":"test123","totalAmount":100,"subject":"测试订单","body":"测试订单描述"}' \
  http://localhost:3001/api/payment/alipay/wap/create
```

### 6. 支付宝手机网站支付回调通知

```
POST /api/payment/alipay/notify
```

说明：此接口同时处理网页支付和手机网站支付的回调通知，通过解析回调参数中的`product_code`字段区分支付类型。

**curl 测试命令**：
```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'key1=value1&key2=value2' \
  http://localhost:3001/api/payment/alipay/notify
```

## 项目结构

```
backend/
├── src/
│   ├── config/          # 配置文件
│   │   └── alipay.ts    # 支付宝配置
│   ├── controllers/     # 控制器
│   │   └── paymentController.ts  # 支付控制器
│   ├── routes/          # 路由
│   │   └── paymentRoutes.ts  # 支付路由
│   ├── services/        # 服务层
│   │   └── paymentService.ts  # 支付服务
│   └── index.ts         # 入口文件
├── .env                 # 环境变量
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
└── README.md            # 项目文档
```

## 注意事项

1. 确保您已在支付宝开放平台注册并创建了应用
2. 确保您的应用已开通了网页支付功能
3. 确保您使用的是正确的私钥和公钥
4. 在生产环境中，建议使用HTTPS协议
5. 请妥善保管您的私钥，不要泄露给他人

## 开发说明

- 使用 `nodemon` 进行开发热重载
- 使用 `TypeScript` 进行类型检查
- 使用 `ESLint` 进行代码规范检查

## 测试

目前暂未提供测试用例，建议使用Postman或curl进行API测试。
