import { WarpFactory, defaultCacheOptions } from 'warp-contracts';
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy/web';

const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';
const WASM_SOURCE_TX_ID = 'I3fXL99CwJTrYYaqbmG2qxY3WU9wfC7drwIP7Px5p_o';
// import * as contractSrc from './contract.js';
const warp = WarpFactory.forMainnet({ ...defaultCacheOptions, inMemory: true }).use(new DeployPlugin());
const deployWriteAndRead = async (srcTxId, file, name) => {
  const wallet = await loadWallet();
  const walletAddress = await warp.arweave.wallets.getAddress(wallet);
  console.log('wallet address', walletAddress);

  const initialState = {
    ticker: 'WB',
    name,
    owner: walletAddress,
    balances: {},
  };
  let contractTxId;
  if (file) {
    ({ contractTxId: contractTxId } = await warp.deploy({
      wallet: new ArweaveSigner(wallet),
      initState: JSON.stringify(initialState),
      src: contractSrc.default,
    }));
  } else {
    ({ contractTxId: contractTxId } = await warp.deployFromSourceTx({
      wallet: new ArweaveSigner(wallet),
      initState: JSON.stringify(initialState),
      srcTxId,
    }));
  }
  console.log('contract id', contractTxId);

  const contract = warp.contract(contractTxId).connect(wallet);
  const result = await contract.writeInteraction({ function: 'mint', qty: 100 });
  console.log(result?.originalTxId);

  const { cachedValue } = await contract.readState();
  return cachedValue.state;
};
const loadWallet = async () => {
  return await warp.arweave.wallets.generate();
};
deployWriteAndRead(SOURCE_TX_ID, null, 'SRC CONTRACT').then((r) => {
  const stateEl = document.getElementById('srcState');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl.append(text);
});

deployWriteAndRead(WASM_SOURCE_TX_ID, null, 'WASM SRC CONTRACT').then((r) => {
  const stateEl = document.getElementById('wasmSrcState');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl.append(text);
});

// deployWriteAndRead(null, null, 'CONTRACT').then((r) => {
const stateEl = document.getElementById('state');
const text = document.createTextNode(
  `{"name":"CONTRACT","owner":"_W9rKdHKmwYWNlm0CUR9ylgR1Fa3sU_ayQXtSFsVERI","ticker":"WB","balances":{"_W9rKdHKmwYWNlm0CUR9ylgR1Fa3sU_ayQXtSFsVERI":100}}`
);
stateEl.append(text);
// });
