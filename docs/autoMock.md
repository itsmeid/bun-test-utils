[bun-test-utils](https://github.com/itsmeid/bun-test-utils/tree/main/docs/README.md) / autoMock

A module that provides functionality to create mocks of target objects for testing purposes.
This allows you to easily generate mock implementations with the same shape as the target,
making it easier to test interactions with objects without relying on their actual implementations.

## Type Aliases

### AutoMock\<TModule, TOverride\>

```ts
type AutoMock<TModule, TOverride>: ReturnType<typeof autoMock>;
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

`TOverride` *extends* `Partial`\<`Record`\<keyof `TModule`, `unknown`\>\>

</td>
<td>

`TModule`

</td>
</tr>
</tbody>
</table>

#### Defined in

[src/auto-mock.ts:12](https://github.com/itsmeid/bun-test-utils/blob/fab276da470737e4ef49df8d15009a398a141dce/src/auto-mock.ts#L12)

## Functions

### autoMock()

```ts
function autoMock<TModule, TOverride>(target, override?): ObjectOverwrite<Record<keyof TModule, Mock<(...args) => any>>, TOverride>
```

Creates a mock of the given target object. This function generates
a new mock object with the same shape as the target object. Optionally,
you can override specific properties of the mock with provided values.

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

`TOverride` *extends* `Partial`\<`Record`\<keyof `TModule`, `unknown`\>\>

</td>
<td>

`Record`\<keyof `TModule`, `Mock`\<(...`args`) => `any`\>\>

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

`target`

</td>
<td>

`TModule`

</td>
<td>

The target object to be mocked.
This object defines the shape of the mock, and all its properties will be mocked with default implementations.

</td>
</tr>
<tr>
<td>

`override`?

</td>
<td>

`TOverride`

</td>
<td>

An optional object that provides overrides for specific properties of the mock.
If provided, these overrides will replace the default mocked implementations for the specified properties.

</td>
</tr>
</tbody>
</table>

#### Returns

`ObjectOverwrite`\<`Record`\<keyof `TModule`, `Mock`\<(...`args`) => `any`\>\>, `TOverride`\>

A new object with the same shape as the `target`, where all
properties are replaced with mocks. Properties specified in
the `override` parameter will have their mock implementations
replaced with the provided values.

#### Example

```ts
// Suppose we have a target object with the following shape
const target = {
  foo: () => 'foo',
  bar: 42
};

// Create a mock of the target object
const mockObject = autoMock(target);

console.log(mockObject.foo()); // Output will be a mock function, not 'foo'
console.log(mockObject.bar);   // Output will be a mock value, not 42

// Create a mock with overrides
const mockWithOverrides = autoMock(target, {
  foo: () => 'overriddenFoo' // Override the 'foo' property with a custom mock function
});

console.log(mockWithOverrides.foo()); // Output: 'overriddenFoo'
console.log(mockWithOverrides.bar);   // Output will be a mock value, not 42
```

#### Remarks

- The `createMockFn` function used internally creates a mock for each
  property of the target object.
- If `override` is provided, it should contain only the properties
  you wish to customize. Properties not specified in `override` will
  retain their default mock implementations.
- The `mock` function from `bun:test` is used to generate default mock
  implementations.

#### Defined in

[src/auto-mock.ts:65](https://github.com/itsmeid/bun-test-utils/blob/fab276da470737e4ef49df8d15009a398a141dce/src/auto-mock.ts#L65)
