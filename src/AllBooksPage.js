import React, {useState} from "react";
import { usePagedBookList, deleteBook} from "./accessHooks";
import BookCard from "./BookCard";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from './useAuth';

const AllBooksPage = () => {
    const [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        setPageSize,
        reload
    ] = usePagedBookList(10);
    const [login] = useAuth();
    if(loading){
        return <h3>Loading...</h3>;
    }else{
        return <div sx={{width: '100%',
            height: '100%'}} >
            
            <BookCard list={list} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            <TablePagination
                component="div"
                count={length}
                page={page-1}
                onPageChange={(e, p) => goToPage(p)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                }}
                labelDisplayedRows={({from, to, count, page}) => `Page Loading ${page+1} (${from}-${to+1} out of ${count})`}
                labelRowsPerPage="Rows per page: "
            />
        </div>
    }
}

export default AllBooksPage;