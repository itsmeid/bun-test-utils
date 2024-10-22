[bun-test-utils](https://github.com/itsmeid/bun-test-utils/tree/main/docs/README.md) / mockModule

A module that provides utilities for mocking other modules in a test environment.
This allows you to override specific properties or methods of a module with mock implementations,
and manage these mocks easily through compile, restore, and spy functionalities.
This is especially useful for testing code that depends on external modules.

## Type Aliases

### MockModule\<TModule, TFactory\>

```ts
type MockModule<TModule, TFactory>: ReturnType<typeof mockModule>;
```

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`TModule` *extends* `ObjectGeneric`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`TFactory` *extends* `Partial`\<`Record`\<keyof `TModule`, `unknown`\>\>

</td>
<td>

`Partial`\<`Record`\<keyof `TModule`, `unknown`\>\>

</td>
</tr>
</tbody>
</table>

#### Defined in

[src/mock-module.ts:13](https://github.com/itsmeid/bun-test-utils/blob/fab276da470737e4ef49df8d15009a398a141dce/src/mock-module.ts#L13)

## Functions

### mockModule()

```ts
function mockModule<TModule, TFactory>(
   path, 
   factory, 
   setupOnly?): object
```

Creates a mock for a module. This allows you to override specific
properties or methods of a module with mock implementations.
The mock can be set up immediately or deferred until explicitly
compiled. The mock can also be restored to the original implementation.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`TModule` *extends* `ObjectGeneric`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`TFactory` *extends* `Partial`\<`Record`\<keyof `TModule`, `unknown`\>\>

</td>
<td>

`Partial`\<`Record`\<keyof `TModule`, `unknown`\>\>

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
<td>

The path to the module to be mocked.
This should be a string literal representing the module's path.

</td>
</tr>
<tr>
<td>

`factory`

</td>
<td>

(`original`) => `TFactory`

</td>
<td>

A function that takes the original module as an argument and returns an object containing
the properties or methods to be mocked.
This object will override the corresponding properties or methods in the module.

</td>
</tr>
<tr>
<td>

`setupOnly`?

</td>
<td>

`boolean`

</td>
<td>

A boolean flag indicating whether to set up the mock immediately.
If true, the mock will be set up but not compiled until explicitly done later.
If false or not defined, the mock will be compiled immediately.

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

An object containing methods and properties for managing the mock:
- `_target`: The current mock target, which includes the original and mocked properties.
- `_targetOriginal`: The original, unmocked version of the module.
- `compile()`: Compiles and applies the mock to the module. This should be called if `setupOnly` is true.
- `restore()`: Restores the original module implementation, removing any mocks.
- `spy(key)`: Creates a spy on a specific method or property of the module.

##### \_target

```ts
_target: TModule & TFactory;
```

##### \_targetOriginal

```ts
_targetOriginal: TModule;
```

##### compile()

```ts
compile: () => void;
```

###### Returns

`void`

##### restore()

```ts
restore: () => void;
```

###### Returns

`void`

##### spy()

```ts
spy: (key) => Mock<TModule[keyof TModule] extends (...args) => any ? any[any] : never>;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

keyof `TModule`

</td>
</tr>
</tbody>
</table>

###### Returns

`Mock`\<`TModule`\[keyof `TModule`\] *extends* (...`args`) => `any` ? `any`\[`any`\] : `never`\>

#### Example

```ts
// Mock the `module` module, overriding its `someMethod` function
const { compile, restore, spy, _target } = mockModule<typeof import('./path/to/module')>(
  './path/to/module',
  (original) => ({
    someMethod: () => 'mocked value',
  }),
  false // Compile the mock immediately
);

// Use the module with mocked methods
console.log(_target.someMethod()); // Output: 'mocked value'

// Create a spy on a method
const someMethodSpy = spy('someMethod');

// Restore the original module
restore();
```

#### Remarks

- The module will be automatically restored after all tests complete
  due to the `afterAll` hook, but you can manually restore it earlier
  if needed by calling the `restore` method.
- Ensure that `path` is a correct path relative to the test file or
  properly resolved in your environment.
- The `factory` function should return an object that contains only the
  properties you want to mock or override. All other properties of the
  module will remain unchanged.

#### Defined in

[src/mock-module.ts:72](https://github.com/itsmeid/bun-test-utils/blob/fab276da470737e4ef49df8d15009a398a141dce/src/mock-module.ts#L72)
