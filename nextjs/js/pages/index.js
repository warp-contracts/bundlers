import styles from '../styles/Home.module.css';
import { WarpFactory } from 'warp-contracts/mjs';
import { useEffect, useState } from 'react';

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
