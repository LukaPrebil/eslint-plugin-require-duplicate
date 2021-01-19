/**
 * @fileoverview Checks for duplicate instances of the same module being required
 * @author Luka Prebil Grintal
 */
'use strict';


/**
 * Checks whether the module has been required already
 * @param {*} ruleCtx Context of the rule
 * @param {any[]} requiresInFile Modules that have already been required in the file
 * @return {function(*): void} function that checks if require node is duplicated
 */
function handleRequires(ruleCtx, requiresInFile) {
    return function(node) {
        const module = node.parent.arguments[0].value;
        const originalRequireLocation = requiresInFile.map((req) => req.module).indexOf(module);
        if (originalRequireLocation !== -1) {
            const original = requiresInFile[originalRequireLocation];
            ruleCtx.report({
                node,
                message: `Module '${module}' has already been required in this file at line ${original.location.line}.`,
            });
        } else {
            requiresInFile.push({module, location: node.loc.start});
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
