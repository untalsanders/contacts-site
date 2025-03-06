import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        ignores: ['**/*.config.{js,mjs,cjs}', '!**/eslint.config.js'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        ...pluginJs.configs.recommended,
        ...pluginReact.configs.flat.recommended,
        ...pluginReact.configs.flat['jsx-runtime'],
    },
]
