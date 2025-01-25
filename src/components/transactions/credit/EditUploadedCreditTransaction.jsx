import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const EditUploadedCreditTransaction = ({ inTransactionId, acctId, acctName, inTransDate, inTransAmt, inpDescription, inTransferAcctId, transferAcctName, selOptions, allOptions, hideEditTransaction, updateTransaction }) => {

    const [decision, setDecision] = useState(false)

    const [transactionId, setTransactionId] = useState(0)
    useEffect(() => {
        setTransactionId(inTransactionId)
    }, [inTransactionId])

    const [description, setDescription] = useState('')
    const [inDescription, setInDescription] = useState('')
    useEffect(() => {
        setDescription(inpDescription)
        setInDescription(inpDescription)
    }, [inpDescription])

    const [transAmt, setTransAmt] = useState(0)
    useEffect(() => {
        setTransAmt(inTransAmt)
    }, [inTransAmt])

    const [transferAcctId, setTransferAcctId] = useState(0)
    useEffect(() => {
        setTransferAcctId(inTransferAcctId)
    }, [inTransferAcctId])

    const [transDate, setTransDate] = useState('')
    useEffect(() => {
        setTransDate(inTransDate)
    }, [inTransDate])

    const saveTransaction = (transactionId, acctId, transDate, transAmt, description, inDescription, transferAcctId, decision) => {
        console.log("Decision in saveTransaction")
        console.log(decision)
        updateTransaction(transactionId, acctId, transDate, transAmt, description, inDescription, transferAcctId, decision)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('Decision in obsubmit')
        console.log(decision)
        saveTransaction({ transactionId, acctId, transDate, transAmt, description, inDescription, transferAcctId, decision })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formAcctName">
                            <Form.Label>Account</Form.Label>
                            <Form.Control custom as="select" defaultValue={acctName} >
                                {selOptions.map(item => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicPassword">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control type="date"
                                value={transDate}
                                onChange={(e) => setTransDate(e.target.value)} />
                            <Form.Control type="hidden" value={transactionId} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAmount">
                            <Form.Label>Transaction Amount</Form.Label>
                            <Form.Control type="text" value={transAmt}
                                onChange={(e) => setTransAmt(e.target.value)}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <Form.Control type="hidden" value={inDescription} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDecision">
                            <Form.Check
                                type="checkbox"
                                value={decision}
                                label="Remember"
                                onChange={(e) => setDecision(!decision)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formTransferAcct">
                            <Form.Label>Transfer Account</Form.Label>
                            <Form.Control custom as="select"
                                onChange={(e) => setTransferAcctId(e.target.value)}
                                defaultValue={inTransferAcctId}
                            >
                                <option
                                    key={0}
                                    value={0}
                                >
                                    {'Select account...'}
                                </option>

                                {allOptions.map(item => (
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
                            saveTransaction({ transactionId, acctId, transDate, transAmt, description, inDescription, transferAcctId, decision })
                        }}>Update</Button>
                    {' '}
                    <Button variant="secondary" type="submit"
                        onClick={() => {
                            hideEditTransaction()
                        }}                    >Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EditUploadedCreditTransaction
