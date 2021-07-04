import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import { Link } from 'react-router-dom'

const LeftTopNav = () => {
    return (
        <>
            <Accordion className="flex-column col-md-2 d-none d-md-block bg-light sidebar">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="0">
                            Overview
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/home">Historical View</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/chart-checking-data">Checkings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/chart-savings-data">Savings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/chart-credit-data">Credit Cards</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/chart-investment-data">Investments</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/chart-loans-data">Loans and Mortgages</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="1">
                            Balances
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/checking-bal">Checkings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/saving-bal">Savings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/credit-bal">Credit Cards</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/investment-bal">Investments</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/loan-bal">Loans and Mortgages</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>


                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="2">
                            Data Warehouse
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Accounts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/fetch-securities">Securities</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="3">
                            Activity
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/checking-transactions">Checking Accounts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/savings-transactions">Savings Accounts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/credit-transactions">Credit Cards</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/investment-transactions">Investments</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/loan-transactions">Loan Accounts</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="4">
                            Bills
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/home">Add a Bill</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Pay a Bill</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>

                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="5">
                            Reconcile
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                        <Card.Body>
                        <Nav.Item>
                                <Nav.Link href="/account-recon">View Reminders</Nav.Link>
                            </Nav.Item>
                        <Nav.Item>
                                <Nav.Link href="/checking-upload-transactions">Checking Uploads</Nav.Link>
                            </Nav.Item>
                        <Nav.Item>
                                <Nav.Link href="/savings-upload-transactions">Savings Uploads</Nav.Link>
                            </Nav.Item>
                        <Nav.Item>
                                <Nav.Link href="/credit-upload-transactions">Credit Uploads</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="6">
                            Reports
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="6">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/home">Savings Reports</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Expense Reports</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Business Reports</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Investment Reports</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Realized Gains</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Unrealized Gains</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Performance Reports</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Link} variant="link" eventKey="7">
                            Archieve
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="7">
                        <Card.Body>
                            <Nav.Item>
                                <Nav.Link href="/home">Backup</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/accounts">Restore</Nav.Link>
                            </Nav.Item>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default LeftTopNav
