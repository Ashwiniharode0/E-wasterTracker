let web3;
let contract;
let contractsInitialized = false;
// Connect to the blockchain (e.g., Ethereum, Polygon)

// Replace with your contract ABI and address
const logisticscontractABI = [ 
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
const logisticsAddress = "0x58B2A44BFcc5C6fA520f05f26Ca69172553F2008";

// Initialize the contract

async function initializeWeb3() {
    try {
        // ✅ Skip if already initialized
        if (web3 && contractsInitialized) return true;

        // ✅ 1. Check if MetaMask is installed
        if (!window.ethereum) {
            throw new Error("MetaMask not installed. Please install MetaMask.");
        }

        // ✅ 2. Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (!accounts.length) throw new Error("No accounts found");

        // ✅ 3. Initialize Web3 instance
        web3 = new Web3(window.ethereum);

        // ✅ 4. Initialize Smart Contract
        contract = new web3.eth.Contract(logisticscontractABIABI, logisticsAddressAddress);

        contractsInitialized = true;
        console.log("✅ Web3 & contract initialized successfully!");
        return true;
    } catch (error) {
        console.error("❌ Web3 initialization failed:", error);
        web3 = null;
        contractsInitialized = false;
        throw error;
    }
}

// Fetch and display dashboard metrics
async function fetchDashboardMetrics() {
    try {
        // Fetch total shipments
        const totalShipments = await contract.methods.getTotalShipments().call();
        document.getElementById("totalShipments").innerText = totalShipments;

        // Fetch in-transit shipments
        const inTransit = await contract.methods.getShipmentsByStatus("In Transit").call();
        document.getElementById("inTransit").innerText = inTransit.length;

        // Fetch delivered shipments
        const delivered = await contract.methods.getShipmentsByStatus("Delivered").call();
        document.getElementById("delivered").innerText = delivered.length;

        // Fetch recent shipment updates
        const recentUpdates = await contract.methods.getRecentUpdates().call();
        displayTimeline(recentUpdates);
    } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
    }
}

// Display recent shipment updates in the timeline
function displayTimeline(updates) {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";

    updates.forEach((update, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}`;

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${update.status}</h3>
                <p>${update.timestamp}</p>
                <p>${update.notes || "No notes"}</p>
            </div>
        `;

        timeline.appendChild(timelineItem);
    });
}

// Call the function when the page loads
window.onload = fetchDashboardMetrics;

// Function to handle form submission
document.getElementById("updateStatusForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const shipmentId = document.getElementById("shipmentId").value;
    const status = document.getElementById("status").value;
    const location = document.getElementById("location").value;
    const notes = document.getElementById("notes").value;

    // Update status on the blockchain
    try {
        await contract.methods.updateShipmentStatus(shipmentId, status, location, notes).send({ from: logisticsAddress });

        // Display success message
        document.getElementById("statusMessage").innerHTML = `
            <div class="status-message success">
                <i class="fas fa-check-circle"></i> Status updated successfully!
            </div>
        `;

        // Clear the form
        document.getElementById("updateStatusForm").reset();
    } catch (error) {
        // Display error message
        document.getElementById("statusMessage").innerHTML = `
            <div class="status-message error">
                <i class="fas fa-exclamation-circle"></i> Error: ${error.message}
            </div>
        `;
    }
});

// Function to fetch and display shipment history
async function fetchShipmentHistory() {
    try {
        // Fetch all shipment updates from the blockchain
        const updates = await contract.methods.getAllShipmentUpdates().call({ from: logisticsAddress });

        // Display updates in the timeline
        displayTimeline(updates);
    } catch (error) {
        console.error("Error fetching shipment history:", error);
    }
}

// Function to display updates in the timeline
function displayTimeline(updates) {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";

    updates.forEach((update, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}`;

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${update.status}</h3>
                <p><strong>Shipment ID:</strong> ${update.shipmentId}</p>
                <p><strong>Location:</strong> ${update.location}</p>
                <p><strong>Timestamp:</strong> ${new Date(update.timestamp * 1000).toLocaleString()}</p>
                <p><strong>Notes:</strong> ${update.notes || "No notes"}</p>
            </div>
        `;

        timeline.appendChild(timelineItem);
    });
}

// Call the function when the page loads
window.onload = fetchShipmentHistory;





