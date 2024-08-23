import {useEffect, useState} from "react";
import {getList} from "../../api/todoApi";
import useCustomMove from "../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
    totalElements: 0,
    totalPages: 0,
    size: 0,
    content: [],
    number: 0,
    sort: {
        empty: false,
        unsorted: false,
        sorted: false
    },
    first: false,
    last: false,
    numberOfElements: 0,
    pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
            empty: false,
            unsorted: false,
            sorted: false
        },
        offset: 0,
        unpaged: false,
        paged: false
    },
    empty: false
}

const ListComponent = () => {

    const {page, size, moveToList, moveToRead} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(() => {
        getList({page, size}).then(data => {
            console.log(data)
            setServerData(data)
        })
    }, [page, size])

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.content.map(todo =>
                    <div key={todo.tno} className="w-full min-w-[400px] p-2 m-2 rounded shadow-md cursor-pointer"
                         onClick={() => moveToRead(todo.tno)}>
                        <div className="flex ">
                            <div className="font-extrabold text-2xl p-2 w-1/12">
                                {todo.tno}
                            </div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                                {todo.title}
                            </div>
                            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                                {todo.dueDate}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    );

}

export default ListComponent;