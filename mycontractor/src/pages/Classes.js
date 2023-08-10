import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const items = [
    { id: 1, name: "Item 1", description: "Description for Item 1" },
    // ... Add more items as needed
];

function Classes() {
    return (
        <Container>
            <Row>
                <h1>From classes page</h1>
                {items.map(item => (
                    <Col md={4} key={item.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Link to={`/item/${item.id}`}>
                                    <Button variant="primary">View</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Classes;
