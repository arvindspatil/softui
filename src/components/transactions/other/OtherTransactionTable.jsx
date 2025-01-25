import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const OtherTransactionTable = ({ transactions, deleteTransaction }) => {

    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Description</th>
                        <th>Transfer Account</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                        <th style={{ textAlign: 'right' }}>Balance</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.transactionId}>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(transaction.transDate))}
                            </td>
                            <td>{transaction.inDescription}</td>
                            <td>{transaction.transferAcct}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(transaction.transAmt).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(transaction.balanceAmt).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        deleteTransaction(transaction.transactionId)
                                    }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default OtherTransactionTable
