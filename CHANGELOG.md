# @hzblj/eslint-config

## 0.1.0

### Minor Changes

- [#1](https://github.com/hzblj/eslint-config/pull/1) [`5470b55`](https://github.com/hzblj/eslint-config/commit/5470b559fd7db08f6f3e9378558676e7c42453ce) Thanks [@hzblj](https://github.com/hzblj)! - Renamed the package from `@hzblj/eslint-config-react-native` to `@hzblj/eslint-config` and split the
  config into three presets, mirroring `@hzblj/biome-config`:

  - **base** (`@hzblj/eslint-config`) — framework-agnostic: recommended JS/TS rules, Prettier, import &
    key sorting, and the curated style rules.
  - **react** (`@hzblj/eslint-config/react`) — new web preset: base + Rules of Hooks + full
    `jsx-a11y` DOM accessibility rules.
  - **react-native** (`@hzblj/eslint-config/react-native`) — base + Rules of Hooks, no DOM a11y. This
    preset reproduces the behavior of the old `@hzblj/eslint-config-react-native` default export.

  Migration: replace `import config from '@hzblj/eslint-config-react-native'` with
  `import config from '@hzblj/eslint-config/react-native'`.
