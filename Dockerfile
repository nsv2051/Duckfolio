FROM node:22-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 拷贝依赖文件并安装依赖
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# 拷贝源码并构建
COPY . .
RUN pnpm build

# --- 运行阶段 ---
FROM node:22-alpine AS runner

WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production

# 安装 pnpm
RUN npm install -g pnpm

# 复制构建产物和必要文件
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

# 启动生产服务器
CMD ["pnpm", "start"]
