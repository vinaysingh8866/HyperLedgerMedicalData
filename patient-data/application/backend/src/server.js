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
var fabric_network_1 = require("fabric-network");
var path = require("path");
var AppUtil_1 = require("utils/AppUtil");
var CAUtil_1 = require("utils/CAUtil");
var express = require("express");
var app = express();
var port = 8080; // default port to listen
// define a route handler for the default home page
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
var channelName = 'mychannel';
var chaincodeName = 'basic';
var mspOrg1 = 'Org1MSP';
var walletPath = path.join(__dirname, 'wallet');
var org1UserId = 'appUser';
var ccp = (0, AppUtil_1.buildCCPOrg1)();
var caClient = (0, CAUtil_1.buildCAClient)(ccp, 'ca.org1.example.com');
// setup the wallet to hold the credentials of the application user
var wallet;
(0, AppUtil_1.buildWallet)(walletPath).then(function (_wallet) {
    (0, CAUtil_1.enrollAdmin)(caClient, _wallet, mspOrg1);
    wallet = _wallet;
});
var gateway = new fabric_network_1.Gateway();
var gatewayOpts = {
    wallet: wallet,
    identity: org1UserId,
    discovery: { enabled: true, asLocalhost: true }
};
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var network, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gateway.connect(ccp, gatewayOpts)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gateway.getNetwork(channelName)];
            case 2:
                network = _a.sent();
                contract = network.getContract(chaincodeName);
                // Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
                // This type of transaction would only be run once by an application the first time it was started after it
                // deployed the first time. Any updates to the chaincode deployed later would likely not need to run
                // an "init" type function.
                console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
                return [4 /*yield*/, contract.submitTransaction('InitLedger')];
            case 3:
                _a.sent();
                console.log('*** Result: committed');
                return [2 /*return*/, 'OK'];
        }
    });
}); });
