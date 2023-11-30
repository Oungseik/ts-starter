module.exports = {
	env: {
		es2021: true,
		node: true,
		es6: true,
	},
	plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports", "import", "prettier"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	overrides: [
		{
			env: {
				node: true,
				es6: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"@typescript-eslint/no-unused-vars": "off",
		"no-unused-vars": "off",
		"no-console": "warn",

		//#region  //*=========== Unused Import ===========
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "warn",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_",
			},
		],
		//#endregion  //*======== Unused Import ===========

		//#region  //*=========== Import Sort ===========
		"simple-import-sort/exports": "warn",
		"simple-import-sort/imports": [
			"warn",
			{
				groups: [
					// ext library & side effect imports
					["^@?\\w", "^\\u0000"],
					// {s}css files
					["^.+\\.s?css$"],
					// Lib and hooks
					["^@/lib", "^@/hooks"],
					// static data
					["^@/data"],
					// components
					["^@/components", "^@/container"],
					// zustand store
					["^@/store"],
					// Other imports
					["^@/"],
					// relative paths up until 3 level
					[
						"^\\./?$",
						"^\\.(?!/?$)",
						"^\\.\\./?$",
						"^\\.\\.(?!/?$)",
						"^\\.\\./\\.\\./?$",
						"^\\.\\./\\.\\.(?!/?$)",
						"^\\.\\./\\.\\./\\.\\./?$",
						"^\\.\\./\\.\\./\\.\\.(?!/?$)",
					],
					["^@/types"],
					// other that didnt fit in
					["^"],
				],
			},
		],
		//#endregion  //*======== Import Sort ===========
	},
};
