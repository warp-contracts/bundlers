import { WarpFactory as t } from 'warp-contracts';
const a = t.forMainnet(),
  e = async () => await a.arweave.wallets.generate();
(async () => {
  const t = await e(),
    n = await a.arweave.wallets.getAddress(t);
  console.log('wallet address', n);
  const o = { ticker: 'WB', name: 'Web Bundlers PST', owner: n, balances: {} },
    { contractTxId: c } = await a.createContract.deployFromSourceTx({
      wallet: t,
      initState: JSON.stringify(o),
      srcTxId: '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU',
    });
  console.log('contract id', c);
  const r = a.contract(c).connect(t),
    s = await r.writeInteraction({ function: 'mint', qty: 100 });
  console.log(null == s ? void 0 : s.originalTxId);
  const { cachedValue: l } = await r.readState();
  return l.state;
})().then((t) => {});
