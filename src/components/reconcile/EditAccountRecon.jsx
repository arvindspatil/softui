import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const EditAccountRecon = ({ acctId, acctName, inReconDate, hideEditAcctRecon, updateAcctRecon }) => {

    const [reconDate, setReconDate] = useState(0)
    useEffect(() => {
        setReconDate(inReconDate)
    }, [inReconDate])

    const saveAcctRecon = (acctId, reconDate) => {
        updateAcctRecon(acctId, reconDate)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        saveAcctRecon({ acctId, reconDate })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formAcctName">
                            <Form.Label>Account</Form.Label>
                            <Form.Control type="text" readOnly value={acctName}/>
                            <Form.Control type="hidden" value={acctId} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formReconDate">
                            <Form.Label>Reconcile Date</Form.Label>
                            <Form.Control type="date"
                                value={reconDate}
                                onChange={(e) => setReconDate(e.target.value)} />
                        </Form.Group>
</Form.Row>

                        <Button variant="primary"
                            onClick={() => {
                            saveAcctRecon({ acctId, reconDate })
                            }}>Update</Button>
                        {' '}
                        <Button variant="secondary" type="submit"
                            onClick={() => {
                            hideEditAcctRecon()
                            }}>Cancel</Button>
                    {/* </Form.Row> */}
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EditAccountRecon
