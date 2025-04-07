// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";
import "./eWasteTracking.sol";

contract RecyclingManagement {
    UserManagement public userManagement;
    eWasteTracking public eWasteTracker;

    struct RecycledItem {
        uint wasteId;
        string method;
        address recycler; 
        uint256 recycledAt;
    }

    mapping(uint => RecycledItem) public recycledWaste;

    event WasteRecycled(uint wasteId, string method, uint256 recycledAt);
    event NonCompliance(uint wasteId, address recycler, string reason);

    constructor(address _userManagementAddress, address _eWasteTrackerAddress) {
        userManagement = UserManagement(_userManagementAddress);
        eWasteTracker = eWasteTracking(_eWasteTrackerAddress);
    }

    function processRecycling(uint _wasteId, string memory _method) external {
        require(
            userManagement.getUserRole(msg.sender) == UserManagement.Role.Recycler,
            "Unauthorized: Only recyclers can process waste."
        );
        
        (
        uint id,
        string memory wasteType,
        string memory origin,
        uint quantity,
        uint256 deadline,
        uint256 loggedAt,
        bool isProcessed
        ) = eWasteTracker.getWasteItem(_wasteId);
        require(id != 0, "Waste item does not exist.");
        
        if (block.timestamp > deadline) {
        emit NonCompliance(_wasteId, msg.sender, "Recycling missed deadline.");
    }
        
        recycledWaste[_wasteId] = RecycledItem({
            wasteId: _wasteId,
            method: _method,
            recycler: msg.sender, 
            recycledAt: block.timestamp
        });
        emit WasteRecycled(_wasteId, _method, block.timestamp);
    }

    function getRecycledItem(uint _wasteId) external view returns (
        uint wasteId,
        string memory method,
        address recycler,
        uint256 recycledAt
    ) {
        RecycledItem memory item = recycledWaste[_wasteId];
        return (
            item.wasteId,
            item.method,
            item.recycler,
            item.recycledAt
        );
    }
}