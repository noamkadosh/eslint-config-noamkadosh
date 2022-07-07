const readPkgUp = require('read-pkg-up');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

try {
	const { packageJson } = readPkgUp.sync({ normalize: true });
	const allDeps = Object.keys({
		...packageJson.peerDependencies,
		...packageJson.devDependencies,
		...packageJson.dependencies
	});

	hasJest = allDeps.includes('jest');
	hasJestDom = allDeps.includes('@testing-library/jest-dom');
	hasVitest = allDeps.includes('vitest');
	hasCypress = allDeps.includes('cypress');
	hasTestingLibrary = allDeps.filter(dependency =>
		dependency.includes('testing-library')
	);

	testingLibraryConfigs = hasTestingLibrary
		.filter(dependency => {
			const hasFramework = dependency.includes('react' || 'angular' || 'vue');
			if (!hasFramework) return dependency.includes('dom');

			return hasFramework;
		})
		.map(dependency => dependency.replace('@', 'plugin:'));
} catch (error) {
	// ignore error
}

const jestConfig = {
	env: {
		'jest/globals': true
	},
	plugins: [
		...(hasJest || hasVitest ? ['jest-formatting', 'jest'] : null),
		hasJestDom ? 'jest-dom' : null,
		hasCypress ? 'cypress' : null,
		hasTestingLibrary ? 'testing-library' : null
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
					: null),
				hasJestDom ? 'plugin:jest-dom/recommended' : null,
				hasCypress ? 'plugin:cypress/recommended' : null,
				...(testingLibraryConfigs ? testingLibraryConfigs : null)
			].filter(Boolean)
		}
	]
};

module.exports = jestConfig;
