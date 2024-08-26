import {Outlet, useNavigate} from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";
import {useCallback} from "react";

const IndexPage = () => {

    const navigate = useNavigate();

    const handleClickList = useCallback(() => {
        navigate({
            pathname: 'list'
        })
    },[navigate])

    const handleClickAdd = useCallback(() => {
        navigate({
            pathname: 'add'
        })
    },[navigate])


    return (
        <BasicLayout>
            <div className={'w-full flex m-2 p-2'}>
                <div className={'text-xl m-1 p-2 w-20 font-extrabold text-center underline  cursor-pointer'} onClick={handleClickList}>
                    리스트
                </div>
                <div className={'text-xl m-1 p-2 w-20 font-extrabold text-center underline  cursor-pointer'} onClick={handleClickAdd}>
                    추가
                </div>
            </div>
            <div className={'flex flex-wrap w-full'}>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}


export default IndexPage;
