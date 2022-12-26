# TypeScript tutorial
## GETTING STARTED

TypeScript is a JavaScript superset which adds new features to the language. The most notable is the introduction of types which makes writing code easier and less error prone. TypeScript cannot natively be run in the browser, which means that all TypeScript code is translated into JavaScript by the TypeScript compiler in the end.

TypeScript adds:
  - types
  - next-gen JS features (compiled down for older browsers), similar to Babel but built into the TS compiler
  - non-JS features like interfaces or generics
  - meta programming features like decorators
  - rich configuration options
  - modern tooling that helps even in non-TypeScript projects

To add TS globally use `npm install -g typescript`.

To compile TS use the `tsc` command.

<br/>

## TYPESCRIPT COMPILER
* [tsc CLI options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
* [tsconfig guide](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
* [TypeScript debugging guide](https://code.visualstudio.com/docs/typescript/typescript-debugging)

<br/>

## BASIC TYPES
TypeScript automatically infers and assigns types when it can.

* [string, number, boolean](./1_ts_basics/1_basic_types.ts)
* [objects, arrays, tuples, enums, any](./1_ts_basics/2_objects_arrays_tuples_enums_any.ts)
* [union, literal and custom types](./1_ts_basics/3_union_literal_custom_types.ts)
* [function types](./1_ts_basics/4_functions_and_types.ts)
* [unknown and never](./1_ts_basics/5_unknown_and_never.ts)

[TS basic types docs](https://www.typescriptlang.org/docs/handbook/basic-types.html)

<br/>

## CLASSES AND INTERFACES
* [Classes](./3_classes_and_interfaces/src/classes.ts)

   - `private`, `protected`, `public` and `readonly` modifiers.

   - `get` and `set` keywords for accessor methods.

   - `abstract` class support.

* [Interfaces](./3_classes_and_interfaces/src/interfaces.ts)

   - Interfaces are used to define the structure of an object and to define methods which need to be implemented. 

   - One class can implement multiple interfaces. 

   - An interface can extend another interface. 

   - Interfaces are completely ignored in the compiled JS code. 

<br/>

## ADVANCED TYPES
* [Intersection types](./4_advanced_types/src/1_intersection_types.ts)
* [Type guards](./4_advanced_types/src/2_type_guards.ts)
* [Discriminated unions & type casting](./4_advanced_types/src/3_discriminated_unions_and_type_casting.ts)
* [Index properties](./4_advanced_types/src/4_index_properties.ts)
* [Function overloads](./4_advanced_types/src/5_function_overloads.ts)
* [Optional chaining and null coalescing](./4_advanced_types/src/6_optional_chaining_and_null_coalescing.ts)
* [UTILITY TYPES DOCS](https://www.typescriptlang.org/docs/handbook/utility-types.html)

<br/>

## GENERICS
* [Some built in generics](./5_generics/src/1_built_in_generics.ts)
* [Creating generic functions](./5_generics/src/2_generic_functions.ts)
* [Creating generic classes](./5_generics/src/3_generic_classes.ts)
* [Some utility generics examples](./5_generics/src/4_utility_generics_examples.ts)

<br/>

## DECORATORS
* [First class decorator example](./6_decorators/src/1_first_class_decorator.ts)
* [Building more complex class decorators (decorator factory)](./6_decorators/src/2_class_decorators.ts)
* [Other decorator types (property, accessor, method, parameter)](./6_decorators/src/3_other_decorator_types.ts)
* [Basic autobind decorator example](./6_decorators/src/4_autobind_decorator_example.ts)
* [Basic validation decorator example](./6_decorators/src/5_validation_decorator_example.ts)

Decorators are executed during instantiation, not during execution!

[Property descriptor docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

Method and accessor decorators can have a return value (they return a brand new property descriptor).

#### Decorator arguments by type:
| Decorator type        | Target                 | Name             | Property Descriptor   | Position |
| --------------------- |:---------------------: | ---------------: | --------------------: | -------: |
| Class                 | constrcutor function   |                  |                       |          |      
| Property              | property prototype     | property name    |                       |          |
| Accessor              | accessor prototype     | accessor name    | property descriptor   |          |
| Method                | method prototype       | method name      | property descriptor   |          |
| Parameter             | parameter prototype    | *method name     |                       | arg num  |

<br/>

## NAMESPACES

Namespaces are a TS feature -> [example](./8_namespaces/src/models/drag-drop.ts) -> they are shit though, no compile time checks, don't use them, use normal ES6 modules

## MODULES

A normal ES6 feature, to use it without webpack we need to:
* specify the `.js` extension in the import statements
* add `type="module"` inside the script tag when adding JS to the HTML
* set the `target` and `module` features in `tsconfig.json` to `es2015`

Code in modules is only run ONCE, no matter how many times it's imported in various project files.

Import & export syntax examples:
* `export function Autobind` -> named export, as many as you want per file
  * `import { Autobind } from '../decorators/autobind.js';` -> normal named import
    * `@Autobind` -> usage in code

  * `import { Autobind as Abc } from '../decorators/autobind.js';` -> named import with alias
    * `@Abc` -> usage in code

  * `import * as ValDecorator from '../decorators/autobind.js';` -> import all with object alias
    * `@ValDecorator.Autobind` -> usage in code

* `export default function Autobind` -> default export, only one per file
  * `import Abc from '../decorators/autobind.js'`; -> can use any name, no need for {} or alias syntax
    * `@Abc` -> usage in code
    
<br/>

## WEBPACK WITH TYPESCRIPT

Webpack is used as a JS bundler which can (among other things) create a single JS file in the dist folder and thus reduce the amount of HTTP requests that the browser needs to make.

To install all the necessary dependencies in our project we used:  
`npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin`

Basic webpack development configuration: [development webpack.config.js](./10_webpack_with_TS/webpack.config.js)  
Basic webpack production configuration: [production webpack.config.js](./10_webpack_with_TS/webpack.config.prod.js)  
Package.json setup: [package.json](./10_webpack_with_TS/package.json)  

Webpack docs: [https://webpack.js.org/](https://webpack.js.org/)  

UPDATE:
In order for everything to work instead of start script `webpack-dev-server` use `webpack serve`, or downgrade webpack-cli to version `3.3.12`. Also c/p the configuration from webpack docs so that you don't run into problems.

<br/>

## USING JAVASCRIPT LIBRARIES WITH TYPESCRIPT

For example [Lodash](https://lodash.com/). Other than installing a library, you also need to translate it to TypeScript by installing the @types of the library. So in addition to running:  
`npm install --save lodash`  
we also need to install its types by:  
`npm install --save @types/lodash`  

By doing this we translate JavaScript into TypeScript and create so called `.d.ts` files, which are basically declaration files understandable by TypeScript. Some libraries provide these files by default so there is no need for this additional @type installation.

As a last resort, if the @types aren't available for a given lib you can use the [declare](./11_using_JS_libs_with_TS/src/app.ts) keyword.

### [Class transformer](https://github.com/typestack/class-transformer)

* `npm install class-transformer --save`  
* `npm install reflect-metadata --save`  
* [Usage example](./11_using_JS_libs_with_TS/src/app.ts)

### [Class validator](https://github.com/typestack/class-validator)

* `npm install class-validator --save`
* [Validation decorators](./11_using_JS_libs_with_TS/src/product.model.ts)
* [Validate method](./11_using_JS_libs_with_TS/src/app.ts)

<br/>

## SMALL GOOGLE MAPS PROJECT

An [example](12_google_maps_project/src/app.ts) of using the Google Geocoding API and the Google maps JavaScript SDK in a very small project. Unfortunatelly not free after trial.

<br/>

## REACT.JS & TYPESCRIPT

* Adding Typescript to React guide -> [here](https://create-react-app.dev/docs/adding-typescript/)

* [Props and types](./13_using_ts_with_react/src/components/TodoList.tsx)
* [User input with refs](./13_using_ts_with_react/src/components/NewTodo.tsx)
* [Working with state & types](./13_using_ts_with_react/src/App.tsx)
