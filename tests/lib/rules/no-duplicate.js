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
        'mod = require(\'./mod\');',
        'mod = require(\'./mod\'); mod2 = require(\'./mod2\')',
    ],

    invalid: [
        {
            code: `mod = require('./mod');
            mod2 = require('./mod');`,
            errors: [{
                message: 'Module \'./mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }],
        },
        {
            code: `mod = require('./mod');
            i = 0;
            if (i > 1) {
                mod = require('./mod');
            }
            mod2 = require('./mod');`,
            errors: [{
                message: 'Module \'./mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }, {
                message: 'Module \'./mod\' has already been required in this file at line 1.',
                type: 'Identifier',
            }],
        },
    ],
});
