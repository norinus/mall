import React from 'react';

const PageComponent = ({serverData, movePage}) => {

    const calculatePagination = () => {

        //페이지정보 추출
        const {number, totalElements, size, first, last} = serverData;

        // 페이지 번호 0부터 출발하기 때문에 +1 함
        const currentPage = number + 1;

        //마지막 페이지 번호
        let end = Math.ceil(currentPage / 10.0) * 10;

        //시작 페이지 번호
        const start = end - 9;

        //마지막 페이지
        const lastPage = Math.ceil(totalElements / size);

        //마지막 페이지 조정
        end = end > lastPage ? lastPage : end;

        //이전 페이지 있는 지
        const prev = start > 1;
        
        //다음 페이지 있는지
        const next = end < lastPage;

        //이전 페이지 번호
        const prevPage = prev ? start - 1 : null;
        //다음 페이지 번호
        const nextPage = next ? end + 1 : null;

        //페이지 번호 넣기
        const pagesNumList = [];

        for (let i = start; i <= end; i++) {
            pagesNumList.push(i);
        }


        return {start, end, prev, next, prevPage, nextPage, pagesNumList, lastPage, current: currentPage};
    };

    const {start, end, prev, next, prevPage, nextPage, pagesNumList, lastPage, current} = calculatePagination();

    return (
        <div className="m-6 flex justify-center">
            {prev ?
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({page: prevPage - 1})}
                >
                    Prev
                </div>
                : <></>}
            {pagesNumList.map(pageNum => (
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${current === pageNum ? 'bg-gray-500' : 'bg-blue-400'}`}
                    onClick={() => movePage({page: pageNum})}
                >
                    {pageNum}
                </div>
            ))}
            {next ?
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({page: nextPage})}
                >
                    Next
                </div>
                : <></>}
        </div>
    );
}

export default PageComponent;
