/**
 * A module that provides a fake timer for testing purposes, mimicking
 * the behavior of `setTimeout` and `setInterval`. This allows for
 * controlled timing in tests, enabling you to simulate the passage
 * of time without relying on real time delays.
 *
 * @module timer
 */

import { afterEach, beforeEach } from 'bun:test';
import type { BypassAny } from '@itsmeid/handy-utility-types';

type TTimer = Map<number, { callback: () => void; dueTime?: number; interval?: number }>;
type TParam = [callback: () => void, ms: number];

/**
 * Creates a fake timer object with methods similar to `setTimeout` and `setInterval`.
 *
 * @returns An object with the following methods:
 * - `setTimeout(callback, ms)` - Schedules a one-time callback to be executed after `ms` milliseconds.
 * - `clearTimeout(id)` - Cancels a previously scheduled one-time callback identified by `id`.
 * - `setInterval(callback, ms)` - Schedules a recurring callback to be executed every `ms` milliseconds.
 * - `clearInterval(id)` - Cancels a previously scheduled recurring callback identified by `id`.
 * - `tick(ms)` - Advances the fake time by `ms` milliseconds, triggering any callbacks that are due.
 * - `gelAllInstance()` - Retrieves all current timer instances.
 * - `getInstance(id)` - Retrieves a specific timer instance by `id`.
 * - `getCurrentTime()` - Retrieves the current fake time.
 * - `reset()` - Resets the fake timer, clearing all timers and setting the time back to zero.
 *
 * @example
 * const fakeTimer = timer();
 * const id = fakeTimer.setTimeout(() => console.log('is.id'), 1000);
 * fakeTimer.tick(1000); // Executes the callback
 * fakeTimer.clearTimeout(id); // Cancels the callback if not yet executed
 *
 * @remarks
 * - Use `tick` to simulate the passage of time and trigger callbacks.
 * - Use `getInstance` to access specific timer details.
 */
export const timer = () => {
	const timers: TTimer = new Map();
	let currentTime = 0;
	let nextId = 0;

	return {
		setTimeout: (...args: TParam) => {
			const [callback, ms] = args;
			const id = nextId++;

			timers.set(id, {
				callback: () => {
					callback();
					timers.delete(id);
				},
				dueTime: currentTime + ms
			});

			return id;
		},
		clearTimeout: (id: number) => {
			timers.delete(id);
		},
		setInterval: (...args: TParam) => {
			const [callback, ms] = args;

			if (ms < 1) {
				throw new Error('Interval time cannot lower than 1');
			}

			const id = nextId++;

			timers.set(id, {
				callback,
				interval: ms
			});

			return id;
		},
		clearInterval: (id: number) => {
			timers.delete(id);
		},
		tick: (ms: number) => {
			const time = {
				past: currentTime,
				now: currentTime + ms
			};

			for (const timer of timers) {
				const [, instance] = timer;

				if (instance.interval) {
					const callCount = Math.floor((time.now - time.past) / instance.interval);

					for (let i = 0; i < callCount; i++) {
						instance.callback();
					}

					continue;
				}

				if (instance.dueTime) {
					if (time.now >= instance.dueTime) {
						instance.callback();
					}
				}
			}

			currentTime += ms;
		},
		gelAllInstance: () => {
			return timers;
		},
		getInstance: (id: number) => {
			return timers.get(id);
		},
		getCurrentTime: () => {
			return currentTime;
		},
		reset: () => {
			timers.clear();
			currentTime = 0;
			nextId = 0;
		}
	} as const;
};

/**
 * Sets up a fake timer for testing and optionally replaces global timer functions.
 *
 * @param setupOnly
 * A boolean flag indicating whether to set up the fake timer immediately.
 * If true, the fake timer will be set up without modifying global timer function.
 * If false or not defined, the fake timer will modifying global timer function immediately.
 *
 * @returns
 * An array where:
 * - The first element is the fake timer object with methods like `setTimeout`, `clearTimeout`, etc.
 * - The second element is an object with utilities for managing global timer functions:
 *   - `mock()`: Replaces global timer functions with fake timer methods.
 *   - `restore()`: Restores the original global timer functions.
 *   - `original`: Contains the original global timer functions before they were replaced.
 *
 * @example
 * const [fakeTimer, { mock, restore, original }] = useFakeTimer();
 * const id = setTimeout(() => console.log('Test!'), 500);
 * fakeTimer.tick(500); // Executes the callback
 * restore(); // Restores the original global timer functions
 *
 * @remarks
 * - If `setupOnly` is true, you need to manually call `mock()` to replace global timer functions and `restore()` to revert them.
 * - The `original` property contains the original global timer functions for reference or manual restoration.
 */
export const useFakeTimer = (setupOnly?: boolean) => {
	const fake = timer();
	const original = { ...{ setTimeout, clearTimeout, setInterval, clearInterval } };

	if (!setupOnly) {
		beforeEach(() => {
			mock();
		});

		afterEach(() => {
			fake.reset();
			restore();
		});
	}

	const mock = () => {
		(global as BypassAny).setTimeout = fake.setTimeout;
		(global as BypassAny).clearTimeout = fake.clearTimeout;
		(global as BypassAny).setInterval = fake.setInterval;
		(global as BypassAny).clearInterval = fake.clearInterval;
	};

	const restore = () => {
		(global as BypassAny).setTimeout = original.setTimeout;
		(global as BypassAny).clearTimeout = original.clearTimeout;
		(global as BypassAny).setInterval = original.setInterval;
		(global as BypassAny).clearInterval = original.clearInterval;
	};

	return [fake, { mock, restore, original }] as const;
};
