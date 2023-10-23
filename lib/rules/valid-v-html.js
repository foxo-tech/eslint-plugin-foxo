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

const utils = require('eslint-plugin-vue/lib/utils');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `v-html` directives',
      categories: ['vue3-essential', 'essential'],
      // url: ''
    },
    fixable: null,
    schema: [],
    messages: {
      unexpectedArgument: "'v-html' directives require no argument.",
      unexpectedModifier: "'v-html' directives require no modifier.",
      expectedValue:
        '\'v-html\' directives must use the $shtml global method `v-html="$shtml(string/*, object (optional) */)"`.',
    },
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VAttribute[directive=true][key.name.name='html']"(node) {
        if (node.key.argument) {
          context.report({
            node: node.key.argument,
            messageId: 'unexpectedArgument',
          });
          return;
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: {
              start: node.key.modifiers[0].loc.start,
              end: node.key.modifiers[node.key.modifiers.length - 1].loc.end,
            },
            messageId: 'unexpectedModifier',
          });
          return;
        }
        if (!node.value || utils.isEmptyValueDirective(node, context)) {
          context.report({
            node,
            messageId: 'expectedValue',
          });
          return;
        }
        // console.log(
        //   node.value && node.value.expression && node.value.expression.arguments
        // );
        if (
          !(
            node.value &&
            node.value.type === 'VExpressionContainer' &&
            node.value.expression &&
            node.value.expression.callee &&
            node.value.expression.callee.name === '$shtml' &&
            node.value.expression.arguments &&
            (node.value.expression.arguments.length === 1 ||
              (node.value.expression.arguments.length === 2 &&
                ['ObjectExpression', 'Identifier'].includes(
                  node.value.expression.arguments[1].type
                )))
          )
        ) {
          context.report({
            node,
            messageId: 'expectedValue',
          });
        }
      },
    });
  },
};
