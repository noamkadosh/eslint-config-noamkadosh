const readPkgUp = require('read-pkg-up')

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

let hasJest = false
let hasJestDom = false
let hasVitest = false
let hasCypress = false
let hasTestingLibrary = false
let testingLibraryConfigs = []

try {
	const { packageJson } = readPkgUp.sync({ normalize: true })
	const allDeps = Object.keys({
		...packageJson.peerDependencies,
		...packageJson.devDependencies,
		...packageJson.dependencies
	})

	hasJest = allDeps.includes('jest')
	hasJestDom = allDeps.includes('jest-dom')
	hasVitest = allDeps.includes('vitest')
	hasCypress = allDeps.includes('cypress')
	hasTestingLibrary = allDeps.filter(dependency => dependency.includes('testing-library'))

	testingLibraryConfigs = hasTestingLibrary.filter(
		dependency =>
			dependency.includes('/react') ||
			dependency.includes('/angular') ||
			dependency.includes('/vue')
	)

	if (!testingLibraryConfigs)
		testingLibraryConfigs = hasTestingLibrary.filter(dependency => dependency.includes('/dom'))

	testingLibraryConfigs = testingLibraryConfigs.map(dependency =>
		dependency.replace('@', 'plugin:')
	)
} catch (error) {
	// ignore error
}

const jestConfig = {
	env: {
		'jest/globals': true
	},
	plugins: [
		...(hasJest || hasVitest ? ['jest-formatting', 'jest'] : undefined),
		hasJestDom || hasVitest ? 'jest-dom' : undefined,
		hasCypress ? 'cypress' : undefined,
		hasTestingLibrary ? 'testing-library' : undefined
	],
	settings: {
		jest:
			hasJest || hasVitest
				? {
						version: 27
				  }
				: {}
	},
	overrides: [
		{
			files: ['**/*.{test|spec}.{j|t}s?(x)'],
			extends: [
				...(hasJest || hasVitest
					? ['plugin:jest-formatting/recommended', 'plugin:jest/recommended']
					: undefined),
				hasJestDom || hasVitest ? 'plugin:jest-dom/recommended' : undefined,
				hasCypress ? 'plugin:cypress/recommended' : undefined,
				...(testingLibraryConfigs || undefined)
			].filter(Boolean)
		}
	]
}

module.exports = jestConfig
