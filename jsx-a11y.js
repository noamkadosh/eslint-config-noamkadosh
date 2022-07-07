/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const a11yConfig = {
	env: {
		browser: true
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['jsx-a11y'],
	extends: ['plugin:jsx-a11y/recommended']
}

module.exports = a11yConfig
