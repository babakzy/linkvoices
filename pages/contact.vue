<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center">
          <h1 class="text-3xl mt-20 font-bold text-black-900 sm:text-4xl lg:text-5xl">Contact Us</h1>
          <p class="mt-4 text-xl text-black-600">Questions, feedback, or partnership ideas — I'd love to hear from you.</p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <div class="bg-spring-wood-100 rounded-lg p-6">
            <h3 class="text-xl font-medium text-black-900 mb-2">Email</h3>
            <p class="text-black-600 text-sm mb-4">For support, business inquiries, or general questions.</p>
            <a
              href="mailto:hello@babakzy.com"
              class="inline-flex items-center gap-2 text-cerulean-blue-600 hover:text-cerulean-blue-700 font-medium"
            >
              hello@babakzy.com
            </a>
            <p class="mt-4 text-sm text-black-500">I typically respond within 1–2 business days.</p>
          </div>

          <div class="bg-spring-wood-100 rounded-lg p-6">
            <h3 class="text-xl font-medium text-black-900 mb-2">Before you write</h3>
            <p class="text-black-600 text-sm mb-4">You might find a quick answer in these resources.</p>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink to="/faq" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">FAQ</NuxtLink>
                <span class="text-black-500"> — common questions about invoices & payments</span>
              </li>
              <li>
                <NuxtLink to="/pricing" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">Pricing</NuxtLink>
                <span class="text-black-500"> — plans and what's included</span>
              </li>
              <li>
                <NuxtLink to="/blog" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">Blog</NuxtLink>
                <span class="text-black-500"> — guides and crypto invoicing tips</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 bg-spring-wood-100 rounded-lg p-6 md:p-8">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              class="h-24 w-24 rounded-full object-cover border-2 border-spring-wood-200 flex-shrink-0"
              src="@/assets/images/babakzy.jpeg"
              alt="Babak Sadeghzadeh"
            >
            <div class="text-center sm:text-left">
              <h3 class="text-xl font-medium text-black-900">Babak Sadeghzadeh</h3>
              <p class="text-sm text-black-600 mt-1">Builder of LinkVoices</p>
              <p class="mt-3 text-black-600 text-sm leading-relaxed">
                I'm the builder behind LinkVoices. Feel free to reach out for support, collaboration, or just to say hello.
              </p>
              <div class="flex items-center justify-center sm:justify-start gap-4 mt-4">
                <a
                  href="https://twitter.com/babakzy"
                  target="_blank"
                  rel="noopener"
                  class="text-black-500 hover:text-cerulean-blue-600 transition-colors"
                  aria-label="Twitter"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/babakzy"
                  target="_blank"
                  rel="noopener"
                  class="text-black-500 hover:text-cerulean-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/babakzy"
                  target="_blank"
                  rel="noopener"
                  class="text-black-500 hover:text-cerulean-blue-600 transition-colors"
                  aria-label="GitHub"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://babakzy.com"
                  target="_blank"
                  rel="noopener"
                  class="text-sm text-cerulean-blue-600 hover:text-cerulean-blue-700 font-medium"
                >
                  babakzy.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-8 text-sm text-black-500 text-center">
          For legal inquiries, see our
          <NuxtLink to="/terms" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">Terms of Service</NuxtLink>
          or
          <NuxtLink to="/privacy" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">Privacy Policy</NuxtLink>.
        </p>
      </div>
    </div>
</template>

<script setup>
usePageSeo({
  title: 'Contact Us',
  description:
    'Get in touch with the Linkvoices team for support, feedback, or business inquiries. We help freelancers and businesses send cryptocurrency invoices worldwide.',
  path: '/contact',
})
</script>

<style lang="scss" scoped>

</style>
