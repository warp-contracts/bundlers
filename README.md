# Bundlers

Warp bundlers repository aims to provide sample projects using Warp SDK within diferent web and server bundles. Due to various implementation of bundlers, each of these projects need to meet specific requirements which are described in this readme.

If you encounter any issues while using Warp SDK in a specific bundler (due to upgraded version etc.), please create an issue in the repository.

You can find helper scripts in the root `package.json` file, you can use either `yarn` or `npm`. For each of the project we are testing deploying the contract, writing interaction and reading the state.

## Web bundlers scripts

1. Install dependencies

```sh
yarn install:[PROJECT_NAME]
```

2. Start development server

```sh
yarn start:[PROJECT_NAME]
```

3. Build for production

```sh
yarn build:[PROJECT_NAME]
```

## Server scripts

1. Install dependencies

```sh
yarn install:node
```

2. Build typescript files and run all server scripts (`.mjs`, `.js`, `.ts`, using `ts-node` instead of regular `node` script)

```sh
yarn run:node
```


Web bundlers
    - [Next](#Next)
    - [Parcel](#Parcel)
    - [Rollup](#Rollup)
    - [Unpkg](#Unpkg)
    - [Vite](#Vite)
    - [Webpack 4](#Webpack4)
    - [Webpack 5](#Webpack5)

Server
    - [Node](#Node)

### Next

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/next) to see the bundler configuration.

**Usage:**

```js
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';

const warp = WarpFactory.forMainnet();
```

**Additional configuration:**
In order for production deployment to work properly, it is needed to set `swcMinify` property to `false`. Please refer to this [github issue](https://github.com/vercel/next.js/discussions/30237#discussioncomment-3482620) to see the reason for applying this change.

```js
const nextConfig = {
  swcMinify: false,
}
```

### Parcel

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/parcel) to see the bundler configuration.

**Usage:**

```js
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';

const warp = WarpFactory.forMainnet();
```

**Additional configuration:**
Not required.

### Rollup

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/rollup) to see the bundler configuration.

**Usage:**

```js
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';

const warp = WarpFactory.forMainnet();
```

**Additional configuration:**
Not required.


### Unpkg

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/unpkg) to see the bundler configuration. You can use either full or minfied version of the Warp SDK, check out [this section](https://github.com/warp-contracts/warp#using-web-bundles) to view possible options.

**Usage:**

Insert `script` tag in your `index.html` file:

```html
<script src="https://unpkg.com/warp-contracts@1.2.0-bundles.16/bundles/web.iife.bundle.min.js"></script>
```

```js
const sdk = warp.WarpFactory.forMainnet();
```

**Additional configuration:**
1. In order for Typescript project to work properly, you need to extend `Window` type by `warp`. You have few options to choose from, eg.:

```ts
const warp = window['warp'];
```

or

```ts
const warp = (<any>window).warp
```

2. Remember to set `isolatedModules` property to `false` in `compilerOptions` in your `tsconfig.json` file. 

### Vite

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/vite) to see the bundler configuration.

**Usage:**

```js
import { defaultCacheOptions, WarpFactory } from 'warp-contracts/web';

const warp = WarpFactory.forMainnet();
```

**Additional configuration:**
Not required.

### Webpack 4

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/webpack4) to see the bundler configuration.

**Usage:**

```js
import { WarpFactory, defaultCacheOptions } from 'warp-contracts';

const warp = WarpFactory.forMainnet();
```

**Additional configuration:**
1. In order for Typescript project to work properly, you need to set `strict` property to `false` in the `compilerOptions` in your `tsconfig.json` file. You can also add `//@ts-ignore` above `warp-contracts` import.

### Webpack 5

**Directory:**
Refer to [this directory](https://github.com/warp-contracts/bundlers/tree/main/webpack5) to see the bundler configuration.

**Usage:**

```js
import { WarpFactory, defaultCacheOptions } from 'warp-contracts/web';

const warp = WarpFactory.forMainnet();
```

**Additional configuration:**
1. In order for Typescript project to work properly, you need to set `strict` property to `false` and `moduleResolution` to `nodenext` in the `compilerOptions` in your `tsconfig.json` file. You can also add `//@ts-ignore` above `warp-contracts` import.

### Node

For server side we are testing 
- `CommonJS` version in a `.js` file
- `ECMAScript` version in a `.mjs` file 
- `Typescript`
  - in a `.js` file compiled with `tsc` command
  - directly in a `.ts` file executed with `ts-node` exection machine
