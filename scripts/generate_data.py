import numpy as np
import pandas as pd
import os

os.makedirs("data", exist_ok=True)

def generate_synthetic_data(num_rows=1000):
    # Generate random sensor data
    temperature = np.random.normal(loc=20, scale=5, size=num_rows)
    humidity = np.random.normal(loc=50, scale=10, size=num_rows)
    light = np.random.normal(loc=300, scale=50, size=num_rows)
    co2 = np.random.normal(loc=400, scale=50, size=num_rows)

    # Compute target as a linear combination of the sensor values with some noise
    target = (0.5 * temperature) + (0.3 * humidity) + (0.1 * light) + (0.1 * co2) + np.random.normal(loc=0, scale=2, size=num_rows)

    # Create a DataFrame
    data = pd.DataFrame({
        'temperature': temperature,
        'humidity': humidity,
        'light': light,
        'co2': co2,
        'target': target
    })

    # Save to CSV
    data.to_csv('data/iot_data.csv', index=False)

if __name__ == "__main__":
    generate_synthetic_data()
