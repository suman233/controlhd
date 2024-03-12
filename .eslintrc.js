module.exports = {
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/eslint-recommended",
    // "plugin:@typescript-eslint/strict",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
    commonjs: true
  },
  globals: {
    React: "readonly",
    PDFJSDev: "readonly"
  },
  rules: {
    "@next/next/no-img-element": "off",
    "prefer-rest-params": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        name: "react-redux",
        importNames: ["useSelector", "useDispatch"],
        message:
          "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
      }
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false
        },
        extendDefaults: true
      }
    ],
    "@typescript-eslint/no-explicit-any": [
      "warn",
      {
        // fixToUnknown: true,
        ignoreRestArgs: true
      }
    ],
    camelcase: "error"
  },
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
};
