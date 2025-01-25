import React from 'react'
import Table from 'react-bootstrap/Table'

const InvestmentPositionsTable = ({ positions, balanceAmt, changeInPositionsValue, accountValue }) => {
    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Description</th>
                        <th style={{ textAlign: 'right' }}>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Price</th>
                        <th style={{ textAlign: 'right' }}>Change in Price</th>
                        <th style={{ textAlign: 'right' }}>Change in Value</th>
                        <th style={{ textAlign: 'right' }}>Current Value</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map(position => (
                        <tr key={position.acctPositionId}>
                            <td>{position.ticker}</td>
                            <td>{position.description}</td>
                            <td style={{ textAlign: 'right' }}>{position.quantity ? parseFloat(position.quantity).toFixed(4) : ''}</td>
                            <td style={{ textAlign: 'right' }}>{position.currentQuote ? parseFloat(position.currentQuote).toFixed(4) : ''}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(position.changeInPrice).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(position.changeInValue).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(position.currentValue).toFixed(2)}</td>
                        </tr>
                    ))}
                        <tr>
                            <td>Cash Balance</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(balanceAmt).toFixed(2)}</td>
                        </tr>
                </tbody>
                <tfoot>
                <tr>
                            <th>Account Balance</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th style={{ textAlign: 'right' }}>{parseFloat(changeInPositionsValue).toFixed(2)}</th>
                            <th style={{ textAlign: 'right' }}>{parseFloat(accountValue).toFixed(2)}</th>
                        </tr>
                </tfoot>
            </Table>
        </>
    )

}

export default InvestmentPositionsTable
