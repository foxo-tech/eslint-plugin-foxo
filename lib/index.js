/**
 * @fileoverview custom rules for foxo
 * @author Rhys Burnie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
  configs: {
    client: require('./client.config.js'),
  },
  rules: requireIndex(__dirname + "/rules")
};
