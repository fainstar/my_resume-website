export interface BlogPost {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  coverImage?: string;
}

class DatabaseManager {
  private static instance: DatabaseManager;
  private readonly STORAGE_KEY = 'blog_posts';

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async connect(): Promise<void> {
    // LocalStorage不需要連接，但保留此方法以保持API兼容性
    return Promise.resolve();
  }

  private getStoredPosts(): BlogPost[] {
    const posts = localStorage.getItem(this.STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  }

  private savePosts(posts: BlogPost[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
  }

  public async getAllPosts(): Promise<BlogPost[]> {
    return Promise.resolve(this.getStoredPosts());
  }

  public async addPost(post: Omit<BlogPost, 'id'>): Promise<number> {
    const posts = this.getStoredPosts();
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    
    const newPost: BlogPost = {
      ...post,
      id: newId
    };

    posts.unshift(newPost); // 添加到開頭以保持最新的在前面
    this.savePosts(posts);

    return newId;
  }

  public async updatePost(post: BlogPost): Promise<void> {
    const posts = this.getStoredPosts();
    const index = posts.findIndex(p => p.id === post.id);
    
    if (index !== -1) {
      posts[index] = post;
      this.savePosts(posts);
    }

    return Promise.resolve();
  }

  public async deletePost(id: number): Promise<void> {
    const posts = this.getStoredPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    this.savePosts(filteredPosts);

    return Promise.resolve();
  }
}

export const dbManager = DatabaseManager.getInstance();