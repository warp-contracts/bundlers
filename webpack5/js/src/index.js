import { WarpFactory, defaultCacheOptions } from 'warp-contracts';
import contractSrc from 'raw-loader!../../../contracts/contract.js';
import { ArweaveSigner, DeployPlugin, InjectedEthereumSigner } from 'warp-contracts-plugin-deploy';
import { providers } from 'ethers';
const WASM_SOURCE_TX_ID = 'I3fXL99CwJTrYYaqbmG2qxY3WU9wfC7drwIP7Px5p_o';
const SOURCE_TX_ID = '9vYCJs70vyrjgXudb6lhHijXelcOd4MV5DsACgmAdoU';

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
    ({ contractTxId: contractTxId } = await warp.createContract.deployFromSourceTx({
      wallet: new ArweaveSigner(wallet),
      initState: JSON.stringify(initialState),
      srcTxId,
    }));
  }
  console.log('contract id', contractTxId);

  const contract = warp.contract(contractTxId).connect(wallet);
  const result = await contract.writeInteraction({ function: 'mint', qty: 100 });
  console.log(result.originalTxId);

  const { cachedValue } = await contract.readState();
  return cachedValue.state;
};

const loadWallet = async () => {
  return await warp.arweave.wallets.generate();
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

const deployMetamaskContract = async (e) => {
  const initialState = {
    ticker: 'WB',
    name: 'WB',
    balances: {},
  };
  await window.ethereum.enable();

  const wallet = new providers.Web3Provider(window.ethereum);

  const userSigner = new InjectedEthereumSigner(wallet);
  await userSigner.setPublicKey();
  const { contractTxId } = await warp.deploy({
    wallet: userSigner,
    initState: JSON.stringify(initialState),
    src: contractSrc,
  });
  console.log(contractTxId);
};

const metamaskEl = document.getElementById('metamask');

metamaskEl.addEventListener('click', deployMetamaskContract);
