/**
 * @author Rhys Burnie
 * @copyright 2023 Rhys Burnie, Foxo. All rights reserved.
 * See LICENSE file in root directory for full license.
 *
 * Modified from:
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 */
'use strict';

const RuleTester = require('eslint').RuleTester;

const rule = require('../../../lib/rules/valid-v-html.js');

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'), // eslint-disable-line
  parserOptions: { ecmaVersion: 2015 },
});

tester.run('valid-v-html', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(foo)"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(_bar)"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml($goo)"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml($goo.ga)"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(\'ok\')"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(\'2\')"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(2)"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(null)"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(\'\', { whatever: 1})"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="$shtml(\'\', options)"></div></template>',
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div v-html:aaa="foo"></div></template>',
      errors: [rule.meta.messages.unexpectedArgument],
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html.aaa="foo"></div></template>',
      errors: [rule.meta.messages.unexpectedModifier],
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html></div></template>',
      errors: [rule.meta.messages.expectedValue],
    },
    {
      filename: 'empty-value.vue',
      code: '<template><div v-html=""></div></template>',
      errors: [rule.meta.messages.expectedValue],
    },
    {
      filename: 'parsing-error.vue',
      code: '<template><div v-html="."></div></template>',
      errors: [rule.meta.messages.expectedValue],
    },
    {
      filename: 'comment-value.vue',
      code: '<template><div v-html="/**/"></div></template>',
      errors: [rule.meta.messages.expectedValue],
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="foo"></div></template>',
      errors: [rule.meta.messages.expectedValue],
    },
  ],
});
