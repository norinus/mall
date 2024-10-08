import {useState} from "react";

import useCustomLogin from "../hooks/useCustomLogin";

const initState = {
    email:'',
    password:'',
}

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({...initState})

    const {doLogin, moveToPath } = useCustomLogin()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({...loginParam})
    }

    const handleClickLogin = (e) => {
        doLogin(loginParam).then(result => {
            console.log("after unwrap")
            console.log(result)
            if(result.error){
                alert("이메일과 패스워드를 다시 확인 하세요.")
            }else{
                alert("로그인성공")
                moveToPath("/")
            }
            
        })
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue500">Login Component</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" name="email" type={'text'} value={loginParam.email} onChange={handleChange}/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" name="password" type={'password'} value={loginParam.password} onChange={handleChange} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-36 bg-blue-500 textxl text-white" onClick={handleClickLogin}>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;