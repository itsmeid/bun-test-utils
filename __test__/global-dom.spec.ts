import { afterAll, afterEach, describe, expect, it, spyOn } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { globalDOM } from 'src/global-dom';

const { getDefaultSetting, setDefaultSetting, register, remove, update, reset } = globalDOM;
const spyRegister = spyOn(GlobalRegistrator, 'register');
const spyUnregister = spyOn(GlobalRegistrator, 'unregister');

afterEach(async () => {
	await remove();
	spyRegister.mockClear();
	spyUnregister.mockClear();
});

afterAll(() => {
	spyRegister.mockRestore();
	spyUnregister.mockRestore();
});

describe('global-dom', () => {
	it('should register with default setting', async () => {
		register();

		expect(spyRegister).toHaveBeenCalledTimes(1);
		expect(spyRegister).toHaveBeenLastCalledWith({
			height: 1080,
			width: 1920
		});
	});

	it('should update default setting when call setDefaultSetting func', () => {
		const defaultSetting = getDefaultSetting();

		expect(getDefaultSetting()).toEqual(defaultSetting);

		const newSetting = { height: 720, width: 1280 };
		setDefaultSetting(newSetting);

		expect(getDefaultSetting()).toEqual(newSetting);

		setDefaultSetting(defaultSetting);
	});

	it('should remove global-dom if registered', async () => {
		expect(spyUnregister).toHaveBeenCalledTimes(0);

		register();
		await remove();

		expect(spyUnregister).toHaveBeenCalledTimes(1);
	});

	it('should not remove global-dom if not registered', async () => {
		expect(spyUnregister).toHaveBeenCalledTimes(0);

		await remove();

		expect(spyUnregister).toHaveBeenCalledTimes(0);
	});

	it('should not register multiple global-dom', async () => {
		register();
		register();

		expect(spyRegister).toHaveBeenCalledTimes(1);
	});

	it('should re-registers global DOM with new settings when call update func', async () => {
		register();

		expect(spyUnregister).toHaveBeenCalledTimes(0);
		expect(spyRegister).toHaveBeenLastCalledWith(getDefaultSetting());

		const newSetting = { height: 720, width: 1280 };
		await update(newSetting);

		expect(spyUnregister).toHaveBeenCalledTimes(1);
		expect(spyRegister).toHaveBeenLastCalledWith(newSetting);
	});

	it('should updates global DOM to default settings when call reset func', async () => {
		await register();
		await reset();

		expect(spyUnregister).toHaveBeenCalledTimes(1);
		expect(spyRegister).toHaveBeenCalledWith(getDefaultSetting());
	});
});
