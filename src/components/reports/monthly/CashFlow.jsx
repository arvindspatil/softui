import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PageHeader from '../../PageHeader'
import NewPagination from '../../util/NewPagination'
import CashFlowTable from './CashFlowTable'


const CashFlow = () => {

    const [accounts, setAccounts] = useState([])
    const [allAccounts, setAllAccounts] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            const accountsList = await fetchAccounts()
            setAccounts(accountsList.filter((acct) => acct.acctType === "OTHER"))
            setAllAccounts(accountsList.filter((acct) => (acct.acctType === "CHECKING" ||
                acct.acctType === 'SAVINGS' ||
                acct.acctType === 'CREDIT' ||
                acct.acctType === 'INVESTMENT' ||
                acct.acctType === 'AUTOLOAN' ||
                acct.acctType === 'MORTGAGE' ||
                acct.acctType === 'OTHER' )))
        }
        getAccounts()
    }, [])

    const [selOptions, setSelOptions] = useState([])
    useEffect(() => {
        const acctOptions = accounts.map((account, index) => ({ value: account.acctId, label: account.acctName }))
        setSelOptions(acctOptions)
    }, [accounts])

    const [allOptions, setAllOptions] = useState([])
    useEffect(() => {
        const acctOptions = allAccounts.map((account, index) => ({ value: account.acctId, label: account.acctName }))
        setAllOptions(acctOptions)
    }, [allAccounts])

    const [title] = useState('Cash Flow')
    const [selectedAccount, setSelectedAccount] = useState(0);

    // Fetch Tasks
    const fetchAccounts = async () => {
        const res = await fetch('http://localhost:8080/api/v1/allaccounts')
        const data = await res.json()
        return data
    }

    function onSelectAccount(event) {
        setSelectedAccount(event.target.value);
    }

    const [balanceData, setBalanceData] = useState([])
    const fetchBalanceData = async (id) => {
        const res = await fetch(`http://localhost:8080/api/v1/cashflow/${id}`)
        const data = await res.json()
        setBalanceData(data.balanceData)
        return data
    }

    function onFormSubmit(event) {
        event.preventDefault();
        var data = fetchBalanceData(selectedAccount);
        return data
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [numberOfRecords, setNumberOfRecords] = useState(0)
    useEffect(() => {
        setNumberOfRecords(balanceData.length)
    }, [balanceData])

    // Get current posts
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = balanceData.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <PageHeader title={title} />
            <Form.Group>
                <Form.Control custom as="select" onChange={onSelectAccount}>
                    <option
                        key={selectedAccount}
                        value={selectedAccount}
                    >
                        {'Select account...'}
                    </option>

                    {selOptions.map(item => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={onFormSubmit}>Submit</Button>
            {' '}
            <Button variant="secondary">Cancel</Button>
            {' '}
            {balanceData.length > 0 ? (
                <>
                    <CashFlowTable datarows={currentRecords}/>
                    <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfRecords}
                        siblingCount={1}
                        pageSize={recordsPerPage}
                        onPageChange={paginate} />
                </>
            ) : ('')}
        </>
    )
}

export default CashFlow
