/**
 * @fileoverview test rule
 * @author Rhys Burnie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/enforce-foo-bar"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 2015 }
});
ruleTester.run("enforce-foo-bar", rule, {
  // 'valid' checks cases that should pass
  valid: [{
    code: "const foo = 'bar';",
  }],
  // 'invalid' checks cases that should not pass
  invalid: [{
    code: "const foo = 'baz';",
    output: 'const foo = "bar";',
    errors: 1,
  }],
});
