import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CallAPIProps extends AxiosRequestConfig{
    token?: boolean;
    serverToken?: string
}

export default async function callAPI({url, method, data, token, serverToken}: CallAPIProps) {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    let headers = {};
    
    if(serverToken){
        headers = {
            Authorization :`Bearer ${serverToken}`
        }
    }else if(token){
        const tokenCookies = Cookies.get("token");
        if (tokenCookies) {
          const jwtToken = atob(tokenCookies);
          headers = {
            Authorization :`Bearer ${jwtToken}`
          }
        }
    }
    const respon = await axios({
        url,
        method,
        data,
        headers
    }).catch(err => err.response);
    
    if(respon.status > 300){
        const res = {
            error: true,
            message: respon.data.message,
            data: null
        }
        return res
    }
    const length = Object.keys(respon.data).length;

    const res = {
        error: false,
        message: 'success',
        data : length > 1 ? respon.data : respon.data.data
    }
    return res
}