import axios from "axios";
import {getCookies, setCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/todoApi";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST

    const header = {headers: {Authorization: `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log("리프레시 토큰")
    console.log(res.data)
    return res.data
}


//before request
const beforeReq = (config) => {
    console.log("before request.............")

    const memberInfo = getCookies("member")

    if(!memberInfo){
        console.log("member not found")
        return Promise.reject({
            response: {
                data:{error:"REQUIRE_LOGIN"}
            }
        });
    }

    const {accessToken} = memberInfo;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config
}
//fail request
const requestFail = (err) => {
    console.log("request error............")
    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) => {
    console.log("before return response...........")


    const data = res.data


    if(data && data.error ==='ERROR_ACCESS_TOKEN'){
        const memberCookie = getCookies("member")

        const result = await refreshJWT(memberCookie.accessToken,memberCookie.refreshToken)

        console.log("refreshJWT RESULT:{}",result)

        memberCookie.accessToken = result.accessToken
        memberCookie.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookie), 1)

        const originRequest = res.config
        originRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originRequest)

    }

    return res
}
//fail response
const responseFail = (err) => {
    console.log("response fail error.............")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)

jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios
