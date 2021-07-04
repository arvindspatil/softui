import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const AddCreditTransaction = ({inAcctId, selOptions, allOptions, onAddTransaction, hideAddTransaction}) => {
    const [acctId, setAcctId] = useState(0);
    useEffect(() => {
        setAcctId(inAcctId)
    }, [inAcctId])

    const [transDate, setTransDate] = useState('')
    const [transAmt, setTransAmt] = useState('')
    const [description, setDescription] = useState('')
    const [transferAcctId, setTransferAcctId] = useState(0)
  
    const onSubmit = (e) => {
        e.preventDefault()
        onAddTransaction({ acctId, transDate, transAmt, description, transferAcctId })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
        <Form onSubmit={onSubmit}>
            <Form.Row>

            <Form.Group as={Col} controlId="formAcctId">
                            <Form.Label>Account</Form.Label>
                            <Form.Control custom as="select" 
                                            onChange={(e) => setAcctId(e.target.value)}
                             defaultValue={inAcctId}
                             >
                                <option
                                    key={0}
                                    value={0}
                                >
                                    {'Select account...'}
                                </option>

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
            <Form.Group as={Col} controlId="formTransDate">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control type="date"
                                onChange={(e) => setTransDate(e.target.value)} />
                        </Form.Group>
            <Form.Group as={Col} controlId="formAmount">
                <Form.Label>Transaction Amount</Form.Label>
                <Form.Control type="text"  onChange={(e) => setTransAmt(e.target.value)}/>
            </Form.Group>

            </Form.Row>
 
            <Form.Row>
            <Form.Group as={Col} controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description"  onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formTransferAcct">
                <Form.Label>Transfer Account</Form.Label>
                <Form.Control custom as="select"  onChange={(e) => setTransferAcctId(e.target.value)} >
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
                onAddTransaction({ acctId, transDate, transAmt, description, transferAcctId })
            }}>Add</Button>
            {' '}
            <Button variant="secondary" type="submit"
                        onClick={() => {
                            hideAddTransaction()
                        }}                    >Cancel</Button>
        </Form>
            </Card.Body>
        </Card>
    )
}

export default AddCreditTransaction
