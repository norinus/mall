import {useEffect, useState} from "react";
import {deleteOne, getOne, updateOne} from "../../api/todoApi";
import useCustomMove from "../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: '',
    complete: false
}

const UpdateComponent = ({tno}) => {

    const [todo, setTodo] = useState({...initState})

    const [result, setResult] = useState(null)

    const {moveToList, moveToRead} = useCustomMove()

    useEffect(() => {

        getOne(tno).then(data => {
            setTodo(data)
        })

    }, [tno])


    const handleUpdate = () => {
        updateOne(todo).then(data => {
            console.log("업데이트 결과 : {}", data)
            setResult('Modified')
        })
    }


    const closeModal = () => {
        if (result === 'Modified') {
            moveToRead(tno)
        } else {
            moveToList()
        }
    }

    const handleDelete = () => {
        deleteOne(tno).then(data => {
            console.log("삭제 결과 : {}", data)
            setResult('Deleted')
        })
    }

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({...todo})
    }

    const handleChangeTodoComplete = (e) => {
        const value = e.target.value;
        todo.complete = (value === 'Y')
        setTodo({...todo})
    }


    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>

            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}

            <div className={'flex justify-center mt-10'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        TNO
                    </div>
                    <div className={'w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100'}>
                        {todo.tno}
                    </div>
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        Writer
                    </div>
                    <div className={'w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100'}>
                        {todo.writer}
                    </div>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        Title
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid shadow-md border-neutral-300'}
                           name="title" type={'text'} value={todo.title} onChange={handleChangeTodo}>
                    </input>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        DueDate
                    </div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid shadow-md border-neutral-300'}
                           name="title" type={'date'} value={todo.dueDate} onChange={handleChangeTodo}>
                    </input>
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>
                        Complate
                    </div>
                    <select name={'status'} className={'border-solid border-2 rounded m-1 p-2'}
                            onChange={handleChangeTodoComplete} value={todo.complete ? 'Y' : 'N'}>
                        <option value="Y">Complate</option>
                        <option value="N">Not Yet</option>
                    </select>
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