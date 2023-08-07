// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface UserContract{

}



contract ServiceContract is Ownable {



    enum ServiceStatus { Created, InProgress, Completed, Disputed }
    
    struct Listing{
        address payable provider;
        string serviceType;
        uint256 cost;
    }

    struct Service {
        address payable provider;
        address payable client;
        uint256 cost;
        ServiceStatus status;
        uint256 deadline;
        uint256 providerRating;
        uint256 clientRating;
    }

    mapping(uint256 => Service) public services;
    mapping(uint256 => Listing) public listing;
    uint256 public listingCount;
    uint256 public serviceCount;

    IERC20 public token;

    constructor(IERC20 _token) {
        token = _token;
    }
    function createListing(uint256 _cost,string _serviceType)public{
        listing[listingCount] = Listing(msg.sender,_serviceType,_cost);
        listingCount++;
    }

    function createService(address payable _provider, uint256 _cost, uint256 _duration) public {
        Service memory newService;
        newService.provider = _provider;
        newService.client = payable(msg.sender);
        newService.cost = _cost;
        newService.status = ServiceStatus.Created;
        newService.deadline = block.timestamp + _duration;

        services[serviceCount] = newService;
        serviceCount++;
    }

    function startService(uint256 _serviceId) public {
        Service storage service = services[_serviceId];
        require(service.client == msg.sender, "Not authorized");
        require(service.status == ServiceStatus.Created, "Invalid status");

        token.transferFrom(service.client, address(this), service.cost);
        service.status = ServiceStatus.InProgress;
    }

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

        token.transfer(service.provider, service.cost);
        service.status = ServiceStatus.Created;
    }

    function disputeService(uint256 _serviceId) public {
        Service storage service = services[_serviceId];
        require((service.client == msg.sender || service.provider == msg.sender), "Not authorized");
        require(service.status == ServiceStatus.InProgress, "Invalid status");

        service.status = ServiceStatus.Disputed;
    }

    function getServices(uint _serviceId) public view returns (Service memory) { 
        return services[_serviceId];
    }
}
