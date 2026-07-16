import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import {defineConfig} from 'eslint/config'

import base from './base.js'

// React Native / Expo preset: base + Rules of Hooks and RN-friendly React
// relaxations. No DOM accessibility rules (they don't apply to native) —
// jsx-a11y is registered only to turn off no-autofocus.
const config = [
    ...base,
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            'jsx-a11y': jsxA11y,
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            'jsx-a11y/no-autofocus': 0,
            'react-hooks/exhaustive-deps': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react/display-name': 'off',
            'react/prop-types': 0,
            'react/react-in-jsx-scope': 'off',
        },
    },
]

export default defineConfig(config)
