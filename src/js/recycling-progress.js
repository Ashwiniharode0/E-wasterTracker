document.addEventListener("DOMContentLoaded", async function () {
    console.log("Recycling Progress Page Loaded");

    // Simulated data (Replace this with Web3 call to fetch actual recycling records)
    const recyclingData = [
        { id: "W123", method: "Shredding", recycler: "0xABC...123", status: "Completed", recycledAt: "2024-02-05" },
        { id: "W456", method: "Incineration", recycler: "0xDEF...456", status: "Pending", recycledAt: "N/A" },
        { id: "W789", method: "Chemical", recycler: "0xGHI...789", status: "Delayed", recycledAt: "2024-02-02" },
    ];

    // Populate Table
    const tableBody = document.querySelector("#recyclingTable tbody");
    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach((item) => {
            const row = `<tr>
                <td>${item.id}</td>
                <td>${item.method}</td>
                <td>${item.recycler}</td>
                <td class="${item.status.toLowerCase()}">${item.status}</td>
                <td>${item.recycledAt}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    populateTable(recyclingData);

    // Update Summary Cards
    document.getElementById("processedCount").textContent = recyclingData.filter(item => item.status === "Completed").length;
    document.getElementById("pendingCount").textContent = recyclingData.filter(item => item.status === "Pending").length;
    document.getElementById("delayedCount").textContent = recyclingData.filter(item => item.status === "Delayed").length;

    // Search Functionality
    document.getElementById("searchRecycling").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const filteredData = recyclingData.filter(item => item.id.toLowerCase().includes(searchText));
        populateTable(filteredData);
    });

    // Filter by Status
    document.getElementById("filterStatus").addEventListener("change", function () {
        const filterValue = this.value;
        if (filterValue === "all") {
            populateTable(recyclingData);
        } else {
            populateTable(recyclingData.filter(item => item.status === filterValue));
        }
    });
});
