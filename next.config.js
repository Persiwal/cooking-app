const path = require('path');

/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

module.exports = withNextIntl({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import 'index.scss';`,
  },
});
