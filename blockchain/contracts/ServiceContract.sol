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
    // if _type == True, set providersRating
    // if _type == False, set clientsRating
    function updateUserRating(address _userAddress, uint _rating,bool _type) external;
    function getAverageRating(address _userAddress,bool _type) external view returns (uint256,uint256);
    function getUser(address _userAddress)external returns(address,string memory,uint256,uint256,uint256,uint256,bool);
}



contract ServiceContract is Ownable {
    string[] public service_example = [
    '"standard": "2", "subject": "bc", "teacher": "ms cholee", "day": "tue", "time": "8:30pm-9:30pm"',
    '"standard": "2", "subject": "math", "teacher": "ms cholee", "day": "tue", "time": "7:30pm-8:30pm"',
    '"standard": "2", "subject": "bm", "teacher": "mr lee", "day": "wed", "time": "7:30pm-8:30pm"',
    '"standard": "2", "subject": "bi", "teacher": "mr lee", "day": "wed", "time": "8:30pm-9:30pm"',
    '"standard": "2", "subject": "science", "teacher": "ms ruth", "day": "fri", "time": "7:30pm-8:30pm"',
    '"standard": "3", "subject": "bm", "teacher": "ms cholee", "day": "thur", "time": "7:30pm-8:30pm"',
    '"standard": "3", "subject": "bc", "teacher": "ms cholee", "day": "thur", "time": "8:30pm-9:30pm"',
    '"standard": "3", "subject": "bi", "teacher": "mr nick", "day": "tue", "time": "8:30pm-9:30pm"',
    '"standard": "3", "subject": "math", "teacher": "ms cholee", "day": "fri", "time": "7:30pm-8:30pm"',
    '"standard": "3", "subject": "science", "teacher": "ms ruth", "day": "fri", "time": "8:30pm-9:30pm"',
    '"standard": "4", "subject": "bc comp", "teacher": "ms tang", "day": "wed", "time": "4:00pm-5:30pm"',
    '"standard": "4", "subject": "bc essay", "teacher": "ms tang", "day": "wed", "time": "5:30pm-7:00pm"',
    '"standard": "4", "subject": "bm comp", "teacher": "ms tang", "day": "tue", "time": "4:00pm-5:30pm"',
    '"standard": "4", "subject": "bm essay", "teacher": "ms tang", "day": "thur", "time": "4:00pm-5:30pm"',
    '"standard": "4", "subject": "bi comp", "teacher": "mr nick", "day": "tue", "time": "5:30pm-7:00pm"',
    '"standard": "4", "subject": "bi essay", "teacher": "ms chloee", "day": "fri", "time": "5:30pm-7:00pm"',
    '"standard": "4", "subject": "math", "teacher": "mr yap", "day": "fri", "time": "4:00pm-5:30pm"',
    '"standard": "4", "subject": "science", "teacher": "mr yap", "day": "mon", "time": "4:00pm-5:30pm"',
    '"standard": "6", "subject": "bc comp", "teacher": "mr lim", "day": "tue", "time": "7:00pm-8:30pm"',
    '"standard": "6", "subject": "bc essay", "teacher": "mr lim", "day": "thur", "time": "7:00pm-8:30pm"',
    '"standard": "6", "subject": "bm comp", "teacher": "mr nick", "day": "thur", "time": "5:30pm-7:00pm"',
    '"standard": "6", "subject": "bm essay", "teacher": "mr nick", "day": "fri", "time": "5:30pm-7:00pm"',
    '"standard": "6", "subject": "bi comp", "teacher": "mr nick", "day": "mon", "time": "5:30pm-7:00pm"',
    '"standard": "6", "subject": "bi essay", "teacher": "mr nick", "day": "fri", "time": "7:00pm-8:30pm"',
    '"standard": "6", "subject": "math", "teacher": "mr ng", "day": "wed", "time": "4:00pm-5:30pm"',
    '"standard": "6", "subject": "science", "teacher": "mr lim", "day": "wed", "time": "5:30pm-7:00pm"'
    ];


    IUserContract.User[] public user_example = [
        IUserContract.User(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,"ms chloee",0,0,0,0,true),
        IUserContract.User(0xdD2FD4581271e230360230F9337D5c0430Bf44C0,"mr lee",0,0,0,0,true),
        IUserContract.User(0xbDA5747bFD65F08deb54cb465eB87D40e51B197E,"ms ruth",0,0,0,0,true),
        IUserContract.User(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,"mr nick",0,0,0,0,true),
        IUserContract.User(0xcd3B766CCDd6AE721141F452C550Ca635964ce71,"mr yap",0,0,0,0,true),
        IUserContract.User(0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097,"mr lim",0,0,0,0,true),
        IUserContract.User(0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec,"mr ng",0,0,0,0,true),

    ];

    // enum ServiceStatus { Created, InProgress, Completed, Disputed }

    enum ServiceStatus {InProgress,Completed}
    

    struct Listing{
        address payable provider;
        string standard;
        string teacher;
        uint256 day;
        uint256 time;
        uint256 cost;
        uint256 duration;
    }

    struct Service {
        uint256 listingId;
        address payable client;
        Listing listing;
        ServiceStatus status;
        uint256 deadline;
    }

    // Available services
    mapping(uint256 => Listing) public listings;
    mapping(uint256=> Service) public services;
    mapping(address=>uint256) public claim;

    uint256 public listingCount;
    uint256 public serviceCount;


    constructor(address _userContract){
        userContract = IUserContract(_userContract);

    }

    function registerUser(string memory _username) public {
        userContract.addUser(_username,msg.sender);
    }
    // create service to be published for user to select
    function createService(string memory _serviceType,uint256 _cost,uint256 duration)public{
        (,string memory _username,,,,,) = userContract.getUser(msg.sender);
        require(bytes(_username).length>0, "User is not registered");
        require(_cost>0,"Cost must be greater than 0");
        listings[listingCount] = Listing(payable(msg.sender),_serviceType,_cost, duration);
        listingCount++;
    }
    // user purchase the services
    function startService(uint256 _listingId, uint256 _deadline) public payable {
        // service exist
        Listing memory listing = listings[_listingId];
        require(listing.cost>0,"Listing is not existed");

        // cost same as payable
        require(listing.cost == msg.value,"Value is not same as cost");

        // _deadline must be equal or longer than duration
        require(listing.duration<=_deadline,"Deadline is not longer than duration");

        // client exist
        (,string memory _username,,,,,) = userContract.getUser(msg.sender);
        require(bytes(_username).length>0, "User is not registered");

        Service memory newService;
        newService.provider = listing.provider;
        newService.client = payable(msg.sender);
        newService.serviceType = listing.serviceType;
        newService.cost = listing.cost;
        newService.status = ServiceStatus.InProgress;
        newService.deadline = block.timestamp + _deadline;

        services[serviceCount] = newService;

        claim[listing.provider]+=listing.cost;
        serviceCount++;
    }

    // client to completeService 
    function completeService(uint256 _serviceId,uint256 _rating) public {
        Service storage service = services[_serviceId];
        require(service.client == msg.sender, "Not authorized");
        require(service.status == ServiceStatus.InProgress, "Invalid status");
        service.status = ServiceStatus.Completed;
        userContract.updateUserRating(service.provider, _rating, true);
    }

    // provider to confirmService and claim the prices after it is Completed or after duration
    function confirmService(uint256 _serviceId, uint256 _rating) public {
        Service storage service = services[_serviceId];
        require(service.provider == msg.sender, "Not authorized");
        require(service.status == ServiceStatus.Completed || service.deadline>=block.timestamp, "Invalid status/deadline");

        // token.transfer(service.provider, service.cost);
        service.status = ServiceStatus.Completed;
        uint256 _claim = claim[msg.sender];
        claim[msg.sender] = 0;
        userContract.updateUserRating(service.client, _rating, false);
        payable(msg.sender).transfer(_claim);
    }


    function getService(uint256 _serviceId) external view returns (address,address,string memory,uint256,ServiceStatus,uint256) { 
        Service memory service =  services[_serviceId];
        return (service.provider,service.client,service.serviceType,service.cost,service.status,service.deadline);
    }

    function getListing(uint256 _listingId) external view returns (address,string memory,uint256,uint256) { 
        Listing memory listing =  listings[_listingId];
        return (listing.provider,listing.serviceType,listing.cost,listing.duration);

    }

    // if _type == True, get providersRating
    // if _type == False, get clientsRating
    function getAverageRating(address _userAddress,bool _type) external view returns (uint256,uint256){
        return userContract.getAverageRating(_userAddress, _type);
    }


    function getUser(address _userAddress)external returns (address,string memory,uint256,uint256,uint256,uint256,bool){
        return userContract.getUser(_userAddress);
    }


}
