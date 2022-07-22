/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

let hasTailwindCSS = false

try {
	const readPkgUp = async () => await import('read-pkg-up')()

	const { packageJson } = readPkgUp.sync({ normalize: true })
	const allDeps = Object.keys({
		...packageJson.peerDependencies,
		...packageJson.devDependencies,
		...packageJson.dependencies
	})

	hasTailwindCSS = allDeps.includes('tailwindcss')
} catch (error) {
	// ignore error
}

const stylingConfig = {
	env: {
		browser: true
	},
	extends: [...(hasTailwindCSS ? ['plugin:tailwindcss/recommended'] : [])],
	parserOptions: {
		ecmaVersion: 2020
	},
	plugins: [...(hasTailwindCSS ? ['tailwindcss'] : [])],
	rules: {
		...(hasTailwindCSS ? { 'tailwindcss/classnames-order': 'error' } : {})
	}
}

module.exports = stylingConfig
