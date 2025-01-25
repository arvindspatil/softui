import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const EditBill = ({ inBillId, inScheduleId, inPayee, inStmtDate, inDueDate, inPayDate, inAmount, inStatus, hideEditBill, updateBill }) => {

    const [statusTypes] = useState([
        {
            value: 0,
            label: "UNPAID"
        },
        {
            value: 1,
            label: "PAID"
        }
    ])

    const [billId, setBillId] = useState(0)
    useEffect(() => {
        setBillId(inBillId)
    }, [inBillId])

    const [scheduleId, setScheduleId] = useState(0)
    useEffect(() => {
        setScheduleId(inScheduleId)
    }, [inScheduleId])

    const [payee, setPayee] = useState('')
    useEffect(() => {
        setPayee(inPayee)
    }, [inPayee])

    const [stmtDate, setStmtDate] = useState('')
    useEffect(() => {
        setStmtDate(inStmtDate)
    }, [inStmtDate])

    const [dueDate, setDueDate] = useState('')
    useEffect(() => {
        setDueDate(inDueDate)
    }, [inDueDate])

    const [payDate, setPayDate] = useState('')
    useEffect(() => {
        setPayDate(inPayDate)
    }, [inPayDate])

    const [amount, setAmount] = useState(0)
    useEffect(() => {
        setAmount(inAmount)
    }, [inAmount])

    const [status, setStatus] = useState(0)
    useEffect(() => {
        setStatus(inStatus)
    }, [inStatus])

    const saveBill = (billId, scheduleId, payee, stmtDate, dueDate, payDate, amount, status) => {
        updateBill(billId, scheduleId, payee, stmtDate, dueDate, payDate, amount, status)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        saveBill({ billId, scheduleId, payee, stmtDate, dueDate, payDate, amount, status })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPayee">
                            <Form.Label>Payee</Form.Label>
                            <Form.Control type="text"
                                value={payee}
                                onChange={(e) => setPayee(e.target.value)} />
                            <Form.Control type="hidden" value={billId} />
                            <Form.Control type="hidden" value={scheduleId} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formStmtDate">
                            <Form.Label>Statement Date</Form.Label>
                            <Form.Control type="date"
                                value={stmtDate}
                                onChange={(e) => setStmtDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="forPayDate">
                            <Form.Label>Pay Date</Form.Label>
                            <Form.Control type="date"
                                value={payDate}
                                onChange={(e) => setPayDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" value={amount}
                            onChange={(e) => setAmount(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control custom as="select" defaultValue={status} 
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {statusTypes.map(item => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary"
                        onClick={() => {
                            saveBill({ billId, scheduleId, payee, stmtDate, dueDate, payDate, amount, status })
                        }}>Update</Button>
                    {' '}
                    <Button variant="secondary" type="submit"
                        onClick={() => {
                            hideEditBill()
                        }}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EditBill
