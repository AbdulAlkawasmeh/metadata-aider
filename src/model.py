import torch
import torch.nn as nn

class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.fc = nn.Linear(4, 1)  # 4 input features, 1 output

    def forward(self, x):
        return self.fc(x)
