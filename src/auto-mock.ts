/**
 * A module that provides functionality to create mocks of target objects for testing purposes.
 * This allows you to easily generate mock implementations with the same shape as the target,
 * making it easier to test interactions with objects without relying on their actual implementations.
 *
 * @module autoMock
 */

import { mock } from 'bun:test';
import type { BypassAny, ObjectGeneric, ObjectOverwrite } from '@itsmeid/handy-utility-types';

export type AutoMock<
	TModule extends ObjectGeneric,
	TOverride extends Partial<Record<keyof TModule, unknown>> = TModule
> = ReturnType<typeof autoMock<TModule, TOverride>>;

/**
 * Creates a mock of the given target object. This function generates
 * a new mock object with the same shape as the target object. Optionally,
 * you can override specific properties of the mock with provided values.
 *
 * @param target
 * The target object to be mocked.
 * This object defines the shape of the mock, and all its properties will be mocked with default implementations.
 * @param override
 * An optional object that provides overrides for specific properties of the mock.
 * If provided, these overrides will replace the default mocked implementations for the specified properties.
 *
 * @returns
 * A new object with the same shape as the `target`, where all
 * properties are replaced with mocks. Properties specified in
 * the `override` parameter will have their mock implementations
 * replaced with the provided values.
 *
 * @example
 * // Suppose we have a target object with the following shape
 * const target = {
 *   foo: () => 'foo',
 *   bar: 42
 * };
 *
 * // Create a mock of the target object
 * const mockObject = autoMock(target);
 *
 * console.log(mockObject.foo()); // Output will be a mock function, not 'foo'
 * console.log(mockObject.bar);   // Output will be a mock value, not 42
 *
 * // Create a mock with overrides
 * const mockWithOverrides = autoMock(target, {
 *   foo: () => 'overriddenFoo' // Override the 'foo' property with a custom mock function
 * });
 *
 * console.log(mockWithOverrides.foo()); // Output: 'overriddenFoo'
 * console.log(mockWithOverrides.bar);   // Output will be a mock value, not 42
 *
 * @remarks
 * - The `createMockFn` function used internally creates a mock for each
 *   property of the target object.
 * - If `override` is provided, it should contain only the properties
 *   you wish to customize. Properties not specified in `override` will
 *   retain their default mock implementations.
 * - The `mock` function from `bun:test` is used to generate default mock
 *   implementations.
 */
export const autoMock = <
	TModule extends ObjectGeneric,
	TOverride extends Partial<Record<keyof TModule, unknown>> = Record<keyof TModule, ReturnType<typeof mock>>
>(
	target: TModule,
	override?: TOverride
) => {
	const original = { ...target };
	const createMockFn = () => {
		return mock();
	};

	type TBaseMocked = Record<keyof TModule, ReturnType<typeof mock>>;
	type TMocked = ObjectOverwrite<TBaseMocked, TOverride>;
	const mocked: TMocked = ((): BypassAny => {
		const keys = Object.keys(original);
		let result = Object.fromEntries(
			keys.map((key) => {
				return [key, createMockFn()];
			})
		);

		if (override) {
			result = {
				...result,
				...override
			};
		}

		return result;
	})();

	return mocked;
};
