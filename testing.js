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
	const readPkgUp = async () => await import('read-pkg-up')()

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

const testingConfig = {
	env: {
		...(hasJest || hasVitest ? { 'jest/globals': true } : {})
	},
	plugins: [
		...(hasJest || hasVitest ? ['jest', 'jest-formatting', 'jest-async'] : []),
		...(hasJestDom || hasVitest ? ['jest-dom'] : []),
		...(hasCypress ? ['cypress'] : []),
		...(hasTestingLibrary ? ['testing-library'] : [])
	],
	...(hasJest || hasVitest
		? {
				settings: {
					jest: {
						version: 27
					}
				}
		  }
		: {}),
	overrides: [
		{
			extends: [
				...(hasJest || hasVitest
					? ['plugin:jest-formatting/recommended', 'plugin:jest/recommended']
					: []),
				...(hasJestDom || hasVitest ? ['plugin:jest-dom/recommended'] : []),
				...(hasCypress ? ['plugin:cypress/recommended'] : []),
				...(hasTestingLibrary ? testingLibraryConfigs : [])
			].filter(Boolean),
			files: ['**/*.{test,spec}.{js,jsx,ts,tsx}']
		}
	]
}

module.exports = testingConfig
