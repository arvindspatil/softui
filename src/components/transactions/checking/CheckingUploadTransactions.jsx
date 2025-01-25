import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import PageHeader from '../../PageHeader'

const CheckingUploadTransactions = () => {

    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            const accountsList = await fetchAccounts()
            setAccounts(accountsList.filter((acct) => (acct.acctType === 'CHECKING')))
        }
        getAccounts()
    }, [])

    const [selOptions, setSelOptions] = useState([])
    useEffect(() => {
        const acctOptions = accounts.map((account, index) => ({ value: account.acctId, label: account.acctName }))
        setSelOptions(acctOptions)
    }, [accounts])

    const [title, setTitle] = useState('Activity Uploads')

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
        const res = await fetch(`http://localhost:8080/api/v1/uploaded-transactions/${id}`)
        const data = await res.json()
        setTransactions(data.transactions)
        return data
    }

    const [file, setFile] = useState('');
    const onFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const [fileName, setFileName] = useState("Choose File...");

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('acctId', selectedAccount);
        fetch('http://localhost:8080/api/v1/checking-upload-transactions', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setTransactions(data.transactions)
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    };

    return (
        <>
            <PageHeader title={title} />
            <Form onSubmit={onSubmit}>

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
                <Form.Group>
                    <Form.File id="file" label={fileName} onChange={onFileChange} custom />
                </Form.Group>
            </Form>

            <Button variant="primary" onClick={onSubmit}>Submit</Button>
            {' '}
            <Button variant="secondary">Cancel</Button>
            {' '}
            {transactions.length > 0 ? (
                <>
                    <Table className='mt-3' striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Trans Date</th>
                                <th>Check</th>
                                <th>Description</th>
                                <th style={{ textAlign: 'right' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(trans => (
                                <tr key={trans.transactionId}>
                                    <td>
                                        {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
                                            .format(new Date(trans.transDate))}
                                    </td>
                                    <td>{trans.checkNumber === 0 ? '' : trans.checkNumber}</td>
                                    <td>{trans.inDescription}</td>
                                    <td style={{ textAlign: 'right' }}>{parseFloat(trans.transAmt).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </>
            ) : ('')}

        </>
    )
}

export default CheckingUploadTransactions
