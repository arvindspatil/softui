import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import PageHeader from '../PageHeader'
import Table from 'react-bootstrap/Table'
import EditAccountRecon from './EditAccountRecon'
import NewPagination from '../util/NewPagination'

const AccountRecons = () => {
    const [acctData, setAcctData] = useState([])
    useEffect(() => {
        fetchAcctData()
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [acctsPerPage] = useState(10);
    const [numberOfAccts, setNumberOfAccts] = useState(0)
    useEffect(() => {
        setNumberOfAccts(acctData.length)
    }, [acctData])

    const indexOfLastAcct = currentPage * acctsPerPage;
    const indexOfFirstAcct = indexOfLastAcct - acctsPerPage;
    const currentAccts = acctData.slice(indexOfFirstAcct, indexOfLastAcct);

    const [updAcctId, setUpdAcctId] = useState(0)
    const [updAcctName, setUpdAcctName] = useState('')
    const [updReconDate, setUpdReconDate] = useState('')
    const [showEditTransaction, setShowEditTransaction] = useState(false)
    useEffect(() => {
        setShowEditTransaction(false)
    }, [acctData])

    const hideEditAcctRecon = () => {
        setShowEditTransaction(false)
    }

    const updateAcctRecon = async (account) => {
        console.log(account)
        await fetch('http://localhost:8080/api/v1/update-acct-recon', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(account),
        })
        await fetchAcctData()
    }

    const fetchAcctData = async () => {
        const res = await fetch('http://localhost:8080/api/v1/account-recon')
        const data = await res.json()
        setAcctData(data)
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const initEditTransaction = (acctId, acctName, reconDate) => {
        setUpdAcctId(acctId)
        setUpdAcctName(acctName)
        setUpdReconDate(reconDate)
        setShowEditTransaction(true)
    }

    return (
        <>
            <PageHeader title={'Account Reconcile Dates'}/>
            {showEditTransaction && <EditAccountRecon
                acctId={updAcctId}
                acctName={updAcctName}
                inReconDate={updReconDate}
                hideEditAcctRecon={hideEditAcctRecon}
                updateAcctRecon={updateAcctRecon}
                />}

            <Table className='mt-3' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAccts.map(account => (
                        <tr key={account.acctId}>
                            <td>{account.acctId}</td>
                            <td>{account.acctName}</td>
                            <td>{account.acctType}</td>
                            <td>{account.status}</td>
                            <td>
                                {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                .format(new Date(account.reconDate))}
                            </td>


                            <td style={{ textAlign: 'center' }}>
                                <Button variant="outline-info" size="sm"
                                    onClick={() => {
                                        initEditTransaction(account.acctId, account.acctName, account.reconDate)
                                    }}>Edit</Button>
                            </td>
                        </tr>))}
                </tbody>
                </Table>
                <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfAccts}
                        siblingCount={1}
                        pageSize={acctsPerPage}
                        onPageChange={paginate} />
        </>
    )
}

export default AccountRecons
