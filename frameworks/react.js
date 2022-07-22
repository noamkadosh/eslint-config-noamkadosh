/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

let hasRedux = false
let hasPropTypes = false

try {
	const readPkgUp = async () => await import('read-pkg-up')()

	const { packageJson } = readPkgUp.sync({ normalize: true })
	const allDeps = Object.keys({
		...packageJson.peerDependencies,
		...packageJson.devDependencies,
		...packageJson.dependencies
	})

	hasRedux = allDeps.includes('react-redux')
	hasPropTypes = allDeps.includes('prop-types')
} catch (error) {
	// ignore error
}

const reactConfig = {
	env: {
		browser: true
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		...(hasRedux ? 'plugin:react-redux/recommended' : [])
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['react', 'react-hooks', ...(hasRedux ? ['react-redux'] : [])],
	rules: {
		'react/default-props-match-prop-types': hasPropTypes ? 'error' : 'off',
		'react/forbid-foreign-prop-types': hasPropTypes ? 'error' : 'off',
		'react/jsx-sort-default-props': hasPropTypes ? 'error' : 'off',
		'react/jsx-sort-props': 'error',
		'react/no-unused-prop-types': hasPropTypes ? 'error' : 'off',
		'react/prop-types': hasPropTypes ? 'error' : 'off',
		'react/react-in-jsx-scope': 'off'
	},
	settings: {
		react: {
			version: '16.8.0'
		}
	},
	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	overrides: [
		{
			files: ['**/*.{ts,tsx}'],
			rules: {
				'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
				'react/prop-types': 'off'
			}
		}
	]
}

module.exports = reactConfig
