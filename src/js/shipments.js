document.addEventListener("DOMContentLoaded", async function () {
    console.log("Shipment Tracking Page Loaded");

    // Simulated Data (Replace with Web3 Calls)
    const shipmentData = [
        { id: "W101", status: "In Transit", transporter: "0xABC...123", updatedAt: "2024-02-05" },
        { id: "W202", status: "Delivered", transporter: "0xDEF...456", updatedAt: "2024-02-02" },
        { id: "W303", status: "Delayed", transporter: "0xGHI...789", updatedAt: "2024-02-01" },
    ];

    // Populate Table
    const tableBody = document.querySelector("#shipmentTable tbody");
    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach((item) => {
            const row = `<tr>
                <td>${item.id}</td>
                <td class="${item.status.toLowerCase().replace(" ", "-")}">${item.status}</td>
                <td>${item.transporter}</td>
                <td>${item.updatedAt}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    populateTable(shipmentData);

    // Update Summary Cards
    document.getElementById("totalShipments").textContent = shipmentData.length;
    document.getElementById("inTransitCount").textContent = shipmentData.filter(item => item.status === "In Transit").length;
    document.getElementById("deliveredCount").textContent = shipmentData.filter(item => item.status === "Delivered").length;
    document.getElementById("delayedCount").textContent = shipmentData.filter(item => item.status === "Delayed").length;

    // Search Functionality
    document.getElementById("searchShipment").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const filteredData = shipmentData.filter(item => item.id.toLowerCase().includes(searchText));
        populateTable(filteredData);
    });

    // Filter by Status
    document.getElementById("filterStatus").addEventListener("change", function () {
        const filterValue = this.value;
        if (filterValue === "all") {
            populateTable(shipmentData);
        } else {
            populateTable(shipmentData.filter(item => item.status === filterValue));
        }
    });
});
