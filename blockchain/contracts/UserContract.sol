// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract UserContract is Ownable {
    // servicesRating, rating by buyers
    // buysersRating, rating by sellers
    struct User {
        address userAddress;
        string username;
        uint256 totalProvidersRating; 
        uint256 providersRatingCount;
        uint256 totalClientsRating;
        uint256 clientsRatingCount;
        bool isActive;
    }

    mapping(address => User) public users;
    uint256 public userCount;

    function addUser(address _userAddress, string memory _username) public onlyOwner{
        require(users[_userAddress].userAddress == address(0), "User already exists");
        require(bytes(_username).length>0, "User name cannot be an empty string");
        users[_userAddress] = User(msg.sender, _username, 0,0,0,0, true);
        userCount++;
    }
    // if _type == True, set providersRating
    // if _type == False, set clientsRating
    function updateUserRating(address _userAddress, uint _rating, bool _type) public onlyOwner {
        require(users[_userAddress].userAddress != address(0), "User doesn't exist");
        require(_rating >= 1 && _rating <= 5, "Rating should be between 1 and 5");
        if(_type){
            users[_userAddress].totalProvidersRating += _rating;
            users[_userAddress].providersRatingCount++;
        } else {
            users[_userAddress].totalClientsRating += _rating;
            users[_userAddress].clientsRatingCount++;
        }
 
    }

    function deactivateUser(address _userAddress) public onlyOwner {
        require(users[_userAddress].userAddress != address(0), "User doesn't exist");
        users[_userAddress].isActive = false;
    }
    // if _type == True, get providersRating
    // if _type == False, get clientsRating
    function getAverageRating(address _userAddress,bool _type) public view returns (uint256,uint256){
        if(_type){
            require(users[_userAddress].providersRatingCount!=0,"No providers ratings yet for the user");
            uint256 totalRating = users[_userAddress].totalProvidersRating*100/users[_userAddress].providersRatingCount;
            uint256 integerPart = totalRating / 100;
            uint256 decimalPart = totalRating % 100;

            return (integerPart,decimalPart);
        } else{
            require(users[_userAddress].clientsRatingCount!=0,"No clients ratings yet for the user");
            uint256 totalRating = users[_userAddress].totalClientsRating*100/users[_userAddress].clientsRatingCount;
            uint256 integerPart = totalRating / 100;
            uint256 decimalPart = totalRating % 100;

            return (integerPart,decimalPart);            
        }
        
    }
    

    function getUser(address _userAddress)public view returns(address,string memory,uint256,uint256,uint256,uint256,bool){
        User memory user =  users[_userAddress];

        return (user.userAddress,user.username,user.totalProvidersRating,user.providersRatingCount,user.totalClientsRating,user.clientsRatingCount,user.isActive);
    }

    function setUserCount(uint256 _count)public onlyOwner{
        userCount = _count;
    }

}
