var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
var loadResults = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, results, tableBody_1, mseValues_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('../results/results.json')];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                results = _a.sent();
                tableBody_1 = document.querySelector('#resultsTable tbody');
                tableBody_1.innerHTML = '';
                mseValues_1 = [];
                results.forEach(function (result) {
                    var row = document.createElement('tr');
                    row.innerHTML = "\n                <td>".concat(result.epoch, "</td>\n                <td>").concat(result.mse, "</td>\n                <td>").concat(result.rmse, "</td>\n                <td>").concat(result.mae, "</td>\n            ");
                    tableBody_1.appendChild(row);
                    mseValues_1.push(result.mse);
                });
                drawChart(mseValues_1);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error loading results:', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var drawChart = function (mseValues) {
    var canvas = document.getElementById('mseChart');
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    // Clear existing chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Chart layout settings
    var padding = 50;
    var width = canvas.width - padding * 2;
    var height = canvas.height - padding * 2;
    var maxMSE = Math.max.apply(Math, mseValues);
    var scaleX = width / (mseValues.length - 1);
    var scaleY = height / maxMSE;
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Draw line plot
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    mseValues.forEach(function (value, i) {
        var x = padding + i * scaleX;
        var y = padding + (height - value * scaleY);
        if (i === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
};
(_a = document.getElementById('loadResults')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadResults);
