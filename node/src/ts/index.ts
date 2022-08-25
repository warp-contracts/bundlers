import { WarpFactory } from 'warp-contracts';

const CONTRACT_ID = '1P-PuRf4r3eKPMRQmUrB-YA8nndcjGcF5RfPiEgiSUw';

const warp = WarpFactory.forMainnet();
const deployWriteAndRead = async () => {
  const wallet = await loadWallet();
  const contract = warp.contract(CONTRACT_ID).connect(wallet);
  const result = await contract.writeInteraction({ function: 'mint', qty: 100 });
  console.log(result.originalTxId);
  const { cachedValue } = await contract.readState();
  return cachedValue.state;
};
const loadWallet = async () => {
  return await warp.arweave.wallets.generate();
};

deployWriteAndRead().then((r) => console.log(r));
