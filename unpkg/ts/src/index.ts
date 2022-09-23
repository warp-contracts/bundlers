const warp = window['warp'];
const sdk = warp.WarpFactory.forMainnet();

import contractSrc from 'raw-loader!../../../contracts/contract.js';
const WASM_SOURCE_TX_ID = 'I3fXL99CwJTrYYaqbmG2qxY3WU9wfC7drwIP7Px5p_o';
const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

const deployWriteAndRead = async (srcTxId, file, name) => {
  const wallet = await loadWallet();
  const walletAddress = await sdk.arweave.wallets.getAddress(wallet);
  console.log('wallet address', walletAddress);

  const initialState = {
    ticker: 'WB',
    name,
    owner: walletAddress,
    balances: {},
  };
  let contractTxId;
  if (file) {
    ({ contractTxId: contractTxId } = await sdk.createContract.deploy({
      wallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    }));
  } else {
    ({ contractTxId: contractTxId } = await warp.createContract.deployFromSourceTx({
      wallet,
      initState: JSON.stringify(initialState),
      srcTxId,
    }));
  }
  console.log('contract id', contractTxId);

  const contract = sdk.contract(contractTxId).connect(wallet);
  const result = await contract.writeInteraction({ function: 'mint', qty: 100 });
  console.log(result.originalTxId);

  const { cachedValue } = await contract.readState();
  return cachedValue.state;
};

const loadWallet = async () => {
  return await sdk.warp.arweave.wallets.generate();
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

deployWriteAndRead(null, contractSrc, 'CONTRACT').then((r) => {
  const stateEl = document.getElementById('state');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl.append(text);
});
