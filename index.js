const fs = require('node:fs')
const path = require('node:path')

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const tsConfig = fs.existsSync('tsconfig.json')
	? path.resolve('tsconfig.json')
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
		'plugin:unicorn/recommended',
		'plugin:sonarjs/recommended',
		'plugin:jsdoc/recommended',
		'plugin:jsonc/base',
		'plugin:security/recommended',
		'plugin:array-func/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:promise/recommended',
		'plugin:switch-case/recommended',
		'plugin:markdown/recommended',
		'plugin:json/recommended-with-comments',
		'plugin:prettier/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	plugins: [
		'unicorn',
		'sonarjs',
		'@html-eslint',
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
		'comma-dangle': ['error', 'never'],
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
				'plugin:@typescript-eslint/recommended-requiring-type-checking'
			],
			files: ['**/*.ts?(x)'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2018,
				project: tsConfig,
				sourceType: 'module'
			},
			plugins: ['@typescript-eslint']
		},
		{
			extends: ['plugin:@html-eslint/recommended'],
			files: ['*.html'],
			parser: '@html-eslint/parser'
		}
	]
}

module.exports = config
