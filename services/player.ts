import axios from "axios";
import callAPI from "../config/api";
import { CheckoutTypes } from "./data-types";

export async function getFeaturedGame() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const respon = await axios.get(`${ROOT_API}/api/v1/players/landingpage`);
    
    const axiosResponse = respon.data;
    
    return axiosResponse.data;
}

export async function getDetailVoucher(id:string) {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const respon = await axios.get(`${ROOT_API}/api/v1/players/detail/${id}`);
    
    const axiosResponse = respon.data;
    
    return axiosResponse.data;
}

export async function getGameCategory() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const respon = await axios.get(`${ROOT_API}/api/v1/players/category`);
    
    const axiosResponse = respon.data;
    
    return axiosResponse.data;
}

export async function setCheckout(data: CheckoutTypes) {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/players/checkout`;
    return callAPI({
        url,
        method:'post',
        data: data,
        token: true
    })
}

