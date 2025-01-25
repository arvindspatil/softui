import React, { useEffect} from 'react'
import PageHeader from './PageHeader'

const UpdateQuotes = () => {
    useEffect(() => {
      const refreshQuotes = async () => {
        const res = await fetch('http://localhost:8080/api/v1/update-quotes')
      }
      refreshQuotes()
    }, [])

    return (
        <>
        <PageHeader title={'Update Quotes'}/>
        </>
    )
}

export default UpdateQuotes
