import React from 'react';
import Button from 'react-bootstrap/Button'

const MyPagination = ({ transactionsPerPage, totalTransactions, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <Button variant="link" onClick={() => paginate(number)}>{number}</Button>{' '}
{/* 
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a> */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MyPagination;
