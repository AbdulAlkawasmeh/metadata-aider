declare var Chart: any;
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


let chartInstance: any = null;


function drawChart(mseValues: number[]) {
    const canvas = document.getElementById("mseChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: mseValues.map((_, i) => i + 1),
            datasets: [
                {
                    label: "MSE per Epoch",
                    data: mseValues,
                    borderColor: "blue",
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Epoch"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "MSE"
                    }
                }
            }
        }
    });

}
