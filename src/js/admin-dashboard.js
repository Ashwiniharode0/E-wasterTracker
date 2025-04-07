// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//       if (!contractsInitialized) {
//     const initialized = await initializeWeb3();
//     if (!initialized) {
//       alert("Please connect to MetaMask first");
//       window.location.href = "login.html";
//       return;
//     }
//   }
  
//       const accounts = await web3.eth.getAccounts();
//       const roleIndex = await userManagement.methods.getUserRole(accounts[0]).call();
      
//       // Map role indexes to section IDs
//       const roleMap = {
//         0: 'producerSection',
//         1: 'recyclerSection',
//         2: 'logisticsSection',
//         3: 'regulatorSection'
//       };

//       // Hide all sections
//       document.querySelectorAll('.dashboard-section').forEach(section => {
//         section.style.display = 'none';
//       });

//       // Show relevant section
//       if (roleMap[roleIndex]) {
//         document.querySelector(roleMap[roleIndex]).style.display = 'block';
//         document.getElementById('roleBadge').textContent = 
//           ['Producer', 'Recycler', 'Logistics', 'Regulator'][roleIndex];
//       }

//       // Display address
//       document.getElementById('userName').textContent = accounts[0];

//     } catch (error) {
//       console.error("Dashboard error:", error);
//       alert("Error: Please ensure you're registered and connected properly");
//       window.location.href = "login.html";
//     }
//   });

//   // Debugging function
// async function debugDashboard() {
//   const info = {
//     web3: !!web3,
//     account: web3?.eth?.defaultAccount,
//     contract: !!userManagement,
//     roleIndex: await userManagement.methods.getUserRole(web3.eth.defaultAccount).call()
//   };
//   document.getElementById('debugInfo').textContent = JSON.stringify(info, null, 2);
// }

// // Run debugger
// debugDashboard();

document.addEventListener('DOMContentLoaded', async function () {
  console.log("Admin Dashboard Loaded!");

  if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();

      // Fetch user data (Example Data)
      document.getElementById("userCount").textContent = "150"; 
      document.getElementById("wasteLogsCount").textContent = "80";
      document.getElementById("recyclingProgress").textContent = "60";
      document.getElementById("shipmentsCount").textContent = "35";
  } else {
      alert("Please install MetaMask!");
  }

  // Logout functionality
  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("logout-btn")) {
          window.location.href = "index.html"; // Redirects to index.html
      }
  });
});

