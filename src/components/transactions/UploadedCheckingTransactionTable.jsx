import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import EditUploadedCheckingTransaction from './EditUploadedCheckingTransaction'

const UploadedCheckingTransactionTable = ({ transactions, deleteTransaction, acctName, selOptions, allOptions, updateTransaction }) => {

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
    const [updDecision] = useState(false)

    const hideEditTransaction = () => {
        setShowEditTransaction(false)
    }

    const initEditTransaction = (transactionId, acctId, acctName, transDate, checkNumber, transAmt, description, transferAcctId, selOptions, allOptions) => {
        setUpdTransactionId(transactionId)
        setUpdAcctId(acctId)
        setUpdAcctName(acctName)
        setUpdTransDate(transDate)
        setUpdCheckNumber(checkNumber)
        setUpdTransAmt(transAmt)
        setUpdDescription(description)
        setUpdTransferAcctId(transferAcctId)
        setShowEditTransaction(true)
        setUpdSelOptions(selOptions)
        setUpdAllOptions(allOptions)
    }

    const acceptTrans = (transactionId, acctId, transDate, checkNumber, transAmt, description, inDescription, transferAcctId, decision) => {
        console.log(transactionId)
        console.log(decision)
        updateTransaction({transactionId, acctId, transDate, checkNumber, transAmt, description, inDescription, transferAcctId, decision})
    }

    // const wrapperUpdate = (trans) => {
    //     console.log(trans)
    //     updateTransaction(trans)
    //     // updateTransaction(transactionId, acctId, transDate, checkNumber, transAmt, description, inDescription, transferAcctId, decision)
    // }

    return (
        <>
            {showEditTransaction && <EditUploadedCheckingTransaction
                inTransactionId = {updTransactionId}
                acctId={updAcctId}
                acctName={updAcctName}
                inTransDate={updTransDate}
                inCheckNumber={updCheckNumber}
                inTransAmt={updTransAmt}
                inpDescription={updDescription}
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
                        <th>Trans Date</th>
                        <th>Check</th>
                        <th>Description</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(trans => (
                        <tr key={trans.transactionId}>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(trans.transDate))}
                            </td>
                            <td>{trans.checkNumber === 0 ? '' : trans.checkNumber}</td>
                            <td>{trans.inDescription}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(trans.transAmt).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>
                            <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        console.log('Here in Accept 1')
                                        console.log(trans.transAmt)
                                        console.log(trans.description)
                                        console.log(trans.inDescription)
                                        // saveTransaction({ transactionId, acctId, transDate, checkNumber, transAmt, description, inDescription, transferAcctId, decision })
                                        acceptTrans(trans.transactionId, trans.acctId, trans.transDate, trans.checkNumber, trans.transAmt, trans.description, trans.inDescription, trans.transferAcctId, updDecision)
                                    }}>Accept</Button>
                                {' '}
                                <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        initEditTransaction(trans.transactionId, trans.acctId, acctName, trans.transDate, trans.checkNumber, trans.transAmt, trans.description, trans.transferAcctId, selOptions, allOptions)
                                    }}>Edit</Button>
                                {' '}
                                <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        deleteTransaction(trans.transactionId)
                                    }}>Reject</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default UploadedCheckingTransactionTable
