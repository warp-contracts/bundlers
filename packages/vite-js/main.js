import Arweave from 'arweave';
import { WarpFactory } from 'warp-contracts/web';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
});

const sdk = WarpFactory.forMainnet();
console.log(sdk);

const ctrId = 'Daj-MNSnH55TDfxqC7v4eq0lKzVIwh98srUaWqyuZtY';
const ctr = sdk.contract(ctrId).setEvaluationOptions({ allowBigInt: true });

ctr.readState().then((r) => console.log(r));
