import 'bootswatch/dist/vapor/bootstrap.css';
// import './bootstrap.css';
import React,{useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Navbar, Nav , Button,Container,Card,Row,Col,Badge,Form} from 'react-bootstrap';
import Web3 from 'web3';
import serviceContractJSON from "./ServiceContract.json"

import detectEthereumProvider from '@metamask/detect-provider'

import Tuition from './pages/Tuition';
import MyTuition from "./pages/MyTuition";
import Home from "./pages/Home";
// import MetaMaskButton from "./pages/MetaMaskButton";


// import Owner from "./pages/Owner";
// import ItemDetail from "./pages/ItemDetail";
// const serviceContractABI = ["function getListing(uint256) view returns (address,uint256,string ,string ,string ,string ,uint256,uint256)"];
const serviceContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
function App() {

  const [formData,setFormData] = useState(null);

  const [account, setAccount] = useState(null);
  const [web3,setWeb3] = useState(null);
  const [serviceContract,setServiceContract] = useState(null);
  const [items,setItems] = useState([]);
  const [isRegistered,setIsRegistered] = useState(true);

  
  // This will run whenever accounts are changed
  const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== account) {
            setAccount(accounts[0]);
        }
    };

  

  const connectToMetaMask = () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts=>{
              handleAccountsChanged(accounts);
   
            })
            .catch(err => {
                if (err.code === 4001) {
                    // User rejected request
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        } else {
            alert("MetaMask is not installed. Please consider installing it!");
        }
    };

    const checkIsRegistered = async()=>{
      if(web3&&serviceContract){
        let result = await serviceContract.methods.getUser(account).call();
        // alert(result[1]);
      }

    }

    useEffect(()=>{
      window.ethereum.on("accountsChanged",async(accounts)=>{
        setAccount(accounts[0]);
      });
      // alert("i m here");

      
    },[])

    useEffect(()=>{
    //   window.addEventListener("load",()=>{
    //     window.ethereum.on("accountsChanged",async(accounts)=>{
    //       setAccount(accounts[0]);
    //     })
    // },[])

    async function fetchAllServices(){
      if(typeof window.ethereum!=='undefined'){
          // const web3 = new Web3("http://127.0.0.1:8545");
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
          const serviceContract = new web3.eth.Contract(serviceContractJSON.abi,serviceContractAddress);
          let listingCount = await serviceContract.methods.listingCount().call();
          setServiceContract(serviceContract)
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
            item['cost']=web3.utils.fromWei(temp[6].toString(),'ether');
            item['duration']=temp[7];
            items.push(item);
          }
          setItems(items);
        }  
      }
      
      

    fetchAllServices();
    // return ()=>{
    //   window.removeEventListener("load",()=>{
    //     window.ethereum.on("accountsChanged",(accounts)=>console.log('accountsChanges',accounts));
    //   })
    //  }
  },[]);

  const handleInputChange = (event) =>{
    const {name,value} = event.target;
    setFormData(value);
  };
  const registerUser = async() => {
    if(web3&&serviceContract&&account){
      alert(formData);
      await serviceContract.methods.registerUser(formData).send({from:account});
      setIsRegistered(true);
    }else{
      alert("Please connect to Metamask");
    }
  };



  return (
    <div className="mycontractor">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">DTuition</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/mytuition">My Tuition</Nav.Link>

            {account ? (
                <Button class="m-5" variant="outline-success" >
                    {account.substring(0,6) + '...' + account.substring(account.length-4,account.length)}
                </Button>
            ) : (
                <Button variant="primary" onClick={connectToMetaMask}>
                    Connect to MetaMask
                </Button>
            )}
          {isRegistered?(<div></div>):(
            <Form onSubmit={registerUser} inline>
              <Row>
                <Col>
                  <Form.Control type="text" name="name" value={formData} onChange={handleInputChange} placeholder="Enter Name" autocomplete="off"/>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                          Register
                  </Button>
                </Col>
              </Row>
            </Form>
            )}
          </Nav>

        </Navbar>




        <Routes>
          <Route path="/tuition/:id" element={<Tuition account={account} serviceContract={serviceContract} web3={web3} items={items} />}/>
          <Route path="/mytuition" element={<MyTuition account={account} serviceContract={serviceContract} web3={web3}  />}/>
          <Route path="/" element={<Home items={items}/>} />
        </Routes>
      </Router>




    </div>
    
  );
}

export default App;
