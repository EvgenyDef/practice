export interface UserSummary {
  id: number;
  nickname: string;
  photo?: string;
}

export interface Post {
  id: number;
  text: string;
  imagePath?: string;
  createdAt: string; 
  userId: number;
  user?: UserSummary; 
}