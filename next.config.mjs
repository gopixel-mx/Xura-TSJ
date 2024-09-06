// /** @type {import('next').NextConfig} */
// const nextConfig = {};
//
// export default nextConfig;
// Quitar los comnentarios despues y borrar lo de abajo
// Eliminar proxy del package.json

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.9.28:3001/api/:path*' // Proxy a tu backend
            }
        ];
    }
};

export default nextConfig;
