import { WarpFactory } from 'warp-contracts/web';

const sdk = WarpFactory.forMainnet();
console.log(sdk);

const ctrId = 'Daj-MNSnH55TDfxqC7v4eq0lKzVIwh98srUaWqyuZtY';
const ctr = sdk.contract(ctrId).setEvaluationOptions({ allowBigInt: true });

ctr.readState().then((r: any) => console.log(r));
