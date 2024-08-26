import {useRef, useState} from "react";
import {productAdd} from "../../api/productApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../hooks/useCustomMove";
import FetchingModal from "../common/FatchingModal";

const initState = {
    pname: '',
    price: 0,
    description: '',
    files:[]
}

const AddComponent = () => {

    const [product, setProduct] = useState({...initState})

    const [result, setResult] = useState(null)
    const [fetching, setFetching] = useState(false)

    const {moveToList} = useCustomMove()

    const uploadRef = useRef();

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handlerClickAdd = (e) => {

        const fileList  = uploadRef.current.files;

        const formData = new FormData();

        for(const element of fileList) {
            formData.append('files', element);
        }

        formData.append('pname', product.pname);
        formData.append('price', product.price);
        formData.append('description', product.description);

        setFetching(true)

        productAdd(formData).then(result => {
            console.log(result)
            setFetching(false)
            setResult(result.pno)
        }).catch(err => {
            console.error(err)
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToList()
    }


    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>
            {/**모달처리*/}
            {fetching?<FetchingModal/>:<></>}
            {result ?
                <ResultModal title={'새상품 추가 결과'} content={`새상품 ${result}번이 추가되었습니다.`} callbackFn={closeModal}/> : <></>}
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        상품명
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'}
                           name="pname"
                           type={'text'} value={product.pname} onChange={handleChangeProduct}/>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        가격
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'}
                           name="price"
                           type={'number'} value={product.price} onChange={handleChangeProduct}/>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        상품설명
                    </div>
                    <textarea className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'}
                           name="description" rows={4}
                              value={product.description} onChange={handleChangeProduct}>{product.description}</textarea>
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        상품 이미지 파일
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'} ref={uploadRef}
                           type={'file'} accept="image/*"
                           multiple={true} />
                </div>
            </div>

            <div className={'flex justify-end'}>
                <div className={'relative mb-4 flex p-4 flex-warp items-stretch'}>
                    <button type={'button'} className={'rounded p-4 w-36 bg-blue-500 text-xl text-white'}
                            onClick={handlerClickAdd}>추가
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddComponent
