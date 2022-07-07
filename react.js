const readPkgUp = require('read-pkg-up')
const semver = require('semver')

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

let hasPropTypes = false
let oldestSupportedReactVersion = '16.8.0'

try {
	const { packageJson } = readPkgUp.sync({ normalize: true })
	const allDeps = Object.keys({
		...packageJson.peerDependencies,
		...packageJson.devDependencies,
		...packageJson.dependencies
	})

	hasPropTypes = allDeps.hasOwnProp('prop-types')
	oldestSupportedReactVersion = semver
		.validRange(allDeps.react)
		.replace(/[<=>|]/g, ' ')
		.split(' ')
		.filter(Boolean)
		.sort(semver.compare)[0]
} catch (error) {
	// ignore error
}

const reactConfig = {
	env: {
		browser: true
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['react', 'react-hooks'],
	extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
	settings: {
		react: {
			version: oldestSupportedReactVersion
		}
	},
	rules: {
		'react/prop-types': hasPropTypes ? 'error' : 'off',
		'react/default-props-match-prop-types': hasPropTypes ? 'error' : 'off',
		'react/forbid-foreign-prop-types': hasPropTypes ? 'error' : 'off',
		'react/no-unused-prop-types': hasPropTypes ? 'error' : 'off',
		'react/react-in-jsx-scope': 'off'
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			rules: {
				'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
				'react/prop-types': 'off'
			}
		}
	]
}

module.exports = reactConfig
