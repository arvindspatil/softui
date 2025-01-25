import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const CashFlowTable = ({ datarows }) => {

    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Opening Balance</th>
                        <th>Debits</th>
                        <th>Credits</th>
                        <th>Closing Balance</th>
                        <th>Net Change</th>
                    </tr>
                </thead>
                <tbody>
                    {datarows.map((datarow, index) => (
                        <tr key={index}>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(datarow.transDate))}
                            </td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(datarow.openingBalance).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(datarow.debit).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(datarow.credit).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(datarow.closingBalance).toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(datarow.netChange).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default CashFlowTable
