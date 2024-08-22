import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useCallback} from "react";

const ModifyPage =()=>{

    const {tno} = useParams()

    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const page  = queryParams.get("page")? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size")? parseInt(queryParams.get("size")) : 10;

    const queryStr  = createSearchParams({page,size}).toString()

    const moveRead = useCallback((tno) => {
        navigate(
            {
                pathname: `/todo/read/${tno}`,
                search:queryStr, // 쿼리 파라미터 추가
            }
        )
    },[navigate,queryStr])


    const moveList = useCallback(() => {
        navigate(
            {
                pathname: `/todo/list`,
                search :queryStr
            }
        )
    },[navigate, queryStr])


    return(
        <div className="text-3xl font-extrabold">
            Todo Modify Page
            <div>
                <button onClick={() => moveRead(tno)}>읽기</button>
                <button onClick={() => moveList()}>목록</button>
            </div>
        </div>

    );
}

export default ModifyPage;

