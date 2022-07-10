/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const nodeConfig = {
	env: {
		node: true
	},
	extends: ['plugin:node/recommended'],
	parserOptions: {
		ecmaVersion: 2020
	}
}

module.exports = nodeConfig
