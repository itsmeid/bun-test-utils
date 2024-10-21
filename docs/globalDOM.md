[bun-test-utils](https://github.com/itsmeid/bun-test-utils/tree/main/docs/README.md) / globalDOM

A module that manages global DOM settings and operations, allowing for
registration, updating, and resetting of global DOM configurations.
This module is particularly useful for testing environments that require
specific DOM settings.
([@happy-dom/global-registrator](https://www.npmjs.com/package/@happy-dom/global-registrator))

## Variables

### globalDOM

```ts
const globalDOM: object;
```

Represents the global DOM settings and operations.

#### Type declaration

##### getDefaultSetting()

```ts
getDefaultSetting: () => object;
```

Retrieves the current default settings for the global DOM.

###### Returns

`object`

The default settings object

###### width?

```ts
optional width: number;
```

###### height?

```ts
optional height: number;
```

###### url?

```ts
optional url: string;
```

###### settings?

```ts
optional settings: IOptionalBrowserSettings;
```

##### setDefaultSetting()

```ts
setDefaultSetting: (setting) => void;
```

Updates the default settings for the global DOM.

###### Parameters

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

`setting`

</td>
<td>

`undefined` \| `object`

</td>
<td>

An object containing the new settings. Properties include `height` and `width`.

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### register()

```ts
register: (setting?) => void;
```

Registers the global DOM with the current or specified settings.
Only register if it is currently no registered DOM

###### Parameters

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

`setting`?

</td>
<td>

`object`

</td>
<td>

Optional. An object containing the settings to override the default settings.

</td>
</tr>
<tr>
<td>

`setting.width`?

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`setting.height`?

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`setting.url`?

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`setting.settings`?

</td>
<td>

`IOptionalBrowserSettings`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```ts
register(); // Registers with default settings
register({ height: 720 }); // Registers with overridden height
```

##### remove()

```ts
remove: () => Promise<void>;
```

Unregisters the global DOM if it is currently registered.

###### Returns

`Promise`\<`void`\>

A promise that resolves when the unregistration is complete.

##### update()

```ts
update: (setting?) => Promise<void>;
```

Updates the global DOM settings by first unregistering and then registering with new settings.

###### Parameters

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

`setting`?

</td>
<td>

`object`

</td>
<td>

Optional. An object containing the settings to override the default settings.

</td>
</tr>
<tr>
<td>

`setting.width`?

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`setting.height`?

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`setting.url`?

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`setting.settings`?

</td>
<td>

`IOptionalBrowserSettings`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

A promise that resolves when the update is complete.

###### Example

```ts
await update({ width: 1024 }); // Unregisters and then registers with new width setting
```

##### reset()

```ts
reset: () => Promise<void>;
```

Resets the global DOM settings to the default settings.

###### Returns

`Promise`\<`void`\>

A promise that resolves when the reset is complete.

#### Defined in

src/global-dom.ts:33
