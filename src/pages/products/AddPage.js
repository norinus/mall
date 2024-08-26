import AddComponent from "../../components/product/AddComponent";

const AddPage = () => {
    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                새 상품 추가
            </div>
            <AddComponent/>
        </div>

    );

}

export default AddPage;