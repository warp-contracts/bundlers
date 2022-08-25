"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var warp_contracts_1 = require("warp-contracts");
var SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';
var warp = warp_contracts_1.WarpFactory.forMainnet();
var deployWriteAndRead = function () { return __awaiter(void 0, void 0, void 0, function () {
    var wallet, walletAddress, initialState, contractTxId, contract, result, cachedValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadWallet()];
            case 1:
                wallet = _a.sent();
                return [4 /*yield*/, warp.arweave.wallets.getAddress(wallet)];
            case 2:
                walletAddress = _a.sent();
                console.log('wallet address', walletAddress);
                initialState = {
                    ticker: 'WB',
                    name: 'Web Bundlers PST',
                    owner: walletAddress,
                    balances: {}
                };
                return [4 /*yield*/, warp.createContract.deployFromSourceTx({
                        wallet: wallet,
                        initState: JSON.stringify(initialState),
                        srcTxId: SOURCE_TX_ID
                    })];
            case 3:
                contractTxId = (_a.sent()).contractTxId;
                console.log('contract id', contractTxId);
                contract = warp.contract(contractTxId).connect(wallet);
                return [4 /*yield*/, contract.writeInteraction({ "function": 'mint', qty: 100 })];
            case 4:
                result = _a.sent();
                console.log(result === null || result === void 0 ? void 0 : result.originalTxId);
                return [4 /*yield*/, contract.readState()];
            case 5:
                cachedValue = (_a.sent()).cachedValue;
                return [2 /*return*/, cachedValue.state];
        }
    });
}); };
var loadWallet = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, warp.arweave.wallets.generate()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
deployWriteAndRead().then(function (r) {
    var stateEl = document.getElementById('state');
    var text = document.createTextNode(JSON.stringify(r));
    stateEl === null || stateEl === void 0 ? void 0 : stateEl.append(text);
});
