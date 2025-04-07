
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
    
    document.getElementById("log-ewaste-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            await initializeWeb3();
            
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];
    
            const wasteType = document.getElementById("waste-type").value;
            const quantity = parseInt(document.getElementById("quantity").value);
            const origin = document.getElementById("origin").value;
            const deadline = Math.floor(new Date(document.getElementById("deadline").value).getTime() / 1000);
            
            const tx = await contract.methods.logWaste(wasteType, origin, quantity, deadline)
                .send({ from: userAddress });
            
            console.log("Transaction successful:", tx);
            alert("eWaste logged successfully!");
            const wasteId = tx.events.WasteLogged.returnValues.id;
            localStorage.setItem("latestWasteId", wasteId);
            document.getElementById("log-ewaste-form").reset();
        } catch (error) {
            console.error("Error logging eWaste:", error);
            alert("Transaction failed! Check the console for details.");
        }
    });