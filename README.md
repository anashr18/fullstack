# npm 7+, extra double-dash is needed:
npm create vite@latest my-app -- --template vanilla-ts
## Types
    -unknown
    -never
    -type predicate
## By default files are used as scripts in global scope.
    -we can use a setting in tsconfig.json yo enable module detection as force 

## Example of tsconfig.json with target and module Settings
Here’s an example configuration for a project targeting ES6 syntax with CommonJS modules (typical for a Node.js application):

### CommonJS Configuration (for Node.js-based applications)
    - Summary
        - target: Controls the JavaScript language version and syntax level that TypeScript will compile to (ES5, ES6, etc.).
        - module: Controls the module system TypeScript will use in the output JavaScript (CommonJS, ES6 modules, etc.).

```json
{
  "compilerOptions": {
    "target": "es6",        // Use ES6 syntax (const, let, arrow functions)
    "module": "commonjs"    // Use CommonJS modules (require, module.exports)
  }
}
```
### For a modern, browser-based application using ES modules:

```json
{
  "compilerOptions": {
    "target": "es6",       // Use ES6 syntax
    "module": "es6"        // Use ES module syntax (import, export)
  }
}
```

