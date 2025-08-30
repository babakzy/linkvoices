import { inject } from '@vercel/analytics';
a
export default defineNuxtPlugin(() => {
  // Initialize Vercel Analytics
  inject();

  // Initialize Google Analytics
  if (process.client) {
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-L61C9SR4CR';
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L61C9SR4CR');
    `;
    document.head.appendChild(script2);
  }
});