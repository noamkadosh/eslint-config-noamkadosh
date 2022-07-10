/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const jsxConfig = {
	env: {
		browser: true
	},
	extends: ['plugin:jsx-a11y/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['jsx-a11y']
}

module.exports = jsxConfig
