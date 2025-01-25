import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import PageHeader from '../../PageHeader'

const InvestmentBalance = () => {
    const [balances, setBalances] = useState([])
    useEffect(() => {
        fetchAcctBalances()
    }, [])

    const [totalBalance, setTotalBalance] = useState(0)

    const fetchAcctBalances = async () => {
        const res = await fetch('http://localhost:8080/api/v1/investment-bal')
        const data = await res.json()
        const balList = [];
        var total = 0;
        for(var k in data) {
            balList.push(
                <tr>
                    <td>{k}</td>
                    <td style={{ textAlign: 'right' }}>{parseFloat(data[k]).toFixed(2)}</td>
                </tr>)
            total += data[k]
        }
        setBalances(balList)
        setTotalBalance(total)
    }

    return (
        <>
            <PageHeader  title={'Investment Account Balance'}/>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th style={{ textAlign: 'right' }}>Balance</th>
                    </tr>
                </thead>
                <tbody>{balances}</tbody>
                <tfoot>
                <tr>
                        <th>Total</th>
                        <th style={{ textAlign: 'right' }}>{parseFloat(totalBalance).toFixed(2)}</th>
                    </tr>
                </tfoot>
                </Table>
        </>
    )
}

export default InvestmentBalance
