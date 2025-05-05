# 构建并服务阶段 - 单阶段构建
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml (如果存在)
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 安装 serve 用于提供静态文件服务
RUN npm install -g serve

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["serve", "-s", "build", "-l", "3000"]