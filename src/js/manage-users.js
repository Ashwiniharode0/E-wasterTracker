document.addEventListener("DOMContentLoaded", async function () {
    console.log("Manage Users Page Loaded");

    // Simulated data (Replace this with Web3 call to fetch actual users)
    const users = [
        { address: "0x1234...abcd", role: "Producer" },
        { address: "0x5678...efgh", role: "Recycler" },
        { address: "0x9876...ijkl", role: "Logistics" },
        { address: "0xabcd...mnop", role: "Regulator" }
    ];

    // Populate Table
    const tableBody = document.querySelector("#usersTable tbody");
    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach((user) => {
            const row = `<tr>
                <td>${user.address}</td>
                <td>${user.role}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    populateTable(users);

    // Update Summary Cards
    document.getElementById("totalUsers").textContent = users.length;
    document.getElementById("producerCount").textContent = users.filter(u => u.role === "Producer").length;
    document.getElementById("recyclerCount").textContent = users.filter(u => u.role === "Recycler").length;
    document.getElementById("logisticsCount").textContent = users.filter(u => u.role === "Logistics").length;

    // Search Functionality
    document.getElementById("searchUser").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const filteredUsers = users.filter(user => user.address.toLowerCase().includes(searchText));
        populateTable(filteredUsers);
    });

    // Filter by Role
    document.getElementById("filterRole").addEventListener("change", function () {
        const filterValue = this.value;
        if (filterValue === "all") {
            populateTable(users);
        } else {
            populateTable(users.filter(user => user.role === filterValue));
        }
    });
});
