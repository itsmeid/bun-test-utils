/** @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions} */
const config = {
	name: 'bun-test-utils',
	entryPoints: ['src/**/*.ts'],
	exclude: ['src/**/index.ts'],
	out: './docs',
	excludeInternal: true,
	plugin: ['typedoc-plugin-markdown'],
	readme: 'TEMPLATE.md',
	outputFileStrategy: 'modules',
	flattenOutputFiles: true,
	indexFormat: 'htmlTable',
	parametersFormat: 'htmlTable',
	mergeReadme: true,
	hidePageHeader: true,
	hidePageTitle: true,
	hideGroupHeadings: false,
	hideBreadcrumbs: false,
	useCodeBlocks: true,
	gitRemote: 'origin',
	sort: ['kind', 'source-order'],
	validation: {
		invalidLink: true,
		notExported: false,
		notDocumented: false
	},
	publicPath: 'https://github.com/itsmeid/bun-test-utils/tree/main/docs'
};

export default config;
