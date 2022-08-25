"use strict";
exports.__esModule = true;
// @ts-ignore
var web_1 = require("warp-contracts/web");
var sdk = web_1.WarpFactory.forMainnet();
console.log(sdk);
var ctrId = 'Daj-MNSnH55TDfxqC7v4eq0lKzVIwh98srUaWqyuZtY';
var ctr = sdk.contract(ctrId).setEvaluationOptions({ allowBigInt: true });
ctr.readState().then(function (r) { return console.log(r); });
