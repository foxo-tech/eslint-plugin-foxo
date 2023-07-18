module.exports = {
  env: {
    browser: true,
  },
  plugins: ["foxo"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier",
    "prettier",
  ],
  rules: {
    "vue/no-v-html": "off",
    "vue/valid-v-html": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "foxo/valid-v-html": "error", // requires `v-html="$shtml(value)"`
    eqeqeq: ["error", "always"], // dont use == / != (even if its "safe" to do so)
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    // id rather this be...
    // 'comma-dangle': ['error', 'always']
    // (always dangle)
    // but this will allow both...
    // - being able to comma dangle means you can do things like
    //   comment props in objects and not have to fix commas etc
    "comma-dangle": [
      "error",
      {
        arrays: "ignore",
        objects: "ignore",
        imports: "ignore",
        exports: "ignore",
        functions: "ignore",
      },
    ],
    // made this a warning because it makes it hard if you need
    // to do a global remove of something that might result in > 1 line
    // and I cant see a way to fox multiples (there is in cli but doesnt work)
    // this way they will be fixed next time the file is worked on and auto fixed in ide
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "vue/no-unused-components": [
      "warn",
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    "vue/first-attribute-linebreak": "off",
    "vue/attribute-hyphenation": ["error", "never"],
    "vue/v-on-event-hyphenation": ["error", "never"],
    "vue/custom-event-name-casing": ["error", "camelCase"],
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          // 'ROUTER_GUARDS', // this default sucks
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "ROUTER_GUARDS",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
  },
};
