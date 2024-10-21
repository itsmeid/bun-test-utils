import { describe, expect, it } from 'bun:test';
import { autoMock } from 'src/auto-mock';
import { instance } from './module.mock';

describe('auto-mock', () => {
	it('should not do anything to the original instance/object', () => {
		autoMock(instance);

		expect(instance.run()).toBe('run');
		expect(instance.stop()).toBe('stop');
	});

	it('should mock every instance member', () => {
		const mockedInstance = autoMock(instance);

		expect(mockedInstance.run()).toBeUndefined();
		expect(mockedInstance.stop()).toBeUndefined();

		mockedInstance.run.mockReturnValueOnce(10);
		expect(mockedInstance.run()).toBe(10);
		expect(mockedInstance.run()).toBeUndefined();
	});

	it('should override instance member based on override param', () => {
		const mockedInstance = autoMock(instance, {
			run: () => 'run forest! run!',
			stop: () => false
		});

		expect(mockedInstance.run()).toBe('run forest! run!');
		expect(mockedInstance.stop()).toBeFalse();
	});

	it('should only override instance member that defined on override param', () => {
		const mockedInstance = autoMock(instance, {
			run: () => 'run forest! run!'
		});

		expect(mockedInstance.run()).toBe('run forest! run!');
		expect(mockedInstance.stop()).toBeUndefined();
	});
});
