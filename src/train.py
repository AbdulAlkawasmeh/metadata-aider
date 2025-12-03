import json
import torch
import torch.optim as optim
import torch.nn.functional as F
from dataset import load_data
from model import SimpleModel

def train_model():
    # Load the data
    X_train, X_test, y_train, y_test = load_data()

    # Initialize the model, optimizer
    model = SimpleModel()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    results = []

    for epoch in range(20):
        model.train()
        optimizer.zero_grad()

        # Forward pass
        predictions = model(X_train)
        loss = F.mse_loss(predictions.squeeze(), y_train)

        # Backward pass and optimization
        loss.backward()
        optimizer.step()

        # Evaluate on test set
        model.eval()
        with torch.no_grad():
            test_predictions = model(X_test)
            test_loss = F.mse_loss(test_predictions.squeeze(), y_test)

            # Calculate metrics
            mse = test_loss.item()
            rmse = mse ** 0.5
            mae = torch.mean(torch.abs(test_predictions.squeeze() - y_test)).item()

            # Store results
            results.append({
                'epoch': epoch + 1,
                'mse': mse,
                'rmse': rmse,
                'mae': mae
            })

        print(f'Epoch {epoch + 1}: MSE={mse}, RMSE={rmse}, MAE={mae}')

    # Save results to JSON
    with open('results/results.json', 'w') as f:
        json.dump(results, f)

if __name__ == "__main__":
    train_model()
