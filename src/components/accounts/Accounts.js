import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import PageHeader from '../PageHeader'
import AddAccount from '../transactions/AddAccount'
import NewPagination from '../util/NewPagination'
import AccountTable from './AccountTable'

const Accounts = () => {
    const [acctData, setAcctData] = useState([])
    useEffect(() => {
        fetchAcctData()
    }, [])

    const [numberOfAccts, setNumberOfAccts] = useState(0)
    useEffect(() => {
        setNumberOfAccts(acctData.length)
    }, [acctData])

    const [currentPage, setCurrentPage] = useState(1);
    const [acctsPerPage] = useState(10);

    const indexOfLastAcct = currentPage * acctsPerPage;
    const indexOfFirstAcct = indexOfLastAcct - acctsPerPage;
    const currentAccts = acctData.slice(indexOfFirstAcct, indexOfLastAcct);

    const [showAddAccount, setShowAddAccount] = useState(false)
    const [parentAccts, setParentAccts] = useState([])
    useEffect(() => {
        fetchParentAccts()
    }, [])

    const [statusOptions] = useState([
        {
            value: 0,
            label: "ACTIVE"
        },
        {
            value: 1,
            label: "INACTIVE"
        }
    ])

    const [acctTypes] = useState([
        {
            value: -1,
            label: "Select account type..."
        },
        {
            value: 0,
            label: "CHECKING"
        },
        {
            value: 1,
            label: "SAVINGS"
        },
        {
            value: 2,
            label: "CREDIT"
        },
        {
            value: 3,
            label: "INVESTMENT"
        },
        {
            value: 4,
            label: "OTHER"
        },
        {
            value: 5,
            label: "AUTOLOAN"
        },
        {
            value: 6,
            label: "MORTGAGE"
        },
        {
            value: 7,
            label: "NET"
        }
    ])


    const fetchAcctData = async () => {
        const res = await fetch('http://localhost:8080/api/v1/allaccounts')
        const data = await res.json()
        setAcctData(data)
    }

    const fetchParentAccts = async () => {
        const res = await fetch('http://localhost:8080/api/v1/parent-accounts')
        const data = await res.json()
        setParentAccts(data.map((account, index) => ({ value: account.acctId, label: account.acctName })))
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleAddAccount = async (account) => {
        await fetch('http://localhost:8080/api/v1/add-account', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(account),
        })
        await fetchAcctData()
        setShowAddAccount(false)
    }

    const hideAddAccount = () => {
        setShowAddAccount(false)
    }

    return (
        <>
            <PageHeader title={'Accounts'}/>
            <Button variant="primary" 
                onClick={() => {
                    setShowAddAccount(!showAddAccount)
                }}>Add Account</Button>
            {showAddAccount && 
            <AddAccount 
                parentAccts={parentAccts}
                acctTypes={acctTypes}
                statusOptions={statusOptions}
                handleAddAccount={handleAddAccount}
                hideAddAccount={hideAddAccount} /> }
            <AccountTable accounts={currentAccts} />
                  <NewPagination
        currentPage={currentPage}
        totalCount={numberOfAccts}
        siblingCount={1}
        pageSize={acctsPerPage}
        onPageChange={paginate}/>

        </>
    )
}

export default Accounts
