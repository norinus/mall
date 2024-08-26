import {useLayoutEffect, useRef, useState} from "react";
import {API_SERVER_HOST, deleteOne, getOne, updateOne} from "../../api/productApi";
import useCustomMove from "../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import FetchingModal from "../common/FatchingModal";

const initState = {
    pno: 0,
    pname: '',
    price: 0,
    description: '',
    isDeleted: false,
    uploadFileNames:[]
}

const host = API_SERVER_HOST;

const UpdateComponent = ({pno}) => {

    const [product, setProduct] = useState({...initState})

    const [result, setResult] = useState(null)

    const[fetching, setFetching] = useState(false)

    const {moveToList, moveToRead} = useCustomMove()

    const  uploadRef = useRef()

    useLayoutEffect(() => {

        setFetching(true)

        getOne(pno).then(data => {
            setProduct(data)
            setFetching(false)
        })

    }, [pno])


    const handleUpdate = (e) => {

        const files = uploadRef.current.files

        const formData = new FormData()

        for(const element of files) {
            formData.append('files', element);
        }
        formData.append('pno', product.pno)
        formData.append('pname', product.pname);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('isDeleted', product.isDeleted);

        for(const fileName of product.uploadFileNames) {
            formData.append('uploadFileNames', fileName);
        }

        setFetching(true)

        updateOne(pno,formData).then(data => {
            setFetching(false)
            console.log("업데이트 결과 : {}", data)
            setResult('Modified')
        })
    }

    const closeModal = () => {
        if (result === 'Modified') {
            moveToRead(pno)
        } else {
            moveToList()
        }
    }

    const handleDelete = () => {
        deleteOne(pno).then(data => {
            console.log("삭제 결과 : {}", data)
            setResult('Deleted')
        })
    }

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }


    const deletedOldImages =(imageName)=>{
        product.uploadFileNames = product.uploadFileNames.filter(fileName => fileName !== imageName)
        setProduct({...product})
    }





    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>
            {fetching ? <FetchingModal/> : <></>}
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}

            <div className={'flex justify-center mt-10'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        번호
                    </div>
                    <div className={'w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100'}>
                        {product.pno}
                    </div>
                </div>
            </div>
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
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        상품설명
                    </div>
                    <textarea className={'w-4/5 p-6 rounded-r border border-solid shadow-md border-neutral-300'}
                              name="description" rows={4} value={product.description}
                              onChange={handleChangeProduct}>{product.description}</textarea>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        상품 삭제 상태
                    </div>
                    <select name={'status'} className={'border-solid border-2 rounded m-1 p-2'}
                            onChange={handleChangeProduct} value={product.isDeleted}>
                        <option value="{false}">NO</option>
                        <option value="{true}">YES</option>
                    </select>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        새상품이미지
                    </div>
                    <input ref={uploadRef}
                           className={'w-4/t p-6 rounded-r border border-solid shadow-md border-neutral-300'}
                           type={'file'} multiple={true}/>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'w-1/5 p-6 text-right font-bold'}>
                    기존 상품이미지
                </div>
                <div className={'w-4/5 justify-center flex flex-wrap items-start'}>
                    {
                        product.uploadFileNames.map(
                            (imageFile, index) => <div className={'flex justify-center flex-col w-1/3'} key={index}>
                                <button className={'bg-blue-500 text-3xl text-white'}
                                        onClick={() => deletedOldImages(imageFile)}>삭제
                                </button>
                                <img alt={'img'} src={`${host}/api/products/view/s_${imageFile}`}/>
                            </div>
                        )
                    }
                </div>
            </div>

                <div className={'flex justify-end p-4'}>
                    <button type={'button'}
                            className={'inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500'}
                            onClick={handleDelete}> 삭제
                    </button>
                    <button type={'button'}
                            className={'rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'} onClick={handleUpdate}> 수정
                    </button>
                </div>
            </div>
            );
            }

            export default UpdateComponent;