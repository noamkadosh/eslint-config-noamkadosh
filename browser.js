/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const browserConfig = {
	env: {
		browser: true
	},
	extends: ['plugin:github/browser', 'plugin:compat/recommended', 'plugin:no-unsanitized/DOM'],
	parserOptions: {
		ecmaVersion: 2020
	},
	plugins: ['github', 'html']
}

module.exports = browserConfig
