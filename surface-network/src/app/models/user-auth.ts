export interface AuthRequest {
    nickname: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    id: number;
    nickname: string;
}