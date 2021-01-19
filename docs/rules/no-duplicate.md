# Checks for duplicate instances of the same module being required (no-duplicate)

## Rule Details

This rule aims to prevent issues where one module gets required more than once in a file. Such patterns can lead to unnecessarily complex code, that is hard to read. It can also lead to unexpected behaviour, if coupled with the `delete require.cache['./module']` pattern.

Examples of **incorrect** code for this rule:

```js
const module = require('./module')
const sameModule = require('./module')
```

```js
const { someFunction } = require('./module')
const { someOtherFunction } = require('./module')
```

```js
const { someFunction } = require('./module')

// Lots of interesting code

const { someOtherFunction } = require('./module')
```

```js
const { someFunction } = require('./module')

// Lots of interesting code
if (somethingIsTrue) {
    const { someOtherFunction } = require('./module')
}
```

Examples of **correct** code for this rule:

```js
const module = require('./module')
```

```js
const { someFunction, anotherFunction } = require('./module')
```
