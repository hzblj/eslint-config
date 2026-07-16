# @hzblj/eslint-config

[![npm](https://img.shields.io/npm/v/@hzblj/eslint-config.svg)](https://www.npmjs.com/package/@hzblj/eslint-config)
[![license](https://img.shields.io/npm/l/@hzblj/eslint-config.svg)](https://github.com/hzblj/eslint-config/blob/main/LICENSE)

Opinionated, shareable [ESLint](https://eslint.org) flat config for TypeScript / React / React Native projects. Recommended JS/TS rules, Prettier integration, import & key sorting, and Rules of Hooks — packaged so you can drop it into any repo with a single import.

Three presets:

| Preset           | Import specifier                    | What it is                                                                                                         |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **base**         | `@hzblj/eslint-config`              | Recommended JS/TS rules + Prettier + import/key sorting + curated style rules. Framework-agnostic. Use on its own. |
| **react**        | `@hzblj/eslint-config/react`        | For **React on the web**: everything in base + Rules of Hooks + `jsx-a11y` DOM accessibility rules.                |
| **react-native** | `@hzblj/eslint-config/react-native` | For **React Native / Expo**: everything in base + Rules of Hooks, no DOM a11y (doesn't apply to native).           |

> [!NOTE]
> Unlike the [biome-config](https://github.com/hzblj/biome-config) presets, `react` and `react-native` are **self-contained** — each already includes `base`, so you import exactly one. Pick the one for your platform (don't combine them).

## Install

```sh
npm install --save-dev @hzblj/eslint-config
# or
yarn add --dev @hzblj/eslint-config
```

Install the peer dependencies alongside it. The `react` / `react-native` presets need the React and a11y plugins too:

```sh
npm install --save-dev \
  eslint prettier typescript \
  @eslint/js typescript-eslint \
  eslint-plugin-prettier eslint-config-prettier \
  eslint-plugin-simple-import-sort eslint-plugin-sort-keys-fix \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

## Usage

Create an `eslint.config.mjs` (or `eslint.config.js` in an ESM package) at the root of your project and import a preset.

### Base preset

```js
import config from '@hzblj/eslint-config'
export default config
```

### React (web) preset

```js
import config from '@hzblj/eslint-config/react'
export default config
```

### React Native / Expo preset

```js
import config from '@hzblj/eslint-config/react-native'
export default config
```

### Overriding rules

Each preset is a flat-config array. Spread it and append your own entries — later entries win:

```js
import config from '@hzblj/eslint-config/react-native'

export default [
    ...config,
    {
        ignores: ['node_modules', 'build', '.expo', 'android', 'ios'],
    },
    {
        rules: {
            'no-console': 'off',
        },
    },
]
```

### Prettier config

The style rules pair with a Prettier config matching them. Add a `.prettierrc` to your project:

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": false,
  "arrowParens": "avoid"
}
```

## What's inside

**base** — `eslint:recommended` + `typescript-eslint` recommended, `eslint-plugin-prettier` (so `prettier/prettier` is an error), `simple-import-sort` (import & export sorting), `sort-keys-fix` + core `sort-keys` (object key sorting), and a curated set of style rules (single quotes, no semicolons, no bracket spacing, `prefer-const`, `curly`, `no-console` as a warning, …). Relaxes TypeScript rules the compiler already covers (`no-explicit-any`, `no-non-null-assertion`, `no-undef` off).

**react preset adds** — `react-hooks/rules-of-hooks` (error) and `react-hooks/exhaustive-deps` (warn), React DX relaxations (`react/react-in-jsx-scope`, `react/prop-types`, `react/display-name` off), and the full **`eslint-plugin-jsx-a11y` recommended** DOM accessibility rule set.

**react-native preset adds** — the same Rules of Hooks and React relaxations, but **no DOM a11y rules** (they don't apply to native; `jsx-a11y/no-autofocus` is turned off). This reproduces the behavior of the former `@hzblj/eslint-config-react-native`.

See [`configs/base.js`](./configs/base.js), [`configs/react.js`](./configs/react.js) and [`configs/react-native.js`](./configs/react-native.js) for the full rule sets.

## Migrating from `@hzblj/eslint-config-react-native`

This package replaces `@hzblj/eslint-config-react-native`. Swap the dependency and update the import:

```diff
-import config from '@hzblj/eslint-config-react-native'
+import config from '@hzblj/eslint-config/react-native'
 export default config
```

## Editor setup

Install the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and fix on save:

```jsonc
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## License

[MIT](https://github.com/hzblj/eslint-config/blob/main/LICENSE) © Jan Blazej
