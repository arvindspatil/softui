import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import EditCheckingTransaction from './EditCheckingTransaction'

const CheckingTransactionTable = ({ transactions, deleteTransaction, acctName, selOptions, allOptions, updateTransaction, updateCakeTransaction }) => {

    const [showEditTransaction, setShowEditTransaction] = useState(false)
        useEffect(() => {
            setShowEditTransaction(false)
    }, [transactions])

    const [updTransactionId, setUpdTransactionId] = useState(0)
    const [updAcctId, setUpdAcctId] = useState(0)
    const [updAcctName, setUpdAcctName] = useState('')
    const [updTransDate, setUpdTransDate] = useState('')
    const [updCheckNumber, setUpdCheckNumber] = useState('')
    const [updTransAmt, setUpdTransAmt] = useState(0)
    const [updDescription, setUpdDescription] = useState('')
    const [updTransferAcctId, setUpdTransferAcctId] = useState(0)
    const [updTransferAcctName] = useState('')
    const [updSelOptions, setUpdSelOptions] = useState([])
    const [updAllOptions, setUpdAllOptions] = useState([])

    const hideEditTransaction = () => {
        setShowEditTransaction(false)
    }

    const initEditTransaction = (transactionId, acctId, acctName, transDate, checkNumber, transAmt, description, transferAcctId, selOptions, allOptions) => {
        console.log(acctId)
        console.log(acctName)
        console.log(transactionId)
        setUpdTransactionId(transactionId)
        setUpdAcctId(acctId)
        setUpdAcctName(acctName)
        setUpdTransDate(transDate)
        setUpdCheckNumber(checkNumber)
        setUpdTransAmt(transAmt)
        setUpdDescription(description)
        console.log(transferAcctId)
        console.log(updTransferAcctId)
        setUpdTransferAcctId(transferAcctId)
        console.log('setting showEdit to true')
        console.log(transferAcctId)
        console.log(updTransferAcctId)
        setShowEditTransaction(true)
        setUpdSelOptions(selOptions)
        setUpdAllOptions(allOptions)
    }

    return (
        <>
            {showEditTransaction && <EditCheckingTransaction
                inTransactionId = {updTransactionId}
                acctId={updAcctId}
                acctName={updAcctName}
                inTransDate={updTransDate}
                inCheckNumber={updCheckNumber}
                inTransAmt={updTransAmt}
                inDescription={updDescription}
                inTransferAcctId={updTransferAcctId}
                transferAcctName={updTransferAcctName}
                selOptions={updSelOptions}
                allOptions={updAllOptions}
                hideEditTransaction={hideEditTransaction}
                updateTransaction={updateTransaction}
                updateCakeTransaction={updateCakeTransaction}
                // onAddTransaction={addTransaction} 
                />}

            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Check Number</th>
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
                                {/* {transaction.transDate} */}
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(transaction.transDate))}
                            </td>
                            <td>{transaction.checkNumber === 0 ? '' : transaction.checkNumber}</td>
                            <td>{transaction.inDescription}</td>
                            <td>{transaction.transferAcct}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(transaction.transAmt).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(transaction.balanceAmt).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        console.log("Click edittransaction")
                                        console.log(transaction.acctName)
                                        console.log(transaction.transferAcctId)
                                        console.log(updTransferAcctId)
                                        console.log(transaction.transactionId)
                                        console.log(transaction.transAmt)
                                        initEditTransaction(transaction.transactionId, transaction.acctId, acctName, transaction.transDate, transaction.checkNumber, transaction.transAmt, transaction.description, transaction.transferAcctId, selOptions, allOptions)
                                        // setShowEditTransaction(!showEditTransaction)
                                    }}>Edit</Button>
                                {' '}
                                <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        console.log(transaction.transactionId)
                                        deleteTransaction(transaction.transactionId)
                                    }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            {/* {acctId, acctName, transDate, checkNumber, transAmt, description, transferAcctId, transferAcctName, saveTransaction}) => { */}

        </>
    )

}

export default CheckingTransactionTable
