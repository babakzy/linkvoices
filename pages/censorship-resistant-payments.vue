<template>
  <Header />
  <main>
    <!-- Hero -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="flex flex-wrap items-center justify-around hero2bg min-h-[200px] md:min-h-[360px]">
        <div class="basis-full md:basis-9/12 text-center relative px-4">
          <h1 class="block text-4xl z-10 md:text-7xl font-bold text-cerulean-blue-900 capitalize leading-tight">
            Censorship-Resistant Payments
            <br />
            <span class="inline-block mt-4 md:mt-6 px-6 py-2 md:px-10 md:py-3 bg-cerulean-blue-900 text-spring-wood-50 rounded-full text-2xl md:text-4xl font-bold tracking-tight normal-case">
              Free From Banned Accounts
            </span>
          </h1>
        </div>
      </div>
      <p class="text-cerulean-blue-800 text-base md:text-lg font-medium text-center mt-8 max-w-3xl mx-auto leading-relaxed px-4">
        PayPal froze your account. Stripe banned your business. Traditional processors charge 3%+ per transaction
        and hold your money for weeks. Crypto invoicing puts you in control — no middleman to cut you off.
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
            The Problem With Traditional Payment Systems
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-left">
            <p>
              You send an invoice. The client pays. Then PayPal freezes your account for "suspicious activity."
            </p>
            <p>
              Or Stripe decides your business is "high-risk" and terminates your merchant account overnight. Your
              money sits in limbo for 90 days while bills pile up.
            </p>
            <p>
              Traditional payment processors act as gatekeepers. They decide who gets paid, when, and under what
              conditions. One algorithm flags your account and you're locked out — no appeal, no explanation, no
              access to funds you already earned.
            </p>
            <p>
              The fees make it worse. PayPal takes 2.9% + $0.30 per transaction. Stripe adds invoicing fees on top.
              Foreign exchange markups hit 2.5–4%. A business processing $5 million annually loses $145,000 to fees
              alone.
            </p>
            <p class="text-cerulean-blue-900 font-medium">
              You work. You invoice. But getting paid shouldn't require permission from a company that can cut you
              off without warning.
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
              How Free &amp; Decentralized Payments Work
            </h2>
            <div class="space-y-5 text-spring-wood-100 text-base md:text-lg leading-relaxed">
              <p>
                Censorship-resistant payments remove the middleman entirely. Instead of routing money through banks
                and payment processors that can freeze accounts, crypto payments settle directly on public blockchains.
              </p>
              <p>
                You generate an invoice with a wallet address. Your client sends payment. The blockchain validates
                the transaction. Money arrives in your wallet within minutes — no bank approval, no account holds,
                no geographic restrictions.
              </p>
              <p>
                Once confirmed, transactions are irreversible — no chargebacks, no fraud disputes, no 90-day holds.
                You control the wallet. You control the funds. No company can intervene.
              </p>
              <p>
                Stablecoins like USDC eliminate price volatility. Network fees replace percentage-based charges —
                a $10,000 invoice costs $2–15 to process, not $290+ like PayPal.
              </p>
            </div>
            <ul class="mt-8 space-y-3">
              <li
                v-for="trait in keyTraits"
                :key="trait.title"
                class="flex gap-3 text-spring-wood-100"
              >
                <span class="text-spring-wood-50 font-bold shrink-0">✓</span>
                <span>
                  <strong class="text-spring-wood-50">{{ trait.title }}:</strong>
                  {{ trait.description }}
                </span>
              </li>
            </ul>
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
              src="@/assets/images/free-censorship.png"
              alt="Free from censorship and control in payments — TP-01 pocket transmitter showing payment sent with no censor, no control, only freedom"
              class="w-full h-auto rounded-lg"
              width="1408"
              height="768"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Why Censorship Resistance Matters -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center mb-14">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            Why Censorship Resistance Matters
          </h2>
          <p class="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            Free from restrictions — whether you're in a blocked country, a high-risk industry, or simply tired of
            frozen accounts.
          </p>
        </div>
        <div class="basis-full md:basis-5/6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="reason in whyItMatters"
            :key="reason.title"
            class="bg-spring-wood-50 rounded-xl p-7"
          >
            <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-3 capitalize">
              {{ reason.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ reason.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Get Started -->
    <section id="how-it-works" class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            How to Get Rid of Payment Censorship
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="bg-white rounded-xl border border-gray-200 shadow-sm p-7"
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
        <div class="text-center mt-14">
          <NuxtLink
            to="/login"
            class="btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 text-cerulean-blue-50 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create Your First Invoice
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Practical Implementation -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8">
            Practical Implementation: Crypto Invoicing Tools
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Raw wallet addresses and blockchain explorers aren't user-friendly for business invoicing. Professional
              crypto invoicing tools bridge this gap with invoice generation, payment links with QR codes, automatic
              on-chain status tracking, multi-currency support, and dashboard views.
            </p>
            <p>
              <strong class="text-cerulean-blue-900">LinkVoices</strong> is one example of this approach. You create
              an invoice in 60 seconds, share the payment link, and funds arrive directly in your wallet. The tool
              tracks invoice status automatically by monitoring the blockchain.
            </p>
            <p>
              Other options include BTCPay Server (self-hosted, more technical), Coinbase Commerce (custodial, easier
              setup), and Request Network (decentralized invoicing protocol). The key is finding a tool that maintains
              censorship resistance — payments go directly to your wallet, not through a company's custodial account.
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

    <!-- Comparison -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            Comparing Payment Methods
          </h2>
          <p class="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            A $10,000 invoice costs $10–15 with crypto invoicing, $290+ with PayPal, $305+ with Stripe, and $300
            with Payoneer.
          </p>
        </div>
        <div class="overflow-x-auto max-w-6xl mx-auto">
          <table class="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <thead>
              <tr class="bg-cerulean-blue-50">
                <th
                  v-for="header in comparisonHeaders"
                  :key="header"
                  class="p-4 text-left text-cerulean-blue-900 font-semibold whitespace-nowrap"
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
                <td class="p-4 font-semibold text-cerulean-blue-900 whitespace-nowrap">{{ row.feature }}</td>
                <td class="p-4 text-gray-600">{{ row.crypto }}</td>
                <td class="p-4 text-gray-600">{{ row.paypal }}</td>
                <td class="p-4 text-gray-600">{{ row.stripe }}</td>
                <td class="p-4 text-gray-600">{{ row.payoneer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize text-center mb-14">
        Real-World Use Cases
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="useCase in useCases"
          :key="useCase.title"
          class="bg-spring-wood-50 rounded-lg border border-gray-200 shadow-sm p-7"
        >
          <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-4 capitalize">
            {{ useCase.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ useCase.body }}
          </p>
        </div>
      </div>
    </section>

    <!-- Risks -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize text-center mb-14">
            Risks and Considerations
          </h2>
          <div class="space-y-6">
            <div
              v-for="risk in risks"
              :key="risk.title"
              class="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 class="text-lg font-semibold text-cerulean-blue-900 mb-2">
                {{ risk.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ risk.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6 lg:basis-2/3">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8 text-center">
            The Future of Payments
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Censorship-resistant payments represent a fundamental shift in how money moves globally. As traditional
              financial systems become more restrictive — more KYC requirements, more banned industries, more frozen
              accounts — the demand for permissionless alternatives grows.
            </p>
            <p>
              Stablecoin adoption is accelerating. USDC transaction volume exceeded $10 trillion in 2024. Lightning
              Network and Layer 2 solutions are making Bitcoin and Ethereum payments faster and cheaper. What once
              cost $50 in network fees now costs $0.50.
            </p>
            <p class="text-cerulean-blue-900 font-medium text-center text-xl mt-8">
              No middleman. No permission. No censorship.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-10">
            Censorship-Resistant Payments FAQ
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
          Take Control of Your Payments Today
        </h2>
        <p class="text-spring-wood-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          No account to ban. No processor to freeze your funds. Create your first crypto invoice in minutes and
          get paid directly to your wallet.
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
const pagePath = '/censorship-resistant-payments'
const pageUrl = `${siteUrl}${pagePath}`

const pageTitle = 'Censorship-Resistant Payments: Free From Banned Accounts'
const pageDescription =
  'PayPal or Stripe banned? Use censorship-resistant Payments like LinkVoices to get paid without middlemen, account freezes, Direct wallet payments.'
const pageImageUrl = `${siteUrl}/images/free-censorship-og.jpg`

usePageSeo({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  ogImage: '/images/free-censorship-og.jpg',
  appendSiteName: false,
})

const activeFaq = ref(null)

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const keyTraits = [
  {
    title: 'Permissionless',
    description: 'Anyone with a wallet can send or receive payments. No account approval or business verification.',
  },
  {
    title: 'Borderless',
    description: 'Works in every country. No unsupported regions or geographic compliance restrictions.',
  },
  {
    title: 'Irreversible',
    description: 'Once confirmed on the blockchain, transactions cannot be reversed by third parties.',
  },
  {
    title: 'Transparent',
    description: 'All transactions are recorded on public blockchains. Anyone can verify payment history.',
  },
  {
    title: 'Self-custodial',
    description: 'You hold your private keys. No bank, government, or processor can access your funds.',
  },
]

const whyItMatters = [
  {
    title: 'Freelancers in Restricted Regions',
    body:
      'Traditional processors don\'t operate in many countries. If you\'re in Nigeria, Pakistan, or Venezuela, getting a PayPal or Stripe account is difficult or impossible. A wallet address in Lagos works the same as one in London.',
  },
  {
    title: 'Controversial Industries',
    body:
      'Payment processors maintain lists of "high-risk" industries — adult content, cannabis, firearms, political campaigns. Even legal businesses get banned. The blockchain doesn\'t care what you sell.',
  },
  {
    title: 'Anyone Who\'s Been Deplatformed',
    body:
      'One customer complaint. One algorithmic flag. One policy change. Your account gets suspended and your income stops overnight. With censorship-resistant payments, there\'s no account to suspend.',
  },
  {
    title: 'Financial Privacy',
    body:
      'Traditional processors track every transaction and report to governments. Crypto payments offer pseudonymity — transactions are public, but wallet addresses aren\'t automatically linked to your identity.',
  },
]

const steps = [
  {
    title: 'Set up a crypto wallet',
    description:
      'Choose a self-custodial wallet where you control the private keys — MetaMask, Trust Wallet, or a hardware wallet like Ledger. Never use exchange wallets for business payments.',
  },
  {
    title: 'Choose your cryptocurrency',
    description:
      'Stablecoins like USDC or USDT are ideal for invoicing — they maintain a 1:1 peg to the U.S. dollar, eliminating price volatility.',
  },
  {
    title: 'Select an invoicing tool',
    description:
      'Use a crypto invoicing platform that generates payment links and tracks status automatically. Look for tools that send payments directly to your wallet.',
  },
  {
    title: 'Create your first invoice',
    description:
      'Add client details, line items, amount, and cryptocurrency. Generate the payment link and share it — your client sees a professional page with QR code and wallet address.',
  },
  {
    title: 'Monitor payment status',
    description:
      'Most invoicing tools automatically detect when payment arrives on-chain and update the invoice status. You can also verify transactions in your wallet or on a blockchain explorer.',
  },
  {
    title: 'Convert to fiat if needed',
    description:
      'Transfer crypto to an exchange and sell for fiat on your schedule. Timing conversion strategically can minimize tax impact and maximize value.',
  },
]

const comparisonHeaders = ['Feature', 'Crypto Invoicing', 'PayPal', 'Stripe', 'Payoneer']

const comparisonRows = [
  {
    feature: 'Transaction fee',
    crypto: '$2–15 network fee',
    paypal: '2.9% + $0.30',
    stripe: '2.9% + $0.30 + 0.5% invoicing',
    payoneer: '3%',
  },
  {
    feature: 'Account freezes',
    crypto: 'Impossible',
    paypal: 'Common',
    stripe: 'Common',
    payoneer: 'Occasional',
  },
  {
    feature: 'Geographic restrictions',
    crypto: 'None',
    paypal: '200+ countries blocked',
    stripe: 'Limited availability',
    payoneer: '150+ countries',
  },
  {
    feature: 'Settlement time',
    crypto: '2–15 minutes',
    paypal: 'Instant to 3 days',
    stripe: '2–7 days',
    payoneer: '2–5 business days',
  },
  {
    feature: 'Chargebacks',
    crypto: 'None (irreversible)',
    paypal: 'Yes',
    stripe: 'Yes',
    payoneer: 'Yes',
  },
  {
    feature: 'Account approval',
    crypto: 'Not required',
    paypal: 'Required',
    stripe: 'Required',
    payoneer: 'Required',
  },
  {
    feature: 'Holds on funds',
    crypto: 'Never',
    paypal: 'Up to 180 days',
    stripe: 'Up to 90 days',
    payoneer: 'Up to 30 days',
  },
  {
    feature: 'Censorship resistance',
    crypto: 'Yes',
    paypal: 'No',
    stripe: 'No',
    payoneer: 'No',
  },
]

const useCases = [
  {
    title: 'Freelancers With Banned Accounts',
    body:
      'Your PayPal account got flagged and now you can\'t receive client payments. Crypto invoicing lets you bill through blockchain payments — no account to ban, no permission needed.',
  },
  {
    title: 'Agencies Serving International Clients',
    body:
      'Currency conversion eats 4% of every invoice. With crypto invoicing, everyone pays in USDC — you receive the full amount and convert once on your terms.',
  },
  {
    title: 'High-Volume Businesses Cutting Costs',
    body:
      'Processing $5 million annually through Stripe costs $145,000 in fees. Switch to crypto invoicing and pay $5,000–10,000 in network fees instead.',
  },
  {
    title: 'Sellers in Restricted Regions',
    body:
      'Traditional processors don\'t support your country. Crypto invoicing only requires a wallet — available globally, no bank account needed.',
  },
  {
    title: 'Content Creators Facing Deplatforming',
    body:
      'You create content that payment processors consider "high-risk." Censorship-resistant payments ensure you can always receive payment, regardless of industry trends.',
  },
  {
    title: 'Political Campaigns & Nonprofits',
    body:
      'Controversial causes get banned from traditional payment processors. Crypto donations are censorship-resistant — supporters can contribute regardless of political climate.',
  },
]

const risks = [
  {
    title: 'Irreversibility cuts both ways',
    body:
      'Crypto transactions can\'t be reversed by third parties — but they also can\'t be reversed by you. Send payment to the wrong address and it\'s gone forever. Always double-check wallet addresses.',
  },
  {
    title: 'Price volatility affects non-stablecoin payments',
    body:
      'Bitcoin can swing 5–10% daily. If you invoice in BTC and don\'t convert immediately, your $10,000 invoice might be worth $9,000 tomorrow. Use stablecoins like USDC to avoid this risk.',
  },
  {
    title: 'Private key security is your responsibility',
    body:
      'Your private keys control your wallet. Lose them and you lose access to funds permanently. Store them securely, use hardware wallets for large amounts, and never share them.',
  },
  {
    title: 'Tax reporting is more complex',
    body:
      'Crypto payments are taxable events in most countries. Track fair market value at receipt and report as income. Conversion to fiat is a separate taxable event.',
  },
  {
    title: 'Regulatory uncertainty',
    body:
      'Crypto regulations vary by country and change frequently. Some jurisdictions restrict crypto businesses or require licensing. Research your local laws before accepting crypto at scale.',
  },
  {
    title: 'Client education may be required',
    body:
      'Not all clients understand how to send crypto payments. Provide simple instructions or offer traditional payment methods alongside crypto for clients who aren\'t ready to switch.',
  },
]

const faqs = [
  {
    question: 'What makes a payment truly censorship-resistant?',
    answer:
      'A payment is censorship-resistant when no third party can block, reverse, or freeze it. This requires settlement on a public blockchain, self-custodial wallets where you control private keys, and no intermediary holding funds. If a company can freeze your account, it\'s not censorship-resistant.',
  },
  {
    question: 'How do crypto invoicing fees compare to PayPal and Stripe?',
    answer:
      'Crypto invoicing charges network fees instead of percentage-based fees. A $10,000 invoice costs $2–15 in network fees, compared to $290+ with PayPal or $305+ with Stripe. High-volume businesses save thousands monthly.',
  },
  {
    question: 'Can I use censorship-resistant payments if my PayPal account is banned?',
    answer:
      'Yes. Crypto payments don\'t require an account that can be banned. You create invoices using your wallet address. As long as you have a wallet, you can invoice clients and receive payments — no approval process required.',
  },
  {
    question: 'What cryptocurrencies work best for invoicing?',
    answer:
      'Stablecoins like USDC and USDT are ideal because they maintain a 1:1 peg to the U.S. dollar, eliminating price volatility. Bitcoin and Ethereum work too, but convert quickly to avoid price swings.',
  },
  {
    question: 'Are crypto payments legal?',
    answer:
      'In most countries, yes. Crypto payments are legal in the U.S., EU, UK, Canada, and many other jurisdictions. Some countries restrict or ban crypto. Research your local laws before accepting crypto payments at scale.',
  },
  {
    question: 'What are the tax implications of accepting crypto payments?',
    answer:
      'Crypto payments are taxable income in most countries. You report the fair market value at the time of receipt. Converting crypto to fiat is a separate taxable event. Keep detailed records or use crypto tax software.',
  },
  {
    question: 'How do I protect my crypto wallet from theft?',
    answer:
      'Use a hardware wallet for large amounts. Enable two-factor authentication on software wallets. Never share your private keys or seed phrase. For business accounts, consider multi-signature wallets requiring multiple approvals.',
  },
  {
    question: 'What if my client doesn\'t know how to use crypto?',
    answer:
      'Provide simple instructions: download a wallet app, buy the required cryptocurrency on an exchange, and send payment by scanning the QR code on your invoice. Alternatively, offer traditional payment methods alongside crypto.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

useHead({
  meta: [
    {
      name: 'keywords',
      content:
        'censorship resistant payments, banned PayPal account, Stripe account banned, crypto invoicing, self-custodial payments, permissionless payments, PayPal frozen account alternative, crypto invoice freelancer, decentralized payments',
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
        image: pageImageUrl,
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Linkvoices',
          url: siteUrl,
        },
        about: {
          '@type': 'Thing',
          name: 'Censorship-Resistant Payments',
          description:
            'Permissionless crypto payment methods that settle directly on public blockchains without intermediaries that can freeze accounts.',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        url: pageUrl,
        image: pageImageUrl,
        author: {
          '@type': 'Organization',
          name: 'Linkvoices',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Linkvoices',
          url: siteUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        keywords:
          'censorship resistant payments, crypto invoicing, PayPal banned, Stripe frozen, self-custodial, permissionless payments',
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
