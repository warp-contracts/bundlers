import { WarpFactory, defaultCacheOptions } from 'warp-contracts/web';
import contractSrc from 'raw-loader!../../../contracts/contract.js';
const WASM_SOURCE_TX_ID = 'I3fXL99CwJTrYYaqbmG2qxY3WU9wfC7drwIP7Px5p_o';
const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

const warp = WarpFactory.forMainnet({ ...defaultCacheOptions, inMemory: true });

const deployWriteAndRead = async (srcTxId, file, name) => {
  const contract = warp
    .contract("zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws")
    .setEvaluationOptions({allowBigInt: true});

  const { cachedValue } = await contract.readState();
  console.log(cachedValue.validity);
  console.log(cachedValue.errorMessages);
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

/*deployWriteAndRead(WASM_SOURCE_TX_ID, null, 'WASM SRC CONTRACT').then((r) => {
  const stateEl = document.getElementById('wasmSrcState');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl.append(text);
});

deployWriteAndRead(null, contractSrc, 'CONTRACT').then((r) => {
  const stateEl = document.getElementById('state');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl.append(text);
});*/
