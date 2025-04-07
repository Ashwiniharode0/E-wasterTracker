document.addEventListener("DOMContentLoaded", async function () {
    console.log("Compliance Audit Page Loaded");

    // Simulated Data (Replace with Web3 Calls)
    const auditData = [
        { id: "W101", status: "Passed", auditor: "0xABC...123", auditedAt: "2024-02-05" },
        { id: "W202", status: "Failed", auditor: "0xDEF...456", auditedAt: "2024-02-02" },
        { id: "W303", status: "Pending", auditor: "0xGHI...789", auditedAt: "2024-02-01" },
    ];

    // Populate Table
    const tableBody = document.querySelector("#auditTable tbody");
    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach((item) => {
            const row = `<tr>
                <td>${item.id}</td>
                <td>${item.status}</td>
                <td>${item.auditor}</td>
                <td>${item.auditedAt}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    populateTable(auditData);

    // Update Summary Cards
    document.getElementById("totalAudits").textContent = auditData.length;
    document.getElementById("passedCount").textContent = auditData.filter(item => item.status === "Passed").length;
    document.getElementById("failedCount").textContent = auditData.filter(item => item.status === "Failed").length;
    document.getElementById("pendingCount").textContent = auditData.filter(item => item.status === "Pending").length;

    // Search Functionality
    document.getElementById("searchAudit").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const filteredData = auditData.filter(item => item.id.toLowerCase().includes(searchText));
        populateTable(filteredData);
    });

    // Filter by Status
    document.getElementById("filterAuditStatus").addEventListener("change", function () {
        const filterValue = this.value;
        if (filterValue === "all") {
            populateTable(auditData);
        } else {
            populateTable(auditData.filter(item => item.status === filterValue));
        }
    });

    // Log New Audit (For Regulators)
    document.getElementById("logAuditForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const wasteId = document.getElementById("auditWasteId").value;
        const status = document.getElementById("auditStatus").value;

        if (!wasteId) {
            alert("Enter a Waste ID!");
            return;
        }

        // Simulated Adding (Replace with Web3 Call)
        const newAudit = { id: wasteId, status, auditor: "0xYourWallet", auditedAt: new Date().toISOString().split("T")[0] };
        auditData.push(newAudit);
        populateTable(auditData);

        // Update Summary
        document.getElementById("totalAudits").textContent = auditData.length;
        document.getElementById("passedCount").textContent = auditData.filter(item => item.status === "Passed").length;
        document.getElementById("failedCount").textContent = auditData.filter(item => item.status === "Failed").length;
        document.getElementById("pendingCount").textContent = auditData.filter(item => item.status === "Pending").length;

        alert(`Audit Logged: Waste ID ${wasteId} - Status: ${status}`);
    });
});
