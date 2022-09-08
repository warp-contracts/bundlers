import { WarpFactory, defaultCacheOptions } from 'warp-contracts/web';

const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

const warp = WarpFactory.forMainnet({...defaultCacheOptions, inMemory: true});

const deployWriteAndRead = async () => {
  /* TODO: verify WASM loading
  const contract = warp.contract("f4skRMstoodrRluvl4OCY-Xo50AamgxYwBCZKzw3Uvo");
  const { cachedValue } = await contract.readState();
  console.log(cachedValue.state)
  return cachedValue.state;
   */

  const wallet = await loadWallet();
  const walletAddress = await warp.arweave.wallets.getAddress(wallet);
  console.log('wallet address', walletAddress);

  const initialState = {
    ticker: 'WB',
    name: 'Web Bundlers PST',
    owner: walletAddress,
    balances: {},
  };

  const { contractTxId } = await warp.createContract.deployFromSourceTx({
    wallet,
    initState: JSON.stringify(initialState),
    srcTxId: SOURCE_TX_ID,
  });
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

deployWriteAndRead().then((r) => {
  const stateEl = document.getElementById('state');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl.append(text);
});
