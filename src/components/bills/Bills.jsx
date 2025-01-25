import React, { useState, useEffect } from 'react'
import PageHeader from '../PageHeader'
import NewPagination from '../util/NewPagination'
import BillTable from './BillTable'
import EditBill from './EditBill'

const Bills = () => {
    const [billsData, setBillsData] = useState([])
    useEffect(() => {
        fetchBillsData()
    }, [])

    const updateBill = async (bill) => {
        await fetch('http://localhost:8080/api/v1/update-bill', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(bill),
        })
        await fetchBillsData()
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [billsPerPage] = useState(10);
    const [numberOfBills, setNumberOfBills] = useState(0)
    useEffect(() => {
        setNumberOfBills(billsData.length)
    }, [billsData])

    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    const currentBills = billsData.slice(indexOfFirstBill, indexOfLastBill);

    const fetchBillsData = async () => {
        const res = await fetch('http://localhost:8080/api/v1/fetch-allbills')
        const data = await res.json()
        console.log(data)
        setBillsData(data)
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <PageHeader title={'Bills'}/>
            <BillTable 
                bills={currentBills}
                updateBill = {updateBill} />
            <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfBills}
                        siblingCount={1}
                        pageSize={billsPerPage}
                        onPageChange={paginate} />
        </>
    )
}

export default Bills
