import React, {useState, useEffect} from 'react'
import MyCarousal from './MyCarousal'
import PageHeader from './PageHeader'

const Home = () => {
    const [chartData, setChartData] = useState({})
    useEffect(() => {
      const fetchChartData = async () => {
        console.log("Arvind Home");
        const res = await fetch('http://localhost:8080/api/v1/chart-data')
        const data = await res.json()
        console.log(data)
        setChartData(data)
      }
      fetchChartData()
    }, [])

    return (
        <>
        <PageHeader title={'Dashboard'}/>
        <MyCarousal chartData={chartData} />
        </>
    )
}

export default Home
