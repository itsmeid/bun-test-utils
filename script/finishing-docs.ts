import { copyFile, readFile } from 'node:fs/promises';
import { write } from 'bun';

async function main() {
	const fPath = 'docs/README.md';
	let fText = await readFile(fPath, 'utf8');
	fText = fText.replaceAll('%5C', '/');
	fText = fText.replaceAll('## Modules', '');

	await write(fPath, fText);
	await copyFile(fPath, 'README.md');
	console.info('Finish');
}

main();
