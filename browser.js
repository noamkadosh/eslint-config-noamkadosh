/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

const browserConfig = {
	env: {
		browser: true,
		es2022: true
	},
	extends: ['plugin:github/browser', 'plugin:compat/recommended', 'plugin:no-unsanitized/DOM'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: ['github', 'html', '@html-eslint'],
	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	overrides: [
		{
			extends: ['plugin:@html-eslint/recommended'],
			files: ['**/*.html'],
			parser: '@html-eslint/parser'
		}
	]
}

module.exports = browserConfig
