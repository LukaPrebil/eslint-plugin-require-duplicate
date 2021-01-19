module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'extends': [
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
    },
    'rules': {
        'indent': ['error', 4],
        'max-len': ['warn', 100],
    },
};
