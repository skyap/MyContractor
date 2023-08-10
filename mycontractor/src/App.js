import 'bootstrap/dist/css/bootstrap.css';
import React,{useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Navbar, Nav , Button,Container,Card,Row,Col,Badge} from 'react-bootstrap';
import Web3 from 'web3';
import serviceContractJSON from "./ServiceContract.json"

import Tuition from './pages/Tuition';
import Classes from "./pages/Classes";
import Home from "./pages/Home";
import MetaMaskButton from "./pages/MetaMaskButton";


// import Owner from "./pages/Owner";
// import ItemDetail from "./pages/ItemDetail";
// const serviceContractABI = ["function getListing(uint256) view returns (address,uint256,string ,string ,string ,string ,uint256,uint256)"];
const serviceContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
function App() {
  const [account, setAccount] = useState(null);
  const [services,setServices] = useState([]);
  const [items,setItems] = useState([]);

  useEffect(()=>{
    async function fetchAllServices(){
      const web3 = new Web3("http://127.0.0.1:8545");
      const serviceContract = new web3.eth.Contract(serviceContractJSON.abi,serviceContractAddress);
      let listingCount = await serviceContract.methods.listingCount().call();
      listingCount = Number(listingCount);
      let items=[];
      for(let i=0;i<listingCount;i++){
        let item={};
        let temp = await serviceContract.methods.getListing(i).call();
        item['provider']=temp[0];
        item['standard']=Number(temp[1]);
        item['subject']=temp[2];
        item['teacher']=temp[3];
        item['day']=temp[4];
        item['time']=temp[5];
        item['cost']=temp[6];
        item['duration']=temp[7];
        items.push(item);
      }
      setItems(items);
    }
    console.log(items);
    fetchAllServices();
  },[]);
  return (
    <div className="mycontractor">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">My Tuition</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/classes">Classes</Nav.Link>
            {/* <Nav.Link as={Link} to="/owner">My Profile</Nav.Link> */}
            <MetaMaskButton account={account} setAccount={setAccount} />
          </Nav>
        </Navbar>




        <Routes>

          <Route path="/classes" element={<Classes />} />
          <Route path="/tuition/:id" element={<Tuition account={account} setAccount={setAccount} data={[]} />}/>
          <Route path="*" element={<Home items={items}/>} />
        </Routes>
      </Router>




    </div>
    
  );
}

export default App;
