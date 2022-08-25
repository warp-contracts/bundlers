import styles from '../styles/Home.module.css';
import { WarpFactory } from 'warp-contracts/mjs';
import { useEffect, useState } from 'react';

const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

const warp = WarpFactory.forMainnet({
  ...defaultCacheOptions,
  inMemory: true,
});
const deployWriteAndRead = async () => {
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

export default function Home() {
  const [contractState, setContractState] = useState();
  useEffect(() => {
    async function fetchContractData() {
      const result = await deployWriteAndRead();
      setContractState(result);
    }

    fetchContractData();
  }, []);
  return (
    <div className={styles.container}>
      <div>{JSON.stringify(contractState)}</div>
    </div>
  );
}