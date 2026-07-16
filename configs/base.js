import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import {defineConfig} from 'eslint/config'
import tseslint from 'typescript-eslint'

// Framework-agnostic base: recommended JS/TS rules, Prettier, import & key
// sorting, and a curated set of style rules. No React — layer configs/react.js
// or configs/react-native.js on top for framework-specific rules.
const config = [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            'simple-import-sort': simpleImportSort,
            'sort-keys-fix': sortKeysFix,
        },
        rules: {
            '@typescript-eslint/ban-ts-comment': 0,
            '@typescript-eslint/explicit-module-boundary-types': 0,
            '@typescript-eslint/no-empty-interface': 1,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-non-null-assertion': 0,
            '@typescript-eslint/no-require-imports': 0,
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'array-bracket-newline': ['warn', 'consistent'],
            'array-bracket-spacing': ['warn', 'never'],
            'arrow-body-style': ['warn', 'as-needed'],
            'arrow-parens': ['warn', 'as-needed'],
            'arrow-spacing': ['warn', {after: true, before: true}],
            'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
            camelcase: 'off',
            'comma-spacing': ['warn', {after: true, before: false}],
            'comma-style': ['warn', 'last'],
            'computed-property-spacing': ['warn', 'never'],
            curly: ['warn', 'all'],
            'key-spacing': ['error', {afterColon: true}],
            'linebreak-style': ['error', 'unix'],
            'no-case-declarations': 'off',
            'no-console': 'warn',
            'no-duplicate-imports': 'error',
            'no-irregular-whitespace': 'error',
            'no-lonely-if': 'warn',
            'no-multi-spaces': 'error',
            'no-undef': 0,
            'no-unused-vars': 'off',
            'object-curly-spacing': ['error', 'never'],
            'padded-blocks': ['warn', 'never'],
            'prefer-const': 'warn',
            'prefer-object-spread': 'warn',
            'prettier/prettier': 'error',
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            'semi-spacing': ['warn', {after: true, before: false}],
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': 'error',
            'sort-keys': ['error', 'asc', {caseSensitive: true, minKeys: 2, natural: false}],
            'sort-keys-fix/sort-keys-fix': 'error',
            'template-curly-spacing': 'warn',
            yoda: 'warn',
        },
    },
]

export default defineConfig(config)
