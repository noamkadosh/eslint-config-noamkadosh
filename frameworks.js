const readPkgUp = require('read-pkg-up')
const reactConfig = require('./react')
/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution')

let hasReact = false

try {
	const { packageJson } = readPkgUp.sync({ normalize: true })
	const allDeps = Object.keys({
		...packageJson.peerDependencies,
		...packageJson.devDependencies,
		...packageJson.dependencies
	})

	hasReact = allDeps.hasOwnProp('react')
} catch (error) {
	// ignore error
}

const frameworksConfig = {
	...(hasReact ? reactConfig : {})
}

module.exports = frameworksConfig
