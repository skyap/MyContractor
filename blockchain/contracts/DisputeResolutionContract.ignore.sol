// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ServiceContract.sol";

contract DisputeResolutionContract is Ownable {
    enum Vote { None, Provider, Client }

    struct Resolver {
        address payable resolverAddress;
        uint256 stake;
    }

    struct Dispute {
        address payable provider;
        address payable client;
        uint256 serviceId;
        mapping(address => Vote) votes;
        uint256 voteCountProvider;
        uint256 voteCountClient;
    }

    mapping(uint256 => Dispute) public disputes;
    mapping(address => Resolver) public resolvers;

    uint256 public disputeCount;
    IERC20 public token;
    ServiceContract public serviceContract;

    constructor(IERC20 _token, ServiceContract _serviceContract) {
        token = _token;
        serviceContract = _serviceContract;
    }

    function createDispute(uint256 _serviceId) public {
        ServiceContract.Service memory service = serviceContract.getServices(_serviceId);
        require(service.status == ServiceContract.ServiceStatus.Disputed, "Service is not disputed");

        disputes[disputeCount].provider = service.provider;
        disputes[disputeCount].client = service.client;
        disputes[disputeCount].serviceId = _serviceId;

        disputeCount++;
    }

    function vote(uint256 _disputeId, Vote _vote) public {
        Dispute storage dispute = disputes[_disputeId];
        require(dispute.votes[msg.sender] == Vote.None, "Resolver already voted");

        Resolver memory resolver = resolvers[msg.sender];
        require(resolver.stake > 0, "Not a resolver or no stake");

        dispute.votes[msg.sender] = _vote;

        if (_vote == Vote.Provider) {
            dispute.voteCountProvider++;
        } else {
            dispute.voteCountClient++;
        }
    }

    function finalizeDispute(uint256 _disputeId) public onlyOwner {
        Dispute storage dispute = disputes[_disputeId];
        require(dispute.voteCountProvider > 0 || dispute.voteCountClient > 0, "No votes");

        if (dispute.voteCountProvider > dispute.voteCountClient) {
            token.transfer(dispute.provider, serviceContract.getServices(dispute.serviceId).cost);
        } else {
            token.transfer(dispute.client, serviceContract.getServices(dispute.serviceId).cost);
        }

        serviceContract.getServices(dispute.serviceId).status = ServiceContract.ServiceStatus.Created;
    }
}
