import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Tuition = (props) => {
    const { id } = useParams();
    const item = props.items[id];
    const purchaseTuition = async()=>{
        const serviceContract = props.serviceContract;
        const account = props.account;
        const web3 = props.web3;
        console.log("account",account,id);
        const cost = web3.utils.toWei(item.cost,'ether');
        await serviceContract.methods.startService(id).send({from:account,value:cost})

    };
    return (
        <div className="container mt-5">
            <Card className="text-center" style={{ border: "none" }}>
                <Card.Img variant="top" src="path_to_some_cool_image.jpg" alt="Tuition Image" style={{ borderRadius: "15px" }}/>
                <Card.Body>
                    <Card.Title className="font-weight-bold text-primary">Tuition Details</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Teacher:</strong> {item.teacher}</ListGroup.Item>
                        <ListGroup.Item><strong>Cost:</strong> {item.cost}/month</ListGroup.Item>
                        <ListGroup.Item><strong>Time:</strong> {item.time}</ListGroup.Item>
                        <ListGroup.Item><strong>Day:</strong> {item.day}</ListGroup.Item>
                        <ListGroup.Item><strong>Standard:</strong> {item.standard} </ListGroup.Item>
                        <ListGroup.Item><strong>Subject:</strong> {item.subject}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Footer className="bg-transparent border-top-0">
                    {props.account!==item.provider?<Button variant="primary" size="lg" onClick={()=>purchaseTuition(id)}>Purchase</Button>:<Button variant="primary" size="lg" disabled>Purchase</Button>}
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Tuition;

