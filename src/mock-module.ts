/**
 * A module that provides utilities for mocking other modules in a test environment.
 * This allows you to override specific properties or methods of a module with mock implementations,
 * and manage these mocks easily through compile, restore, and spy functionalities.
 * This is especially useful for testing code that depends on external modules.
 *
 * @module mockModule
 */

import { afterAll, beforeAll, mock, spyOn } from 'bun:test';
import type { ObjectGeneric } from '@itsmeid/handy-utility-types';

export type MockModule<
	TModule extends ObjectGeneric,
	TFactory extends Partial<Record<keyof TModule, unknown>> = Partial<Record<keyof TModule, unknown>>
> = ReturnType<typeof mockModule<TModule, TFactory>>;

/**
 * Creates a mock for a module. This allows you to override specific
 * properties or methods of a module with mock implementations.
 * The mock can be set up immediately or deferred until explicitly
 * compiled. The mock can also be restored to the original implementation.
 *
 * @param path
 * The path to the module to be mocked.
 * This should be a string literal representing the module's path.
 * @param factory
 * A function that takes the original module as an argument and returns an object containing
 * the properties or methods to be mocked.
 * This object will override the corresponding properties or methods in the module.
 * @param setupOnly
 * A boolean flag indicating whether to set up the mock immediately.
 * If true, the mock will be set up but not compiled until explicitly done later.
 * If false or not defined, the mock will be compiled immediately.
 *
 * @returns An object containing methods and properties for managing the mock:
 * - `_target`: The current mock target, which includes the original and mocked properties.
 * - `_targetOriginal`: The original, unmocked version of the module.
 * - `compile()`: Compiles and applies the mock to the module. This should be called if `setupOnly` is true.
 * - `restore()`: Restores the original module implementation, removing any mocks.
 * - `spy(key)`: Creates a spy on a specific method or property of the module.
 *
 * @example
 * // Mock the `module` module, overriding its `someMethod` function
 * const { compile, restore, spy, _target } = mockModule<typeof import('./path/to/module')>(
 *   './path/to/module',
 *   (original) => ({
 *     someMethod: () => 'mocked value',
 *   }),
 *   false // Compile the mock immediately
 * );
 *
 * // Use the module with mocked methods
 * console.log(_target.someMethod()); // Output: 'mocked value'
 *
 * // Create a spy on a method
 * const someMethodSpy = spy('someMethod');
 *
 * // Restore the original module
 * restore();
 *
 * @remarks
 * - The module will be automatically restored after all tests complete
 *   due to the `afterAll` hook, but you can manually restore it earlier
 *   if needed by calling the `restore` method.
 * - Ensure that `path` is a correct path relative to the test file or
 *   properly resolved in your environment.
 * - The `factory` function should return an object that contains only the
 *   properties you want to mock or override. All other properties of the
 *   module will remain unchanged.
 */
export const mockModule = <
	TModule extends ObjectGeneric,
	TFactory extends Partial<Record<keyof TModule, unknown>> = Partial<Record<keyof TModule, unknown>>
>(
	path: string,
	factory: (original: TModule) => TFactory,
	setupOnly?: boolean
) => {
	let _isCompiled = false;
	let _path: string;
	let _target: ObjectGeneric = {};
	let _targetMocked: ObjectGeneric = {};
	let _targetOriginal: ObjectGeneric = {};

	const get = (): TModule & TFactory => {
		return _target;
	};

	const getOriginal = (): TModule => {
		return _targetOriginal;
	};

	const compile = () => {
		if (!_isCompiled) {
			mock.module(_path, () => {
				return {
					..._targetOriginal,
					..._targetMocked
				};
			});
			_isCompiled = true;
		}
	};

	const restore = () => {
		if (_isCompiled) {
			mock.module(_path, () => {
				return _targetOriginal;
			});
			_isCompiled = false;
		}
	};

	const spy = (key: keyof TModule) => {
		const module: TModule = _target;
		return spyOn(module, key);
	};

	const result = {
		_target: get(),
		_targetOriginal: getOriginal(),
		compile,
		restore,
		spy
	};

	beforeAll(async () => {
		_path = config.moduleResolver(path, config.parentDir);
		_target = await import(_path);

		if (TEMP_MODULE[path]) {
			_targetOriginal = TEMP_MODULE[path];
		} else {
			_targetOriginal = Object.assign({}, _target);
			TEMP_MODULE[path] = _targetOriginal;
		}

		_targetMocked = factory(_targetOriginal);
		result._target = get();
		result._targetOriginal = getOriginal();

		if (!setupOnly) {
			compile();
		}
	});

	afterAll(() => {
		restore();
	});

	return result;
};

/**
 * Configures global settings for the `mockModule` function. This method allows you to
 * customize various aspects of how the module mocking is handled, such as the module
 * resolver or the parent directory for module paths.
 *
 * @param param
 * An object containing the configuration options to be set.
 * The object can include any of the following properties:
 * - `parentDir`: A string representing the parent directory to resolve module paths.
 * - `moduleResolver`: A function used to resolve module paths.
 * By default, this is `Bun.resolveSync`, but it can be replaced with a custom resolver.
 *
 * @example
 * // Set a custom parent directory and module resolver
 * mockModule.setConfig({
 *   parentDir: '/custom/parent/dir',
 *   moduleResolver: (path: string) => `/custom/resolved/path/${path}`
 * });
 *
 * // Set only the parent directory
 * mockModule.setConfig({
 *   parentDir: '/another/parent/dir'
 * });
 *
 * @remarks
 * - The `param` object should match the shape of the `config` object, with properties you wish to update.
 * - If you only want to update specific properties, you can provide an object with just those properties.
 *   Other properties will remain unchanged.
 * - This method affects all subsequent calls to `mockModule`, so it should be used with care to ensure
 *   the correct configuration is applied.
 */
mockModule.setConfig = (param: Partial<typeof config>) => {
	Object.assign(config, param);
};

const config = {
	parentDir: '',
	moduleResolver: Bun.resolveSync
};

const TEMP_MODULE: ObjectGeneric = {};
