import {useLayoutEffect, useState} from "react"
import {getOne,API_SERVER_HOST} from "../../api/productApi"
import useCustomMove from "../hooks/useCustomMove";
import FetchingModal from "../common/FatchingModal";


const initState = {
    pno: 0,
    pname: '',
    price: 0,
    description:'',
    uploadFileNames: [],
}

const  host = API_SERVER_HOST;

const ReadComponent = ({pno}) => {

    const [product, setProduct] = useState(initState)

    const {moveToList, moveToModify} = useCustomMove()

    const [fetching, setFetching] = useState(false)


    useLayoutEffect(() => {

        setFetching(true)

        getOne(pno).then(data => {
            console.log(data)
            setFetching(false)
            setProduct(data)
        })

    }, [pno])


    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>
            {fetching?<FetchingModal/>:<></>}

            {makeDiv('글번호', product.pno)}
            {makeDiv('상품명', product.pname)}
            {makeDiv('상품가격', product.price)}
            {makeDiv('상품설명', product.description)}
            {/**버튼 새아**/}

            <div className={'w-full justify-center flex flex-col m-auto items-center'}>
                {
                    product.uploadFileNames.map(
                        (imageFile,index) =>
                            <img alt={'product'} key={index} src={`${host}/api/products/view/${imageFile}`}/>
                    )
                }
            </div>

            <div className={'flex justify-end'}>
                <div className={'relative mb-4 flex p-4 flex-warp items-stretch'}>
                    <button type="button" className={'rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'}
                            onClick={() => moveToList()}>
                        리스트
                    </button>
                    <button type="button" className={'rounded p-4 m-2 text-xl w-32 text-white bg-red-500'}
                            onClick={() => moveToModify(pno)}>
                        수정
                    </button>
                </div>
            </div>
        </div>
    )
}

const makeDiv = (title, value) =>
    <div className={'flex justify-center'}>
        <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
            <div className={'w-1/5 p-6 text-right font-bold'}>{title}</div>
            <div className={'w-4/5 p-6 rounded-r border border-solid shadow-md'}>{value}</div>
        </div>
    </div>


export default ReadComponent;

