/**
 * @fileoverview ESLint plugin that spots duplicate imports using the require(&#34;...&#34;) syntax.
 * @author Luka Prebil Grintal
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



