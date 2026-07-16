import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import {defineConfig} from 'eslint/config'

import base from './base.js'

// React (web) preset: base + Rules of Hooks, React relaxations, and the full
// eslint-plugin-jsx-a11y recommended DOM accessibility rule set.
const config = [
    ...base,
    jsxA11y.flatConfigs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            'react-hooks/exhaustive-deps': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react/display-name': 'off',
            'react/prop-types': 0,
            'react/react-in-jsx-scope': 'off',
        },
    },
]

export default defineConfig(config)
