import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/products`;

/**
 * 추가
 * @param todoObj
 * @returns {Promise<any>}
 */
export const productAdd = async (product) => {
    const headers = {headers:{"Content-Type":"multipart/form-data"}}
    const res = await axios.post(`${prefix}/`,product,headers);
    return res.data;
}

/**
 * 일기
 * @param pno
 * @returns {Promise<any>}
 */
export const getOne = async (pno) => {
    const res = await axios.get(`${prefix}/${pno}`)
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
 * 삭제
 * @param pno
 * @returns {Promise<any>}
 */
export const deleteOne = async (pno) =>{
    const res = await axios.delete(`${prefix}/${pno}`);
    return res.data;
}

/**
 * 업데이트
 * @param product
 * @returns {Promise<any>}
 */
export const updateOne =async (pno,product) =>{
    const headers = {headers:{"Content-Type":"multipart/form-data"}}
    const res = await axios.put(`${prefix}/${pno}`, product,headers)
    return res.data;
}