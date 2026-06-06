<template>
  <Header />
  <main>
    <!-- Hero -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="flex flex-wrap items-center justify-around hero2bg min-h-[200px] md:min-h-[360px]">
        <div class="basis-full md:basis-9/12 text-center relative px-4">
          <h1 class="block text-4xl z-10 md:text-7xl font-bold text-cerulean-blue-900 capitalize leading-tight">
            Send Crypto Invoices to International Clients
            <br />
            <span class="inline-block mt-4 md:mt-6 px-6 py-2 md:px-10 md:py-3 bg-cerulean-blue-900 text-spring-wood-50 rounded-full text-2xl md:text-4xl font-bold tracking-tight">
              No Bank Needed
            </span>
          </h1>
        </div>
      </div>
      <p class="text-cerulean-blue-800 text-base md:text-lg font-medium text-center mt-8 max-w-2xl mx-auto leading-relaxed px-4">
        Invoice clients worldwide with crypto. No banks, no borders, just instant payments to your wallet.
      </p>
      <div class="text-center mt-10">
        <NuxtLink
          to="/login"
          class="btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 text-cerulean-blue-50 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Create Your Free Invoice
        </NuxtLink>
      </div>
      <p class="text-gray-600 text-sm md:text-base text-center mt-6 px-4">
        Free for individuals · No sign-up required · Direct to your wallet
      </p>
    </section>

    <!-- Problem -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center md:basis-5/6 lg:basis-2/3">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8">
             International Invoice and Payment Restrictions
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              You close a project with a client in Berlin. They're ready to pay. You send your bank details and wait.
            </p>
            <p>
              Three days pass. The wire clears, but $47 vanished in fees. Your client paid $500. You received $453.
            </p>
            <p>
              If you're working from Lagos, Manila, or Buenos Aires, the math gets worse. Banks reject the transfer
              entirely, or hold it for "compliance review" while your rent is due. Traditional payment rails weren't
              built for borderless work—they were built to extract fees at every border crossing.
            </p>
            <p class="text-cerulean-blue-900 font-medium">
              High fees. Delayed settlements. Geographic restrictions. You're doing the work. The system is taking the cut.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution -->
    <section class="bg-cerulean-blue-700 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="flex flex-wrap items-center justify-center gap-12">
          <div class="basis-full lg:basis-1/2">
            <h2 class="text-3xl md:text-5xl font-bold text-spring-wood-50 capitalize mb-6">
              Structured Crypto Invoices Clients Can Pay
            </h2>
            <div class="space-y-5 text-spring-wood-100 text-base md:text-lg leading-relaxed">
              <p>
                LinkVoices turns crypto into structured invoices your clients actually understand.
              </p>
              <p>
                You create an invoice in 90 seconds—add line items, choose a cryptocurrency, set a due date. Your
                client receives a clean payment page with a QR code and wallet address. No confusing "send 0.0234 BTC
                to this string of characters" messages. No friction.
              </p>
              <p>
                Payment lands directly in your wallet within minutes. Not your LinkVoices account—your wallet. We don't
                custody funds or add withdrawal delays. The blockchain confirms, you're paid, you move on.
              </p>
              <p>
                <strong class="text-spring-wood-50">Zero platform fees for individuals.</strong>
                You pay only the network transaction cost—typically $0.50 to $15 depending on congestion. Compare that
                to the 3–6.4% traditional processors charge, and you're saving hundreds per invoice.
              </p>
              <p>
                Works anywhere you have internet. No bank account required. No "sorry, your country isn't supported."
                If you control a wallet, you can invoice.
              </p>
            </div>
            <div class="mt-10">
              <NuxtLink
                to="/login"
                class="btn bg-spring-wood-50 hover:bg-white border-spring-wood-200 text-cerulean-blue-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Start Free Today
              </NuxtLink>
            </div>
          </div>
          <div class="basis-full lg:basis-2/5">
            <img
              src="@/assets/images/hero-crypro-invoice.png"
              alt="Freelancer receiving crypto invoice payments from international clients"
              class="w-full h-auto rounded-lg"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center mb-14">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            Invoice, Share, Get Paid in Minutes
          </h2>
        </div>
        <div class="basis-full md:basis-5/6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="bg-spring-wood-50 rounded-xl p-7"
          >
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-md bg-cerulean-blue-600 text-cerulean-blue-50 font-bold mb-4">
              {{ index + 1 }}
            </span>
            <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-3 capitalize">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
        <div class="basis-full text-center mt-14">
          <NuxtLink
            to="/login"
            class="btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 text-cerulean-blue-50 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Generate Your Invoice Now
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize text-center mb-14">
          Freelancers, Agencies &amp; Remote Workers
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="useCase in useCases"
            :key="useCase.title"
            class="bg-white rounded-lg border border-gray-200 shadow-sm p-7"
          >
            <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-4 capitalize">
              {{ useCase.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              {{ useCase.body }}
            </p>
            <p class="text-cerulean-blue-800 text-sm font-medium">
              <span class="text-cerulean-blue-900">Your outcome:</span>
              {{ useCase.outcome }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            LinkVoices vs BitPay, NOWPayments &amp; Bank Wires
          </h2>
        </div>
        <div class="basis-full md:basis-5/6 overflow-x-auto">
          <table class="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <thead>
              <tr class="bg-cerulean-blue-50">
                <th
                  v-for="header in comparisonHeaders"
                  :key="header"
                  class="p-4 text-left text-cerulean-blue-900 font-semibold"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in comparisonRows"
                :key="row.feature"
                class="border-b border-spring-wood-200 last:border-b-0"
              >
                <td class="p-4 font-semibold text-cerulean-blue-900">{{ row.feature }}</td>
                <td class="p-4 text-gray-600">{{ row.linkvoices }}</td>
                <td class="p-4 text-gray-600">{{ row.bitpay }}</td>
                <td class="p-4 text-gray-600">{{ row.nowpayments }}</td>
                <td class="p-4 text-gray-600">{{ row.bankWire }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Why Different -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8">
            No Custody, No KYC, No Platform Fees
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Most crypto payment tools force you to choose: either deal with messy wallet-to-wallet transfers your
              clients don't understand, or use a complex accounting platform built for enterprises. LinkVoices gives you
              <strong class="text-cerulean-blue-900">structured invoicing that speaks crypto natively</strong>—your
              client sees a clean payment page with QR codes and wallet addresses, while you track everything from a
              simple dashboard.
            </p>
            <p>
              <strong class="text-cerulean-blue-900">You're not geo-restricted.</strong>
              No bank account requirements, no "sorry, your country isn't supported" messages. If you have a wallet,
              you can invoice. Which means a freelancer in Lagos can bill a client in Berlin as easily as someone in
              San Francisco.
            </p>
            <p>
              <strong class="text-cerulean-blue-900">Direct wallet integration</strong>—we don't custody your funds or
              add withdrawal delays. Payments land in your wallet immediately. You control your money from the first
              confirmation.
            </p>
            <p>
              <strong class="text-cerulean-blue-900">Built by a solo maker, not a fintech committee.</strong>
              That means fast iteration and features that solve real builder problems—not compliance theater or
              enterprise bloat. It also means we're not trying to be your tax software or accounting system. If you
              need automated tax reporting or complex multi-entity books, you'll need to pair LinkVoices with another
              tool.
            </p>
            <p>
              The trade-off is intentional: we stay minimal so you can move fast. Create an invoice, share the link,
              get paid in crypto. That's it.
            </p>
          </div>
          <div class="mt-10">
            <NuxtLink
              to="/login"
              class="btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 text-cerulean-blue-50 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Try LinkVoices Free
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize text-center mb-14">
          Freelancers Across Three Continents
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <blockquote
            v-for="testimonial in testimonials"
            :key="testimonial.author"
            class="bg-spring-wood-50 rounded-xl p-7"
          >
            <p class="text-gray-600 leading-relaxed italic mb-4">
              "{{ testimonial.quote }}"
            </p>
            <footer class="text-cerulean-blue-900 font-medium text-sm">
              — {{ testimonial.author }}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-10">
            Crypto Invoicing FAQ
          </h2>
          <div class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="faq.question"
              class="bg-spring-wood-100 rounded overflow-hidden"
            >
              <button
                type="button"
                class="w-full p-5 text-left flex justify-between items-center gap-4"
                @click="toggleFaq(index)"
              >
                <h3 class="text-lg md:text-xl font-medium text-cerulean-blue-900">
                  {{ faq.question }}
                </h3>
                <span
                  class="transform transition-transform shrink-0 text-cerulean-blue-800"
                  :class="{ 'rotate-180': activeFaq === index }"
                >
                  ▼
                </span>
              </button>
              <div v-show="activeFaq === index" class="px-5 pb-5">
                <p class="text-gray-600 leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-cerulean-blue-700 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-spring-wood-50 capitalize mb-6">
          Create Your First International Crypto Invoice
        </h2>
        <p class="text-spring-wood-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          No fees. No banks. No borders. Create your first invoice in minutes and get paid directly to your wallet.
        </p>
        <NuxtLink
          to="/login"
          class="btn bg-spring-wood-50 hover:bg-white border-spring-wood-200 text-cerulean-blue-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Get Started Free
        </NuxtLink>
        <p class="text-spring-wood-200 text-sm mt-6">
          Free for individuals · No credit card required · Direct wallet payments
        </p>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
definePageMeta({
  layout: false,
})

const config = useRuntimeConfig()
const siteUrl = (config.public.url || 'https://linkvoices.com').replace(/\/$/, '')
const pagePath = '/send-crypto-invoices-international-clients'
const pageUrl = `${siteUrl}${pagePath}`

const pageTitle = 'Send Crypto Invoices to International Clients—No Bank Needed'
const pageDescription =
  'Invoice international clients with crypto—no bank account required. Zero platform fees, direct wallet payouts, and settlements in minutes. BTC, ETH, USDT, and DAI supported.'

usePageSeo({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  appendSiteName: false,
})

const activeFaq = ref(null)

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const steps = [
  {
    title: 'Create your invoice in seconds',
    description: 'Add client details, line items, and choose BTC, ETH, USDT, or DAI.',
  },
  {
    title: 'Share the payment link',
    description: 'Your client sees a professional page with QR code and wallet address—no crypto knowledge required.',
  },
  {
    title: 'Get paid directly to your wallet',
    description: 'Funds arrive in minutes. Track status from your dashboard.',
  },
]

const useCases = [
  {
    title: 'Freelancers: Stop Losing Money to Fees',
    body:
      'You quote $1,200 for a logo redesign. With PayPal or Wise, you lose $50–$76 in fees. With LinkVoices, you receive $1,200 minus a $2 network fee. That\'s $48–$74 back in your pocket—every single invoice.',
    outcome: 'Instant settlement, full payment amount, no intermediaries taking a cut.',
  },
  {
    title: 'Agencies: Manage Global Clients Without the Headache',
    body:
      'You\'re running five projects across three continents. Traditional invoicing means tracking five different payment timelines, currency conversions, and fee structures. LinkVoices gives you one dashboard, one process, instant confirmation across all clients.',
    outcome: 'Simplified billing, faster cash flow, predictable costs.',
  },
  {
    title: 'Remote Workers: Access Reliable Payments Anywhere',
    body:
      'You\'re based in a region where banks are slow, expensive, or outright hostile to international transfers. Crypto doesn\'t care about your zip code. LinkVoices lets you invoice a client in Toronto from Nairobi with the same speed and cost as someone in New York.',
    outcome: 'Borderless transactions, no bank dependency, reliable payment access.',
  },
]

const comparisonHeaders = ['Feature', 'LinkVoices', 'BitPay', 'NOWPayments', 'Bank Wire']

const comparisonRows = [
  {
    feature: 'Platform fee',
    linkvoices: '$0 for individuals',
    bitpay: '1% + processing',
    nowpayments: '0.5–1%',
    bankWire: '$25–$50 per wire',
  },
  {
    feature: 'Settlement time',
    linkvoices: 'Minutes',
    bitpay: '1–2 business days',
    nowpayments: 'Minutes',
    bankWire: '3–5 business days',
  },
  {
    feature: 'KYC required',
    linkvoices: 'No',
    bitpay: 'Yes',
    nowpayments: 'Yes',
    bankWire: 'Yes',
  },
  {
    feature: 'Supported currencies',
    linkvoices: 'BTC, ETH, USDT, DAI',
    bitpay: '10+ cryptos',
    nowpayments: '200+ cryptos',
    bankWire: 'Fiat only',
  },
  {
    feature: 'Direct wallet payout',
    linkvoices: 'Yes',
    bitpay: 'Optional',
    nowpayments: 'Yes',
    bankWire: 'N/A',
  },
  {
    feature: 'Geographic restrictions',
    linkvoices: 'None',
    bitpay: 'Some regions excluded',
    nowpayments: 'Some regions excluded',
    bankWire: 'Many regions excluded',
  },
]

const testimonials = [
  {
    quote:
      'LinkVoices saved me $340 in fees last month alone. I was using Wise for international clients and watching 4% disappear every invoice. Now I keep the full amount.',
    author: 'Sarah K., Freelance Developer, Philippines',
  },
  {
    quote:
      'My clients don\'t even realize they\'re paying with crypto—the invoice page looks just like any other payment link. Setup took me five minutes.',
    author: 'Marcus T., Design Agency Owner, Germany',
  },
  {
    quote:
      'I\'m in Argentina. Banks here make international transfers a nightmare. LinkVoices let me bypass all of that. I invoice, client pays, I have USDT in my wallet in ten minutes.',
    author: 'Elena R., Content Strategist, Buenos Aires',
  },
]

const faqs = [
  {
    question: 'How do I create a crypto invoice with LinkVoices?',
    answer:
      'Click "Create Invoice," add your client\'s name, line items, and amount. Choose BTC, ETH, USDT, or DAI. Set a due date. Click generate. You\'ll get a shareable payment link immediately—no technical setup, no wallet connection required until your client pays.',
  },
  {
    question: 'Are there any fees for using LinkVoices?',
    answer:
      'Zero platform fees for individuals. You only pay the blockchain network fee when your client sends payment—typically $0.50 to $15 depending on the cryptocurrency and network congestion. We don\'t take a percentage. We don\'t charge monthly subscriptions. You keep what you invoice.',
  },
  {
    question: 'What cryptocurrencies does LinkVoices support?',
    answer:
      'Bitcoin (BTC), Ethereum (ETH), USDT on Tron, and DAI on Ethereum. We prioritize the most widely held and liquid cryptocurrencies to ensure your clients can pay easily and you can convert or hold without friction.',
  },
  {
    question: 'Can I use LinkVoices without a bank account?',
    answer:
      'Yes. LinkVoices requires only a crypto wallet—Metamask, Trust Wallet, Ledger, whatever you prefer. Payments go directly to your wallet address. No bank account, no KYC, no intermediary holding your funds.',
  },
  {
    question: 'How fast can I receive payments using crypto invoices?',
    answer:
      'Bitcoin confirmations take 10–30 minutes. Ethereum, USDT, and DAI settle in 1–5 minutes depending on network traffic. Compare that to 3–5 business days for international bank wires. You can see pending transactions in real-time and know exactly when funds arrive.',
  },
  {
    question: 'How does LinkVoices ensure payment security?',
    answer:
      'Blockchain transactions are cryptographically secured and immutable—once confirmed, they cannot be reversed or altered. This eliminates chargeback fraud entirely. LinkVoices never holds your funds, so there\'s no custodial risk. Your client sends directly to your wallet. The blockchain verifies. You control the keys.',
  },
  {
    question: 'What\'s the difference between LinkVoices and other crypto invoicing platforms?',
    answer:
      'LinkVoices is free for individuals, requires no KYC, and pays directly to your wallet with no withdrawal process. BitPay charges 1% and requires identity verification. NOWPayments supports more tokens but charges processing fees. CoinsBank adds enterprise features you don\'t need. LinkVoices stays focused: create invoice, share link, get paid.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I create a crypto invoice with LinkVoices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click "Create Invoice," add your client\'s name, line items, and amount. Choose BTC, ETH, USDT, or DAI. Set a due date. Click generate. You\'ll get a shareable payment link immediately—no technical setup, no wallet connection required until your client pays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any fees for using LinkVoices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zero platform fees for individuals. You only pay the blockchain network fee when your client sends payment—typically $0.50 to $15 depending on the cryptocurrency and network congestion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use LinkVoices without a bank account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. LinkVoices requires only a crypto wallet. Payments go directly to your wallet address. No bank account, no KYC, no intermediary holding your funds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can I receive payments using crypto invoices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bitcoin confirmations take 10–30 minutes. Ethereum, USDT, and DAI settle in 1–5 minutes depending on network traffic. Compare that to 3–5 business days for international bank wires.',
      },
    },
  ],
}

useHead({
  meta: [
    {
      name: 'keywords',
      content:
        'crypto invoice international clients, send crypto invoice abroad, international crypto payments, freelance crypto invoicing, no bank crypto payments, bitcoin invoice freelancer',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Linkvoices',
          url: siteUrl,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema),
    },
  ],
})
</script>

<style lang="scss" scoped>
.hero2bg {
  background-image: url('@/assets/images/hero2bg.svg');
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
