module.exports = {
  env: {
    browser: true,
  },
  plugins: ['foxo'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    'prettier'
  ],
  rules: {
    'vue/no-v-html': 'off',
    'vue/valid-v-html': 'off',
    'foxo/valid-v-html': 'error',
    eqeqeq: ['error', 'always'], // dont use == / != (even if its "safe" to do so)
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // id rather this be...
    // 'comma-dangle': ['error', 'always']
    // (always dangle)
    // but this will allow both...
    // - being able to comma dangle means you can do things like
    //   comment props in objects and not have to fix commas etc
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'ignore',
        imports: 'ignore',
        exports: 'ignore',
        functions: 'ignore',
      },
    ],
    // made this a warning because it makes it hard if you need
    // to do a global remove of something that might result in > 1 line
    // and I cant see a way to fox multiples (there is in cli but doesnt work)
    // this way they will be fixed next time the file is worked on and auto fixed in ide
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'vue/no-unused-components': [
      'warn',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
  }
}