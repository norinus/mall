import {useState} from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }
    return parseInt(param);
}

const useCustomMove = () => {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get("page"), 0)
    const size = getNum(queryParams.get("size"), 10)

    const queryDefault = createSearchParams({page, size}).toString()

    const moveToList = (pageParam) => {
        let queryStr = ""

        if (pageParam) {
            //springboot 페이지 0 부터 시작함
            let pageNum = getNum(pageParam.page, page)
            const sizeNum = getNum(pageParam.size, size)
            queryStr = createSearchParams({page: pageNum - 1, size: sizeNum}).toString()
        } else {
            queryStr = queryDefault
        }

        navigate({
            pathname: `../list`,
            search: queryStr
        })

        setRefresh(!refresh)
    }

    const moveToModify = (num) => {
        console.log(queryDefault)
        navigate({
            pathname: `../modify/${num}`,
            search: queryDefault
        })
    }

    const moveToRead = (num) => {
        console.log(queryParams)
        navigate({
            pathname: `../read/${num}`,
            search: queryDefault
        })
    }
    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useCustomMove
