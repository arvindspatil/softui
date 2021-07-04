import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const InvestmentTransactionTable = ({ transactions, deleteTransaction, acctName, selOptions, allOptions, updateTransaction }) => {

    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Ticker</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Fees</th>
                        <th>Price</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                        <th style={{ textAlign: 'right' }}>Transfer Account</th>
                        <th style={{ textAlign: 'right' }}>Share Bal</th>
                        <th style={{ textAlign: 'right' }}>Account Balance</th>
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
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.ticker}</td>
                            <td>{transaction.description}</td>
                            <td style={{ textAlign: 'right' }}>{transaction.quantity ? parseFloat(transaction.quantity).toFixed(4) : ''}</td>
                            <td style={{ textAlign: 'right' }}>{transaction.fees ? parseFloat(transaction.fees).toFixed(2) : ''}</td>
                            <td style={{ textAlign: 'right' }}>{transaction.quote ? parseFloat(transaction.quote).toFixed(4) : ''}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(transaction.transAmt).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{transaction.transferAcct}</td>
                            <td style={{ textAlign: 'right' }}>{transaction.balanceQty ? parseFloat(transaction.balanceQty).toFixed(4) : ''}</td>
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

export default InvestmentTransactionTable
