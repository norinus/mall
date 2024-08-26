import ListComponent from "../../components/product/ListComponent";


const ListPage = () => {


    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                상품 리스트 컴포넌트
            </div>

            <ListComponent/>
        </div>
    );

}

export default ListPage;