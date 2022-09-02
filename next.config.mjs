/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}
const securityHeaders = [
  {
    key: "Cache-Control",
    value: "private, no-cache, no-store, must-revalidate",
  },
  {
    key: "Expires",
    value: "-1",
  },
  {
    key: "Pragma",
    value: "no-cache",
  },
];
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/api/token",
        headers: securityHeaders,
      },
    ];
  },
});
