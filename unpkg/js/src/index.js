const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

const sdk = warp.WarpFactory.forMainnet({ ...warp.defaultCacheOptions, inMemory: true });

const deployWriteAndRead = async () => {
  const wallet = await loadWallet();
  const walletAddress = await sdk.arweave.wallets.getAddress(wallet);
  console.log('wallet address', walletAddress);

  const initialState = {
    ticker: 'WB',
    name: 'Web Bundlers PST',
    owner: walletAddress,
    balances: {},
  };

  const { contractTxId } = await sdk.createContract.deployFromSourceTx({
    wallet,
    initState: JSON.stringify(initialState),
    srcTxId: SOURCE_TX_ID,
  });
  console.log('contract id', contractTxId);

  const contract = sdk.contract(contractTxId).connect(wallet);
  const result = await contract.writeInteraction({ function: 'mint', qty: 100 });
  console.log(result?.originalTxId);

  const { cachedValue } = await contract.readState();
  return cachedValue.state;
};

const loadWallet = async () => {
  return await sdk.arweave.wallets.generate();
};

deployWriteAndRead().then((r) => {
  const stateEl = document.getElementById('state');
  const text = document.createTextNode(JSON.stringify(r));
  stateEl?.append(text);
});
