import { WarpFactory as t } from 'warp-contracts';
const e = t.forMainnet(),
  a = async () => await e.arweave.wallets.generate();
(async () => {
  const t = await a(),
    n = await e.arweave.wallets.getAddress(t);
  console.log('wallet address', n);
  const o = { ticker: 'WB', name: 'Web Bundlers PST', owner: n, balances: {} },
    { contractTxId: c } = await e.createContract.deployFromSourceTx({
      wallet: t,
      initState: JSON.stringify(o),
      srcTxId: '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU',
    });
  console.log('contract id', c);
  const r = e.contract(c).connect(t),
    s = await r.writeInteraction({ function: 'mint', qty: 100 });
  console.log(null == s ? void 0 : s.originalTxId);
  const { cachedValue: i } = await r.readState();
  return i.state;
})().then((t) => {
  const e = document.getElementById('state'),
    a = document.createTextNode(JSON.stringify(t));
  e.append(a);
});
