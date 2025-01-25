import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PageHeader from '../../PageHeader'
import NewPagination from '../../util/NewPagination'
import OtherTransactionTable from './OtherTransactionTable'


const OtherTransactions = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const [title] = useState('Account Activity')
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

    const [transactions, setTransactions] = useState([])
    const fetchTransactions = async (id) => {
        const res = await fetch(`http://localhost:8080/api/v1/other-transactions/${id}`)
        const data = await res.json()
        setTransactions(data.otherTransactions)
        return data
    }

    // Delete Task
    const deleteTransaction = async (id) => {
        await fetch(`http://localhost:8080/api/v1/delete-other-trans/${selectedAccount}/${id}`, {
            method: 'DELETE',
        })
        await fetchTransactions(selectedAccount)
    }

    function onFormSubmit(event) {
        event.preventDefault();
        var data = fetchTransactions(selectedAccount);
        return data
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);
    const [numberOfTransactions, setNumberOfTrasactions] = useState(0)
    useEffect(() => {
        setNumberOfTrasactions(transactions.length)
    }, [transactions])

    // Get current posts
    const indexOfLastTrans = currentPage * transactionsPerPage;
    const indexOfFirstTrans = indexOfLastTrans - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTrans, indexOfLastTrans);

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
            {transactions.length > 0 ? (
                <>
                    <OtherTransactionTable
                        transactions={currentTransactions}
                        deleteTransaction={deleteTransaction} />
                    <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfTransactions}
                        siblingCount={1}
                        pageSize={transactionsPerPage}
                        onPageChange={paginate} />
                </>
            ) : ('')}
        </>
    )
}

export default OtherTransactions
