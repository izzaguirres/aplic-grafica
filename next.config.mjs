import { fileURLToPath } from "node:url";

const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/nova-home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/grafica-florianopolis',
        destination: '/grafica-em-floripa',
        permanent: true,
      },
      {
        source: '/etiqueta-adesiva',
        destination: '/etiquetas-adesivas',
        permanent: true,
      },
      {
        source: '/adesivos',
        destination: '/etiquetas-adesivas',
        permanent: true,
      },
      {
        source: '/pasta',
        destination: '/pasta-com-bolso',
        permanent: true,
      },
      {
        source: '/pasta-bolso',
        destination: '/pasta-com-bolso',
        permanent: true,
      },
      {
        source: '/blocos',
        destination: '/blocos-receituario',
        permanent: true,
      },
      {
        source: '/blocos-personalizados',
        destination: '/blocos-receituario',
        permanent: true,
      },
      {
        source: '/receituario',
        destination: '/blocos-receituario',
        permanent: true,
      },
      {
        source: '/receituarios',
        destination: '/blocos-receituario',
        permanent: true,
      },
      {
        source: '/receituario-medico',
        destination: '/blocos-receituario',
        permanent: true,
      },
      {
        source: '/receituarios-medicos',
        destination: '/blocos-receituario',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
