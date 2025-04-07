// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    enum Role { Producer, Recycler, Logistics, Regulator, None }

    struct User {
        string name;
        Role role;
        bool isRegistered;
    }

    mapping(address => User[]) private users;
    address public admin;

    event UserRegistered(address indexed user, string name, Role role);
    event UserLoggedIn(address indexed user, string name, Role role);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerUser(string memory _name, Role _role) external {
        for (uint i = 0; i < users[msg.sender].length; i++) {
            if (keccak256(bytes(users[msg.sender][i].name)) == keccak256(bytes(_name)) && users[msg.sender][i].role == _role) {
                revert("User with this name and role is already registered.");
            }
        }
        users[msg.sender].push(User(_name, _role, true));
        emit UserRegistered(msg.sender, _name, _role);
    }

    function loginUser(string memory _role) external view returns (string memory, Role) {
        Role roleEnum = getRoleFromString(_role);
        for (uint i = 0; i < users[msg.sender].length; i++) {
            if (users[msg.sender][i].role == roleEnum) {
                User memory user = users[msg.sender][i];
                return (user.name, user.role);
            }
        }
        revert("No user with this role found.");
    }

    function getUserCount(address _user) external view returns (uint) {
        return users[_user].length;
    }

    //  ✅ Returns the ROLE of the CALLER (msg.sender)
    function getUserRole(address _user) public view returns (Role) {
        for (uint i = 0; i < users[_user].length; i++) {
          return users[_user][i].role; // Returns the first role found for the user. You might want to handle multiple roles.
        }
        return Role.None; // Return None if no role is found
    }

    function getUserByRole(address _user, string memory _role) external view returns (string memory, Role) {
        Role roleEnum = getRoleFromString(_role);
        for (uint i = 0; i < users[_user].length; i++) {
            if (users[_user][i].role == roleEnum) {
                User memory user = users[_user][i];
                return (user.name, user.role);
            }
        }
        revert("No user with this role found.");
    }

    function getRoleFromString(string memory _role) private pure returns (Role) {
        if (keccak256(bytes(_role)) == keccak256(bytes("Producer"))) {
            return Role.Producer;
        } else if (keccak256(bytes(_role)) == keccak256(bytes("Recycler"))) {
            return Role.Recycler;
        } else if (keccak256(bytes(_role)) == keccak256(bytes("Logistics"))) {
            return Role.Logistics;
        } else if (keccak256(bytes(_role)) == keccak256(bytes("Regulator"))) {
            return Role.Regulator;
        } else {
            return Role.None;
        }
    }
}