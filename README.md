# eslint-plugin-require-duplicate

ESLint plugin that spots duplicate imports using the require(&#34;...&#34;) syntax.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-require-duplicate`:

```
$ npm install eslint-plugin-require-duplicate --save-dev
```


## Usage

Add `require-duplicate` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "require-duplicate"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "require-duplicate/no-duplicate": 2
    }
}
```

## Supported Rules

* [require-duplicate/no-duplicate](./docs/rules/no-duplicate.md)





