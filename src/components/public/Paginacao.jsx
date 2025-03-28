import { Pagination } from "antd";
import "@styles/public/paginacao.css"
export default function Paginacao({ totalPages, changePage }) {
    if (totalPages<2) return

    return (
        <div className='paginacao'>
            <Pagination 
                defaultCurrent={1} 
                total={totalPages}
                disabled={totalPages == 1}
                pageSize={1}
                responsive
                showSizeChanger={false}
                onChange={changePage}
                showTitle={false}
                />
        </div>
    )
}