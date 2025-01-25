import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const AddInvestmentTransaction = ({ inAcctId, selOptions, allOptions, onAddTransaction, hideAddTransaction }) => {
    const [acctId, setAcctId] = useState(0);
    useEffect(() => {
        setAcctId(inAcctId)
    }, [inAcctId])

    const [transDate, setTransDate] = useState('')
    const [transactionType, setTransactionType] = useState(null)

    const [ticker, setTicker] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [quote, setQuote] = useState(null)
    const [description, setDescription] = useState('')
    const [transAmt, setTransAmt] = useState('')
    const [transferAcctId, setTransferAcctId] = useState(0)
    const [showTicker, setShowTicker] = useState(false)
    const [showQuantity, setShowQuantity] = useState(false)
    const [showQuote, setShowQuote] = useState(false)
    const [showTransAmt, setShowTransAmt] = useState(false)
    const [showTransferAcct, setShowTransferAcct] = useState(false)

    useEffect(() => {
        setShowTicker(
            transactionType && (transactionType == 1 || transactionType == 2 || transactionType == 4
                || transactionType == 5 || transactionType == 7 || transactionType == 8 
                || transactionType == 9 || transactionType == 10)
        )

        setShowQuantity(
            transactionType && (transactionType == 1 || transactionType == 2 || transactionType == 5
                || transactionType == 7 || transactionType == 8 || transactionType == 9 || transactionType == 10)
        )

        setShowQuote(
            transactionType && (transactionType == 2 || transactionType == 8 || transactionType == 10)
        )

        setShowTransAmt(
            transactionType && (transactionType == 1 || transactionType == 2 || transactionType == 3
                || transactionType == 4 || transactionType == 5 || transactionType == 6 
                || transactionType == 7 || transactionType == 8 || transactionType == 9 
                || transactionType == 10 || transactionType == 11 || transactionType == 12 || transactionType == 13)
        )

        setShowTransferAcct(
            transactionType && (transactionType == 11 || transactionType == 12)
        )
    }, [transactionType])

    const [transTypes] = useState([
        {
            value: -1,
            label: "Select account type..."
        },
        {
            value: 0,
            label: "OTHER"
        },
        {
            value: 1,
            label: "ADD"
        },
        {
            value: 2,
            label: "BUY"
        },
        {
            value: 3,
            label: "DEPOSIT"
        },
        {
            value: 4,
            label: "DIVIDEND"
        },
        {
            value: 5,
            label: "ENDING_BALANCE"
        },
        {
            value: 6,
            label: "INTEREST"
        },
        {
            value: 7,
            label: "OPENING_BALANCE"
        },
        {
            value: 8,
            label: "REINVEST"
        },
        {
            value: 9,
            label: "REMOVE"
        },
        {
            value: 10,
            label: "SELL"
        },
        {
            value: 11,
            label: "XIN"
        },
        {
            value: 12,
            label: "XOUT"
        },
        {
            value: 13,
            label: "WITHDRAW"
        }
    ])

    const onSubmit = (e) => {
        e.preventDefault()
        onAddTransaction({ acctId, transDate, transactionType, ticker, quantity, quote, description, transAmt, transferAcctId })
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
                        <Form.Group as={Col} controlId="formTransactionType">
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Control custom as="select"
                                onChange={(e) => setTransactionType(e.target.value)}>
                                {transTypes.map(item => (
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

                    <Form.Row>
                        {showTicker &&
                            <Form.Group as={Col} controlId="formTicker">
                                <Form.Label>Ticker</Form.Label>
                                <Form.Control type="text" placeholder="Ticker" onChange={(e) => setTicker(e.target.value)} />
                            </Form.Group>}

                        {showQuantity &&
                            <Form.Group as={Col} controlId="formQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="text" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
                            </Form.Group>}

                            {showQuote &&
                            <Form.Group as={Col} controlId="formQuote">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Price" onChange={(e) => setQuote(e.target.value)} />
                            </Form.Group>}
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        {showTransAmt &&
                            <Form.Group as={Col} controlId="formAmount">
                                <Form.Label>Transaction Amount</Form.Label>
                                <Form.Control type="text" onChange={(e) => setTransAmt(e.target.value)} />
                            </Form.Group>}

                            {showTransferAcct &&
                        <Form.Group as={Col} controlId="formTransferAcct">
                            <Form.Label>Transfer Account</Form.Label>
                            <Form.Control custom as="select" onChange={(e) => setTransferAcctId(e.target.value)} >
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
                        </Form.Group>}

                    </Form.Row>

                    <Button variant="primary"
                        onClick={() => {
                            onAddTransaction({ acctId, transDate, transactionType, ticker, quantity, quote, description, transAmt, transferAcctId })
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

export default AddInvestmentTransaction
