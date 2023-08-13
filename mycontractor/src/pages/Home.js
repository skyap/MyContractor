import React from 'react';
import { Link } from 'react-router-dom'; // Import the hook
import { Button,Container,Card,Row,Col} from 'react-bootstrap';

const Home = ({items}) => {

    
    return (
            <Container style={{ marginTop: '20px' }}>
                <Row>
                    {items?items.map((data, index) => (
                        <Col md={3} key={index}>
                            <Card class="card text-white bg-info mb-3" style={{  marginBottom: '20px' }}>
                                {/* <Card.Img variant="top" src={uri} /> Assuming URI is a direct link to the image */}
                                <Card.Body>
                                    <Card.Title>Class #{index + 1}</Card.Title>

                                    <Card.Subtitle className="mb-2 text-muted">
                                        Standard: {data.standard} | Subject: {data.subject}
                                    </Card.Subtitle>
                                    <Card.Text className="mb-2">
                                        <strong>Teacher: </strong> {data.teacher}
                                    </Card.Text>
                                    <Card.Text className="mb-2">
                                        <strong>Day: </strong> {data.day}
                                    </Card.Text>
                                    <Card.Text className="mb-2">
                                        <strong>Time: </strong> {data.time}
                                    </Card.Text>
                                    {/* <Badge pill variant="primary" className="mr-2">
                                        {index}
                                    </Badge> */}
                                    <Button as={Link} to={`/tuition/${index}`}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )):<h1>ERROR</h1>}
                </Row>
            </Container>
    );
}

export default Home;


