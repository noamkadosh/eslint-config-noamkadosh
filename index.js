const fs = require('node:fs')
const path = require('node:path')

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const tsConfig = fs.existsSync('tsconfig.json')
	? path.resolve('tsconfig.json')
	: fs.existsSync('tsconfig.base.json')
	? path.resolve('tsconfig.base.json') // nx support
	: fs.existsSync('types/tsconfig.json')
	? path.resolve('types/tsconfig.json')
	: undefined

const config = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:github/recommended',
		'plugin:unicorn/recommended',
		'plugin:sonarjs/recommended',
		'plugin:jsdoc/recommended',
		'plugin:toml/standard',
		'plugin:security/recommended',
		'plugin:array-func/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:promise/recommended',
		'plugin:switch-case/recommended',
		'plugin:markdown/recommended',
		'plugin:prettier/recommended'
	],
	ignorePatterns: ['**/*.{html,json,jsonc,json5,yml,yaml}'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: [
		'github',
		'unicorn',
		'sonarjs',
		'jsdoc',
		'no-secrets',
		'no-constructor-bind',
		'no-use-extend-native',
		'optimize-regex',
		'switch-case',
		'sort-keys-fix',
		'prettier'
	],
	rules: {
		'array-func/prefer-array-from': 'off',
		'comma-dangle': ['error', 'never'],
		'filenames/match-regex': 'off',
		'import/extensions': ['warn', 'never'],
		'import/no-nodejs-modules': 'off',
		'new-cap': ['error', { capIsNew: false }],
		'no-constructor-bind/no-constructor-bind': 'error',
		'no-constructor-bind/no-constructor-state': 'error',
		'no-secrets/no-secrets': 'error',
		'no-unused-vars': ['error', { args: 'none', argsIgnorePattern: 'res|req|next' }],
		'object-curly-spacing': ['error', 'always'],
		'optimize-regex/optimize-regex': [
			'warn',
			{
				blacklist: ['charClassClassrangesMerge']
			}
		],
		'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: true, natural: false }],
		'spaced-comment': ['error', 'always', { exceptions: ['#'] }],
		'unicorn/filename-case': 'off',
		'unicorn/numeric-separators-style': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-optional-catch-binding': 'off',
		'unicorn/prevent-abbreviations': 'off'
	},
	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:github/typescript',
				'plugin:import/typescript' // github plugin doesn't include this one for typescript
			],
			files: ['**/*.{ts,tsx}'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2020,
				project: tsConfig,
				sourceType: 'module'
			},
			plugins: ['@typescript-eslint'],
			rules: {
				'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
				'import/no-unresolved': 'error'
			},
			settings: {
				'import/parsers': {
					'@typescript-eslint/parser': ['.ts', '.tsx']
				},
				'import/resolver': {
					typescript: {
						alwaysTryTypes: true,
						project: tsConfig
					}
				}
			}
		},
		{
			extends: ['plugin:@html-eslint/recommended'],
			files: ['**/*.html'],
			parser: '@html-eslint/parser'
		},
		{
			extends: ['plugin:json/recommended-with-comments'],
			files: ['**/*.{json}']
		},
		{
			extends: ['plugin:jsonc/recommended-with-json', 'plugin:jsonc/prettier'],
			files: ['**/*.{jsonc,json5}']
		},
		{
			extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
			files: ['**/*.{yml,yaml}']
		},
		{
			files: ['**/*.cjs', '**/*.config.{js,json,jsonc,json5,yml,yaml}'],
			rules: {
				'import/no-commonjs': 'off',
				'import/no-nodejs-modules': 'off'
			}
		}
	]
}

module.exports = config
