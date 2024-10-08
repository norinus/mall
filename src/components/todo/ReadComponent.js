import {useLayoutEffect, useState} from "react"
import {getOne} from "../../api/todoApi"
import useCustomMove from "../hooks/useCustomMove";

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: null,
    complete: false,
}

const ReadComponent = ({tno}) => {

    const [todo, setTodo] = useState(initState)

    const {moveToList, moveToModify} = useCustomMove()

    useLayoutEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })

    }, [tno])

    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>
            {makeDiv('글번호', todo.tno)}
            {makeDiv('작성자', todo.writer)}
            {makeDiv('제목', todo.title)}
            {makeDiv('할일마감일', todo.dueDate)}
            {makeDiv('완료상태', todo.complete ? 'Completed' : 'Not Yet')}
            {/**버튼 새아**/}

            <div className={'flex justify-end'}>
                <div className={'relative mb-4 flex p-4 flex-warp items-stretch'}>
                    <button type="button" className={'rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'}
                            onClick={() => moveToList()}>
                        리스트
                    </button>
                    <button type="button" className={'rounded p-4 m-2 text-xl w-32 text-white bg-red-500'}
                            onClick={() => moveToModify(tno)}>
                        수정
                    </button>
                </div>
            </div>
        </div>
    )
}

const makeDiv = (title, value) =>
    <div className={'flex justify-center'}>
        <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
            <div className={'w-1/5 p-6 text-right font-bold'}>{title}</div>
            <div className={'w-4/5 p-6 rounded-r border border-solid shadow-md'}>{value}</div>
        </div>
    </div>


export default ReadComponent;

