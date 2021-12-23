import callAPI from "../config/api";
import { LoginTypes } from "./data-types";

export async function setSignUp(data: FormData) {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/auth/signup`
   
    return callAPI({
        url,
        method : 'POST',
        data
    })
}

export async function setLogin(data: LoginTypes){
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/auth/signin`;
    
    return callAPI({
        url,
        method: 'POST',
        data
    })
}