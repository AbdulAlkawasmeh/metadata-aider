import fs from 'fs';

const loadResults = async () => {
    try {
        const data = await fs.promises.readFile('results/results.json', 'utf-8');
        const results = JSON.parse(data);

        results.forEach((result: { epoch: number; mse: number; rmse: number; mae: number }) => {
            console.log(`Epoch ${result.epoch}: MSE=${result.mse}, RMSE=${result.rmse}, MAE=${result.mae}`);
        });

        const finalMetrics = results[results.length - 1];
        console.log(`Final Metrics: MSE=${finalMetrics.mse}, RMSE=${finalMetrics.rmse}, MAE=${finalMetrics.mae}`);
    } catch (error) {
        console.error('Error loading results:', error);
    }
};

loadResults();
