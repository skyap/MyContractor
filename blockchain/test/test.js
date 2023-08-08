const {ethers} = require("hardhat")
const { expect } = require("chai");

describe("Service",()=>{
  let owner,producers,clients

  before("Deploy Contracts",async()=>{
    const signers = await ethers.getSigners();
    [owner] = signers;
    signers = signers.slice(1);
    const mid = Math.ceil(signers.length/2)
    producers = signers.slice(0,mid);
    clients = signers.slice(mid);

    const user = await ethers.getContractFactory("UserContract");
    const userContract = await user.connect(owner).deploy();
    userContract = await userContract.deploy();
    
    console.log(userContract.address);
  });

  it("test",async()=>{});

})