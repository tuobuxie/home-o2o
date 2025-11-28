#!/bin/bash

# 一键部署脚本 - 家政无忧前端服务

echo "========================================"
echo "开始部署家政无忧前端服务..."
echo "========================================"

# 1. 检查Node.js环境
echo "\n1. 检查Node.js环境..."
if ! command -v node &> /dev/null
then
    echo "❌ 错误：未安装Node.js，请先安装Node.js 18+"
    exit 1
fi

echo "✅ Node.js版本：$(node -v)"
echo "✅ npm版本：$(npm -v)"

# 2. 安装依赖
echo "\n2. 安装项目依赖..."
npm install --registry=https://registry.npmmirror.com
if [ $? -ne 0 ]; then
    echo "❌ 错误：依赖安装失败"
    exit 1
fi
echo "✅ 依赖安装成功"

# 3. 构建项目
echo "\n3. 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 错误：项目构建失败"
    exit 1
fi
echo "✅ 项目构建成功"

# 4. 检查PM2环境
echo "\n4. 检查PM2环境..."
if ! command -v pm2 &> /dev/null
then
    echo "⚠️ PM2未安装，正在安装..."
    npm install -g pm2 --registry=https://registry.npmmirror.com
    if [ $? -ne 0 ]; then
        echo "❌ 错误：PM2安装失败"
        exit 1
    fi
fi
echo "✅ PM2版本：$(pm2 -v)"

# 5. 检查http-server是否安装
echo "\n5. 检查http-server是否安装..."
if ! command -v http-server &> /dev/null
then
    echo "⚠️ http-server未安装，正在安装..."
    npm install -g http-server --registry=https://registry.npmmirror.com
    if [ $? -ne 0 ]; then
        echo "❌ 错误：http-server安装失败"
        exit 1
    fi
fi
echo "✅ http-server已安装"

# 6. 启动/重启服务
echo "\n6. 启动/重启服务..."

# 检查服务是否已存在
if pm2 list | grep -q "home-o2o-frontend"; then
    echo "⚠️ 服务已存在，正在重启..."
    pm2 restart home-o2o-frontend
else
    echo "⚠️ 服务不存在，正在启动..."
    pm2 start "http-server -p 3000 -d false dist" --name home-o2o-frontend
fi

if [ $? -ne 0 ]; then
    echo "❌ 错误：服务启动失败"
    exit 1
fi
echo "✅ 服务启动成功"

# 7. 设置开机自启
echo "\n7. 设置开机自启..."
pm2 startup
echo "✅ 开机自启配置成功"

# 8. 保存当前进程列表
echo "\n8. 保存当前进程列表..."
pm2 save
echo "✅ 进程列表保存成功"

# 9. 显示服务状态
echo "\n9. 服务状态："
pm2 status home-o2o-frontend

# 10. 显示访问地址
echo "\n10. 访问地址："
echo "   - 前端应用：http://localhost:3000"

# 11. 显示日志
echo "\n11. 查看实时日志："
echo "    pm2 logs home-o2o-frontend"

# 12. 完成提示
echo "\n========================================"
echo "🎉 部署完成！家政无忧前端服务已成功启动"
echo "========================================"
echo "\n常用命令："
echo "  - 查看状态：pm2 status"
echo "  - 查看日志：pm2 logs home-o2o-frontend"
echo "  - 重启服务：pm2 restart home-o2o-frontend"
echo "  - 停止服务：pm2 stop home-o2o-frontend"
echo "\n"