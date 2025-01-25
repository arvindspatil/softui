import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PageHeader from '../../PageHeader'
import InvestmentPositionsTable from './InvestmentPositionsTable'

const InvestmentPositions = () => {

    const [accounts, setAccounts] = useState([])
    const [allAccounts, setAllAccounts] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            const accountsList = await fetchAccounts()
            setAccounts(accountsList.filter((acct) => acct.acctType === "INVESTMENT"))
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

    const [title, setTitle] = useState('Investment Account Details')

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

    const [positions, setPositions] = useState([])
    const [balanceAmt, setBalanceAmt] = useState(0)
    const [accountValue, setAccountValue] = useState(0)
    const [changeInPositionsValue, setChangeInPositionsValue] = useState(0)
    const fetchAcctDetails = async (id) => {
        const res = await fetch(`http://localhost:8080/api/v1/fetch-acct-positions/${id}`)
        const data = await res.json()
        setPositions(data.positions)
        setBalanceAmt(data.balanceAmt)
        setAccountValue(data.accountValue)
        setChangeInPositionsValue(data.changeInPositionsValue)
    }

    function onFormSubmit(event) {
        event.preventDefault();
        fetchAcctDetails(selectedAccount);
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
            {positions.length > 0 ? (
                <>
                    <InvestmentPositionsTable
                        positions={positions}
                        balanceAmt={balanceAmt}
                        changeInPositionsValue={changeInPositionsValue}
                        accountValue={accountValue} />
                </>
            ) : ('')}
        </>
    )
}

export default InvestmentPositions
