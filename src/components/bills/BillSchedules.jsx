import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import PageHeader from '../PageHeader'
import NewPagination from '../util/NewPagination'
import AddBillSchedule from './AddBillSchedule'
import BillScheduleTable from './BillScheduleTable'

const BillSchedules = () => {
    const [schedData, setSchedData] = useState([])
    useEffect(() => {
        fetchScheduleData()
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [schedPerPage] = useState(10);
    const [numberOfSchedules, setNumberOfSchedules] = useState(0)
    useEffect(() => {
        setNumberOfSchedules(schedData.length)
    }, [schedData])

    const indexOfLastSchedule = currentPage * schedPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedPerPage;
    const currentSchedules = schedData.slice(indexOfFirstSchedule, indexOfLastSchedule);

    const [showAddSchedule, setShowAddSchedule] = useState(false)
    const [frequencyTypes] = useState([
        {
            value: -1,
            label: "Select Frequency..."
        },
        {
            value: 0,
            label: "MONTHLY"
        },
        {
            value: 1,
            label: "QUARTERLY"
        },
        {
            value: 2,
            label: "BIMONTHLY"
        },
        {
            value: 3,
            label: "SIXMONTHLY"
        },
        {
            value: 4,
            label: "YEARLY"
        }
    ])

    const fetchScheduleData = async () => {
        const res = await fetch('http://localhost:8080/api/v1/fetch-billschedules')
        const data = await res.json()
        console.log(data)
        setSchedData(data)
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleAddBillSchedule = async (sched) => {
        console.log(sched)
        await fetch('http://localhost:8080/api/v1/add-billschedule', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sched),
        })
        await fetchScheduleData()
        setShowAddSchedule(false)
    }

    const hideAddBillSchedule = () => {
        setShowAddSchedule(false)
    }

    // Delete Task
    const deleteBillSchedule = async (id) => {
        await fetch(`http://localhost:8080/api/v1/delete-billschedule/${id}`, {
            method: 'DELETE' })
        await fetchScheduleData()
    }
    
    return (
        <>
            <PageHeader title={'Bill Schedules'}/>
            <Button variant="primary" 
                onClick={() => {
                    setShowAddSchedule(!showAddSchedule)
                }}>Add Bill Schedule</Button>
            {showAddSchedule && 
                <AddBillSchedule 
                    frequencyTypes={frequencyTypes}
                    handleAddBillSchedule={handleAddBillSchedule}
                    hideAddBillSchedule={hideAddBillSchedule} /> }
            <BillScheduleTable 
                billSchedules={currentSchedules}
                deleteBillSchedule={deleteBillSchedule} />
            <NewPagination
                        currentPage={currentPage}
                        totalCount={numberOfSchedules}
                        siblingCount={1}
                        pageSize={schedPerPage}
                        onPageChange={paginate} />
        </>
    )
}

export default BillSchedules
