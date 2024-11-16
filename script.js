document.getElementById("predictBtn").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const radius = parseFloat(document.getElementById("radius").value);
    const texture = parseFloat(document.getElementById("texture").value);
    const area = parseFloat(document.getElementById("area").value);

    // Simple prediction logic based on average thresholds
    const diagnosis = radius > 15 || texture > 20 || area > 1000 ? "Malignant" : "Benign";

    // Display result
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Prediction: ${diagnosis}`;
    resultDiv.style.color = diagnosis === "Malignant" ? "red" : "green";

    // Show chart
    showChart(radius, texture, area);

    // Enable download button
    document.getElementById("downloadReportBtn").style.display = "block";

    // Download report
    document.getElementById("downloadReportBtn").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Breast Cancer Prediction Report", 10, 10);
        doc.text(`Name: ${name}`, 10, 20);
        doc.text(`Age: ${age}`, 10, 30);
        doc.text(`Gender: ${gender}`, 10, 40);
        doc.text(`Radius Mean: ${radius}`, 10, 50);
        doc.text(`Texture Mean: ${texture}`, 10, 60);
        doc.text(`Area Mean: ${area}`, 10, 70);
        doc.text(`Prediction: ${diagnosis}`, 10, 80);
        doc.save("Prediction_Report.pdf");
    });
});

function showChart(radius, texture, area) {
    const ctx = document.getElementById("parameterChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Radius Mean", "Texture Mean", "Area Mean"],
            datasets: [{
                label: "Parameter Values",
                data: [radius, texture, area],
                backgroundColor: ["#3498db", "#1abc9c", "#9b59b6"],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
        },
    });
}
