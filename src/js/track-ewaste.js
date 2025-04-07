let web3;
let contract;
let contractsInitialized = false;

    const contractAddress = "0xe851C5A246e49852C9888343e730F29ecC226b11";
    const contractABI = [
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
    

    async function initializeWeb3() {
        try {
            if (web3 && contractsInitialized) return true;
            
            if (!window.ethereum) {
                throw new Error("MetaMask not installed. Please install MetaMask.");
            }
            
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (!accounts.length) throw new Error("No accounts found");
            
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(contractABI, contractAddress);
            
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
    
    async function loadWasteItems(filter = "all") {
        try {
            await initializeWeb3();
            
            const wasteCounter = await contract.methods.wasteCounter().call();
            const tableBody = document.querySelector("#track-ewaste-table tbody");
            tableBody.innerHTML = "";
            
            for (let i = 1; i <= wasteCounter; i++) {
                const wasteItem = await contract.methods.getWasteItem(i).call();
                const status = wasteItem.isProcessed ? "Recycled" : "Pending";
                const statusClass = status.toLowerCase().replace(" ", "-");
                
                if (filter !== "all" && filter !== statusClass) {
                    continue;
                }
                
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${wasteItem.wasteType}</td>
                    <td class="${statusClass}">${status}</td>
                    <td><button class="track-btn" data-id="${wasteItem.id}">Track</button></td>
                `;
                tableBody.appendChild(row);
            }
        } catch (error) {
            console.error("Error loading waste items:", error);
        }
    }
    
    document.getElementById("status-filter").addEventListener("change", (event) => {
        loadWasteItems(event.target.value);
    });
    
    window.addEventListener("load", async () => {
        try {
            await initializeWeb3();
            loadWasteItems();
        } catch (error) {
            console.error("❌ Initialization failed:", error);
        }
    });