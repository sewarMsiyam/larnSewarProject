const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // فقط عند الحاجة
      },
};
 
module.exports = withNextIntl(nextConfig);