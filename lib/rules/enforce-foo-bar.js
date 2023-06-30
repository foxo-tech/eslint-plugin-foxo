/**
 * @fileoverview test rule
 * @author Rhys Burnie
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "test rule",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      mustBeBar: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.'
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      VariableDeclarator(node) {

        // Check if a `const` variable declaration
        if (node.parent.kind === "const") {

            // Check if variable name is `foo`
            if (node.id.type === "Identifier" && node.id.name === "foo") {

                // Check if value of variable is "bar"
                if (node.init && node.init.type === "Literal" && node.init.value !== "bar") {

                    /*
                     * Report error to ESLint. Error message uses
                     * a message placeholder to include the incorrect value
                     * in the error message.
                     * Also includes a `fix(fixer)` function that replaces
                     * any values assigned to `const foo` with "bar".
                     */
                    context.report({
                        node,
                        messageId: 'mustBeBar',
                        data: {
                            notBar: node.init.value
                        },
                        fix(fixer) {
                            return fixer.replaceText(node.init, '"bar"');
                        }
                    });
                }
            }
        }
    }
    };
  },
};
