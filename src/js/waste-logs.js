document.addEventListener("DOMContentLoaded", async function () {
    console.log("Waste Logs Page Loaded");

    // Simulated data (Replace this with Web3 call to fetch actual logs)
    const wasteLogs = [
        { id: 1, type: "e-waste", origin: "Factory A", quantity: 120, loggedAt: "2025-01-15" },
        { id: 2, type: "plastic", origin: "Company B", quantity: 300, loggedAt: "2025-01-18" },
        { id: 3, type: "other", origin: "City Dump", quantity: 75, loggedAt: "2025-01-20" },
        { id: 4, type: "e-waste", origin: "Hospital C", quantity: 50, loggedAt: "2025-01-22" }
    ];

    // Populate Table
    const tableBody = document.querySelector("#wasteLogsTable tbody");
    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach((log) => {
            const row = `<tr>
                <td>${log.id}</td>
                <td>${log.type}</td>
                <td>${log.origin}</td>
                <td>${log.quantity}</td>
                <td>${log.loggedAt}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    populateTable(wasteLogs);

    // Update Summary Cards
    document.getElementById("totalWaste").textContent = wasteLogs.length;
    document.getElementById("eWasteCount").textContent = wasteLogs.filter(w => w.type === "e-waste").length;
    document.getElementById("plasticWasteCount").textContent = wasteLogs.filter(w => w.type === "plastic").length;
    document.getElementById("otherWasteCount").textContent = wasteLogs.filter(w => w.type === "other").length;

    // Search Functionality
    document.getElementById("searchWaste").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const filteredLogs = wasteLogs.filter(log => log.type.toLowerCase().includes(searchText));
        populateTable(filteredLogs);
    });

    // Filter by Waste Type
    document.getElementById("filterType").addEventListener("change", function () {
        const filterValue = this.value;
        if (filterValue === "all") {
            populateTable(wasteLogs);
        } else {
            populateTable(wasteLogs.filter(log => log.type === filterValue));
        }
    });
});
