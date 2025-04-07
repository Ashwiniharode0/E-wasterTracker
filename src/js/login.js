// login.js
document.getElementById("loginBtn").addEventListener("click", async function() {
    try {
      const initialized = await initializeWeb3();
      if (!initialized) {
        alert("Failed to connect to MetaMask");
        return;
      }
  
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        alert("No account connected");
        return;
      }
  
      const roleIndex = await userManagement.methods.getUserRole(accounts[0]).call();
      console.log("Role index:", roleIndex);
  
      const rolePages = {
        0: "producers.html",
        1: "recycler.html",
        2: "logistics.html",
        3: "regulator.html",
        4: "register.html"
      };
  
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
      document.getElementById("loginMessage").innerHTML = `
        <div class="alert alert-danger">
          <i class="fas fa-exclamation-circle mr-2"></i>
          ${error.message}
        </div>`;
    }
  });