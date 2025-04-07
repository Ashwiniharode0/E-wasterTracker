// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";

contract LogisticsTracking {
    UserManagement public userManagement;

    struct Shipment {
        uint wasteId;
        string status;
        address transporter;
        uint256 updatedAt;
    }

    mapping(uint => Shipment) public shipments;
    
    event ShipmentUpdated(uint wasteId, string status, uint256 updatedAt);

    constructor(address _userManagementAddress) {
        userManagement = UserManagement(_userManagementAddress);
    }

    // Only logistics providers can update shipments
    function updateShipment(uint _wasteId, string memory _status) external {
        require(
            userManagement.getUserRole(msg.sender) == UserManagement.Role.Logistics,
            "Unauthorized: Only logistics providers can update shipments."
        );
        
        shipments[_wasteId] = Shipment({
            wasteId: _wasteId,
            status: _status,
            transporter: msg.sender,
            updatedAt: block.timestamp
        });
        emit ShipmentUpdated(_wasteId, _status, block.timestamp);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";

contract LogisticsTracking {
    UserManagement public userManagement;

    struct Shipment {
        uint wasteId;
        string status;
        address transporter;
        uint256 updatedAt;
    }

    mapping(uint => Shipment) public shipments;
    uint public shipmentCounter; // Counter for total shipments

    event ShipmentUpdated(uint wasteId, string status, uint256 updatedAt);

    constructor(address _userManagementAddress) {
        userManagement = UserManagement(_userManagementAddress);
        shipmentCounter = 0;
    }

    function updateShipment(uint _wasteId, string memory _status) external {
        require(
            userManagement.getUserRole(msg.sender) == UserManagement.Role.Logistics,
            "Unauthorized: Only logistics providers can update shipments."
        );

        shipments[_wasteId] = Shipment({
            wasteId: _wasteId,
            status: _status,
            transporter: msg.sender,
            updatedAt: block.timestamp
        });
        shipmentCounter++; // Increment shipment counter
        emit ShipmentUpdated(_wasteId, _status, block.timestamp);
    }

    // Get total number of shipments
    function getTotalShipments() external view returns (uint) {
        return shipmentCounter;
    }

    // Get shipments by status
    function getShipmentsByStatus(string memory _status) external view returns (Shipment[] memory) {
        Shipment[] memory result = new Shipment[](shipmentCounter);
        uint counter = 0;
        for (uint i = 1; i <= shipmentCounter; i++) {
            if (keccak256(bytes(shipments[i].status)) == keccak256(bytes(_status))) {
                result[counter] = shipments[i];
                counter++;
            }
        }
        return result;
    }
}