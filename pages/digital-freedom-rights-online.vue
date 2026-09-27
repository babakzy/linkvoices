<template>
  <Header />
  <main>
    <!-- Hero -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="flex flex-wrap items-center justify-around hero2bg min-h-[200px] md:min-h-[360px]">
        <div class="basis-full md:basis-9/12 text-center relative px-4">
          <h1 class="block text-4xl z-10 md:text-7xl font-bold text-cerulean-blue-900 capitalize leading-tight">
            Digital Freedom
            <br />
            <span class="inline-block mt-4 md:mt-6 px-6 py-2 md:px-10 md:py-3 bg-cerulean-blue-900 text-spring-wood-50 rounded-full text-2xl md:text-4xl font-bold tracking-tight normal-case">
              Know Your Digital Rights Online
            </span>
          </h1>
        </div>
      </div>
      <p class="text-cerulean-blue-800 text-base md:text-lg font-medium text-center mt-8 max-w-3xl mx-auto leading-relaxed px-4">
        Digital rights cover online privacy, freedom of expression, and access to digital infrastructure.
        If you invoice across borders, receive crypto payments, or run remote operations, your income
        depends on these rights staying intact.
      </p>
      <div class="text-center mt-10">
        <a
          href="#core-pillars"
          class="btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 text-cerulean-blue-50 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Explore Digital Rights
        </a>
      </div>
      <p class="text-gray-600 text-sm md:text-base text-center mt-6 px-4">
        Free educational resource · EU &amp; global frameworks · Practical steps for freelancers
      </p>
    </section>

    <!-- Definition -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center md:basis-5/6 lg:basis-2/3">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8">
            What Are Digital Rights?
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-left">
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Digital_rights"
                class="text-cerulean-blue-600 hover:text-cerulean-blue-800 underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia defines
              </a>
              <strong class="text-cerulean-blue-900"> digital rights</strong> as the human rights and legal
              rights that enable individuals to access, use, create, and publish digital media, as well as to
              access and use computers, electronic devices, and telecommunications networks.
            </p>
            <p>
              In practice, they cover three connected areas: online privacy, freedom of expression, and access
              to information and digital infrastructure. Invoice a client in Berlin from Nairobi, receive payment
              through a crypto network, or run your agency on a communication platform — each action depends on
              these rights being intact.
            </p>
            <p>
              The EU recognized this through the
              <a
                href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/europes-digital-decade-digital-targets-2030/digital-rights-and-principles_en"
                class="text-cerulean-blue-600 hover:text-cerulean-blue-800 underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                European Declaration on Digital Rights and Principles
              </a>
              — a benchmark for what a human-centered digital future should look like. Digital participation
              is no longer optional infrastructure. It's a right.
            </p>
            <p class="text-cerulean-blue-900 font-medium">
              That framing matters especially if you're building income outside traditional banking systems.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Pillars -->
    <section id="core-pillars" class="bg-cerulean-blue-700 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="flex flex-wrap items-center justify-center gap-12">
          <div class="basis-full lg:basis-1/2">
            <h2 class="text-3xl md:text-5xl font-bold text-spring-wood-50 capitalize mb-6">
              The Core Pillars of Digital Freedom
            </h2>
            <p class="text-spring-wood-100 text-base md:text-lg leading-relaxed mb-8">
              Digital freedom isn't one thing. It's three overlapping conditions — and if any one breaks down,
              the others weaken fast.
            </p>
            <ul class="space-y-6">
              <li
                v-for="pillar in corePillars"
                :key="pillar.title"
                class="text-spring-wood-100"
              >
                <h3 class="text-lg font-semibold text-spring-wood-50 mb-2">
                  {{ pillar.title }}
                </h3>
                <p class="leading-relaxed text-base md:text-lg">
                  {{ pillar.body }}
                </p>
              </li>
            </ul>
            <p class="text-spring-wood-100 text-base md:text-lg leading-relaxed mt-8">
              Access without privacy means you can connect but someone's watching. Expression without access
              means you can speak but no one hears you. All three have to hold at once.
            </p>
          </div>
          <div class="basis-full lg:basis-2/5">
            <img
              src="@/assets/2026-08-03-digital-freedom-rights-online/cover.jpg"
              alt="Digital freedom concept — padlock representing online privacy, access, and expression rights"
              class="w-full h-auto rounded-lg shadow-lg"
              width="1200"
              height="900"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Regulatory Approaches -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
          How Governments Are Codifying Digital Rights
        </h2>
        <p class="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
          Two major regulatory approaches are actively shaping how businesses operate online — and if you
          accept crypto payments or run a distributed team, both affect you.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        <div class="bg-spring-wood-50 rounded-xl p-7">
          <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-3">
            EU Digital Principles
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Signed in 2022, the EU commits to a digital transformation that places people at the center —
            from secure connectivity to fair algorithmic treatment. The Commission monitors compliance across
            member states, which means these principles have teeth, not just ink.
          </p>
        </div>
        <div class="bg-spring-wood-50 rounded-xl p-7">
          <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-3">
            U.S. Internet Freedom Policy
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Rather than a central rights framework, American policy promotes internet freedom as a vehicle for
            democratic values and economic growth — countering authoritarian governments that restrict
            information flow, with promotion-based rather than domestic enforcement structures.
          </p>
        </div>
      </div>
      <div class="overflow-x-auto max-w-6xl mx-auto">
        <table class="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
          <thead>
            <tr class="bg-cerulean-blue-50">
              <th
                v-for="header in regulatoryHeaders"
                :key="header"
                class="p-4 text-left text-cerulean-blue-900 font-semibold whitespace-nowrap"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in regulatoryRows"
              :key="row.dimension"
              class="border-b border-spring-wood-200 last:border-b-0"
            >
              <td class="p-4 font-semibold text-cerulean-blue-900 whitespace-nowrap">{{ row.dimension }}</td>
              <td class="p-4 text-gray-600">{{ row.eu }}</td>
              <td class="p-4 text-gray-600">{{ row.us }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Access Rights Debate -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8 text-center">
            Is Internet Access a Utility or a Privilege?
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              If society doesn't codify internet access as a right, it's not preserving neutrality — it's
              choosing to surrender freedom as life migrates online. Without guaranteed access, none of the
              other digital rights function in practice.
            </p>
            <p>
              The counter-argument is worth taking seriously: when access depends entirely on private
              infrastructure with no legal floor, companies set the terms. That's not freedom — it's a
              different set of gatekeepers.
            </p>
          </div>
          <ul class="mt-10 space-y-4">
            <li
              v-for="scenario in accessScenarios"
              :key="scenario"
              class="flex gap-3 text-gray-600"
            >
              <span class="text-cerulean-blue-700 font-bold shrink-0">→</span>
              <span>{{ scenario }}</span>
            </li>
          </ul>
          <p class="text-cerulean-blue-900 font-medium text-center text-lg mt-10">
            Using a crypto invoicing platform like LinkVoices bypasses the banking infrastructure that excludes
            people geographically or politically — turning an abstract rights debate into a working invoice in
            your client's inbox.
          </p>
        </div>
      </div>
    </section>

    <!-- Economic Freedom -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
          Digital Freedom as Economic Freedom
        </h2>
        <p class="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
          For a freelancer in Lagos or a remote developer in Tbilisi, digital freedom is the difference
          between having clients and not having them.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="activity in economicActivities"
          :key="activity.title"
          class="bg-spring-wood-50 rounded-xl border border-gray-200 p-7"
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-md bg-cerulean-blue-600 text-cerulean-blue-50 font-bold mb-4">
            {{ activity.number }}
          </span>
          <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-3">
            {{ activity.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ activity.body }}
          </p>
        </div>
      </div>
      <p class="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-12 text-center">
        Sending a crypto invoice and receiving payment globally is only possible when access, expression, and
        privacy all hold. Digital rights aren't the context for this kind of work — they're the foundation.
      </p>
    </section>

    <!-- Practical Steps -->
    <section id="how-it-works" class="bg-cerulean-blue-700 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold text-spring-wood-50 capitalize">
            Practical Steps to Protect Your Digital Rights
          </h2>
          <p class="text-spring-wood-100 text-base md:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            Losing digital rights shows up as a frozen payment account, a deleted business profile, or a
            blocked communication channel. Here's what you can do now.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div
            v-for="(step, index) in practicalSteps"
            :key="step.title"
            class="bg-white/10 rounded-xl p-6"
          >
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-md bg-spring-wood-50 text-cerulean-blue-900 font-bold mb-4">
              {{ index + 1 }}
            </span>
            <h3 class="text-lg font-semibold text-spring-wood-50 mb-2">
              {{ step.title }}
            </h3>
            <p class="text-spring-wood-100 leading-relaxed text-sm md:text-base">
              {{ step.body }}
            </p>
          </div>
        </div>
        <div class="overflow-x-auto max-w-4xl mx-auto mb-10">
          <table class="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <thead>
              <tr class="bg-cerulean-blue-50">
                <th
                  v-for="header in actionHeaders"
                  :key="header"
                  class="p-4 text-left text-cerulean-blue-900 font-semibold whitespace-nowrap"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="action in actionRows"
                :key="action.action"
                class="border-b border-spring-wood-200 last:border-b-0"
              >
                <td class="p-4 font-semibold text-cerulean-blue-900">{{ action.action }}</td>
                <td class="p-4 text-gray-600">{{ action.protects }}</td>
                <td class="p-4 text-gray-600 whitespace-nowrap">{{ action.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <NuxtLink
            to="/login"
            class="btn bg-spring-wood-50 hover:bg-white border-spring-wood-200 text-cerulean-blue-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Start With Crypto Invoicing
          </NuxtLink>
          <p class="text-spring-wood-200 text-sm mt-4">
            Start with payment diversification if you're a freelancer — payment access is where most people feel the loss first.
          </p>
        </div>
      </div>
    </section>

    <!-- Future -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8">
          The Future of Work Depends on an Open Internet
        </h2>
        <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-left">
          <p>
            Digital rights are the operating system for every freelancer invoicing a client across borders,
            every founder building on a decentralized protocol, every remote worker who depends on unrestricted
            access to global markets.
          </p>
          <p>
            In the 21st century, economic prosperity and free markets require an open internet. Closed networks
            damage capacity for economic growth and individual prosperity. The EU's codification of digital
            principles and the U.S. promotion of internet freedom aren't competing visions — they're two
            governments arriving at the same conclusion from different directions.
          </p>
          <p class="text-cerulean-blue-900 font-medium text-center text-xl mt-8">
            Building on open, decentralized protocols is both a business decision and a small act of preserving
            that openness. The professionals who defend their digital rights will build the most resilient,
            borderless businesses of the next decade.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-10">
            Digital Freedom FAQ
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
          Exercise Your Digital Rights Through Crypto Invoicing
        </h2>
        <p class="text-spring-wood-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          LinkVoices gives you a censorship-resistant payment rail that no institution can unilaterally shut
          off. Create an invoice in minutes, share it with your client, get paid in Bitcoin, Ethereum, USDT,
          or DAI — directly to your wallet.
        </p>
        <NuxtLink
          to="/login"
          class="btn bg-spring-wood-50 hover:bg-white border-spring-wood-200 text-cerulean-blue-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Create Your Free Invoice
        </NuxtLink>
        <p class="text-spring-wood-200 text-sm mt-6">
          Free for individuals · No bank required · Direct wallet payments
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
const pagePath = '/digital-freedom-rights-online'
const pageUrl = `${siteUrl}${pagePath}`

const pageTitle = 'Digital Freedom: Know Your Digital Rights Online'
const pageDescription =
  'Discover how digital rights protect your freedom online. Learn what\'s at stake for payments, privacy & expression. Read the full guide now.'
const pageImageUrl = `${siteUrl}/images/digital-freedom-og.jpg`

usePageSeo({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  ogImage: '/images/digital-freedom-og.jpg',
  appendSiteName: false,
})

const activeFaq = ref(null)

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const corePillars = [
  {
    title: 'Access',
    body:
      'Unrestricted connection to the internet and its information, markets, and tools. For a freelancer or founder, your ability to reach clients, publish work, and get paid shouldn\'t depend on where you were born or who controls the local network infrastructure.',
  },
  {
    title: 'Expression',
    body:
      'The right to communicate, publish, and promote without platform-level censorship. Fintech and cryptocurrency content faces disproportionate de-platforming across social networks and ad systems — build your presence on owned channels first, not rented ones.',
  },
  {
    title: 'Privacy',
    body:
      'Control over your own data and communications. For a professional handling financial transactions, privacy is operational security — who can read your invoices, see your wallet addresses, and track your client list matters.',
  },
]

const regulatoryHeaders = ['Dimension', 'EU Digital Principles', 'U.S. Internet Freedom Policy']

const regulatoryRows = [
  {
    dimension: 'Structure',
    eu: 'Top-down, centralized',
    us: 'Decentralized, promotion-based',
  },
  {
    dimension: 'Enforcement',
    eu: 'Monitored by the Commission',
    us: 'No single enforcement body',
  },
  {
    dimension: 'Primary focus',
    eu: 'Citizen rights within the EU',
    us: 'Global democratic access',
  },
  {
    dimension: 'Business impact',
    eu: 'Compliance obligations',
    us: 'Indirect, market-driven pressure',
  },
  {
    dimension: 'Legal weight',
    eu: 'Codified declaration',
    us: 'Policy guidance and funding',
  },
]

const accessScenarios = [
  'A freelancer in Iran or Nigeria with throttled bandwidth can\'t reliably send invoices or receive payments through bank-linked platforms.',
  'A crypto founder blocked from traditional banking has no fallback if their payment processor freezes their account.',
  'A contractor in an underserved region pays more for slower connectivity, which directly caps their earning potential.',
]

const economicActivities = [
  {
    number: '1',
    title: 'Global Freelance Platforms',
    body:
      'Upwork, Toptal, and similar platforms are unavailable or throttled in dozens of countries. No open internet means no access to that client base.',
  },
  {
    number: '2',
    title: 'DeFi & Crypto Payment Rails',
    body:
      'Decentralized finance lets a contractor receive payment across borders without a correspondent bank — but only if crypto infrastructure stays accessible.',
  },
  {
    number: '3',
    title: 'Private Client Communication',
    body:
      'A client in Berlin won\'t share a contract over a channel they know is monitored. Surveillance kills deals before they start.',
  },
]

const practicalSteps = [
  {
    title: 'Use end-to-end encrypted communication',
    body:
      'Signal for messaging, ProtonMail for email. If you work on public Wi-Fi regularly, run a VPN. Same logic as locking your front door.',
  },
  {
    title: 'Diversify your payment infrastructure',
    body:
      'PayPal has frozen accounts with no notice. Stripe has terminated businesses overnight. Adding LinkVoices gives you a censorship-resistant payment rail that no institution can unilaterally shut off.',
  },
  {
    title: 'Own your audience and data',
    body:
      'Social platforms rent you reach and can revoke it. An email list and a personal domain are yours. Build there first.',
  },
  {
    title: 'Track how legislation is evolving',
    body:
      'The EU\'s digital principles monitoring page is worth bookmarking. Laws around digital payments, data access, and platform regulation are moving fast.',
  },
]

const actionHeaders = ['Action', 'What it protects', 'Time to set up']

const actionRows = [
  {
    action: 'Encrypted messaging (Signal)',
    protects: 'Private communications',
    time: '10 minutes',
  },
  {
    action: 'VPN on public networks',
    protects: 'Network traffic',
    time: '15 minutes',
  },
  {
    action: 'Crypto invoice tool',
    protects: 'Payment access',
    time: '20 minutes',
  },
  {
    action: 'Email list',
    protects: 'Audience ownership',
    time: '1 hour',
  },
]

const faqs = [
  {
    question: 'What are digital rights?',
    answer:
      'Digital rights are the human and legal rights that enable individuals to access, use, create, and publish digital media, and to access computers, electronic devices, and telecommunications networks. They cover online privacy, freedom of expression, and access to digital infrastructure.',
  },
  {
    question: 'What are the three pillars of digital freedom?',
    answer:
      'Access (unrestricted connection to the internet and its markets), expression (the right to communicate without platform censorship), and privacy (control over your own data and communications). All three must hold simultaneously — weakening one weakens the others.',
  },
  {
    question: 'How do EU and U.S. digital rights approaches differ?',
    answer:
      'The EU uses a top-down, codified declaration monitored by the Commission, creating compliance obligations for businesses touching EU users. The U.S. promotes internet freedom globally through policy guidance and funding, with no single domestic enforcement body.',
  },
  {
    question: 'Why does digital freedom matter for freelancers?',
    answer:
      'Freelancers depend on global platforms, cross-border payments, and private client communication. Throttled internet, frozen payment accounts, or monitored channels directly cap earning potential. Digital rights are the foundation for borderless freelance work.',
  },
  {
    question: 'Is internet access a human right?',
    answer:
      'The debate continues. Without codified access as a right, private infrastructure providers set the terms. For remote workers in underserved regions, lack of guaranteed access is a business problem — not just a policy debate.',
  },
  {
    question: 'How can crypto invoicing protect my digital rights?',
    answer:
      'Crypto invoicing bypasses banking infrastructure that excludes people geographically or politically. It provides a censorship-resistant payment rail no single institution can shut off — turning abstract access rights into a working invoice in your client\'s inbox.',
  },
  {
    question: 'What practical steps can I take to protect my digital rights today?',
    answer:
      'Use encrypted messaging and VPNs, diversify payment infrastructure with crypto invoicing tools, own your audience through email lists and personal domains, and track evolving legislation in your jurisdiction and your clients\' regions.',
  },
  {
    question: 'How does digital freedom relate to economic freedom?',
    answer:
      'In the 21st century, economic prosperity requires an open internet. Freelancers, remote developers, and crypto-native founders depend on unrestricted access to global markets, DeFi payment rails, and private communication — all of which require intact digital rights.',
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
        'digital freedom, digital rights, online privacy, freedom of expression, digital infrastructure, EU digital principles, internet access rights, crypto invoicing, freelancer digital rights, censorship resistant payments',
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Digital freedom — online privacy, access, and expression rights' },
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
          name: 'Digital Freedom',
          description:
            'Human and legal rights enabling access, use, creation, and publication of digital media and infrastructure.',
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
          'digital freedom, digital rights, online privacy, freedom of expression, EU digital principles, crypto invoicing',
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
