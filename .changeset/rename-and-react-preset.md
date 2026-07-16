---
"@hzblj/eslint-config": minor
---

Renamed the package from `@hzblj/eslint-config-react-native` to `@hzblj/eslint-config` and split the
config into three presets, mirroring `@hzblj/biome-config`:

- **base** (`@hzblj/eslint-config`) — framework-agnostic: recommended JS/TS rules, Prettier, import &
  key sorting, and the curated style rules.
- **react** (`@hzblj/eslint-config/react`) — new web preset: base + Rules of Hooks + full
  `jsx-a11y` DOM accessibility rules.
- **react-native** (`@hzblj/eslint-config/react-native`) — base + Rules of Hooks, no DOM a11y. This
  preset reproduces the behavior of the old `@hzblj/eslint-config-react-native` default export.

Migration: replace `import config from '@hzblj/eslint-config-react-native'` with
`import config from '@hzblj/eslint-config/react-native'`.
