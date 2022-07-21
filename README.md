# Exported configs:

- `noamkadosh` - base for javascript and typescript
- `noamkadosh/browser` - when working with code that runs on the browser
- `noamkadosh/node` - when working with code that runs on node
- `noamkadosh/frameworks` - detects frameworks in use
  - _Note:_ configs for individual frameworks are exported too, e.g `noamkadosh/frameworks/react`
- `noamkadosh/jsx` - when working with jsx
- `noamkadosh/testing` - detects testing framework in use
- `noamkadosh/styling` - detects styling framework in use

# Installation

**npm**

```Shell
npm install --save-dev eslint-config-noamkadosh
```

**yarn**

```Shell
yarn add -D eslint-config-noamkadosh
```

**pnpm**

```Shell
pnpm add -D eslint-config-noamkadosh
```

# Usage

```JavaScript
module.exports = {
    extends: ['noamkadosh'],
}
```

## Monorepo

In a monorepo, you should add the following to every project's eslint configuration as the plugin can't detect the `tsconfig.json` file in such an environment.

```JavaScript
module.exports = {

    // ... more configuration

    extends: [
        'noamkadosh'
    ],
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname
            }
        }
    },

    // ... more configuration

}
```
