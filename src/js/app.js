// app.js

// Global declarations for web3 and contract instances
let web3;
let contractsInitialized = false;
let userManagement, recyclingManagement, logisticsTracking, eWasteTracking, complianceAudit;

// Replace these with your actual deployed contract addresses
const userManagementAddress = "0x19Ea4bF46D63fccBaf20242e7C6e54906cF5e5Ed";
const eWasteTrackingAddress = "0xe851C5A246e49852C9888343e730F29ecC226b11";
const recyclingManagementAddress = "0xeFD177547A7b262C5ff7B029f7c6ADD9ff1f3527";
const logisticsTrackingAddress = "0x58B2A44BFcc5C6fA520f05f26Ca69172553F2008";
const complianceAuditAddress = "0xEF4d693499841F4354316156e95219E7E2eB1377";

// Replace these with your actual ABI arrays
const userManagementABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "enum UserManagement.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "UserLoggedIn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "enum UserManagement.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "enum UserManagement.Role",
        "name": "_role",
        "type": "uint8"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_role",
        "type": "string"
      }
    ],
    "name": "loginUser",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "enum UserManagement.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserRole",
    "outputs": [
      {
        "internalType": "enum UserManagement.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_role",
        "type": "string"
      }
    ],
    "name": "getUserByRole",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "enum UserManagement.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const eWasteTrackingABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userManagementAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "wasteType",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "WasteLogged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "WasteProcessed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "userManagement",
    "outputs": [
      {
        "internalType": "contract UserManagement",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "wasteCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "wasteRecords",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "wasteType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "loggedAt",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isProcessed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_wasteType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_origin",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "logWaste",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "markAsProcessed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getWasteItem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "wasteType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "loggedAt",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isProcessed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const recyclingManagementABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userManagementAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_eWasteTrackerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recycler",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "NonCompliance",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "method",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "recycledAt",
        "type": "uint256"
      }
    ],
    "name": "WasteRecycled",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "eWasteTracker",
    "outputs": [
      {
        "internalType": "contract eWasteTracking",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "recycledWaste",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "method",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "recycler",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "recycledAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "userManagement",
    "outputs": [
      {
        "internalType": "contract UserManagement",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_method",
        "type": "string"
      }
    ],
    "name": "processRecycling",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wasteId",
        "type": "uint256"
      }
    ],
    "name": "getRecycledItem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "method",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "recycler",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "recycledAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const logisticsTrackingABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userManagementAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "ShipmentUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "shipments",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "transporter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "userManagement",
    "outputs": [
      {
        "internalType": "contract UserManagement",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_status",
        "type": "string"
      }
    ],
    "name": "updateShipment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const complianceAuditABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userManagementAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_recyclerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_eWasteTrackerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "auditedAt",
        "type": "uint256"
      }
    ],
    "name": "AuditLogged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recycler",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "details",
        "type": "string"
      }
    ],
    "name": "NonComplianceLogged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "audits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "auditStatus",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "auditedAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "eWasteTracker",
    "outputs": [
      {
        "internalType": "contract eWasteTracking",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "recycler",
    "outputs": [
      {
        "internalType": "contract RecyclingManagement",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "userManagement",
    "outputs": [
      {
        "internalType": "contract UserManagement",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wasteId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_status",
        "type": "string"
      }
    ],
    "name": "logAudit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ADD THIS FUNCTION TO app.js (if not already present)
async function initializeWeb3() {
  try {
    // Skip if already initialized
    if (web3 && contractsInitialized) return true;

    // 1. Check for Ethereum provider
    if (!window.ethereum) {
      throw new Error("MetaMask not installed");
    }

    // 2. Request accounts
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    if (!accounts.length) throw new Error("No accounts found");

    // 3. Create Web3 instance
    web3 = new Web3(window.ethereum);
    
    // 4. Initialize contracts
    await initializeContracts();
    contractsInitialized = true;
    
    console.log("Web3 initialized successfully");
    return true;

  } catch (error) {
    console.error("Web3 initialization failed:", error);
    web3 = null;
    contractsInitialized = false;
    throw error;
  }
}

// ADD THIS NEW FUNCTION
async function initializeContracts() {
  userManagement = new web3.eth.Contract(userManagementABI, userManagementAddress);
  recyclingManagement = new web3.eth.Contract(recyclingManagementABI, recyclingManagementAddress);
  logisticsTracking = new web3.eth.Contract(logisticsTrackingABI, logisticsTrackingAddress);
  eWasteTracking = new web3.eth.Contract(eWasteTrackingABI, eWasteTrackingAddress);
  complianceAudit = new web3.eth.Contract(complianceAuditABI, complianceAuditAddress);
}

// ADD THIS NEW INITIALIZATION CODE
document.addEventListener('DOMContentLoaded', async function() {
  console.log("DOM fully loaded and parsed");
  
  // Initialize Web3 if on a blockchain-related page
  if (window.location.pathname.includes('register.html') || 
      window.location.pathname.includes('login.html') ||
      window.location.pathname.includes('dashboard.html')) {
    const initialized = await initializeWeb3();
    if (!initialized) {
      alert("Please connect to MetaMask first");
      window.location.href = "login.html";
      return;
    }
  }

  // Attach event listeners
  attachEventListeners();
});


function attachEventListeners() {
  // Keep your working version but add preventDefault
  const registerForm = document.getElementById("registerForm");
  
  if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Add this line
      registerUser();
    });
    
    // Keep your existing button enable logic
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
      registerBtn.disabled = false;
    }
  }
}
// Function to attach contract event listeners (logs events to console)
function attachContractEventListeners() {
  // Example: Listen for UserRegistered event from the UserManagement contract
  userManagement.events.UserRegistered({}, (error, event) => {
    if (!error) {
      console.log("UserRegistered event:", event.returnValues);
    } else {
      console.error("Error in UserRegistered listener:", error);
    }
  });

  // Example: Listen for WasteLogged event from the eWasteTracking contract
  eWasteTracking.events.WasteLogged({}, (error, event) => {
    if (!error) {
      console.log("WasteLogged event:", event.returnValues);
    } else {
      console.error("Error in WasteLogged listener:", error);
    }
  });

  // Similarly add listeners for other events (WasteProcessed, WasteRecycled, etc.)
  recyclingManagement.events.WasteRecycled({}, (error, event) => {
    if (!error) {
      console.log("WasteRecycled event:", event.returnValues);
    } else {
      console.error("Error in WasteRecycled listener:", error);
    }
  });

  logisticsTracking.events.ShipmentUpdated({}, (error, event) => {
    if (!error) {
      console.log("ShipmentUpdated event:", event.returnValues);
    } else {
      console.error("Error in ShipmentUpdated listener:", error);
    }
  });

  complianceAudit.events.AuditLogged({}, (error, event) => {
    if (!error) {
      console.log("AuditLogged event:", event.returnValues);
    } else {
      console.error("Error in AuditLogged listener:", error);
    }
  });
}

