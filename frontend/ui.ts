const loadResults = async () => {
    try {
        const response = await fetch('../results/results.json');
        const results = await response.json();

        const tableBody = document.querySelector('#resultsTable tbody');
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


const drawChart = (mseValues: number[]) => {
    const canvas = document.getElementById('mseChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear existing chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart layout settings
    const padding = 30;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const maxMSE = Math.max(...mseValues);
    const scaleX = width / (mseValues.length - 1);
    const scaleY = height / maxMSE;

    // Draw axes and labels
    ctx.font = "16px Arial";
    ctx.fillText("Epoch", canvas.width / 2 - padding, canvas.height - padding / 2);
    ctx.save();
    ctx.translate(0, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("MSE", -canvas.height / 2 - padding, padding / 2);
    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(padding, height + padding);
    ctx.lineTo(padding, padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw line plot
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    mseValues.forEach((value, i) => {
        const x = padding + i * scaleX;
        const y = padding + (height - value * scaleY);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
};


document.getElementById('loadResults')?.addEventListener('click', loadResults);
