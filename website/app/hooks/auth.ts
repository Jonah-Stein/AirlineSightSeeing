import type { LoginRequest, SignUpRequest } from "../../api/types/auth";

import { login, signUp } from "../../api/auth";
import { useTokenState } from "../../api/tokenStore";

export async function useLogin(data: LoginRequest) {
    const accessToken = await login(data)
    useTokenState.getState().setAccessToken(accessToken)
    // const {setAccessToken} = useTokenState.getState()
    // setAccessToken(accessToken)
    return
}

export async function useSignUp(data: SignUpRequest) {
    const accessToken = await signUp(data)
    useTokenState.getState().setAccessToken(accessToken)
    return
}