import React from 'react'
import { usePagination, useTable } from 'react-table'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
// import { COLUMNS } from './AccountColumns'
import PageHeader from './PageHeader'

const MyTable = ( {tableData, columns, deleteTransaction, hiddencolumn} ) => {

    const tableInstance = useTable({
        columns: columns,
        data: tableData,
        initialState: { 
          pageSize: 13,
          hiddenColumns: hiddencolumn
        }
    }, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        gotoPage,
        pageCount,
        prepareRow,
        getCellProps,
    } = tableInstance

    return (
        <>
            <Table {...getTableProps()} striped bordered hover size="sm">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return (
                                          <td
                                          onClick = {() => console.log(row.values.transactionId, cell.value)}
                                          {...cell.getCellProps()}
                                          >
                                            {cell.render("Cell")}
                                          </td>
                                          );
                                    })
                                }
                            </tr>
                        )

                      //   return (
                      //     <tr {...row.getRowProps()}>
                      //         {
                      //             row.cells.map((cell) => {
                      //                 return <td {...cell.getCellProps()}>
                      //                     {cell.render('Cell')}
                      //                 </td>
                      //             })
                      //         }
                      //     </tr>
                      // )


                      })
                    }
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>{' '}
            <Button variant="primary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>{' '}
            <Button variant="primary" onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>{' '}
            <Button variant="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>{' '}
        </>
    )
}

export default MyTable
