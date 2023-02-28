import styles from '../styles/Home.module.css';
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';
import { useEffect, useState } from 'react';
import contractSrc from 'raw-loader!../../../contracts/contract.js';
import { DeployPlugin, ArweaveSigner, InjectedEthereumSigner } from 'warp-contracts-plugin-deploy';
import { providers } from 'ethers';

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
    ({ contractTxId: contractTxId } = await warp.createContract.deploy({
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

const writeMetamaskInteraction = async (e) => {
  const evmSignature = (await import('warp-signature')).evmSignature;
  const contract = warp
    .contract('48G_IllU9G-PRyl4Ods88STtQ1h0Eo8zHQUHdNlHKZw')
    .connect({ signer: evmSignature, signatureType: 'ethereum' });
  contract.writeInteraction({ function: 'postMessage', content: 'lol2' });
};

const deployMetamaskContract = async (e) => {
  const initialState = {
    ticker: 'WB',
    name: 'WB',
    balances: {},
  };
  await window.ethereum.enable();

  const wallet = new providers.BrowserProvider(window.ethereum);

  const userSigner = new InjectedEthereumSigner(wallet);
  await userSigner.setPublicKey();
  const { contractTxId } = await warp.createContract.deploy({
    wallet: new InjectedEthereumSigner(wallet),
    initState: JSON.stringify(initialState),
    src: contractSrc,
  });
  console.log(contractTxId);
};

export default function Home() {
  const [srcContractState, setSrcContractState] = useState();
  const [wasmSrcContractState, setWasmSrcContractState] = useState();
  const [contractState, setContractState] = useState();
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
      <button onClick={writeMetamaskInteraction}>Sign interaction Metamask</button>
      <button onClick={deployMetamaskContract}>Deploy Metamask contract</button>
    </div>
  );
}
