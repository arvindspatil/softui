import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const AddAccount = ({ parentAccts, acctTypes, statusOptions, handleAddAccount, hideAddAccount }) => {

    const [acctName, setAcctName] = useState(null)
    const [acctType, setAcctType] = useState(null)
    const [status, setStatus] = useState(null)
    const [parentAcctId, setParentAcctId] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()
        handleAddAccount({ acctName, acctType, status, parentAcctId })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formAcctName">
                            <Form.Label>Account Name</Form.Label>
                            <Form.Control type="text" placeholder="Account Name" onChange={(e) => setAcctName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formParentAcctId">
                            <Form.Label>Parent Account</Form.Label>
                            <Form.Control custom as="select"
                                onChange={(e) => setParentAcctId(e.target.value)}
                                // defaultValue={inAcctId}
                            >
                                <option
                                    key={0}
                                    value={0}
                                >
                                    {'Select account...'}
                                </option>

                                {parentAccts.map(item => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                    {item.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAcctType">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control custom as="select"
                                onChange={(e) => setAcctType(e.target.value)}>
                                {acctTypes.map(item => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                    {item.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control custom as="select"
                                onChange={(e) => setStatus(e.target.value)}>
                                <option
                                    key={0}
                                    value={0}
                                >
                                {'Select status...'}
                                </option>
                                {statusOptions.map(item => (
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
                            handleAddAccount({ acctName, acctType, status, parentAcctId })
                        }}>Add</Button>
                    {' '}
                    <Button variant="secondary" type="submit"
                        onClick={() => {
                            hideAddAccount()
                        }}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddAccount
