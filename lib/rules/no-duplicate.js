/**
 * @fileoverview Checks for duplicate instances of the same module being required
 * @author Luka Prebil Grintal
 */
'use strict';

const resolve = require('resolve');
const path = require('path');
/**
 * Checks whether the module has been required already
 * @param {*} ruleCtx Context of the rule
 * @param {any[]} requiresInFile Modules that have already been required in the file
 * @return {function(*): void} function that checks if require node is duplicated
 */
function handleRequires(ruleCtx, requiresInFile) {
    return function(node) {
        const module = node.parent.arguments[0].value;

        const resolvedPath = tryResolveModule(module, ruleCtx, node);
        if (!resolvedPath) return;

        const originalRequireLocation =
            requiresInFile
                .map((req) => req.resolvedPath)
                .indexOf(resolvedPath);

        if (originalRequireLocation !== -1) {
            const original = requiresInFile[originalRequireLocation];
            ruleCtx.report({
                node,
                message:
                    `Module '${module}' has already been required in this file at line ${original.location.line}.`,
            });
        } else {
            requiresInFile.push({module, resolvedPath, location: node.loc.start});
        }
    };
}
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Checks for duplicate instances of the same module being required',
            category: 'Possible Errors',
            recommended: true,
        },
        fixable: null,
        schema: [],
    },

    create: function(context) {
        const requiresInFile = [];

        return {
            'CallExpression > Identifier[name="require"]': handleRequires(context, requiresInFile),
        };
    },
};

/**
 * Resolves full path to required module
 * @param {string} module required module
 * @param {*} ruleCtx eslint rule context
 * @param {*} node linted node
 * @return {string | undefined} resolved location, if possible
 */
function tryResolveModule(module, ruleCtx, node) {
    try {
        return resolve.sync(module, {basedir: path.dirname(ruleCtx.getFilename())});
    } catch (err) {
        ruleCtx.report({
            node,
            message: `Module '${module}' can't be resolved to a file in the filesystem.`,
        });
    }
}

