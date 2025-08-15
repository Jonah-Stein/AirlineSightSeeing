
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
}

export interface SignUpResponse {
    accessToken: string;
}