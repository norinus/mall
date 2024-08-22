import {useNavigate} from "react-router-dom";



const ModifyPage =(tno)=>{

    const navigate = useNavigate();

    const moveRead =()=>{
        navigate({
            pathname:`/todo/read/${tno}`
        })
    }

    const moveList =()=>{
        navigate({
            pathname:`/todo/list`
        })
    }

    return(
        <div className="text-3xl font-extrabold">
            Todo Modify Page
            <div>
                <button onClick={() => moveRead(tno)}>읽기</button>
                <button onClick={() => moveList()}>목록</button>
            </div>
        </div>

    );
}

export default ModifyPage;

