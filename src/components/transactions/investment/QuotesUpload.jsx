import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PageHeader from '../../PageHeader'

const QuotesUpload = () => {

    const [title, setTitle] = useState('Quote Uploads')

    const [file, setFile] = useState('');
    const onFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const [fileName, setFileName] = useState("Choose File...");
    const [quoteDate, setQuoteDate] = useState('')

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('quoteDate', quoteDate);
        fetch('http://localhost:8080/api/v1/quotes-upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .catch(error => {
            console.error(error)
        })
    };

    return (
        <>
            <PageHeader title={title} />
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.File id="file" label={fileName} onChange={onFileChange} custom />
                </Form.Group>
                <Form.Group controlId="formTransDate">
                    <Form.Label>Quote Date</Form.Label>
                    <Form.Control type="date"
                        onChange={(e) => setQuoteDate(e.target.value)} />
                </Form.Group>
            </Form>

            <Button variant="primary" onClick={onSubmit}>Submit</Button>
            {' '}
            <Button variant="secondary">Cancel</Button>
            {' '}
        </>
    )
}

export default QuotesUpload
