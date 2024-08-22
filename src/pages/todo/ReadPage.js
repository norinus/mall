import {useCallback} from "react";

import {useParams, useNavigate, createSearchParams, useSearchParams} from "react-router-dom";


const ReadPage = () => {

    const {tno} = useParams()

    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const page  = queryParams.get("page")? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size")? parseInt(queryParams.get("size")) : 10;

    const queryStr  = createSearchParams({page,size}).toString()


    const moveUpdate = useCallback((tno) => {
        navigate(
            {
                pathname: `/todo/modify/${tno}`,
            }
        )
    },[tno,page,size])


    const moveList = useCallback(() => {
        navigate(
            {
                pathname: `/todo/list`,
                search :queryStr
            }
        )
    },[page,size])


    return (
        <div className="text-3xl font-extrabold">
            Todo Read Page Component {tno}
            <div>
                <button onClick={() => moveUpdate(tno)}>수정</button>
                <button onClick={() => moveList()}> 목록</button>
            </div>
        </div>

    );

}

export default ReadPage;