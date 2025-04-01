# 常用指令文檔

## Git 常用指令

### 初始化與配置
```bash
# 初始化新的Git倉庫
git init

# 配置用戶信息
git config --global user.name "你的名字"
git config --global user.email "你的郵箱"

# 添加遠程倉庫
git remote add origin <倉庫URL>
```

### 基本操作
```bash
# 查看倉庫狀態
git status

# 添加文件到暫存區
git add <文件名>    # 添加指定文件
git add .          # 添加所有文件

# 提交更改
git commit -m "提交說明"

# 推送到遠程倉庫
git push origin <分支名>

# 從遠程倉庫拉取
git pull origin <分支名>
```

### 分支操作
```bash
# 查看所有分支
git branch

# 創建新分支
git branch <分支名>

# 切換分支
git checkout <分支名>

# 創建並切換到新分支
git checkout -b <分支名>

# 合併分支
git merge <分支名>
```

### 版本回退
```bash
# 查看提交歷史
git log

# 回退到指定版本
git reset --hard <commit ID>

# 撤銷工作區的修改
git checkout -- <文件名>
```

### 查看狀態與更新推送
```bash
# 查看當前工作區狀態（顯示修改、新增、刪除的文件）
git status

# 查看具體文件變更內容
git diff

# 將所有更改添加到暫存區
git add .

# 提交更改並添加描述信息
git commit -m "更新說明"

# 推送更改到遠程倉庫（例如推送到main分支）
git push origin main

# 如果遠程有更新，先拉取再推送
git pull origin main
git push origin main
```

## Docker 常用指令

### 基本操作
```bash
# 構建鏡像
docker build -t <鏡像名>:<標籤> .

# 運行容器
docker run -d -p <主機端口>:<容器端口> <鏡像名>

# 查看運行中的容器
docker ps

# 停止容器
docker stop <容器ID>

# 刪除容器
docker rm <容器ID>

# 刪除鏡像
docker rmi <鏡像ID>
```

### Docker Compose
```bash
# 啟動服務
docker-compose up -d

# 停止服務
docker-compose down

# 查看服務日誌
docker-compose logs

# 重新構建服務
docker-compose build
```

### 容器管理
```bash
# 進入容器
docker exec -it <容器ID> /bin/bash

# 查看容器日誌
docker logs <容器ID>

# 查看容器詳細信息
docker inspect <容器ID>
```

### 鏡像管理
```bash
# 拉取鏡像
docker pull <鏡像名>:<標籤>

# 推送鏡像到倉庫
docker push <鏡像名>:<標籤>

# 查看本地鏡像
docker images
```

### 鏡像更新與發布
```bash
# 登錄到Docker Hub
docker login

# 重新構建鏡像（包含最新代碼）
docker build -t oomaybeoo/my-resume-website .

# 為鏡像添加新標籤
docker tag oomaybeoo/my-resume-website oomaybeoo/my-resume-website:latest

# 推送更新後的鏡像到Docker Hub
docker push oomaybeoo/my-resume-website:latest

# 清理構建緩存（可選）
docker builder prune
```

## Git 和 Docker 同步更新流程

### 代碼更新與鏡像同步
```bash
# 1. 確保本地代碼是最新的
git pull origin main

# 2. 提交本地更改
git add .
git commit -m "更新說明"

# 3. 推送到Git倉庫
git push origin main

# 4. 重新構建Docker鏡像
docker build -t oomaybeoo/my-resume-website .

# 5. 更新鏡像標籤
docker tag oomaybeoo/my-resume-website oomaybeoo/my-resume-website:latest

# 6. 推送到Docker Hub
docker push oomaybeoo/my-resume-website:latest
```

### 最佳實踐建議
```bash
# 在開發新功能時
1. 創建新的Git分支
git checkout -b feature/new-feature

# 開發完成後
2. 合併到主分支
git checkout main
git merge feature/new-feature

# 構建和推送Docker鏡像
3. 構建新版本鏡像
docker build -t oomaybeoo/my-resume-website:feature-1.0 .

4. 推送特定版本
docker push oomaybeoo/my-resume-website:feature-1.0

5. 更新latest標籤
docker tag oomaybeoo/my-resume-website:feature-1.0 oomaybeoo/my-resume-website:latest
docker push oomaybeoo/my-resume-website:latest
```


20250401