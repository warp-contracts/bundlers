import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  // any <script type="module"> inside will be bundled by Rollup
  input: './index.html',
  plugins: [
    nodeResolve({ mainFields: ['browser'], browser: true }),
    string({
      include: '**.js',
    }),
  ],
});
