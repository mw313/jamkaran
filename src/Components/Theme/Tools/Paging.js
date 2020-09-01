import React from 'react';

const Paging = (props) => {
    let {current_page, last_page, per_page, total, to, from} = props.pageInfo;
    if(last_page < 2) return "";
    let pages = [];
    for(let i=1; i <= last_page; i++){
        pages.push(i);
    }
    // console.log(props.pageInfo);
    let li =[];
    //pages.forEach();
    // let fromPage = Math.ceil(current_page/10)*10 + 1;
    let toPage = 1, fromPage = 1;
    if(Math.ceil(current_page/10)*10 < last_page){
        toPage = Math.ceil(current_page/10)*10;
        fromPage = toPage - 9;
    }else{
        toPage = last_page;
        fromPage = Math.ceil(current_page/10)*10 - 9;
    }

    let previous = current_page-1;
    let next = current_page+1;
    if(current_page == 1){
        previous = false;
    }
    if(current_page == last_page){
        next = false;
    }

    for(let j=fromPage; j<=toPage; j++)
    li.push(<li key={j} className={current_page==j?"aginate_button page-item active":"aginate_button page-item"}>
                <a className="page-link" onClick={()=>props.pagingHandler(j)}> {j} </a>
            </li>) ;

    const goPage = (page)=>{

    }

    return (
        <div className="row view-pager">
            <div className="col-sm-10">
                <div className="text-center">
                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                        <ul className="pagination pagination-sm">
                            <li className={(current_page != 1)? "paginate_button page-item previous":"paginate_button page-item previous disabled"} id="DataTables_Table_0_previous" title="صفحه ی قبل">
                                <a aria-controls="DataTables_Table_0" onClick={()=>current_page == 1?"":props.pagingHandler(1)} data-dt-idx="0" tabIndex="0" className="page-link prev">
                                    <i className="flaticon-last"></i>
                                </a>
                            </li>
                            <li className={(current_page != 1)? "paginate_button page-item previous":"paginate_button page-item previous disabled"} id="DataTables_Table_0_previous" title="صفحه ی قبل">
                                <a aria-controls="DataTables_Table_0" onClick={()=>!previous?"":props.pagingHandler(previous)} data-dt-idx="0" tabIndex="0" className="page-link prev">
                                    <i className="flaticon-next"></i>
                                </a>
                            </li>
                            {li}
                            <li className={(current_page != last_page)? "paginate_button page-item previous":"paginate_button page-item previous disabled"} id="DataTables_Table_0_next">
                                <a aria-controls="DataTables_Table_0" data-dt-idx="3" onClick={()=>!next?"":props.pagingHandler(next)}
                                    tabIndex="0" className="page-link next" title="صفحه ی بعد">
                                    <i className="flaticon-prev"></i>
                                </a>
                            </li>
                            <li className={(current_page != last_page)? "paginate_button page-item previous":"paginate_button page-item previous disabled"} id="DataTables_Table_0_previous" title="صفحه ی قبل">
                                <a aria-controls="DataTables_Table_0" onClick={()=>current_page == last_page?"":props.pagingHandler(last_page)} data-dt-idx="0" tabIndex="0" className="page-link prev">
                                    <i className="flaticon-first"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="float-sm-left col-sm-2 text-left">
                <input type="text"
                    onKeyUp = {(e)=>{
                        let page = e.target.value;
                        if(e.which == 13){
                            props.pagingHandler(page)
                        }
                    }}
                    className="btn btn-outline-dark btn-xs" defaultValue={current_page} style={{width:"40px"}} /> از {last_page}
            </div>
        </div>

    );
    // return(
    //     <ul className="pagination">
    //         {pages.map((page)=>
    //             <li className={page==current_page?"page-item active":"page-item"}>
    //                 <a className="page-link" onClick={()=>props.pagingHandler(page)}>{page}</a>
    //             </li>
    //         )}
    //     </ul>
    // )
}

export {Paging};
