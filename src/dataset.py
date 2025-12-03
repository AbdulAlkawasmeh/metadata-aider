import pandas as pd
import torch
from sklearn.model_selection import train_test_split

def load_data():
    # Load the dataset
    data = pd.read_csv('data/iot_data.csv')

    # Split the data into features and labels
    X = data[['temperature', 'humidity', 'light', 'co2']].values
    y = data['target'].values

    # Split the data into train and test sets (80/20)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Convert to PyTorch tensors
    X_train_tensor = torch.FloatTensor(X_train)
    X_test_tensor = torch.FloatTensor(X_test)
    y_train_tensor = torch.FloatTensor(y_train)
    y_test_tensor = torch.FloatTensor(y_test)

    return X_train_tensor, X_test_tensor, y_train_tensor, y_test_tensor
