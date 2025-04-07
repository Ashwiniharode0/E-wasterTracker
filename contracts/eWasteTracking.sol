// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";

contract eWasteTracking {
    UserManagement public userManagement;

    struct eWasteItem {
        uint id;
        string wasteType;
        string origin;
        uint quantity;
        uint256 deadline; // Deadline set by producer
        uint256 loggedAt;
        bool isProcessed;
    }

    mapping(uint => eWasteItem) public wasteRecords;
    uint public wasteCounter;

    event WasteLogged(uint id, string wasteType, string origin, uint quantity, uint256 deadline);
    event WasteProcessed(uint id);

    constructor(address _userManagementAddress) {
        userManagement = UserManagement(_userManagementAddress);
        wasteCounter = 0;
    }

    function logWaste(
        string memory _wasteType,
        string memory _origin,
        uint _quantity,
        uint256 _deadline
    ) external {
        require(userManagement.getUserRole(msg.sender) == UserManagement.Role.Producer, "Unauthorized");
        require(_quantity > 0, "Quantity must be greater than zero.");
        require(_deadline > block.timestamp, "Deadline must be in the future.");

        wasteCounter++;
        wasteRecords[wasteCounter] = eWasteItem({
            id: wasteCounter,
            wasteType: _wasteType,
            origin: _origin,
            quantity: _quantity,
            deadline: _deadline,
            loggedAt: block.timestamp,
            isProcessed: false
        });
        emit WasteLogged(wasteCounter, _wasteType, _origin, _quantity, _deadline);
    }

    // Only recyclers can mark as processed
    function markAsProcessed(uint _id) external {
        require(userManagement.getUserRole(msg.sender) == UserManagement.Role.Recycler, "Unauthorized");
        require(wasteRecords[_id].id != 0, "Waste item does not exist.");
        wasteRecords[_id].isProcessed = true;
        emit WasteProcessed(_id);
    }

    function getWasteItem(uint _id) external view returns (
        uint id,
        string memory wasteType,
        string memory origin,
        uint quantity,
        uint256 deadline,
        uint256 loggedAt,
        bool isProcessed
    ) {
        return (
            wasteRecords[_id].id,
            wasteRecords[_id].wasteType,
            wasteRecords[_id].origin,
            wasteRecords[_id].quantity,
            wasteRecords[_id].deadline,
            wasteRecords[_id].loggedAt,
            wasteRecords[_id].isProcessed
        );
    }
}