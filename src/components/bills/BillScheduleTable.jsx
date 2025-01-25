import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const BillScheduleTable = ({ billSchedules, deleteBillSchedule }) => {
    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Payee</th>
                        <th>Start Date</th>
                        <th>Grace Period</th>
                        <th>Frequency</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {billSchedules.map(billSchedule => (
                        <tr key={billSchedule.scheduleId}>
                            <td>{billSchedule.payee}</td>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(billSchedule.startDate))}
                            </td>
                            <td>{billSchedule.gracePeriod}</td>
                            <td>{billSchedule.frequencyType}</td>
                            <td style={{ textAlign: 'center' }}>
                            <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        console.log(billSchedule.scheduleId)
                                        deleteBillSchedule(billSchedule.scheduleId)
                                    }}>Delete</Button>
                            </td>
                        </tr>))}
                </tbody>
                </Table>
        </>
    )
}

export default BillScheduleTable
