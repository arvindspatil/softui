import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const AddBillSchedule = ({ frequencyTypes, handleAddBillSchedule, hideAddBillSchedule }) => {

    const [payee, setPayee] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [gracePeriod, setGracePeriod] = useState(0)
    const [frequencyType, setFrequencyType] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()
        handleAddBillSchedule({ payee, startDate, gracePeriod, frequencyType })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                        <Form.Group as={Col} controlId="formPayee">
                            <Form.Label>Payee</Form.Label>
                            <Form.Control type="text" placeholder="Payee" onChange={(e) => setPayee(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" placeholder="Start Date"
                                onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGracePeriod">
                            <Form.Label>Grace Period</Form.Label>
                            <Form.Control type="number" placeholder="Grace Period" 
                                onChange={(e) => setGracePeriod(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formFrequencyType">
                            <Form.Label>Frequency</Form.Label>
                            <Form.Control custom as="select" onChange={(e) => setFrequencyType(e.target.value)}>
                                {frequencyTypes.map(item => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                    {item.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                    <Button variant="primary"
                        onClick={() => {
                            handleAddBillSchedule({ payee, startDate, gracePeriod, frequencyType })
                        }}>Add</Button>
                    {' '}
                    <Button variant="secondary" type="submit"
                        onClick={() => {
                            hideAddBillSchedule()
                        }}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddBillSchedule
