import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React + external packages
            ["^react$", "^@?\\w"],

            // Components
            ["^components(/.*|$)"],

            // Hooks
            ["^hooks(/.*|$)"],

            // Utils / services
            ["^utils(/.*|$)", "^services(/.*|$)"],

            // Relative imports
            ["^\\./", "^\\.\\./"],

            // CSS LAST
            ["^.+\\.(css|scss|sass)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
  },
);
