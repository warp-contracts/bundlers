const { WarpFactory } = require('warp-contracts');

const sdk = WarpFactory.forMainnet();
const ctrId = 'Daj-MNSnH55TDfxqC7v4eq0lKzVIwh98srUaWqyuZtY';
const ctr = sdk.contract(ctrId).setEvaluationOptions({ allowBigInt: true });

ctr.readState().then((r) => console.log(r));
