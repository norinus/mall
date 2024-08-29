import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days) => {

    console.log("쿠키 설정")
    
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    return cookies.set(name, value, {path:'/', expires:expires});
}

export const getCookies = (name) => {
    console.log("쿠키 가져오기")
    return cookies.get(name);
}

export const removeCookie = (name) => {
    console.log("쿠키 삭제")
    cookies.remove(name);
}