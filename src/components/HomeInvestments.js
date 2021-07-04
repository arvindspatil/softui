import React, { useState, useEffect } from 'react'
import ChartV1 from './ChartV1'
import PageHeader from './PageHeader'

const HomeInvestments = () => {
  const [chartData, setChartData] = useState({})
  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch('http://localhost:8080/api/v1/chart-investment-data')
      const data = await res.json()
      setChartData(data)
    }
    fetchChartData()
  }, [])

  return (
    <>
      <PageHeader title={'Investment Accounts'} />
      <ChartV1 chartData={chartData} />
    </>
  )
}

export default HomeInvestments
