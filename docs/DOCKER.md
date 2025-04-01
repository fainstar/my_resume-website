# Docker 部署指南

## 環境要求
- Docker Engine
- Docker Compose
- Docker Hub 帳號（用於鏡像發布）
- GitHub 帳號（用於代碼託管和自動化部署）

## 開發環境

### 啟動開發環境
```bash
docker-compose up dev
```

開發服務器將在 http://localhost:5173 啟動，支持熱重載。

### 停止開發環境
```bash
docker-compose down
```

## 生產環境

### 構建和啟動生產環境
```bash
docker-compose up prod -d
```

應用將在 http://localhost:80 運行。

### 停止生產環境
```bash
docker-compose down
```

## 常見問題

### 端口衝突
如果遇到端口衝突，可以在 docker-compose.yml 中修改端口映射：
```yaml
ports:
  - "3000:80"  # 將80端口映射到主機的3000端口
```

### 容器內存問題
如果遇到構建過程中的內存不足問題，可以在 Docker 設置中增加容器可用內存。

### 緩存清理
清理構建緩存：
```bash
docker builder prune
```

## 部署流程

### 本地部署
1. 確保 Docker 和 Docker Compose 已安裝
2. 克隆代碼庫
3. 在項目根目錄執行：
   ```bash
   docker-compose up prod -d
   ```
4. 訪問 http://localhost:80 確認部署成功

### Docker Hub 發布
1. 登錄到 Docker Hub：
   ```bash
   docker login
   ```
2. 構建鏡像：
   ```bash
   docker build -t <your-dockerhub-username>/my-resume-website .
   ```
3. 推送鏡像：
   ```bash
   docker push <your-dockerhub-username>/my-resume-website
   ```

### GitHub Actions 自動化部署
1. 在 GitHub 倉庫設置中添加以下 Secrets：
   - DOCKERHUB_USERNAME：Docker Hub 用戶名
   - DOCKERHUB_TOKEN：Docker Hub 訪問令牌
2. 推送代碼到 main 分支會自動觸發構建和發布流程
3. 在 Docker Hub 查看發布的鏡像

### 從 Docker Hub 拉取和運行
```bash
docker pull <your-dockerhub-username>/my-resume-website
docker run -d -p 80:80 <your-dockerhub-username>/my-resume-website
```