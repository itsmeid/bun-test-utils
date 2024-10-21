import { describe, expect, it, mock } from 'bun:test';
import { type MockModule, mockModule } from 'src/mock-module';
import * as Module from './module.mock';

const mockValue = {
	shutdown: mock()
};
let mockedForEffect: MockModule<typeof Module>;

describe('mock-module', () => {
	describe('mocking', () => {
		const mocked = mockModule<typeof Module, typeof mockValue>(
			import.meta.resolve('./module.mock'),
			() => mockValue
		);

		mockedForEffect = mocked;

		it('should return object value', () => {
			expect(mocked).toBeObject();
			expect(mocked).toContainAllKeys(['_target', '_targetOriginal', 'compile', 'restore', 'spy']);
		});

		it('should mock module immediately', () => {
			expect(Module.shutdown()).toBeUndefined();
		});

		it('should only mock module member based on factory', () => {
			expect(Module.shutdown()).toBeUndefined();
			expect(Module.instance).toBeDefined();
		});

		it('should return original module when call _targetOriginal', () => {
			expect(mocked._targetOriginal.shutdown()).toBeDefined();
		});

		it('should return the module when call _target', () => {
			const target: typeof Module = mocked._target;
			expect(target).toEqual(Module);
		});

		it('should return the spy instance when call func spy()', () => {
			const spy = mocked.spy('shutdown');
			spy.mockClear();
			expect(spy).toHaveBeenCalledTimes(0);
			Module.shutdown();
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('effect', () => {
		it('should restored on different test suite', () => {
			expect(Module.shutdown()).toBeDefined();
			const spy = mockedForEffect.spy('shutdown');
			expect(spy).toHaveBeenCalledTimes(0);
			Module.shutdown();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should mock module after call compile()', () => {
			mockedForEffect.compile();
			expect(Module.shutdown()).toBeUndefined();
		});

		it('should restore module after call restore()', () => {
			mockedForEffect.restore();
			expect(Module.shutdown()).toBeDefined();
		});
	});

	describe('setup only', () => {
		const mocked = mockModule<typeof Module, typeof mockValue>(
			import.meta.resolve('./module.mock'),
			() => mockValue
		);

		it('should not mock module immediately', () => {
			expect(Module.shutdown()).toBeDefined();
		});

		it('should return _target the same as the original module', () => {
			const target: typeof Module = mocked._target;

			expect(mocked._targetOriginal.shutdown()).toBeDefined();
			expect(target).toEqual(Module);
			expect(target).toEqual(mocked._targetOriginal);
		});
	});
});
