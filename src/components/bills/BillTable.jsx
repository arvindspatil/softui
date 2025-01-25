import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import EditBill from './EditBill'

const BillTable = ({ bills, updateBill }) => {
    const [showEditBill, setShowEditBill] = useState(false)
    useEffect(() => {
        setShowEditBill(false)
    }, [bills])

    const [updBillId, setUpdBillId] = useState(0)
    const [updScheduleId, setUpdScheduleId] = useState(0)
    const [updPayee, setUpdPayee] = useState('')
    const [updStmtDate, setUpdStmtDate] = useState('')
    const [updDueDate, setUpdDueDate] = useState('')
    const [updPayDate, setUpdPayDate] = useState('')
    const [updAmount, setUpdAmount] = useState(0)
    const [updStatus, setUpdStatus] = useState('')

    const hideEditBill = () => {
        setShowEditBill(false)
    }

    const initEditBill = (billId, scheduleId, payee, stmtDate, dueDate, payDate, amount, status) => {
        setUpdBillId(billId)
        setUpdScheduleId(scheduleId)
        setUpdPayee(payee)
        setUpdStmtDate(stmtDate)
        setUpdDueDate(dueDate)
        setUpdPayDate(payDate)
        setUpdAmount(amount)
        setUpdStatus(status)
        setShowEditBill(true)
    }

    return (
        <>
            {showEditBill && <EditBill
                inBillId = {updBillId}
                inScheduleId = {updScheduleId} 
                inPayee = {updPayee}
                inStmtDate = {updStmtDate}
                inDueDate = {updDueDate} 
                inPayDate = {updPayDate}
                inAmount = {updAmount} 
                inStatus = {updStatus} 
                hideEditBill = {hideEditBill} 
                updateBill = {updateBill}
            />}

            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Payee</th>
                        <th>Statement Date</th>
                        <th>Due Date</th>
                        <th>Pay Date</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map(bill => (
                        <tr key={bill.billId}>
                            <td>{bill.payee}</td>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(bill.stmtDate))}
                            </td>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(bill.dueDate))}
                            </td>
                            <td>{
                                ( bill.payDate ? new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(bill.payDate)) : "" )
                                }
                            </td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(bill.amount).toFixed(2)}</td>
                            <td>{bill.status}</td>
                            <td style={{ textAlign: 'center' }}>
                            <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        initEditBill(bill.billId, bill.scheduleId, bill.payee, bill.stmtDate, bill.dueDate, bill.payDate, bill.amount, bill.status)
                                    }}>Edit</Button>
                            </td>
                        </tr>))}
                </tbody>
                </Table>
        </>
    )
}

export default BillTable
