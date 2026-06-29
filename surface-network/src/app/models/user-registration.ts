export interface RegisterRequest {
     nickname: string;
     email: string;
     password: string;
     lastname: string;
     firstname: string;
     photo: string;
     contacts: string;
    aboutMyself: string;
    achievements: string;
}

export interface RegisterResponse {
    id: number;
    nickname: string;
}