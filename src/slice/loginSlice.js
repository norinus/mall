import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {loginPost} from "../api/memberApi"
import {getCookies, setCookie, removeCookie} from "../util/cookieUtil";

const initState = {
    email: ''
}

const loadMemberCookie =()=>{

    const memberInfo = getCookies("member")

    if(memberInfo && memberInfo.nickName){
        memberInfo.nickName = decodeURIComponent(memberInfo.nickName);
    }

    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("로그인")
            const data = action.payload
            return {email: data.email}
        },
        logout: (state, action) => {
            console.log("그로아웃")
            removeCookie("member")

            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("fulfilled")
                const payload = action.payload

                if(!payload.error){
                    console.log("쿠키저장")
                    setCookie("member", JSON.stringify(payload),1)
                }

                return payload
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending")
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected")
            })
    }
})

export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer