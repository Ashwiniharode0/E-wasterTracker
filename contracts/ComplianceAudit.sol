// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";
import "./RecyclingManagement.sol";
import "./eWasteTracking.sol";

contract ComplianceAudit {
    UserManagement public userManagement;
    RecyclingManagement public recycler;
    eWasteTracking public eWasteTracker;

    struct AuditRecord {
        uint wasteId;
        string auditStatus;
        uint256 auditedAt;
    }

    mapping(uint => AuditRecord) public audits;
    
    event AuditLogged(uint wasteId, string status, uint256 auditedAt);
    event NonComplianceLogged(uint wasteId, address recycler, string details);

    constructor(
        address _userManagementAddress,
        address _recyclerAddress,
        address _eWasteTrackerAddress
    ) {
        userManagement = UserManagement(_userManagementAddress);
        recycler = RecyclingManagement(_recyclerAddress);
        eWasteTracker = eWasteTracking(_eWasteTrackerAddress);
    }

    function logAudit(uint _wasteId, string memory _status) external {
        require(
            userManagement.getUserRole(msg.sender) == UserManagement.Role.Regulator,
            "Unauthorized: Only regulators can log audits."
        );
        
        (
        uint recycledId,
        string memory method,
        address recyclerAddress,
        uint256 recycledAt
    ) = recycler.getRecycledItem(_wasteId);

    (
        uint wasteId,
        string memory wasteType,
        string memory origin,
        uint quantity,
        uint256 deadline,
        uint256 loggedAt,
        bool isProcessed
    ) = eWasteTracker.getWasteItem(_wasteId);
        
        audits[_wasteId] = AuditRecord({
            wasteId: _wasteId,
            auditStatus: _status,
            auditedAt: block.timestamp
        });
        emit AuditLogged(_wasteId, _status, block.timestamp);

        if (recycledAt > deadline) {
        emit NonComplianceLogged(_wasteId, recyclerAddress, "Recycling missed deadline.");
    }
    }
}