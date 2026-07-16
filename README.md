# eslint-config-react-native

A comprehensive ESLint configuration for React Native projects, with TypeScript, Prettier, accessibility, and import sorting support. Built for consistency, best practices, and ease of use.

## Features

- Extends recommended ESLint and TypeScript rules
- Integrates Prettier for code formatting
- Enforces React and React Hooks best practices
- Accessibility linting via `eslint-plugin-jsx-a11y`
- Import sorting and key sorting
- Sensible defaults for modern React Native development

## Installation

First, install this config and its peer dependencies:

```sh
yarn add -D @hzblj/eslint-config-react-native
```

### Peer & Required Dependencies

You must also have the following packages installed (they will be installed automatically if you use the above command):

```sh
yarn add -D \
  eslint \
  prettier \
  typescript \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-prettier \
  eslint-config-prettier \
  eslint-plugin-simple-import-sort \
  eslint-plugin-unused-imports \
  eslint-plugin-sort-keys-fix \
  @eslint/js
```

## Usage

In your project root, create (or update) your ESLint config file (e.g. `.eslintrc.js`, `.eslintrc.json`, or `eslint.config.js`) to extend this config:

### For `eslint.config.js` (recommended for ESLint v9+):

```js
import config from '@hzblj/eslint-config-react-native'
export default config
```

If you need to override or extend any rules, you can do so in your own ESLint config file.

```js
import config from '@hzblj/eslint-config-react-native'

export default [
    ...config,
    {
        ignores: ['node_modules', 'build'],
    },
]

```
---

Maintained by Jan Blazej. Contributions and suggestions welcome!