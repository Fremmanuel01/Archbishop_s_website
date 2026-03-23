import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "archbishopvalokeke.org" },
    ],
  },
  webpack(config) {
    config.resolve.alias["next-intl/config"] = path.resolve(
      __dirname,
      "./src/i18n/request.ts"
    );
    return config;
  },
};

export default withNextIntl(nextConfig);
