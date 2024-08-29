import {useLayoutEffect, useState} from "react";
import {getList,API_SERVER_HOST} from "../../api/productApi";
import useCustomMove from "../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";
import FetchingModal from "../common/FatchingModal";
import useCustomLogin from "../hooks/useCustomLogin";

const host = API_SERVER_HOST;

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

    const {exceptionHandle} = useCustomLogin()

    const {page, size,refresh, moveToList, moveToRead} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    const [fetching, setFetching] = useState(false)


    useLayoutEffect(() => {

        setFetching(true)

        getList({page, size}).then(data => {
            console.log(data)
            setServerData(data)
            setFetching(false)
        }).catch(error => exceptionHandle(error))
    }, [page, size,refresh])

    return (
        <div className={'border-2 border-blue-100 mt-10 mr-2 ml-2'}>
            {fetching?<FetchingModal/>:<></>}
            <div className={'flex flex-wrap mx-auto p-6'}>
                {serverData.content.map(product =>
                    <div key={product.pno} className={'w-1/2 p-1 rounded shadow-md cursor-pointer border-2'}
                         onClick={() => moveToRead(product.pno)}>
                        <div className={'flex flex-col h-full'}>
                            <div className={'font-extrabold text-2xl p-2 w-full'}>
                                {product.pno}
                            </div>
                            <div className={'text-1xl m-1 p-2 w-full flex flex-col'}>
                                <div className={'w-full overflow-hidden'}>
                                    <img alt={'product'} className={'m-auto rounded-md w-60'} src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`} />
                                </div>
                                <div className={'bottom-0 font-extrabold bg-white'}>
                                    <div className={'text-center p-1'}>
                                        상품명:{product.pname}
                                    </div>
                                    <div className={'text-center p-1'}>
                                        상품가격:{product.price}
                                    </div>
                                </div>
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