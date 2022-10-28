/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require("@rushstack/eslint-patch/modern-module-resolution")

const nodeConfig = {
    env: {
        es2022: true,
        node: true,
    },
    extends: ["plugin:node/recommended"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    plugins: ["sql"],
    rules: {
        "no-console": "off",
        "node/no-extraneous-import": "off",
        "node/no-missing-import": "off",
        "node/no-missing-require": "off",
        "node/no-unsupported-features/es-syntax": "off",
    },
}

module.exports = nodeConfig
