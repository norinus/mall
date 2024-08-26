import {useParams} from "react-router-dom";

import ReadComponent from "../../components/product/ReadComponent";

const ReadPage = () => {

    const {pno} = useParams()

    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                Todo Read Page
            </div>
            <ReadComponent pno={pno}></ReadComponent>
        </div>

    );

}

export default ReadPage;