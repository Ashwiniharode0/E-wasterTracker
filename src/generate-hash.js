const crypto = require('crypto');

function hash(content) {
  return crypto.createHash('sha256').update(content).digest('base64');
}

const scriptContent = `
    document.getElementById("loginBtn").addEventListener("click", async function() {
      try {
        // Initialize Web3 and contracts
        const initialized = await initializeWeb3();
        if (!initialized) {
          alert("Failed to connect to MetaMask");
          return;
        }
    
        // Get connected account
        const accounts = await web3.eth.getAccounts();
        if (!accounts || accounts.length === 0) {
          alert("No account connected");
          return;
        }
    
        // Fetch user role
        const roleIndex = await userManagement.methods.getUserRole(accounts[0]).call();
        console.log("Role index:", roleIndex);
    
        // Define role-to-page mapping
        const rolePages = {
          0: "producer.html", // Producer
          1: "recycler.html", // Recycler
          2: "logistics.html", // Logistics
          3: "regulator.html", // Regulator
          4: "register.html"  // Unregistered
        };
    
        // Handle redirection
        if (roleIndex === 4) {
          alert("Please register first!");
          window.location.href = "register.html";
        } else if (rolePages[roleIndex]) {
          window.location.href = rolePages[roleIndex];
        } else {
          throw new Error("Invalid role index");
        }
    
      } catch (error) {
        console.error("Login error:", error);
        document.getElementById("loginMessage").innerHTML = \`
          <div class="alert alert-danger">
            <i class="fas fa-exclamation-circle mr-2"></i>
            \${error.message}
          </div>\`;
      }
    });
`;

console.log(`sha256-${hash(scriptContent)}`);