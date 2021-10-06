module.exports = {
  images: {
    domains: [
      "localhost",
      "192.168.18.186",
      "smart-school-300211.et.r.appspot.com",
      "firebasestorage.googleapis.com",
    ],
  },
  publicRuntimeConfig: {
    API_HOST: "http://localhost:8080",
    // API_HOST: "http://localhost:8080",
    SS_URL: "/smartschool",
    ADMIN_URL: "/admin",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
