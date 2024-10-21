import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { timer, useFakeTimer } from 'src/timer';

let timerInstance: ReturnType<typeof timer>;

beforeEach(() => {
	timerInstance = timer();
});

afterEach(() => {
	timerInstance.reset();
});

describe('timer', () => {
	it('should execute setTimeout callback after specified delay', () => {
		const callback = mock();
		timerInstance.setTimeout(callback, 1000);

		expect(callback).toHaveBeenCalledTimes(0);

		timerInstance.tick(1000);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should clearTimeout correctly', () => {
		const callback = mock();
		const id = timerInstance.setTimeout(callback, 1000);

		timerInstance.clearTimeout(id);

		timerInstance.tick(1000);

		expect(callback).toHaveBeenCalledTimes(0);
	});

	it('should execute setInterval callback repeatedly', () => {
		const callback = mock();
		timerInstance.setInterval(callback, 500);

		timerInstance.tick(1500);

		expect(callback).toHaveBeenCalledTimes(3);
	});

	it('should clearInterval correctly', () => {
		const callback = mock();
		const id = timerInstance.setInterval(callback, 500);

		timerInstance.clearInterval(id);

		timerInstance.tick(1500);

		expect(callback).toHaveBeenCalledTimes(0);
	});

	it('should not allow setInterval with interval less than 1ms', () => {
		expect(() => timerInstance.setInterval(() => {}, 0)).toThrow('Interval time cannot lower than 1');
	});

	it('should advance currentTime with tick', () => {
		timerInstance.tick(1000);
		expect(timerInstance.getCurrentTime()).toBe(1000);
	});

	it('should execute timeouts and intervals correctly with mixed ticks', () => {
		const timeoutCallback = mock();
		const intervalCallback = mock();

		timerInstance.setTimeout(timeoutCallback, 1000);
		timerInstance.setInterval(intervalCallback, 500);

		timerInstance.tick(1500);

		expect(timeoutCallback).toHaveBeenCalledTimes(1);

		expect(intervalCallback).toHaveBeenCalledTimes(3);
	});

	it('should be able to get all timer instance(s)', () => {
		const timeoutCallback = mock();
		timerInstance.setTimeout(timeoutCallback, 1000);

		let allTimers = timerInstance.gelAllInstance();
		expect(allTimers.size).toBe(1);

		const intervalCallback = mock();
		timerInstance.setInterval(intervalCallback, 500);
		allTimers = timerInstance.gelAllInstance();
		expect(allTimers.size).toBe(2);
	});

	it('should be able to get specific timer instance', () => {
		const timeoutCallback = mock();
		const intervalCallback = mock();
		const timeoutId = timerInstance.setTimeout(timeoutCallback, 1000);
		const intervalId = timerInstance.setInterval(intervalCallback, 500);

		const timeoutInstance = timerInstance.getInstance(timeoutId);
		const intervalInstance = timerInstance.getInstance(intervalId);

		expect(timeoutInstance).toBeDefined();
		expect(intervalInstance).toBeDefined();
	});

	it('should return undefined for non-existent timer instance', () => {
		expect(timerInstance.getInstance(26)).toBeUndefined();
	});

	describe('useFakeTimer', () => {
		const mockedForEffect = useFakeTimer();

		it('should return array tuple', () => {
			const result = useFakeTimer(true);

			expect(result).toBeArrayOfSize(2);
			expect(result[0]).toBeObject();
			expect(result[1]).toBeObject();
		});

		it('should mock and restore global timers correctly', () => {
			const [fakeTimer, controller] = useFakeTimer(true);

			controller.mock();
			expect(setTimeout).toBe(fakeTimer.setTimeout as typeof setTimeout);
			controller.restore();
			expect(setTimeout).toBe(setTimeout);
		});

		it('should mock automatically if not setupOnly', () => {
			expect(setTimeout).toBe(mockedForEffect[0].setTimeout as typeof setTimeout);
			expect(clearTimeout).toBe(mockedForEffect[0].clearTimeout as typeof clearTimeout);
			expect(setInterval).toBe(mockedForEffect[0].setInterval as typeof setInterval);
			expect(clearInterval).toBe(mockedForEffect[0].clearInterval as typeof clearInterval);
		});

		describe('effect', () => {
			it('should restore automatically if not setupOnly', () => {
				expect(setTimeout).toBe(setTimeout);
				expect(clearTimeout).toBe(clearTimeout);
				expect(setInterval).toBe(setInterval);
				expect(clearInterval).toBe(clearInterval);
			});
		});
	});
});
