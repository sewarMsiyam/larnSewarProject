const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
};
 
module.exports = withNextIntl(nextConfig);