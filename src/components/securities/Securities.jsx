import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import PageHeader from '../PageHeader'
// import AddAccount from '../transactions/AddAccount'
import Pagination from '../util/MyPagination'
import NewPagination from '../util/NewPagination'
import AddSecurity from './AddSecurity'
import SecurityTable from './SecurityTable'
// import AccountTable from './AccountTable'

const Securities = () => {
    const [secData, setSecData] = useState([])
    useEffect(() => {
        fetchSecData()
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [secPerPage] = useState(10);
    const [numberOfSecurities, setNumberOfSecurities] = useState(0)
    useEffect(() => {
        setNumberOfSecurities(secData.length)
    }, [secData])

    const indexOfLastSecurity = currentPage * secPerPage;
    const indexOfFirstSecurity = indexOfLastSecurity - secPerPage;
    const currentSecurities = secData.slice(indexOfFirstSecurity, indexOfLastSecurity);

    const [showAddSecurity, setShowAddSecurity] = useState(false)
    const [securityTypes] = useState([
        {
            value: -1,
            label: "Select security type..."
        },
        {
            value: 0,
            label: "STOCK"
        },
        {
            value: 1,
            label: "MUTUAL_FUND"
        },
        {
            value: 2,
            label: "OTHER"
        }
    ])

    const fetchSecData = async () => {
        const res = await fetch('http://localhost:8080/api/v1/fetch-securities')
        const data = await res.json()
        console.log(data)
        setSecData(data)
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleAddSecurity = async (sec) => {
        console.log(sec)
        await fetch('http://localhost:8080/api/v1/add-security', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sec),
        })
        await fetchSecData()
        setShowAddSecurity(false)
    }

    const hideAddSecurity = () => {
        setShowAddSecurity(false)
    }

    return (
        <>
            <PageHeader title={'Securities'}/>
            <Button variant="primary" 
                onClick={() => {
                    setShowAddSecurity(!showAddSecurity)
                }}>Add Security</Button>
            {showAddSecurity && 
                <AddSecurity 
                    securityTypes={securityTypes}
                    handleAddSecurity={handleAddSecurity}
                    hideAddSecurity={hideAddSecurity} /> }
            <SecurityTable securities={currentSecurities} />
            <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfSecurities}
                        siblingCount={1}
                        pageSize={secPerPage}
                        onPageChange={paginate} />
        </>
    )
}

export default Securities