// Contract Interaction Functions

async function registerUser() {
  event.preventDefault();
  // Get input values (assumes inputs with id "name" and "role")
  const name = document.getElementById("name").value;
  const roleStr = document.getElementById("role").value;

  // Convert role string to enum index:
  // Producer=0, Recycler=1, Logistics=2, Regulator=3, None=4
  let role;
  if (roleStr === "Producer") role = 0;
  else if (roleStr === "Recycler") role = 1;
  else if (roleStr === "Logistics") role = 2;
  else if (roleStr === "Regulator") role = 3;
  else role = 4;

  try {
    // Get account
    const accounts = await web3.eth.getAccounts();
    console.log("Registering with account:", accounts[0]);

    // Send transaction
    const tx = await userManagement.methods.registerUser(name, role)
      .send({ 
        from: accounts[0],
      });

    console.log("Transaction successful:", tx);
    alert(`✅ Registered successfully!\nTX Hash: ${tx.transactionHash}`);
    
    // Redirect to login
    window.location.href = "login.html";

  } catch (error) {
    console.error("Registration error:", error);
    alert(`❌ Registration failed: ${error.message}`);
  }

  /*const accounts = await web3.eth.getAccounts();
  try {
    const tx = await userManagement.methods.registerUser(name, role).send({ from: accounts[0] });
    console.log("Registration transaction:", tx);
    alert("Registration successful!");
  } catch (error) {
    console.error("Registration error:", error);
    alert("Error registering user: " + error.message);
  }*/
}

// async function logEWaste() {
//   // Get input values from the eWaste form (assumes IDs "wasteType", "origin", "quantity", "deadline")
//   const wasteType = document.getElementById("wasteType").value;
//   const origin = document.getElementById("origin").value;
//   const quantity = document.getElementById("quantity").value;
//   const deadline = document.getElementById("deadline").value;

//   const accounts = await web3.eth.getAccounts();
//   try {
//     const tx = await eWasteTracking.methods.logWaste(wasteType, origin, quantity, deadline).send({ from: accounts[0] });
//     console.log("Waste logged transaction:", tx);
//     alert("Waste logged successfully!");
//   } catch (error) {
//     console.error("Log waste error:", error);
//     alert("Error logging waste: " + error.message);
//   }
// }

async function processRecycling() {
  // Get input values from the Recycling form (assumes IDs "wasteIdRecycle", "method")
  const wasteId = document.getElementById("wasteIdRecycle").value;
  const method = document.getElementById("method").value;

  const accounts = await web3.eth.getAccounts();
  try {
    const tx = await recyclingManagement.methods.processRecycling(wasteId, method).send({ from: accounts[0] });
    console.log("Recycling processed transaction:", tx);
    alert("Recycling processed successfully!");
  } catch (error) {
    console.error("Process recycling error:", error);
    alert("Error processing recycling: " + error.message);
  }
}

