import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/todo`;

/**
 * 일기
 * @param tno
 * @returns {Promise<any>}
 */
export const getOne = async (tno) => {
    const res = await axios.get(`${prefix}/${tno}`)

    console.log(res.data);

    return res.data;
}

/**
 * 리스트
 * @param pageParam
 * @returns {Promise<any>}
 */
export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list`,{params:{page:page,size:size}});
    return res.data;
}

/**
 * 추가
 * @param todoObj
 * @returns {Promise<any>}
 */
export const postAdd = async (todoObj) => {
    const res = await axios.post(`${prefix}/`,todoObj);
    return res.data;
}

/**
 * 삭제
 * @param tno
 * @returns {Promise<any>}
 */
export const deleteOne = async (tno) =>{
    
    const res = await axios.delete(`${prefix}/${tno}`);
    return res.data;
}

/**
 * 업데이트
 * @param todo
 * @returns {Promise<any>}
 */
export const updateOne =async (todo) =>{
    const res = await axios.put(`${prefix}/${todo.tno}`, todo)
    return res.data;
}