// https://nuxt.com/docs/api/configuration/nuxt-config
const appUrl = (
  process.env.NUXT_SITE_URL ||
  process.env.URL ||
  process.env.BASE_URL ||
  'http://localhost:3000'
)
  .replace(/\/$/, '')
  .replace(/^http:\/\/(?!localhost)/i, 'https://')

export default defineNuxtConfig({
  srcDir: '.',
  routeRules: {
    '/Help': { redirect: { to: '/help', statusCode: 301 } },
    '/Confirm': { redirect: { to: '/confirm', statusCode: 301 } },
  },
  runtimeConfig: {
    public: {
      url: appUrl,
      baseURL: `${appUrl}/`,
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/supabase', "@nuxtjs/seo"],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        { src: 'https://cloud.umami.is/script.js', defer: true, 'data-website-id': 'a7338219-eaed-40da-8a1c-7b80d07747f7' },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-L61C9SR4CR', async: true },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L61C9SR4CR');
          `
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.gstatic.com' },
        { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' } // Added Google Material Icons
      ],
      meta: [
        { name: "msvalidate.01", content: "1352DC4C86BE1B9F6608A54EA2C5F285" }
      ]
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/dashboard/*'],
      exclude: ['*'],
      cookieRedirect: false,
    }
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: [
      '/confirm',
      '/login',
      '/dashboard/**',
      '/invoice/**',
    ],
  },
  site: {
    url: appUrl,
    name: 'Linkvoices',
    description:
      'Create and send free cryptocurrency invoices directly to your wallet. Accept Bitcoin, Ethereum, USDT, and DAI with no platform fees.',
    defaultLocale: 'en',
    identity: {
      type: 'Organization',
    },
  },
  ogImage: {
    enabled: false,
  },
})