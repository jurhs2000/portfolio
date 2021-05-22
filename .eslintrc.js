module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: [
  ],
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: '*.js',
      excludedFiles: ['*.svelte'],
      extends: ['standard'],
      rules: {
        'comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
          },
        ],
      },
    },
  ],
  settings: {
    'svelte3/ignore-styles': () => true,
  },
}
