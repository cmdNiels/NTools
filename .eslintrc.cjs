module.exports = {
    root : true,
    env : {
        browser : true,
        node : true,
    },
    parser: "@babel/eslint-parser",
    extends : [
        'eslint:recommended',
    ],
    rules : {
        'key-spacing' : [ 'error', { beforeColon : true } ],
        indent : 'off',
        'comma-dangle' : [ 'error', 'only-multiline' ],
        semi : [ 'error', 'always' ],
        'space-in-parens' : [ 'error', 'always' ],
        'space-before-function-paren' : 'off',
        camelcase : 'off',
        "prefer-const": "error",
        'array-bracket-spacing' : [ 'error', 'always' ],
        'computed-property-spacing' : [ 'error', 'always' ],
        'no-async-promise-executor' : [ 'off' ],
        'brace-style': [1, '1tbs'],
    },
    parserOptions: {
        sourceType: "module",
        requireConfigFile: false,
    },
};
