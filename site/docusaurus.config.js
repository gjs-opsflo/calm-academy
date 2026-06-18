// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
export default {
  title: 'CALM Academy',
  tagline: 'Architecture as Code — the official course',
  url: 'https://gjs-opsflo.github.io',
  baseUrl: '/calm-academy/',
  organizationName: 'gjs-opsflo',
  projectName: 'calm-academy',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../content',
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          exclude: ['README.md'],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexPages: false,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CALM Academy',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/gjs-opsflo/calm-academy',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'CALM Academy. Content: CC BY-SA 4.0. Code: Apache 2.0. Built with Docusaurus.',
      },
      // NOTE: Do NOT include algolia key until DocSearch approved
      // Placeholder causes broken search bar at runtime
    }),
};
