import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PageHeader from '../PageHeader'
import Pagination from '../util/MyPagination'
import AddSavingsTransaction from './AddSavingsTransaction'
import SavingsTransactionTable from './SavingsTransactionTable'
import UploadedSavingsTransactionTable from './UploadedSavingsTransactionTable'
import NewPagination from '../util/NewPagination'

const SavingsTransactions = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [accounts, setAccounts] = useState([])
    const [allAccounts, setAllAccounts] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            const accountsList = await fetchAccounts()
            setAccounts(accountsList.filter((acct) => acct.acctType === "SAVINGS"))
            setAllAccounts(accountsList.filter((acct) => (acct.acctType === "CHECKING" ||
                acct.acctType === 'SAVINGS' ||
                acct.acctType === 'CREDIT' ||
                acct.acctType === 'INVESTMENT' ||
                acct.acctType === 'AUTOLOAN' ||
                acct.acctType === 'MORTGAGE')))
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

    const [showAddTransaction, setShowAddTransaction] = useState(false)
    const [title, setTitle] = useState('Account Activity')
    useEffect(() => {
        setTitle(showAddTransaction ? "Add Transaction" : "Account Activity")
    }, [showAddTransaction])

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
        const res = await fetch(`http://localhost:8080/api/v1/transactions/${id}`)
        const data = await res.json()
        for (var k in data) {
            console.log(k);
            console.log(data[k])
        }
        setTransactions(data.savTransactions)
        return data
    }

    const [uploadedTransactions, setUploadedTransactions] = useState([])
    const fetchUploadedTransactions = async (id) => {
        const res = await fetch(`http://localhost:8080/api/v1/uploaded-transactions/${id}`)
        const data = await res.json()
        setUploadedTransactions(data.transactions)
        return data
    }

    // Delete Task
    const deleteTransaction = async (id) => {
        await fetch(`http://localhost:8080/api/v1/delete-savings-trans/${selectedAccount}/${id}`, {
            method: 'DELETE',
        })
        await fetchTransactions(selectedAccount)
    }

    // Delete Task
    const rejectTransaction = async (id) => {
        await fetch(`http://localhost:8080/api/v1/delete-uploaded-savings-trans/${selectedAccount}/${id}`, {
            method: 'DELETE',
        })
        await fetchUploadedTransactions(selectedAccount)
    }


    function onFormSubmit(event) {
        event.preventDefault();
        setShowAddTransaction(false)
        var data = fetchTransactions(selectedAccount);
        fetchUploadedTransactions(selectedAccount)
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

    const [currentUpdPage, setCurrentUpdPage] = useState(1);

    // Get current posts
    const indexOfLastUpdTrans = currentUpdPage * transactionsPerPage;
    const indexOfFirstUpdTrans = indexOfLastUpdTrans - transactionsPerPage;
    const currentUpdTransactions = uploadedTransactions.slice(indexOfFirstUpdTrans, indexOfLastUpdTrans);

    // Change page
    const paginateUpd = (pageNumber) => {
        setCurrentUpdPage(pageNumber);
    }

    const addTransaction = async (transaction) => {
        await fetch('http://localhost:8080/api/v1/add-savings-trans', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transaction),
        })
        await fetchTransactions(selectedAccount)
        setShowAddTransaction(false)
    }

    const hideAddTransaction = () => {
        setShowAddTransaction(false)
    }

    const updateTransaction = async (transaction) => {
        await fetch('http://localhost:8080/api/v1/update-savings-trans', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transaction),
        })
        await fetchTransactions(selectedAccount)
    }

    const updAcceptTransaction = async (transaction) => {
        await fetch('http://localhost:8080/api/v1/upd-accept-savings-trans', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transaction),
        })
        await fetchTransactions(selectedAccount)
        await fetchUploadedTransactions(selectedAccount)
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
            {uploadedTransactions.length > 0 ? (
                <>
                    <Button variant="link"
                        onClick={handleShow}
                    >Accept Uploads</Button>
                    {' '}
                </>
            ) : (<></>)}
            <Button variant="link"
                onClick={() => {
                    setShowAddTransaction(!showAddTransaction)
                }}>Add Transaction</Button>
            {' '}
            {showAddTransaction && <AddSavingsTransaction
                inAcctId={selectedAccount}
                selOptions={selOptions}
                allOptions={allOptions}
                onAddTransaction={addTransaction}
                hideAddTransaction={hideAddTransaction} />}
            {!showAddTransaction && transactions.length > 0 ? (
                <>
                    <SavingsTransactionTable
                        transactions={currentTransactions}
                        deleteTransaction={deleteTransaction}
                        acctName={selectedAccount}
                        selOptions={selOptions}
                        allOptions={allOptions}
                        updateTransaction={updateTransaction} />
                    {/* <Pagination
                        transactionsPerPage={transactionsPerPage}
                        totalTransactions={transactions.length}
                        paginate={paginate}
                    /> */}
                    <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfTransactions}
                        siblingCount={1}
                        pageSize={transactionsPerPage}
                        onPageChange={paginate} />
                </>
            ) : ('')}

      {selectedAccount === 0 ? '' : (
            <Modal size="lg" show={show} onHide={handleClose} dialogClassName="mw-75">
                <Modal.Header closeButton>
                    <Modal.Title>{allOptions.filter((opt) => opt.value == selectedAccount)[0].label} - Uploaded Transactions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UploadedSavingsTransactionTable
                        transactions={currentUpdTransactions}
                        deleteTransaction={rejectTransaction}
                        acctName={selectedAccount}
                        selOptions={selOptions}
                        allOptions={allOptions}
                        updateTransaction={updAcceptTransaction} />
                    <Pagination
                        transactionsPerPage={transactionsPerPage}
                        totalTransactions={uploadedTransactions.length}
                        paginate={paginateUpd}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal> ) }
        </>
    )
}

export default SavingsTransactions
