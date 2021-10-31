import React, { useState, useMemo, useRef, useEffect } from "react";
import { deleteBook, usePagedSearchBookList } from "./accessHooks";
import BookCard from "./BookCard";
import TablePagination from '@mui/material/TablePagination';
import { useAuth } from "./useAuth";
import { useParams } from 'react-router';

const SearchByGenre = () => {
    const { genre } = useParams();
    const [query, setQuery] = useState(genre);
    useEffect(() => {
        setQuery(genre);
    }, [genre])

    const [login] = useAuth();
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
    ] = usePagedSearchBookList(10, query);

    if (loading) {
        return <h3>Loading...</h3>;
    } else {
        return <div sx={{textAlign:"center"}}>
            <h3>{query} books</h3>
            <BookCard list={list} onDelete={(id) => {
                deleteBook(id, login);
                reload();
            }} />
            <TablePagination
                component="div"
                count={length}
                page={page - 1}
                onPageChange={(e, p) => goToPage(p)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                }}
                labelDisplayedRows={({ from, to, count, page }) => `Page ${page + 1} (${from}-${to + 1} out of ${count})`}
                labelRowsPerPage="Rows per page: "
            />
        </div>
    }
}
SearchByGenre.defaultProps = { genre: "" }
export default SearchByGenre;