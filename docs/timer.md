[bun-test-utils](https://github.com/itsmeid/bun-test-utils/tree/main/docs/README.md) / timer

A module that provides a fake timer for testing purposes, mimicking
the behavior of `setTimeout` and `setInterval`. This allows for
controlled timing in tests, enabling you to simulate the passage
of time without relying on real time delays.

## Functions

### timer()

```ts
function timer(): object
```

Creates a fake timer object with methods similar to `setTimeout` and `setInterval`.

#### Returns

`object`

An object with the following methods:
- `setTimeout(callback, ms)` - Schedules a one-time callback to be executed after `ms` milliseconds.
- `clearTimeout(id)` - Cancels a previously scheduled one-time callback identified by `id`.
- `setInterval(callback, ms)` - Schedules a recurring callback to be executed every `ms` milliseconds.
- `clearInterval(id)` - Cancels a previously scheduled recurring callback identified by `id`.
- `tick(ms)` - Advances the fake time by `ms` milliseconds, triggering any callbacks that are due.
- `gelAllInstance()` - Retrieves all current timer instances.
- `getInstance(id)` - Retrieves a specific timer instance by `id`.
- `getCurrentTime()` - Retrieves the current fake time.
- `reset()` - Resets the fake timer, clearing all timers and setting the time back to zero.

##### setTimeout()

```ts
readonly setTimeout: (...args) => number;
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

...`args`

</td>
<td>

`TParam`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### clearTimeout()

```ts
readonly clearTimeout: (id) => void;
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

`id`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setInterval()

```ts
readonly setInterval: (...args) => number;
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

...`args`

</td>
<td>

`TParam`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### clearInterval()

```ts
readonly clearInterval: (id) => void;
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

`id`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### tick()

```ts
readonly tick: (ms) => void;
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

`ms`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### gelAllInstance()

```ts
readonly gelAllInstance: () => TTimer;
```

###### Returns

`TTimer`

##### getInstance()

```ts
readonly getInstance: (id) => undefined | object;
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

`id`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `object`

##### getCurrentTime()

```ts
readonly getCurrentTime: () => number;
```

###### Returns

`number`

##### reset()

```ts
readonly reset: () => void;
```

###### Returns

`void`

#### Example

```ts
const fakeTimer = timer();
const id = fakeTimer.setTimeout(() => console.log('is.id'), 1000);
fakeTimer.tick(1000); // Executes the callback
fakeTimer.clearTimeout(id); // Cancels the callback if not yet executed
```

#### Remarks

- Use `tick` to simulate the passage of time and trigger callbacks.
- Use `getInstance` to access specific timer details.

#### Defined in

[src/timer.ts:40](https://github.com/itsmeid/bun-test-utils/blob/fab276da470737e4ef49df8d15009a398a141dce/src/timer.ts#L40)

***

### useFakeTimer()

```ts
function useFakeTimer(setupOnly?): readonly [object, object]
```

Sets up a fake timer for testing and optionally replaces global timer functions.

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

`setupOnly`?

</td>
<td>

`boolean`

</td>
<td>

A boolean flag indicating whether to set up the fake timer immediately.
If true, the fake timer will be set up without modifying global timer function.
If false or not defined, the fake timer will modifying global timer function immediately.

</td>
</tr>
</tbody>
</table>

#### Returns

readonly [`object`, `object`]

An array where:
- The first element is the fake timer object with methods like `setTimeout`, `clearTimeout`, etc.
- The second element is an object with utilities for managing global timer functions:
  - `mock()`: Replaces global timer functions with fake timer methods.
  - `restore()`: Restores the original global timer functions.
  - `original`: Contains the original global timer functions before they were replaced.

#### Example

```ts
const [fakeTimer, { mock, restore, original }] = useFakeTimer();
const id = setTimeout(() => console.log('Test!'), 500);
fakeTimer.tick(500); // Executes the callback
restore(); // Restores the original global timer functions
```

#### Remarks

- If `setupOnly` is true, you need to manually call `mock()` to replace global timer functions and `restore()` to revert them.
- The `original` property contains the original global timer functions for reference or manual restoration.

#### Defined in

[src/timer.ts:153](https://github.com/itsmeid/bun-test-utils/blob/fab276da470737e4ef49df8d15009a398a141dce/src/timer.ts#L153)
