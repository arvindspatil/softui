import React, { useState, useEffect } from 'react'
import PageHeader from '../PageHeader'
import NewPagination from '../util/NewPagination'
import Bills from './Bills'
import BillTable from './BillTable'

const BillSync = () => {
    const [billsData, setBillsData] = useState([])
    useEffect(() => {
        fetchBillsData()
    }, [])

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
        const res = await fetch('http://localhost:8080/api/v1/sync-billschedule')
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
                bills={currentBills} />
            <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfBills}
                        siblingCount={1}
                        pageSize={billsPerPage}
                        onPageChange={paginate} />
        </>
    )
}

export default BillSync
