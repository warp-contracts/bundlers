import styles from '../styles/Home.module.css';
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';
import { useEffect, useState } from 'react';
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy';

import contractSrc from 'raw-loader!../../../contracts/contract.js';

const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';
const WASM_SOURCE_TX_ID = 'I3fXL99CwJTrYYaqbmG2qxY3WU9wfC7drwIP7Px5p_o';

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
      src: contractSrc,
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

export default function Home() {
  const [srcContractState, setSrcContractState] = useState<any>();
  const [wasmSrcContractState, setWasmSrcContractState] = useState<any>();
  const [contractState, setContractState] = useState<any>();
  useEffect(() => {
    async function fetchContractData() {
      const resultSrc = await deployWriteAndRead(SOURCE_TX_ID, null, 'SRC CONTRACT');
      const resultSrcWasm = await deployWriteAndRead(WASM_SOURCE_TX_ID, null, 'WASM SRC CONTRACT');
      const result = await deployWriteAndRead(null, contractSrc, 'CONTRACT');
      setSrcContractState(resultSrc);
      setWasmSrcContractState(resultSrcWasm);
      setContractState(result);
    }

    fetchContractData();
  }, []);
  return (
    <div className={styles.container}>
      <div id="state">{JSON.stringify(contractState)}</div>
      <div id="wasmSrcState">{JSON.stringify(wasmSrcContractState)}</div>
      <div id="srcState">{JSON.stringify(srcContractState)}</div>
    </div>
  );
}
