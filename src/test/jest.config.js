/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("../tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

// eslint-disable-next-line no-undef
module.exports = {
	rootDir: "../",
	setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
	testPathIgnorePatterns: [
		"<rootDir>/.next/",
		"<rootDir>/node_modules/",
		"<rootDir>/cypress/",
		"<rootDir>/webdriverio/",
	],
	moduleNameMapper: {
		...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
		"\\.(scss|sass|css)$": "identity-obj-proxy",
	},
};