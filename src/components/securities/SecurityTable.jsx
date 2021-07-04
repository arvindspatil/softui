import React from 'react'
import Table from 'react-bootstrap/Table'

const SecurityTable = ({ securities }) => {
    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {securities.map(security => (
                        <tr key={security.ticker}>
                            <td>{security.ticker}</td>
                            <td>{security.description}</td>
                            <td>{security.securityType}</td>
                        </tr>))}
                </tbody>
                </Table>
        </>
    )
}

export default SecurityTable
