# 使用Node.js官方鏡像作為基礎鏡像
FROM node:21-alpine AS builder

# 使用多阶段构建优化镜像大小

# 設置工作目錄
WORKDIR /app

# 複製package.json和package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm config set registry https://registry.npmjs.org/
RUN --mount=type=cache,target=/root/.npm \
    npm install --prefer-offline --legacy-peer-deps

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 安裝serve包來提供靜態文件服務
RUN npm install -g http-server

# 暴露服務端口
EXPOSE 3000

# 使用serve啟動應用
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -f http://localhost:3000 || exit 1
CMD ["http-server", "dist", "-p", "3000", "--log-level", "info"]