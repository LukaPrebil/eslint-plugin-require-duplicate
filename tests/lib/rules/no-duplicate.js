/**
 * @fileoverview Checks for duplicate instances of the same module being required
 * @author Luka Prebil Grintal
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-duplicate');

const RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-duplicate', rule, {

    valid: [
        {
            code: 'mod = require(\'../modules/mod\');',
            filename: __filename,
        },
        {
            code:
            `mod = require(\'../modules/mod\');
        stock = require(\'../modules/stock\')`,
            filename: __filename,
        },
    ],

    invalid: [
        { // Two identical requires
            code:
            `mod = require('../modules/mod');
        mod2 = require('../modules/mod');`,
            filename: __filename,
            errors: [{
                message: 'Module \'../modules/mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }],
        },
        { // Two identical requires of a core module
            code:
            `path = require('path');
        pathAgain = require('path');`,
            filename: __filename,
            errors: [{
                message: 'Module \'path\' has already been required in this file at line 1.',
                type: 'Identifier',
            }],
        },
        { // Catches multiples, even in conditionals
            code:
            `mod = require('../modules/mod');
        i = 0;
        if (i > 1) {
            mod = require('../modules/mod');
        }
        mod2 = require('../modules/mod');`,
            filename: __filename,
            errors: [{
                message: 'Module \'../modules/mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }, {
                message: 'Module \'../modules/mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }],
        },
        { // Resolves module and catches duplicates. Github Issue #2
            code:
            `mod = require('../modules/mod');
        mod2 = require('../../lib/modules/mod');`,
            filename: __filename,
            errors: [{
                message: 'Module \'../../lib/modules/mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }],
        },
    ],
});
