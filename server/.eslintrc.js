module.exports = {
  extends: [
    "airbnb-base",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  ignorePatterns: "*.js",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "no-plusplus": "off",
  },
};
