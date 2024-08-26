import {useParams} from "react-router-dom";

import UpdateComponent from "../../components/product/UpdateComponent";


const ModifyPage = () => {

    const {pno} = useParams()


    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                Todo Modify Page
            </div>
            <UpdateComponent pno={pno}/>
        </div>
    );
}

export default ModifyPage;

