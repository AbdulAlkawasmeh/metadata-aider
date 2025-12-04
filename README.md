# IoT Model Results Project

This project is designed to generate synthetic IoT data, train a simple machine learning model using PyTorch, and visualize the results through a TypeScript frontend.

## Project Structure

- **src/**: Contains the main source code for the model and data handling.
  - **dataset.py**: Handles loading and preprocessing of the dataset.
  - **model.py**: Defines the machine learning model.
  - **train.py**: Contains the training logic and evaluation metrics.

- **scripts/**: Contains scripts for data generation.
  - **generate_data.py**: Generates synthetic IoT data and saves it as a CSV file.

- **frontend/**: Contains the TypeScript frontend for visualizing results.
  - **index.html**: The main HTML file for the frontend.
  - **ui.ts**: TypeScript file that loads results and draws the chart.
  - **results/** – Stores `results.json` generated after training 

- **data/**: Directory for storing generated data files.
- **.aidar.json**: Configuration file for tracking project files.

## Installation

1. Clone the repository.
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Install frontend tools
   ```bash
   npm install
   ```
4. Install TypeScript and ts-node globally:
   ```bash
   npm install -g typescript ts-node
   ```

## Usage

1. Generate synthetic data:
   ```bash
   python scripts/generate_data.py
   ```

2. Train the model:
   ```bash
   python src/train.py
   ```
3. This produces:
   `frontend/results/results.json`
   Containing MSE, RMSE, and MAE per Epoch

4. Load the frontend:
   Open `frontend/index.html` in a web browser to view the results.

## License

This project is licensed under the MIT License.
