import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  input: './out-tsc/src/main.js',
  output: {
      dir: 'dist',
  }
});
