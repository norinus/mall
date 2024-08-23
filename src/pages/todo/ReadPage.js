import {useParams} from "react-router-dom";

import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {

    const {tno} = useParams()

    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                Todo Read Page
            </div>
            <ReadComponent tno={tno}></ReadComponent>
        </div>

    );

}

export default ReadPage;