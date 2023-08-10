import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

const Tuition = () => {
    return (
        <div className="container mt-5">
            <Card className="text-center" style={{ border: "none" }}>
                <Card.Img variant="top" src="path_to_some_cool_image.jpg" alt="Tuition Image" style={{ borderRadius: "15px" }}/>
                <Card.Body>
                    <Card.Title className="font-weight-bold text-primary">Tuition Details</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Teacher:</strong> John Doe</ListGroup.Item>
                        <ListGroup.Item><strong>Cost:</strong> $500/month</ListGroup.Item>
                        <ListGroup.Item><strong>Time:</strong> 5:00 PM - 7:00 PM</ListGroup.Item>
                        <ListGroup.Item><strong>Day:</strong> Monday, Wednesday, Friday</ListGroup.Item>
                        <ListGroup.Item><strong>Standard:</strong> 10th Grade</ListGroup.Item>
                        <ListGroup.Item><strong>Subject:</strong> Mathematics</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Footer className="bg-transparent border-top-0">
                    <Button variant="primary" size="lg">Buy</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Tuition;

