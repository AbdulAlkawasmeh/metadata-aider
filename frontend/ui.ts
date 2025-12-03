const loadResults = async () => {
    try {
        const response = await fetch('../results/results.json');
        const results = await response.json();

        const tableBody = document.querySelector('#resultsTable tbody');
        if (!tableBody) {
            console.error("Could not find table body element");
        return;
        }
        tableBody.innerHTML = '';


        const mseValues: number[] = [];

        results.forEach((result: { epoch: number; mse: number; rmse: number; mae: number }) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.epoch}</td>
                <td>${result.mse}</td>
                <td>${result.rmse}</td>
                <td>${result.mae}</td>
            `;
            tableBody.appendChild(row);

            mseValues.push(result.mse);
        });

        drawChart(mseValues);

    } catch (error) {
        console.error('Error loading results:', error);
    }
};
console.log("USING NEW UI.JS");

const drawChart = (mseValues: number[]) => {
    const canvas = document.getElementById('mseChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 400;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Chart padding
    const padding = 80;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Scaling
    const maxMSE = Math.max(...mseValues) || 1;
    const scaleX = width / (mseValues.length - 1);
    const scaleY = height / maxMSE;

    // --- Draw X & Y axes ---
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + height);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding + height);
    ctx.lineTo(padding + width, padding + height);
    ctx.stroke();

    // --- Draw Axis Labels ---
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";

    // X-axis label
    ctx.fillText("Epoch", padding + width / 2 - 30, canvas.height - padding / 2);

    // Y-axis label (rotated)
    ctx.save();
    ctx.translate(padding - 50, padding + height / 2 + 10); // Adjust Y position for better visibility
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("MSE", 0, 0);
    ctx.restore();

    // --- Draw Line Chart ---
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;

    mseValues.forEach((v, i) => {
        const x = padding + i * scaleX;
        const y = padding + height - v * scaleY;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
};
