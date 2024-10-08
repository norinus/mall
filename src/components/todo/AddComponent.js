import {useState} from "react";
import {postAdd} from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../hooks/useCustomMove";

const initState = {
    title: '',
    writer: '',
    dueDate: ''
}

const AddComponent = () => {

    const [todo, setTodo] = useState({...initState})

    const [result, setResult] = useState(null)

    const {moveToList} = useCustomMove()

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({...todo})
    }

    const handlerClickAdd = () => {
        console.log(todo);
        postAdd(todo).then(result => {
            console.log(result)
            setTodo({...initState})
            setResult(result.TNO)
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
            {result ?
                <ResultModal title={'새글 추가 결과'} content={`새글 ${result}번이 추가되었습니다.`} callbackFn={closeModal}/> : <></>}
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        제목
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'} name="title"
                           type={'text'} value={todo.title} onChange={handleChangeTodo}/>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        작성자
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'}
                           name="writer"
                           type={'text'} value={todo.writer} onChange={handleChangeTodo}/>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-warp items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        할일 마감일
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md'}
                           name="dueDate"
                           type={'date'} value={todo.dueDate} onChange={handleChangeTodo}/>
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
