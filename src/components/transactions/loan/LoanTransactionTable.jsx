import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import EditLoanTransaction from './EditLoanTransaction'
// import EditCreditTransaction from './EditCreditTransaction'

const LoanTransactionTable = ({ transactions, deleteTransaction, acctName, selOptions, allOptions, updateTransaction }) => {

    const [showEditTransaction, setShowEditTransaction] = useState(false)
        useEffect(() => {
            setShowEditTransaction(false)
    }, [transactions])

    const [updTransactionId, setUpdTransactionId] = useState(0)
    const [updAcctId, setUpdAcctId] = useState(0)
    const [updAcctName, setUpdAcctName] = useState('')
    const [updTransDate, setUpdTransDate] = useState('')
    const [updTransAmt, setUpdTransAmt] = useState(0)
    const [updDescription, setUpdDescription] = useState('')
    const [updTransferAcctId, setUpdTransferAcctId] = useState(0)
    const [updTransferAcctName] = useState('')
    const [updSelOptions, setUpdSelOptions] = useState([])
    const [updAllOptions, setUpdAllOptions] = useState([])

    const hideEditTransaction = () => {
        setShowEditTransaction(false)
    }

    const initEditTransaction = (transactionId, acctId, acctName, transDate, transAmt, description, transferAcctId, selOptions, allOptions) => {
        setUpdTransactionId(transactionId)
        setUpdAcctId(acctId)
        setUpdAcctName(acctName)
        setUpdTransDate(transDate)
        setUpdTransAmt(transAmt)
        setUpdDescription(description)
        setUpdTransferAcctId(transferAcctId)
        setShowEditTransaction(true)
        setUpdSelOptions(selOptions)
        setUpdAllOptions(allOptions)
    }

    return (
        <>
            {showEditTransaction && <EditLoanTransaction
                inTransactionId = {updTransactionId}
                acctId={updAcctId}
                acctName={updAcctName}
                inTransDate={updTransDate}
                inTransAmt={updTransAmt}
                inDescription={updDescription}
                inTransferAcctId={updTransferAcctId}
                transferAcctName={updTransferAcctName}
                selOptions={updSelOptions}
                allOptions={updAllOptions}
                hideEditTransaction={hideEditTransaction}
                updateTransaction={updateTransaction}
                />}

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
                                        initEditTransaction(transaction.transactionId, transaction.acctId, acctName, transaction.transDate, transaction.transAmt, transaction.description, transaction.transferAcctId, selOptions, allOptions)
                                    }}>Edit</Button>
                                {' '}
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

export default LoanTransactionTable
