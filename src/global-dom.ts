/**
 * A module that manages global DOM settings and operations, allowing for
 * registration, updating, and resetting of global DOM configurations.
 * This module is particularly useful for testing environments that require
 * specific DOM settings.
 * ({@link https://www.npmjs.com/package/@happy-dom/global-registrator @happy-dom/global-registrator})
 *
 *
 *
 * @module globalDOM
 */

import { GlobalRegistrator } from '@happy-dom/global-registrator';
type TSetting = Parameters<typeof GlobalRegistrator.register>[0];

let FLAG = 0;
const DEFAULT_SETTING: TSetting = {
	height: 1080,
	width: 1920
};

/**
 * Represents the global DOM settings and operations.
 *
 * @type {Object}
 * @property {function(): TSetting} getDefaultSetting - Retrieves the current default settings for the global DOM.
 * @property {function(TSetting): void} setDefaultSetting - Updates the default settings for the global DOM.
 * @property {function(TSetting): void} register - Registers the global DOM with the current or specified settings.
 * @property {function(): Promise<void>} remove - Unregisters the global DOM if it is currently registered.
 * @property {function(TSetting): Promise<void>} update - Updates the global DOM settings by unregistering and then registering with new settings.
 * @property {function(): Promise<void>} reset - Resets the global DOM settings to the default settings.
 */
export const globalDOM = {
	/**
	 * Retrieves the current default settings for the global DOM.
	 *
	 * @returns
	 * The default settings object
	 */
	getDefaultSetting: () => DEFAULT_SETTING,

	/**
	 * Updates the default settings for the global DOM.
	 *
	 * @param setting
	 * An object containing the new settings. Properties include `height` and `width`.
	 */
	setDefaultSetting: (setting: TSetting) => {
		Object.assign(DEFAULT_SETTING, setting);
	},

	/**
	 * Registers the global DOM with the current or specified settings.
	 * Only register if it is currently no registered DOM
	 *
	 * @param setting
	 * Optional. An object containing the settings to override the default settings.
	 *
	 * @example
	 * register(); // Registers with default settings
	 * register({ height: 720 }); // Registers with overridden height
	 */
	register: (setting?: TSetting) => {
		if (FLAG === 1) {
			return;
		}

		GlobalRegistrator.register({
			...DEFAULT_SETTING,
			...setting
		});
		FLAG = 1;
	},

	/**
	 * Unregisters the global DOM if it is currently registered.
	 *
	 * @returns
	 * A promise that resolves when the unregistration is complete.
	 */
	remove: async () => {
		if (FLAG === 0) {
			return;
		}

		await GlobalRegistrator.unregister();
		FLAG = 0;
	},

	/**
	 * Updates the global DOM settings by first unregistering and then registering with new settings.
	 *
	 * @param setting
	 * Optional. An object containing the settings to override the default settings.
	 *
	 * @returns
	 * A promise that resolves when the update is complete.
	 *
	 * @example
	 * await update({ width: 1024 }); // Unregisters and then registers with new width setting
	 */
	update: async (setting?: TSetting) => {
		await globalDOM.remove();
		globalDOM.register(setting);
	},

	/**
	 * Resets the global DOM settings to the default settings.
	 *
	 * @returns
	 * A promise that resolves when the reset is complete.
	 */
	reset: async () => {
		await globalDOM.update(DEFAULT_SETTING);
	}
};
