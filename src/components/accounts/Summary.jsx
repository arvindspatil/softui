import React from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

const Summary = () => {
    return (
        <>
            <Card bg={'primary'} text={'white'} className="mb-2">
    <Card.Body>
      <Card.Title>{'Primary'} Card Title </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>

  <Card bg={'primary'} text={'white'} className="mb-2">
    <Card.Body>
      <Card.Title>{'Primary'} Card Title </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>

  <Card bg={'primary'} text={'white'} className="mb-2">
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>{'Primary'} Card Title </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>

  <Card bg={'primary'} text={'white'} className="mb-2">
    {/* <Card.Header>Header</Card.Header> */}
    <Card.Body>
      <Card.Title>Card Title </Card.Title>
      <Card.Text>
          <ul>Some quick example text to build on the card title and make up the bulk</ul>
          <ul>Some quick example text to build on the card title and make up the bulk</ul>
          <ul>Some quick example text to build on the card title and make up the bulk</ul>
      </Card.Text>
    </Card.Body>
  </Card>

                {/* <Card>
                    <Card.Header>Header3</Card.Header>
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This card has even longer content than the first to
                            show that equal height action.
      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card> */}
        </>
    )
}

export default Summary
