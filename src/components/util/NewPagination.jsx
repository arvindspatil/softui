import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { usePagination, DOTS } from './usePagination'

const NewPagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    console.log(totalCount)
    console.log(siblingCount)
    console.log(currentPage)
    console.log(pageSize)
    console.log(paginationRange)

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    const onFirstPage = () => {
        onPageChange(1);
    }

    const onLastPage = () => {
        onPageChange(lastPage)
    }

    console.log(lastPage)
    console.log(paginationRange)
    let items = [];
    items.push(<Pagination.First disabled={currentPage === 1} onClick={onFirstPage} />)
    items.push(<Pagination.Prev disabled={currentPage === 1} onClick={onPrevious} />)
    for (let number = 0; number < paginationRange.length; number++) {
        console.log(number)
        console.log(paginationRange[number])
        if (paginationRange[number] === DOTS) {
            items.push(<Pagination.Ellipsis />)
        } else {
            items.push(
                <Pagination.Item key={number} active={paginationRange[number] === currentPage} onClick={() => onPageChange(paginationRange[number])}>
                    {paginationRange[number]}
                </Pagination.Item>,
            )
        }
    }
    items.push(<Pagination.Next disabled={currentPage === lastPage} onClick={onNext} />)
    items.push(<Pagination.Last disabled={currentPage === lastPage} onClick={onLastPage} />)

    return (
        <Pagination >{items}</Pagination>
    )
}

export default NewPagination
