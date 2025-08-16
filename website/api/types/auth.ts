
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
}

export interface SignUpResponse {
    access: string;
}