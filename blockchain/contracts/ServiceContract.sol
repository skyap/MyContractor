// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./UserContract.sol";


// interface IUserContract{
//     struct User {
//         address userAddress;
//         string username;
//         uint256 totalProvidersRating; 
//         uint256 providersRatingCount;
//         uint256 totalClientsRating;
//         uint256 clientsRatingCount;
//         bool isActive;
//     }
//     function addUser(string memory _username,address _userAddress) external;
//     // if _type == True, set providersRating
//     // if _type == False, set clientsRating
//     function updateUserRating(address _userAddress, uint _rating,bool _type) external;
//     function getAverageRating(address _userAddress,bool _type) external view returns (uint256,uint256);
//     function getUser(address _userAddress)external returns(address,string memory,uint256,uint256,uint256,uint256,bool);
// }



contract ServiceContract is Ownable {


    // enum ServiceStatus { Created, InProgress, Completed, Disputed }
    UserContract public userContract;
    enum ServiceStatus {InProgress,Completed}
    
    constructor(){
        userContract = new UserContract();
        // provider 
        userContract.addUser(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,"ms chloee");
        userContract.addUser(0xdD2FD4581271e230360230F9337D5c0430Bf44C0,"mr lee");
        userContract.addUser(0xbDA5747bFD65F08deb54cb465eB87D40e51B197E,"ms ruth");
        userContract.addUser(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,"mr nick");
        userContract.addUser(0xcd3B766CCDd6AE721141F452C550Ca635964ce71,"mr yap");
        userContract.addUser(0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097,"mr lim");
        userContract.addUser(0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec,"mr ng");

        // client

        userContract.addUser(0xFABB0ac9d68B0B445fB7357272Ff202C5651694a,"Aria");
        userContract.addUser(0x71bE63f3384f5fb98995898A86B02Fb2426c5788,"Hiroshi");
        userContract.addUser(0xBcd4042DE499D14e55001CcbB24a551F3b954096,"Sophia");
        userContract.addUser(0xa0Ee7A142d267C1f36714E4a8F75612F20a79720,"Jia");
        userContract.addUser(0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,"Luca");
        userContract.addUser(0x14dC79964da2C08b23698B3D3cc7Ca32193d9955,"Ananya");
        userContract.addUser(0x976EA74026E726554dB657fA54763abd0C3a0aa9,"Emilie");
        userContract.addUser(0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,"Min-jun ");
        userContract.addUser(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,"Isabella");
        userContract.addUser(0x90F79bf6EB2c4f870365E785982E1f101E93b906,"Haruki");

        userContract.setUserCount(17);

        // Listings

        listings[0] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,2,"bc","ms cholee","tue","8:30pm-9:30pm",121069 gwei,30 days);
        listings[1] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,2,"math","ms cholee","tue","7:30pm-8:30pm",121069 gwei,30 days);
        listings[2] = Listing(0xdD2FD4581271e230360230F9337D5c0430Bf44C0,2,"bm","mr lee","wed","7:30pm-8:30pm",121069 gwei,30 days);
        listings[3] = Listing(0xdD2FD4581271e230360230F9337D5c0430Bf44C0,2,"bi","mr lee","wed","8:30pm-9:30pm",121069 gwei,30 days);
        listings[4] = Listing(0xbDA5747bFD65F08deb54cb465eB87D40e51B197E,2,"science","ms ruth","fri","7:30pm-8:30pm",121069 gwei,30 days);
        listings[5] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,3,"bm","ms cholee","thur","7:30pm-8:30pm",121069 gwei,30 days);
        listings[6] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,3,"bc","ms cholee","thur","8:30pm-9:30pm",121069 gwei,30 days);
        listings[7] = Listing(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,3,"bi","mr nick","tue","8:30pm-9:30pm",121069 gwei,30 days);
        listings[8] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,3,"math","ms cholee","fri","7:30pm-8:30pm",121069 gwei,30 days);
        listings[9] = Listing(0xbDA5747bFD65F08deb54cb465eB87D40e51B197E,3,"science","ms ruth","fri","8:30pm-9:30pm",121069 gwei,30 days);
        listings[10] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,4,"bc comp","ms tang","wed","4:00pm-5:30pm",121069 gwei,30 days);



        listings[11] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,4,"bc essay","ms tang","wed","5:30pm-7:00pm",10290875 gwei,30 days);
        listings[12] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,4,"bm comp","ms tang","tue","4:00pm-5:30pm",10290875 gwei,30 days);
        listings[13] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,4,"bm essay","ms tang","thur","4:00pm-5:30pm",10290875 gwei,30 days);
        listings[14] = Listing(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,4,"bi comp","mr nick","tue","5:30pm-7:00pm",10290875 gwei,30 days);
        listings[15] = Listing(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,4,"bi essay","ms cholee","fri","5:30pm-7:00pm",10290875 gwei,30 days);
        listings[16] = Listing(0xcd3B766CCDd6AE721141F452C550Ca635964ce71,4,"math","mr yap","fri","4:00pm-5:30pm",10290875 gwei,30 days);
        listings[17] = Listing(0xcd3B766CCDd6AE721141F452C550Ca635964ce71,4,"science","mr yap","mon","4:00pm-5:30pm",10290875 gwei,30 days);



        listings[18] = Listing(0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097,6,"bc comp","mr lim","tue","7:00pm-8:30pm",10290875 gwei,30 days);
        listings[19] = Listing(0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097,6,"bc essay","mr lim","thur","7:00pm-8:30pm",10290875 gwei,30 days);
        listings[20] = Listing(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,6,"bm comp","mr nick","thur","5:30pm-7:00pm",10290875 gwei,30 days);
        listings[21] = Listing(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,6,"bm essay","mr nick","fri","5:30pm-7:00pm",10290875 gwei,30 days);
        listings[22] = Listing(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,6,"bi comp","mr nick","mon","5:30pm-7:00pm",10290875 gwei,30 days);
        listings[23] = Listing(0x2546BcD3c84621e976D8185a91A922aE77ECEc30,6,"bi essay","mr nick","fri","7:00pm-8:30pm",10290875 gwei,30 days);
        listings[24] = Listing(0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec,6,"math","mr ng","wed","4:00pm-5:30pm",10290875 gwei,30 days);
        listings[25] = Listing(0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097,6,"science","mr lim","wed","5:30pm-7:00pm",10290875 gwei,30 days);





        listingCount = 26;


    }
    struct Listing{
        address provider;
        uint256 standard;
        string subject;
        string teacher;
        string day;
        string time;
        uint256 cost;
        uint256 duration;
    }

    struct Service {
        uint256 listingId;
        address client;
        Listing listing;
        ServiceStatus status;
        uint256 startTime;
    }

    // Available services
    mapping(uint256 => Listing) public listings;
    mapping(uint256=> Service) public services;
    mapping(address=>uint256) public claim;

    uint256 public listingCount;
    uint256 public serviceCount;



    function registerUser(string memory _username) public {
        userContract.addUser(msg.sender,_username);
    }
    // create service to be published for user to select
    function createService(uint256 standard,string memory subject,string memory day,string memory time,uint256 cost,uint256 duration)public{
        (,string memory teacher,,,,,) = userContract.getUser(msg.sender);
        require(bytes(teacher).length>0, "User is not registered");
        require(cost>0,"Cost must be greater than 0");
        listings[listingCount] = Listing(msg.sender,standard,subject,teacher,day,time,cost,duration);
        listingCount++;
    }
    // user purchase the services
    function startService(uint256 _listingId) public payable {
        // service exist
        Listing memory listing = listings[_listingId];
        require(listing.cost>0,"Listing is not existed");

        // cost same as payable
        require(listing.cost == msg.value,"Value is not same as cost");

        // client exist
        (,string memory _username,,,,,) = userContract.getUser(msg.sender);
        require(bytes(_username).length>0, "User is not registered");

        Service memory newService;
        newService.listingId = _listingId;
        newService.client = msg.sender;
        newService.listing = listing;
        newService.status = ServiceStatus.InProgress;
        newService.startTime = block.timestamp;

        services[serviceCount] = newService;

        claim[listing.provider]+=listing.cost;
        serviceCount++;
    }

    // provider to confirmService and claim the prices after it is Completed or after duration
    function confirmService(uint256 _serviceId, uint256 _rating) public {
        Service storage service = services[_serviceId];
        require(service.listing.provider == msg.sender, "Not authorized");
        require(service.status == ServiceStatus.Completed || service.startTime+service.listing.duration>=block.timestamp, "Invalid status/deadline");

        // token.transfer(service.provider, service.cost);
        service.status = ServiceStatus.Completed;
        uint256 _claim = claim[msg.sender];
        delete claim[msg.sender];
        userContract.updateUserRating(service.client, _rating, false);
        (bool send,) = payable(msg.sender).call{value:_claim}("");
        require(send, "Failed to claim ether");
    }



    function getService(uint256 _serviceId) external view returns (uint256,address,address,uint256,string memory,string memory,string memory,string memory,uint256,uint256,ServiceStatus,uint256) { 
        Service memory service =  services[_serviceId];
        return(service.listingId,service.client,service.listing.provider,service.listing.standard,service.listing.subject,service.listing.teacher,service.listing.day,service.listing.time,service.listing.cost,service.listing.duration,service.status,service.startTime);
    }

    function getListing(uint256 _listingId) external view returns (address,uint256,string memory,string memory,string memory,string memory,uint256,uint256) { 
        Listing memory listing =  listings[_listingId];
        return (listing.provider,listing.standard,listing.subject,listing.teacher,listing.day,listing.time,listing.cost,listing.duration);

    }

    // if _type == True, get providersRating
    // if _type == False, get clientsRating
    function getAverageRating(address _userAddress,bool _type) external view returns (uint256,uint256){
        return userContract.getAverageRating(_userAddress, _type);
    }


    function getUser(address _userAddress)external view returns (address,string memory,uint256,uint256,uint256,uint256,bool){
        return userContract.getUser(_userAddress);
    }


}
