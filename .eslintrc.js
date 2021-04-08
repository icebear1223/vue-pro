/*
 * @Author: 郑曦
 * @Date: 2021-04-08 11:55:43
 * @LastEditors: 郑曦
 * @LastEditTime: 2021-04-08 19:06:08
 * @FilePath: /ant-design-vue-pro-master/.eslintrc.js
 * @Description: 描述
 */
module.exports = {
  root: true,
  env: {
    node: false
  },
  extends: ["plugin:vue/strongly-recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "generator-star-spacing": "off",
    "space-before-function-paren": 0,
    "no-mixed-operators": 0,
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 5,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    "vue/attribute-hyphenation": 0,
    "vue/html-self-closing": 0,
    "vue/component-name-in-template-casing": 0,
    "vue/html-closing-bracket-spacing": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/no-unused-components": 0,
    "vue/multiline-html-element-content-newline": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/no-parsing-error": 0,
    "no-tabs": 0,
    quotes: [
      2,
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      "never",
      {
        beforeStatementContinuationChars: "any"
      }
    ],
    "no-delete-var": 2,
    "prefer-const": [
      2,
      {
        ignoreReadBeforeAssign: false
      }
    ],
    "template-curly-spacing": "off",
    indent: "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
}
