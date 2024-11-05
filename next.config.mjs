// /** @type {import('next').NextConfig} */
// const nextConfig = {};
//
// export default nextConfig;
// Quitar los comnentarios despues y borrar lo de abajo
// Eliminar proxy del package.json

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.8.206:3001/api/:path*', // Proxy del backend
      },
    ];
  },
};

export default nextConfig;
