const {ethers} = require("hardhat")
const { expect } = require("chai");

describe("Service",()=>{


  before("Deploy Contracts",async()=>{
    [owner] = await ethers.getSigners();
    const user = await ethers.getContractFactory("UserContract");
    const userContract = await user.connect(owner).deploy();
    console.log(userContract);
  });

  it("test",async()=>{});

})