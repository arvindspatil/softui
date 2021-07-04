import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import AddCreditTransaction from './AddCreditTransaction'
// import CreditTransactionTable from './CreditTransactionTable'
// import UploadedCreditTransactionTable from './UploadedCreditTransactionTable'
import PageHeader from '../../PageHeader'
import Pagination from '../../util/MyPagination'
import LoanTransactionTable from './LoanTransactionTable'
import AddLoanTransaction from './AddLoanTransaction'


const LoanTransactions = () => {

    const [accounts, setAccounts] = useState([])
    const [allAccounts, setAllAccounts] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            const accountsList = await fetchAccounts()
            setAccounts(accountsList.filter((acct) => (acct.acctType === "AUTOLOAN" || acct.acctType == "MORTGAGE")))
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
        setTransactions(data.loanTransactions)
        return data
    }

    // Delete Task
    const deleteTransaction = async (id) => {
        await fetch(`http://localhost:8080/api/v1/delete-loan-trans/${selectedAccount}/${id}`, {
            method: 'DELETE',
        })
        await fetchTransactions(selectedAccount)
    }

    function onFormSubmit(event) {
        event.preventDefault();
        setShowAddTransaction(false)
        var data = fetchTransactions(selectedAccount);
        return data
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);

    // Get current posts
    const indexOfLastTrans = currentPage * transactionsPerPage;
    const indexOfFirstTrans = indexOfLastTrans - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTrans, indexOfLastTrans);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const addTransaction = async (transaction) => {
        await fetch('http://localhost:8080/api/v1/add-loan-trans', {
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
        await fetch('http://localhost:8080/api/v1/update-loan-trans', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transaction),
        })
        await fetchTransactions(selectedAccount)
    }

    return (
        <>
            <PageHeader title={title} />
            <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Example file input" />
  </Form.Group>
  <div className="mb-3">
  <label for="formFile" class="form-label">Default file input example</label>
  <input className="form-control" type="file" id="formFile" />
</div>
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
            <Button variant="link"
                onClick={() => {
                    setShowAddTransaction(!showAddTransaction)
                }}>Add Transaction</Button>
            {' '}
            {showAddTransaction && <AddLoanTransaction
                inAcctId={selectedAccount}
                selOptions={selOptions}
                allOptions={allOptions}
                onAddTransaction={addTransaction}
                hideAddTransaction={hideAddTransaction} />}
            {!showAddTransaction && transactions.length > 0 ? (
                <>
                    <LoanTransactionTable
                        transactions={currentTransactions}
                        deleteTransaction={deleteTransaction}
                        acctName={selectedAccount}
                        selOptions={selOptions}
                        allOptions={allOptions}
                        updateTransaction={updateTransaction} />
                    <Pagination
                        transactionsPerPage={transactionsPerPage}
                        totalTransactions={transactions.length}
                        paginate={paginate}
                    />
                </>
            ) : ('')}

        </>
    )
}

export default LoanTransactions
