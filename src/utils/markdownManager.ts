import { marked } from 'marked';
import dayjs from 'dayjs';

export interface MarkdownPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  template?: 'standard' | 'photo' | 'tech';
  content: string;
  html?: string;
  images?: string[];
  coverImage?: string;
}

class MarkdownManager {
  private readonly imageDir = '/images';
  private readonly postStorageKey = 'blogPosts';

  private async getImageStorage(): Promise<Record<string, string>> {
    return new Promise((resolve) => {
      const images: Record<string, string> = {};
      this.idbTransaction('blogImages', 'readonly', (store) => {
        store.openCursor().onsuccess = function(this: IDBRequest<IDBCursorWithValue | null>) {
          const cursor = this.result;
          if (cursor) {
            images[cursor.key as string] = cursor.value as string;
            cursor.continue();
          } else {
            resolve(images);
          }
        };
      });
    });
  }

  private getPostStorage(): MarkdownPost[] {
    try {
      return JSON.parse(localStorage.getItem(this.postStorageKey) || '[]');
    } catch (error) {
      console.error('Error getting post storage:', error);
      return [];
    }
  }

  private setPostStorage(posts: MarkdownPost[]): void {
    try {
      localStorage.setItem(this.postStorageKey, JSON.stringify(posts));
    } catch (error) {
      console.error('Error setting post storage:', error);
      throw new Error('Failed to store posts data');
    }
  }

  // IndexedDB事務處理方法
  private idbTransaction(storeName: string, mode: IDBTransactionMode, callback: (store: IDBObjectStore) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open('blogDatabase', 1);
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        };
        
        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction(storeName, mode);
          const store = transaction.objectStore(storeName);
          
          transaction.oncomplete = () => {
            resolve();
          };
          
          transaction.onerror = (event: Event) => {
            const target = event.target as IDBTransaction;
            reject(new Error(`Transaction error: ${target.error}`));
          };
          
          callback(store);
        };
        
        request.onerror = (event) => {
          const target = event.target as IDBOpenDBRequest;
          reject(new Error(`Database error: ${target.error}`));
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  public async uploadImage(file: File): Promise<string> {
    try {
      if (!file || !(file instanceof File)) {
        throw new Error('Invalid file input');
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit');
      }

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/bmp',
        'image/tiff'
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`不支持的文件类型: ${file.type}。支持的类型包括: ${allowedTypes.join(', ')}`);
      }

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

      // 將文件轉換為Base64字符串以便持久化存儲
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            if (!event.target || typeof event.target.result !== 'string') {
              throw new Error('Failed to read file');
            }
            
            const base64Data = event.target.result;
            
            // 使用IndexedDB存儲Base64數據
            await this.idbTransaction('blogImages', 'readwrite', async (store) => {
              await store.put(base64Data, fileName);
            });
            
            // 返回Base64數據作為圖片URL
            resolve(base64Data);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  public async getAllPosts(): Promise<MarkdownPost[]> {
    return this.getPostStorage();
  }

  public async getPostById(id: string): Promise<MarkdownPost | null> {
    try {
      const posts = this.getPostStorage();
      const post = posts.find((post: MarkdownPost) => post.id === id);
      if (!post) return null;

      const images = await this.getImageStorage();
      let processedPost = { ...post };

      try {
        if (!this.isValidImagePath(processedPost.coverImage || '')) {
          processedPost.coverImage = '/avatar-placeholder.jpg';
        }

        const processedContent = await this.processContentImages(processedPost.content, images);
        const htmlContent = marked(processedContent);
        
        return {
          ...processedPost,
          content: processedContent,
          html: typeof htmlContent === 'string' ? htmlContent : processedContent
        };

      } catch (imageError) {
        console.warn('Error processing images:', imageError);
        const htmlContent = marked(post.content);
        return {
          ...post,
          coverImage: '/avatar-placeholder.jpg',
          html: typeof htmlContent === 'string' ? htmlContent : post.content
        };
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  private async processContentImages(content: string, images: Record<string, string>): Promise<string> {
    return content.replace(
      /!\[([^\]]*)\]\((\/images\/[^\s\)\]\}]+)\)/g,
      (match, altText, imgPath) => {
        const imageName = imgPath.split('/').pop();
        if (!imageName) return match;

        const imageData = images[imageName];
        if (!this.isValidImagePath(imageData)) {
          return match;
        }

        return `![${altText}](${imageData})`;
      }
    );
  }

  private isValidImagePath(path: string): boolean {
    return path.startsWith('data:image/') || 
           path.startsWith('http') || 
           path.startsWith(this.imageDir) ||
           path.startsWith('/');
  }

  public async createPost(post: Omit<MarkdownPost, 'id' | 'html'>): Promise<string> {
    const id = this.generateId(post.title);
    
    try {
      // 验证并处理封面图片
      if (!this.isValidImagePath(post.coverImage || '')) {
        post.coverImage = '/avatar-placeholder.jpg';
      }
      
      // 验证文章内容中的图片
      const imageRegex = /!\[([^\]]*)\]\(([^\s\)\]\}]+)\)/g;
      let match;
      while ((match = imageRegex.exec(post.content)) !== null) {
        const imgPath = match[2];
        if (imgPath.startsWith(this.imageDir)) {
          const imageName = imgPath.split('/').pop();
          if (!imageName) continue;
          
          const images = await this.getImageStorage();
          if (!images[imageName]) {
            throw new Error(`Image not found: ${imageName}`);
          }
        }
      }
      
      const newPost = {
        ...post,
        id,
        date: post.date || dayjs().format('YYYY-MM-DD'),
        template: post.template || 'standard'
      };
      
      const posts = this.getPostStorage();
      posts.push(newPost);
      this.setPostStorage(posts);
      
      return id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  public async updatePost(id: string, post: Omit<MarkdownPost, 'id' | 'html'>): Promise<void> {
    try {
      const posts = this.getPostStorage();
      const index = posts.findIndex((p: MarkdownPost) => p.id === id);
      
      if (index === -1) {
        throw new Error('Post not found');
      }
      
      // 验证并处理封面图片
      if (!this.isValidImagePath(post.coverImage || '')) {
        post.coverImage = '/avatar-placeholder.jpg';
      }
      
      // 验证文章内容中的图片
      const imageRegex = /!\[([^\]]*)\]\(([^\s\)\]\}]+)\)/g;
      let match;
      while ((match = imageRegex.exec(post.content)) !== null) {
        const imgPath = match[2];
        if (imgPath.startsWith(this.imageDir)) {
          const imageName = imgPath.split('/').pop();
          if (!imageName) continue;
          
          const images = await this.getImageStorage();
          if (!images[imageName]) {
            throw new Error(`Image not found: ${imageName}`);
          }
        }
      }
      
      posts[index] = {
        ...posts[index],
        ...post,
        id,
        date: post.date || dayjs().format('YYYY-MM-DD'),
        template: post.template || 'standard'
      };
      
      this.setPostStorage(posts);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  public async deletePost(id: string): Promise<void> {
    try {
      const posts = this.getPostStorage();
      const filteredPosts = posts.filter(post => post.id !== id);
      this.setPostStorage(filteredPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  private generateId(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

export const markdownManager = new MarkdownManager();