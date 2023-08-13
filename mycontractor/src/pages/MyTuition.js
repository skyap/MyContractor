import React,{useEffect,useState} from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const MyTuition = (props) => {
    const [formData, setFormData] = useState({
        standard: '',
        subject: '',
        teacher: '',
        day: '',
        time: '',
        cost: '',
        duration:''
      });
      
    const [services, setServices] = useState([]);
    const [listings,setListings] = useState([]);

    const serviceContract = props.serviceContract;
    const account = props.account;
    const web3 = props.web3;

    // console.log("account",account);
    const getInfo = async()=>{
        let services = [];
        let serviceCount = await serviceContract.methods.serviceCount().call();
        serviceCount = Number(serviceCount);
        // console.log("serviceCount",serviceCount,account);
        for(let i=0;i<serviceCount;i++){
            let temp = await serviceContract.methods.getService(i).call();
            // console.log("temp.client",temp[1],account,web3.utils.toChecksumAddress(temp[1])===web3.utils.toChecksumAddress((account)));
            if (web3.utils.toChecksumAddress(temp[1])===web3.utils.toChecksumAddress(account)){
                let service = {};
                let listing = {};
                service["listingId"]=Number(temp[0]);
                service["client"]=temp[1];
                listing["provider"]=temp[2];
                listing["standard"]=Number(temp[3]);
                listing["subject"]=temp[4];
                listing["teacher"]=temp[5];
                listing["day"]=temp[6];
                listing["time"]=temp[7];
                listing["cost"]=temp[8];
                listing["duration"]=temp[9];
                service["listing"] = listing;
                service["status"]=temp[10];
                service["startTime"]=temp[11];
                services.push(service);
            }

        }
        setServices(services);
        console.log("mytuition services",services);

        let listings = [];
        let listingCount = await serviceContract.methods.listingCount().call();
        listingCount = Number(listingCount);
        for(let i=0;i<listingCount;i++){
            let temp = await serviceContract.methods.getListing(i).call();
            if (web3.utils.toChecksumAddress(temp[0])===web3.utils.toChecksumAddress(account)){
                let listing = {};
                listing["provider"]=temp[0];
                listing["standard"]=Number(temp[1]);
                listing["subject"]=temp[2];
                listing["teacher"]=temp[3];
                listing["day"]=temp[4];
                listing["time"]=temp[5];
                listing["cost"]=temp[6];
                listing["duration"]=temp[7];
                listings.push(listing);
            }

        }
        setListings(listings);
        console.log("mylisting",listings);
        
    }
    
    useEffect(()=>{
        getInfo();
    },[account])
    
    const handleInputChange = (event) =>{
        const {name,value} = event.target;
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };



    const handleFormSubmit=async(event)=>{
        event.preventDefault();
        let s="";
        for(let key in formData){
            s+=key+":"+formData[key]+","
        }
        if(web3&&serviceContract&&account){
            let cost = web3.utils.toWei(formData.cost,'ether');
            cost = Number(cost);
            await serviceContract.methods.createService(
                formData.standard,
                formData.subject,
                formData.day,
                formData.time,
                cost,
                formData.duration)
                .send({from:account})
        }
        
    }


    return (
        <Container>
            <Row className="mt-4">
                <Col><h3>Purchased Tuition</h3>
                    {services?services.map((data,index)=>(
                        // alert(data.standard);
                        <Row key={index}>
                            <Card style={{marginBottom:'20px'}}>
                                <Card.Body>
                                    <Card.Title>Standard: {data.listing.standard} | Subject: {data.listing.subject}</Card.Title>
                                    <Card.Text><strong>Teacher: </strong>{data.listing.teacher}</Card.Text>
                                    <Card.Text><strong>Day: </strong>{data.listing.day}</Card.Text>
                                    <Card.Text><strong>Time: </strong>{data.listing.time}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    )):<h1>ERROR</h1>}
                </Col>
                <Col>
                    <h3>Provided Tuition</h3>
                    {listings?listings.map((data,index)=>(
                        // alert(data.standard);
                        <Row key={index}>
                            <Card class="card text-white bg-light mb-3" style={{marginBottom:'20px'}}>
                                <Card.Body>
                                    <Card.Title>Standard: {data.standard} | Subject: {data.subject}</Card.Title>
                                    <Card.Text><strong>Day: </strong>{data.day}</Card.Text>
                                    <Card.Text><strong>Time: </strong>{data.time}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    )):<h1>ERROR</h1>}                  
                </Col>                        


                <Col>
                    <h3>Create New Tuition</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="standard">
                            <Form.Label>standard</Form.Label>
                            <Form.Control type="text" name="standard" value={formData.standard} onChange={handleInputChange} placeholder="Enter value for standard" autocomplete="off"/>
                        </Form.Group>

                        <Form.Group controlId="subject">
                            <Form.Label>subject</Form.Label>
                            <Form.Control type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Enter value for subject" autocomplete="off"/>
                        </Form.Group>

                        <Form.Group controlId="teacher">
                            <Form.Label>Teacher</Form.Label>
                            <Form.Control type="text" name="teacher" value={formData.teacher} onChange={handleInputChange} placeholder="Name" autocomplete="off"/>
                        </Form.Group>
                        <Form.Group controlId="day">
                            <Form.Label>day</Form.Label>
                            <Form.Control type="text" name="day" value={formData.day} onChange={handleInputChange} placeholder="Enter value for day" autocomplete="off"/>
                        </Form.Group>
                        <Form.Group controlId="time">
                            <Form.Label>time(hh:mm(am/pm)-hh:mm(am/pm))</Form.Label>
                            <Form.Control type="text" name="time" value={formData.time} onChange={handleInputChange} placeholder="Enter value for time" autocomplete="off"/>
                        </Form.Group>
                        <Form.Group controlId="cost">
                            <Form.Label>cost/ETH</Form.Label>
                            <Form.Control type="text" name="cost" value={formData.cost} onChange={handleInputChange} placeholder="Enter value for eth" autocomplete="off"/>
                        </Form.Group>
                        <Form.Group controlId="duration">
                            <Form.Label>duration</Form.Label>
                            <Form.Control type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Enter value for duration" autocomplete="off"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
        // <div className="container mt-5">
        //     <p>mytuition</p>
        //     <p>{services[0]?services[0].listingId:<div>Nothing</div>}</p>
        //     <p>{account}</p>
        //     {/* <Card className="text-center" style={{ border: "none" }}>
        //         <Card.Img variant="top" src="path_to_some_cool_image.jpg" alt="Tuition Image" style={{ borderRadius: "15px" }}/>
        //         <Card.Body>
        //             <Card.Title className="font-weight-bold text-primary">Tuition Details</Card.Title>
        //             <ListGroup variant="flush">
        //                 <ListGroup.Item><strong>Teacher:</strong> {item.teacher}</ListGroup.Item>
        //                 <ListGroup.Item><strong>Cost:</strong> {item.cost}/month</ListGroup.Item>
        //                 <ListGroup.Item><strong>Time:</strong> {item.time}</ListGroup.Item>
        //                 <ListGroup.Item><strong>Day:</strong> {item.day}</ListGroup.Item>
        //                 <ListGroup.Item><strong>Standard:</strong> {item.standard} </ListGroup.Item>
        //                 <ListGroup.Item><strong>Subject:</strong> {item.subject}</ListGroup.Item>
        //             </ListGroup>
        //         </Card.Body>
        //         <Card.Footer className="bg-transparent border-top-0">
        //             {props.account!==item.provider?<Button variant="primary" size="lg" onClick={()=>purchaseTuition(id)}>Purchase</Button>:<Button variant="primary" size="lg" disabled>Purchase</Button>}
        //         </Card.Footer>
        // //     </Card> */}
        // </div>
    );
}

export default MyTuition;


