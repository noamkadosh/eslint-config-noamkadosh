const fs = require('fs');
const path = require('path');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

const tsConfig = fs.existsSync('tsconfig.json')
	? path.resolve('tsconfig.json')
	: fs.existsSync('types/tsconfig.json')
	? path.resolve('types/tsconfig.json')
	: undefined;

const config = {
	env: {
		browser: true,
		node: true,
		es2018: true
	},
	plugins: [
		'unicorn',
		'sonarjs',
		'no-secrets',
		'no-constructor-bind',
		'no-use-extend-native',
		'optimize-regex',
		'switch-case',
		'html',
		'prettier'
	],
	extends: [
		'eslint:recommended',
		'plugin:compat/recommended',
		'plugin:unicorn/recommended',
		'plugin:sonarjs/recommended',
		'plugin:jsonc/base',
		'plugin:no-unsanitized/DOM',
		'plugin:security/recommended',
		'plugin:array-func/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:promise/recommended',
		'plugin:switch-case/recommended',
		'plugin:markdown/recommended',
		'plugin:json/recommended-with-comments',
		'plugin:prettier/recommended'
	],
	browserslist: ['defaults'],
	rules: {
		'no-secrets/no-secrets': 'error',
		'no-constructor-bind/no-constructor-bind': 'error',
		'no-constructor-bind/no-constructor-state': 'error',
		'optimize-regex/optimize-regex': [
			'warn',
			{
				blacklist: ['charClassClassrangesMerge']
			}
		],
		indent: ['error', 'tab'],
		'object-curly-spacing': ['error', 'always'],
		'comma-dangle': ['error', 'never'],
		'new-cap': ['error', { capIsNew: false }],
		'no-unused-vars': [
			'error',
			{ argsIgnorePattern: 'res|req|next', args: 'none' }
		],
		'spaced-comment': [2, 'always', { exceptions: ['#'] }],
		'prettier/prettier': [
			'error',
			{ singleQuote: true, jsxSingleQuote: true },
			{ usePrettierrc: true }
		],
		'unicorn/prefer-module': 'off',
		'unicorn/filename-case': 'off',
		'unicorn/numeric-separators-style': 'off',
		'unicorn/prevent-abbreviations': 'off'
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			plugins: ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: tsConfig,
				sourceType: 'module'
			}
		}
	]
};

module.exports = config;
