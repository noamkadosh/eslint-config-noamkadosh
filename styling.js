const readPkgUp = require('read-pkg-up')

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

let allDeps = []

let hasTailwindCSS = false

try {
	const { packageJson } = readPkgUp.sync({ normalize: true })

	if (packageJson)
		allDeps = Object.keys({
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
		browser: true,
		es2022: true
	},
	extends: [...(hasTailwindCSS ? ['plugin:tailwindcss/recommended'] : [])],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: [...(hasTailwindCSS ? ['tailwindcss'] : [])],
	rules: {
		...(hasTailwindCSS ? { 'tailwindcss/classnames-order': 'error' } : {})
	}
}

module.exports = stylingConfig
