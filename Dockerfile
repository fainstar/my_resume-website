# 使用Node.js官方鏡像作為基礎鏡像
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製package.json和package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 安裝serve包來提供靜態文件服務
RUN npm install -g serve

# 暴露服務端口
EXPOSE 3000

# 使用serve啟動應用
CMD ["serve", "-s", "dist", "-l", "3000"]