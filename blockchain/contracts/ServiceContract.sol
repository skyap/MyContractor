// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUserContract{
    struct User {
        address userAddress;
        string username;
        uint256 totalProvidersRating; 
        uint256 providersRatingCount;
        uint256 totalClientsRating;
        uint256 clientsRatingCount;
        bool isActive;
    }
    function addUser(string memory _username,address _userAddress) external;
    function updateUserRating(address _userAddress, uint _rating) external;
    function getAverageRating(address _userAddress,bool _type) external view returns (uint256,uint256);
    function getUser(address _userAddress)external view returns(User memory);
}



contract ServiceContract is Ownable {

    IUserContract userContract;

    // enum ServiceStatus { Created, InProgress, Completed, Disputed }

    enum ServiceStatus {InProgress,Completed}
    
    struct Listing{
        address payable provider;
        string serviceType;
        uint256 cost;
    }

    struct Service {
        address payable provider;
        address payable client;
        string serviceType;
        uint256 cost;
        ServiceStatus status;
        uint256 deadline;
        uint256 providerRating;
        uint256 clientRating;
    }

    // Available services
    mapping(uint256 => Listing) public listings;
    // mapping(address => Service[]) public listing;
    mapping(uint256=> Service) public services;
    mapping(address=>uint256) public claim;

    uint256 public listingCount;
    uint256 public serviceCount;

    // IERC20 public token;

    // constructor(IERC20 _token) {
    //     token = _token;
    // }

    constructor(address _userContract){
        userContract = IUserContract(_userContract);
    }

    function registerUser(string memory _username) public {
        userContract.addUser(_username,msg.sender);
    }

    function createService(uint256 _cost,string memory _serviceType)public{
        // user need to 
        require(bytes(userContract.getUser(msg.sender).username).length>0, "User is not registered");
        require(_cost>0,"Cost must be greater than 0");
        listing[listingCount] = Listing(payable(msg.sender),_serviceType,_cost);
        listingCount++;
    }

    function startService(uint256 _listingId, uint256 _duration) public payable {
        // service exist
        Listing memory listing = listings[_listingId];
        require(listing.cost>0,"Listing is not existed");

        // cost same as payable
        require(listing.cost == msg.value,"Value is not same as cost");

        // client exist
        require(bytes(userContract.getUser(msg.sender).username).length>0, "User is not registered");

        Service memory newService;
        newService.provider = listing.provider;
        newService.client = payable(msg.sender);
        newService.serviceType = listing.serviceType;
        newService.cost = listing.cost;
        newService.status = ServiceStatus.InProgress;
        newService.deadline = block.timestamp + _duration;

        services[serviceCount] = newService;
        serviceCount++;
    }

    // function startService(uint256 _serviceId) public {
    //     Service storage service = services[_serviceId];
    //     require(service.client == msg.sender, "Not authorized");
    //     require(service.status == ServiceStatus.Created, "Invalid status");

    //     // token.transferFrom(service.client, address(this), service.cost);
    //     service.status = ServiceStatus.InProgress;
    // }

    function completeService(uint256 _serviceId) public {
        Service storage service = services[_serviceId];
        require(service.provider == msg.sender, "Not authorized");
        require(service.status == ServiceStatus.InProgress, "Invalid status");

        service.status = ServiceStatus.Completed;
    }

    function confirmService(uint256 _serviceId) public {
        Service storage service = services[_serviceId];
        require(service.client == msg.sender, "Not authorized");
        require(service.status == ServiceStatus.Completed, "Invalid status");

        // token.transfer(service.provider, service.cost);
        service.status = ServiceStatus.Created;
    }

    // function disputeService(uint256 _serviceId) public {
    //     Service storage service = services[_serviceId];
    //     require((service.client == msg.sender || service.provider == msg.sender), "Not authorized");
    //     require(service.status == ServiceStatus.InProgress, "Invalid status");

    //     service.status = ServiceStatus.Disputed;
    // }

    function getServices(address _provider) public view returns (Service memory) { 
        return services[_provider];
    }
}
