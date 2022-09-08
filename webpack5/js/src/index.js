import { WarpFactory, defaultCacheOptions } from 'warp-contracts/web';

const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

const warp = WarpFactory.forMainnet({...defaultCacheOptions, inMemory: true});

const deployWriteAndRead = async () => {
  const contract = warp.contract("f4skRMstoodrRluvl4OCY-Xo50AamgxYwBCZKzw3Uvo");
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