async function updateShipmentStatus() {
  // Get input values from the Shipment form (assumes IDs "wasteIdShipment", "shipmentStatus")
  const wasteId = document.getElementById("wasteIdShipment").value;
  const status = document.getElementById("shipmentStatus").value;

  const accounts = await web3.eth.getAccounts();
  try {
    const tx = await logisticsTracking.methods.updateShipment(wasteId, status).send({ from: accounts[0] });
    console.log("Shipment updated transaction:", tx);
    alert("Shipment updated successfully!");
  } catch (error) {
    console.error("Update shipment error:", error);
    alert("Error updating shipment: " + error.message);
  }
}

async function logAuditData() {
  // Get input values from the Audit form (assumes IDs "wasteIdAudit", "auditStatus")
  const wasteId = document.getElementById("wasteIdAudit").value;
  const auditStatus = document.getElementById("auditStatus").value;

  const accounts = await web3.eth.getAccounts();
  try {
    const tx = await complianceAudit.methods.logAudit(wasteId, auditStatus).send({ from: accounts[0] });
    console.log("Audit logged transaction:", tx);
    alert("Audit logged successfully!");
  } catch (error) {
    console.error("Log audit error:", error);
    alert("Error logging audit: " + error.message);
  }
}

async function getAuditStatusData() {
  // Example function to call a view function from the complianceAudit contract
  // Assumes a function like getAuditStatus(uint wasteId) exists in your contract and an input with id "auditQueryWasteId"
  const wasteId = document.getElementById("auditQueryWasteId").value;
  try {
    const result = await complianceAudit.methods.getAuditStatus(wasteId).call();
    console.log("Audit status:", result);
    alert("Audit status: " + result);
  } catch (error) {
    console.error("Get audit status error:", error);
    alert("Error getting audit status: " + error.message);
  }
}

async function getUserRole() {
  const accounts = await web3.eth.getAccounts();
  try {
    const roleIndex = await userManagement.methods.getUserRole(accounts[0]).call();
    const roles = ['Producer', 'Recycler', 'Logistics', 'Regulator', 'None'];
    return roles[roleIndex];
  } catch (error) {
    console.error("Error fetching role:", error);
    return 'None';
  }
}

async function initializeDashboard() {
  const role = await getUserRole();
  const account = (await web3.eth.getAccounts())[0];
  
  document.getElementById('userName').textContent = account;
  document.getElementById('roleBadge').textContent = role;
  
  // Show/hide sections based on role
  const sections = ['producer', 'recycler', 'logistics', 'regulator'];
  sections.forEach(section => {
    document.getElementById(`${section}Section`).style.display = 'none';
  });
  
  if(role !== 'None') {
    document.getElementById(`${role.toLowerCase()}Section`).style.display = 'block';
  }
}

// ADD THIS NEW FUNCTION
async function initializeDashboard() {
  try {
    console.log("Starting dashboard initialization...");

    // 1. Check Web3 connection
    if (!web3) {
      throw new Error("Web3 not initialized");
    }

    // 2. Get connected account
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error("No connected account");
    }
    console.log("Connected account:", accounts[0]);

    // 3. Check contract instance
    if (!userManagement || !userManagement.methods) {
      throw new Error("UserManagement contract not initialized");
    }

    // 4. Get user role
    console.log("Fetching user role...");
    const roleIndex = await userManagement.methods.getUserRole(accounts[0]).call();
    console.log("Role index:", roleIndex);

    // 5. Validate role index
    if (roleIndex === undefined || roleIndex === null) {
      throw new Error("Invalid role index returned");
    }

    // 6. Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
      section.style.display = 'none';
    });

    // 7. Show relevant section
    const roleMap = {
      0: 'producerSection',
      1: 'recyclerSection',
      2: 'logisticsSection',
      3: 'regulatorSection'
    };
    
    if (roleMap[roleIndex]) {
      document.getElementById(roleMap[roleIndex]).style.display = 'block';
      document.getElementById('roleBadge').textContent = 
        ['Producer', 'Recycler', 'Logistics', 'Regulator'][roleIndex];
    } else {
      throw new Error("Unrecognized role index: " + roleIndex);
    }

    // 8. Display user address
    document.getElementById('userName').textContent = accounts[0];

    console.log("Dashboard initialized successfully");

  } catch (error) {
    console.error("Dashboard initialization failed:", {
      message: error.message,
      stack: error.stack,
      contractAddress: userManagement?._address,
      connectedAccount: web3?.eth?.defaultAccount
    });
    alert("Error: Please ensure you're registered and connected properly");
    window.location.href = "login.html";
  }
}

// ADD THIS INITIALIZATION CALL
if (window.location.pathname.includes('dashboard.html')) {
  initializeDashboard();
}
