import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const AddSecurity = ({ securityTypes, handleAddSecurity, hideAddSecurity }) => {

    const [ticker, setTicker] = useState(null)
    const [description, setDescription] = useState(null)
    const [securityType, setSecurityType] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()
        handleAddSecurity({ ticker, description, securityType })
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                        <Form.Group as={Col} controlId="formTicker">
                            <Form.Label>Ticker</Form.Label>
                            <Form.Control type="text" placeholder="Ticker" onChange={(e) => setTicker(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSecType">
                            <Form.Label>Security Type</Form.Label>
                            <Form.Control custom as="select" onChange={(e) => setSecurityType(e.target.value)}>
                                {securityTypes.map(item => (
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
                            handleAddSecurity({ ticker, description, securityType })
                        }}>Add</Button>
                    {' '}
                    <Button variant="secondary" type="submit"
                        onClick={() => {
                            hideAddSecurity()
                        }}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddSecurity
