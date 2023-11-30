module.exports = {
	transform: {
		"^.+\\.(t|j)sx?$": "@swc/jest",
	},
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	moduleNameMapper: {
		"^@/(.*)": "<rootDir>/src/$1",
		"^@components/(.*)": "<rootDir>/src/components/$1",
	},
};
