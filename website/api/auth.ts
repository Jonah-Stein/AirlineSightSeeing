import { skymarkApi } from "./axios";
import type { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from "./types/auth";

export async function login(LoginRequest: LoginRequest):Promise<string> {
    const {data} = await skymarkApi.post("/auth/login", LoginRequest)
    return data.access
}

export async function signUp(SignUpRequest: SignUpRequest): Promise<string> {
    const {data} = await skymarkApi.post("/auth/signup", SignUpRequest)
    return data.access
}