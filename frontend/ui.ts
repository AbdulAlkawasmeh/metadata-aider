const loadResults = async () => {
    try {
        const response = await fetch('results/results.json');
        const results = await response.json();

        const tableBody = document.querySelector('#resultsTable tbody');
        tableBody.innerHTML = ''; // Clear existing table rows

        let mseValues: number[] = [];

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

        const finalMetrics = results[results.length - 1];
        console.log(`Final Metrics: MSE=${finalMetrics.mse}, RMSE=${finalMetrics.rmse}, MAE=${finalMetrics.mae}`);

        drawChart(mseValues);
    } catch (error) {
        console.error('Error loading results:', error);
    }
};

const drawChart = (mseValues: number[]) => {
    const chartDiv = document.getElementById('chart');
    chartDiv.innerHTML = ''; // Clear existing chart

    const canvas = document.createElement('canvas');
    chartDiv.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const labels = mseValues.map((_, index) => index + 1);
    const data = {
        labels: labels,
        datasets: [{
            label: 'MSE over Epochs',
            data: mseValues,
            strokeStyle: 'rgba(75, 192, 192, 1)',
            lineWidth: 2
        }]
    };

    // Draw the line chart manually
    if (ctx) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - mseValues[0]); // Start at the first point

        mseValues.forEach((mse, index) => {
            const x = (canvas.width / mseValues.length) * index;
            const y = canvas.height - mse; // Invert y-axis for canvas
            ctx.lineTo(x, y);
        });

        ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
};

document.getElementById('loadResults')?.addEventListener('click', loadResults);
