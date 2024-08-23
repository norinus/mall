import { useParams} from "react-router-dom";

import UpdateComponent from "../../components/todo/UpdateComponent";


const ModifyPage =()=>{

    const {tno} = useParams()


    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                Todo Modify Page
            </div>
            <UpdateComponent tno={tno} />
        </div>
    );
}

export default ModifyPage;

