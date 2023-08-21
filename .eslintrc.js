module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  rules: {
    'prettier/prettier': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'error',
    'react-native/no-raw-text': [
      'warn',
      {
        skip: ['CustomText'],
      },
    ],
    'react-native/no-single-element-style-arrays': 'warn',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
  },
};
