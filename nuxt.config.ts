// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/supabase', "@nuxtjs/seo"],
  app: {
    head: {
      script: [
        { src: 'https://cloud.umami.is/script.js', defer: true, 'data-website-id': 'a7338219-eaed-40da-8a1c-7b80d07747f7' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.gstatic.com' },
        { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap' }
      ],
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
    exclude: [
      '/confirm',
      '/Confirm',
      '/dashboard'
    ]
  },
  site: {
    url: process.env.BASE_URL,
    name: 'Linkvoices',
    description: 'send direct crypto invoices',
    defaultLocale: 'en',
    identity: {
      type: 'Organization'
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   site: '@yourtwitterhandle',
    // }
  },
  ogImage: {
    enabled: true
  }
   
})