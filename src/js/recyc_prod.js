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
// Replace with your contract ABIs and addresses
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

const eWasteTrackingAddress = "0xe851C5A246e49852C9888343e730F29ecC226b11";
const recyclingManagementAddress = "0xe851C5A246e49852C9888343e730F29ecC226b11";

// Global Variables
let web3, eWasteTracker, recyclingManager, userAddress;

// Initialize Web3 and Contracts
async function initializeWeb3() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Request account access
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Initialize Web3
            web3 = new Web3(window.ethereum);

            // Get user's address
            const accounts = await web3.eth.getAccounts();
            userAddress = accounts[0];
            console.log("User address:", userAddress);

            // Initialize contracts
            eWasteTracker = new web3.eth.Contract(eWasteTrackingABI, eWasteTrackingAddress);
            recyclingManager = new web3.eth.Contract(recyclingManagementABI, recyclingManagementAddress);

            console.log("Web3 and contracts initialized successfully!");
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Error connecting to MetaMask. Please check the console for details.");
        }
    } else {
        console.error("MetaMask not installed.");
        alert("MetaMask is not installed. Please install MetaMask to use this application.");
    }
}

// Fetch All e-Waste Items
async function fetchAllWasteItems() {
    try {
        const wasteCounter = await eWasteTracker.methods.wasteCounter().call();
        const wasteItems = [];

        for (let i = 1; i <= wasteCounter; i++) {
            const wasteItem = await eWasteTracker.methods.getWasteItem(i).call();
            const recycledItem = await recyclingManager.methods.getRecycledItem(i).call();
            wasteItems.push({ ...wasteItem, ...recycledItem });
        }

        return wasteItems;
    } catch (error) {
        console.error("Error fetching waste items:", error);
        return [];
    }
}

// Log e-Waste (Producer)
async function logWaste() {
    const wasteType = document.getElementById("waste-type").value;
    const quantity = document.getElementById("quantity").value;
    const origin = document.getElementById("origin").value;
    const deadline = Math.floor(new Date(document.getElementById("deadline").value).getTime() / 1000);

    try {
        await eWasteTracker.methods
            .logWaste(wasteType, origin, quantity, deadline)
            .send({ from: userAddress });
        alert("eWaste logged successfully!");
        document.getElementById("log-ewaste-form").reset();
    } catch (error) {
        console.error("Error logging eWaste:", error);
        alert("Error logging eWaste. Check the console for details.");
    }
}

// Confirm Receipt (Recycler)
async function confirmReceipt() {
    const wasteId = document.getElementById("wasteId").value;
    try {
        await recyclingManager.methods
            .processRecycling(wasteId, "Confirmed Receipt")
            .send({ from: userAddress });
        document.getElementById("receiptStatus").innerText = "Receipt confirmed successfully!";
    } catch (error) {
        document.getElementById("receiptStatus").innerText = "Error: " + error.message;
    }
}

// Update Recycling Details (Recycler)
async function updateRecycling() {
    const wasteId = document.getElementById("recyclingWasteId").value;
    const method = document.getElementById("recyclingMethod").value;
    try {
        await recyclingManager.methods
            .processRecycling(wasteId, method)
            .send({ from: userAddress });
        document.getElementById("recyclingStatus").innerText = "Recycling details updated successfully!";
    } catch (error) {
        document.getElementById("recyclingStatus").innerText = "Error: " + error.message;
    }
}

// View eWaste Details (Both Producer and Recycler)
async function viewWasteDetails() {
    const wasteId = document.getElementById("viewWasteId").value;
    try {
        const wasteDetails = await eWasteTracker.methods.getWasteItem(wasteId).call();
        const recycledDetails = await recyclingManager.methods.getRecycledItem(wasteId).call();

        document.getElementById("wasteDetails").innerHTML = `
            <p><strong>ID:</strong> ${wasteDetails.id}</p>
            <p><strong>Type:</strong> ${wasteDetails.wasteType}</p>
            <p><strong>Origin:</strong> ${wasteDetails.origin}</p>
            <p><strong>Quantity:</strong> ${wasteDetails.quantity}</p>
            <p><strong>Deadline:</strong> ${new Date(wasteDetails.deadline * 1000).toLocaleString()}</p>
            <p><strong>Logged At:</strong> ${new Date(wasteDetails.loggedAt * 1000).toLocaleString()}</p>
            <p><strong>Processed:</strong> ${wasteDetails.isProcessed ? "Yes" : "No"}</p>
            <p><strong>Recycling Method:</strong> ${recycledDetails.method}</p>
            <p><strong>Recycled At:</strong> ${new Date(recycledDetails.recycledAt * 1000).toLocaleString()}</p>
        `;
    } catch (error) {
        document.getElementById("wasteDetails").innerText = "Error: " + error.message;
    }
}

// Update Producer Dashboard
async function updateProducerDashboard() {
    try {
        const wasteItems = await fetchAllWasteItems();
        let totalWaste = 0, pending = 0, recycled = 0;

        wasteItems.forEach((item) => {
            totalWaste += parseInt(item.quantity);
            if (item.recycledAt > 0) {
                recycled += parseInt(item.quantity);
            } else {
                pending += parseInt(item.quantity);
            }
        });

        // Update UI
        document.getElementById("total-disposal").textContent = totalWaste;
        document.getElementById("total-logged").textContent = wasteItems.length;
        document.getElementById("total-pending").textContent = pending;
        document.getElementById("total-recycled").textContent = recycled;
    } catch (error) {
        console.error("Error updating producer dashboard:", error);
    }
}

// Update Recycler Dashboard
async function updateRecyclerDashboard() {
    try {
        const wasteItems = await fetchAllWasteItems();
        const wasteTableBody = document.querySelector("#recycler-waste-table tbody");
        wasteTableBody.innerHTML = "";

        wasteItems.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.wasteType}</td>
                <td>${item.isProcessed ? "Processed" : "Pending"}</td>
                <td>
                    <button onclick="viewWasteDetails(${item.id})">View Details</button>
                    <button onclick="markAsProcessed(${item.id})">Mark as Processed</button>
                </td>
            `;
            wasteTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error updating recycler dashboard:", error);
    }
}

// Initialize Web3 and Update Dashboards on Page Load
window.addEventListener("load", async () => {
    await initializeWeb3();

    // Update Producer Dashboard
    if (document.getElementById("total-disposal")) {
        await updateProducerDashboard();
    }

    // Update Recycler Dashboard
    if (document.getElementById("recycler-waste-table")) {
        await updateRecyclerDashboard();
    }
});