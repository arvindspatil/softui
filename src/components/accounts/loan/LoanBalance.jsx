import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import PageHeader from '../../PageHeader'

const LoanBalance = () => {
    const [balances, setBalances] = useState([])
    useEffect(() => {
        fetchAcctBalances()
    }, [])

    const fetchAcctBalances = async () => {
        const res = await fetch('http://localhost:8080/api/v1/loan-bal')
        const data = await res.json()
        const balList = [];
        for(var k in data) {
            balList.push(
                <tr>
                    <td>{k}</td>
                    <td style={{ textAlign: 'right' }}>{parseFloat(data[k]).toFixed(2)}</td>
                </tr>)
        }
        setBalances(balList)
    }

    return (
        <>
            <PageHeader  title={'Loan Account Balance'}/>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th style={{ textAlign: 'right' }}>Balance</th>
                    </tr>
                </thead>
                <tbody>{balances}</tbody>
                </Table>
        </>
    )
}

export default LoanBalance
