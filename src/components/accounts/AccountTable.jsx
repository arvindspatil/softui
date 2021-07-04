import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'

const AccountTable = ({ accounts }) => {
    useEffect(() => {
        console.log(accounts)
    }, [accounts])
        
    return (
        <>
            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Parent Account ID</th>
                        <th>Parent Account</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.acctId}>
                            <td>{account.acctId}</td>
                            <td>{account.acctName}</td>
                            <td>{account.acctType}</td>
                            <td>{account.status}</td>
                            <td>{account.parentAcctId}</td>
                            <td>{account.parentAcctName}</td>
                        </tr>))}
                </tbody>
                </Table>
        </>
    )
}

export default AccountTable
