<template>
  <Header />
  <main>
    <!-- Hero -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="flex flex-wrap items-center justify-around hero2bg min-h-[200px] md:min-h-[360px]">
        <div class="basis-full md:basis-9/12 text-center relative px-4">
          <h1 class="block text-4xl z-10 md:text-7xl font-bold text-cerulean-blue-900 capitalize leading-tight">
            Crypto Anarchism
            <br />
            <span class="inline-block mt-4 md:mt-6 px-6 py-2 md:px-10 md:py-3 bg-cerulean-blue-900 text-spring-wood-50 rounded-full text-2xl md:text-4xl font-bold tracking-tight normal-case">
              Privacy, Freedom, and the Future You Control
            </span>
          </h1>
        </div>
      </div>
      <p class="text-cerulean-blue-800 text-base md:text-lg font-medium text-center mt-8 max-w-3xl mx-auto leading-relaxed px-4">
        Discover the movement that uses cryptography to protect your privacy, enable anonymous communication,
        and challenge centralized control — without asking permission from governments or corporations.
      </p>
      <div class="text-center mt-10">
        <a
          href="#how-it-works"
          class="btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 text-cerulean-blue-50 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Learn About Crypto Anarchism
        </a>
      </div>
      <p class="text-gray-600 text-sm md:text-base text-center mt-6 px-4">
        Free educational resource · No sign-up required · Based on 35+ years of movement history
      </p>
    </section>

    <!-- Problem -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center md:basis-5/6 lg:basis-2/3">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-8">
            The Problem
          </h2>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-left">
            <p>
              You hear "crypto anarchism" and think chaos. Dark web. Illegal activity. Something dangerous.
            </p>
            <p>
              You're not wrong to be skeptical. The name sounds extreme. The media coverage focuses on crime.
              And most explanations assume you already understand blockchain, encryption, and libertarian philosophy.
            </p>
            <p>
              So you're left confused. What is this movement actually about? Why does it matter? And how does
              using cryptography have anything to do with anarchism?
            </p>
            <p>
              Meanwhile, your government tracks your online activity. Corporations sell your data. Banks freeze
              accounts without warning. And you have no real control over your digital life — just the illusion
              of privacy.
              <NuxtLink
                to="/blog/unfair-online-payment-restrictions-freelancers"
                class="text-cerulean-blue-600 hover:text-cerulean-blue-800 underline underline-offset-2"
              >
                Read how unfair online payment restrictions affect freelancers
              </NuxtLink>.
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
              The Crypto Solution
            </h2>
            <div class="space-y-5 text-spring-wood-100 text-base md:text-lg leading-relaxed">
              <p>
                Crypto anarchism gives you the tools to take back control.
              </p>
              <p>
                It's a philosophy and a practice: use cryptographic technologies to secure your privacy,
                communicate anonymously, and transact freely — without needing permission from any authority.
              </p>
              <p>
                This means encrypted messages that governments can't intercept. Digital cash that banks can't
                freeze. Decentralized networks that corporations can't control. And peer-to-peer exchanges that
                happen directly between individuals.
              </p>
              <p>
                You don't need to overthrow anything. You just need to use the right tools. Strong encryption
                makes surveillance ineffective. Blockchain makes censorship impossible. Anonymous networks make
                tracking futile.
              </p>
              <p>
                <strong class="text-spring-wood-50">The goal isn't chaos. It's individual sovereignty.</strong>
                The freedom to speak, transact, and exist online without someone watching, recording, or
                controlling every move you make.
              </p>
              <p>
                Tools like
                <a
                  href="https://linkvoices.com"
                  class="text-spring-wood-50 underline underline-offset-2 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkvoices
                </a>
                put that philosophy into practice — send crypto invoices directly to your wallet, with no banks
                or payment processors in the middle.
              </p>
            </div>
          </div>
          <div class="basis-full lg:basis-2/5">
            <img
              src="@/assets/images/crypto-anarchism-image.png"
              alt="Crypto anarchism graphic showing decentralized autonomy, secure encryption, and censorship resistance"
              class="w-full h-auto rounded-lg"
              width="1408"
              height="768"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section id="how-it-works" class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center mb-14">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            Crypto Anarchism Timeline
          </h2>
          <p class="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            Crypto anarchism evolved from a 1988 manifesto to a global movement in four key phases.
          </p>
        </div>
        <div class="basis-full md:basis-5/6 max-w-3xl mx-auto">
          <div
            v-for="(phase, index) in historyPhases"
            :key="phase.year"
            class="flex gap-6"
          >
            <div class="flex flex-col items-center shrink-0 w-16">
              <span class="inline-flex items-center justify-center w-16 h-10 rounded-md bg-cerulean-blue-600 text-cerulean-blue-50 font-bold text-sm">
                {{ phase.year }}
              </span>
              <div
                v-if="index < historyPhases.length - 1"
                class="w-0.5 flex-1 min-h-8 bg-cerulean-blue-200 my-2"
              />
            </div>
            <div class="flex-1" :class="index < historyPhases.length - 1 ? 'pb-10' : ''">
              <h3 class="text-xl font-semibold text-cerulean-blue-900 mb-3">
                {{ phase.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ phase.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="basis-full md:basis-5/6 max-w-3xl mx-auto mt-6">
          <p class="text-gray-600 text-base md:text-lg leading-relaxed">
            Each phase built on the last. The philosophy inspired the tools. The tools enabled the currency.
            The currency proved the concept. Now the infrastructure exists for anyone to use. For a deeper dive
            into the movement's history, people, and key concepts, visit
            <a
              href="https://cryptoanarchy.wiki/"
              class="text-cerulean-blue-600 hover:text-cerulean-blue-800 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              cryptoanarchy.wiki
            </a>.
          </p>
        </div>
      </div>
    </section>



    <!-- Comparison -->
    <section class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize">
            How Crypto Anarchism Compares
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
                <td class="p-4 text-gray-600">{{ row.cryptoAnarchism }}</td>
                <td class="p-4 text-gray-600">{{ row.traditionalAnarchism }}</td>
                <td class="p-4 text-gray-600">{{ row.cypherpunk }}</td>
                <td class="p-4 text-gray-600">{{ row.doingNothing }}</td>
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
            Moving from Traditional to Crypto Anarchism
          </h2>
          <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            Most privacy movements tell you to trust better institutions. Crypto anarchism says build tools
            that make trust unnecessary.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              v-for="point in differentiators"
              :key="point.title"
              class="bg-spring-wood-50 rounded-xl p-6"
            >
              <h3 class="text-lg font-semibold text-cerulean-blue-900 mb-2">
                {{ point.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ point.body }}
              </p>
            </div>
          </div>
          <div class="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Here's what crypto anarchism is <em>not</em>: a recipe for chaos, a criminal handbook, or a
              utopian fantasy. It's a practical philosophy backed by working technology. Millions use encrypted
              messaging daily. Bitcoin processes billions in transactions. Tor enables anonymous browsing for
              journalists, activists, and everyday users.
            </p>
            <p class="text-cerulean-blue-900 text-center text-2xl font-medium">
              The tools exist. The infrastructure works. The only question is whether you'll use them.
     
            </p>
            <a href="https://linkvoices.com" target="_blank" rel="noopener noreferrer" class="text-cerulean-blue-600 hover:text-cerulean-blue-800 mx-auto block text-center underline underline-offset-2">
              Use Linkvoices to send crypto invoices
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- What People Say -->
    <section class="bg-spring-wood-100 py-16 md:py-32">
      <div class="md:container md:mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <blockquote
            v-for="quote in quotes"
            :key="quote.author"
            class="bg-spring-wood-50 rounded-xl p-7"
          >
            <p class="text-gray-600 leading-relaxed italic mb-4">
              "{{ quote.text }}"
            </p>
            <footer class="text-cerulean-blue-900 font-medium text-sm">
              — {{ quote.author }}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="md:container md:mx-auto px-4 py-16 md:py-32">
      <div class="flex flex-wrap justify-center">
        <div class="basis-full md:basis-5/6">
          <h2 class="text-3xl md:text-5xl font-bold text-cerulean-blue-900 capitalize mb-10">
            Frequently Asked Questions
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
          Put Crypto Anarchism Into Practice
        </h2>
        <p class="text-spring-wood-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          The philosophy is clear: transact freely, without banks or payment processors in the middle.
          Linkvoices lets you send crypto invoices directly to your wallet — no permission required.
        </p>
        <p class="text-spring-wood-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Create an invoice in minutes. Share it with your client. Get paid in Bitcoin, Ethereum, USDT, or DAI.
        </p>
        <NuxtLink
          to="/login"
          class="btn bg-spring-wood-50 hover:bg-white border-spring-wood-200 text-cerulean-blue-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Get Started on Linkvoices
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
const pagePath = '/crypto-anarchism'
const pageUrl = `${siteUrl}${pagePath}`

const pageTitle = 'Crypto Anarchism: Definition and Practical Application'
const pageDescription =
  'What crypto anarchism (manifesto) is, how it works, from the 1988 manifesto to Bitcoin and beyond.'
const pageImageUrl = `${siteUrl}/images/crypto-anarchism-og.jpg`

usePageSeo({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  ogImage: '/images/crypto-anarchism-og.jpg',
  appendSiteName: false,
})

const activeFaq = ref(null)

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const historyPhases = [
  {
    year: '1988',
    title: 'The Vision',
    description:
      'Timothy C. May writes the Crypto Anarchist Manifesto, predicting that public-key cryptography would let individuals communicate and trade anonymously, making government control obsolete.',
  },
  {
    year: '1992',
    title: 'The Tools',
    description:
      'The Cypherpunk movement forms. Developers create PGP encryption, anonymous remailers, and RSA algorithms — the building blocks of digital privacy.',
  },
  {
    year: '2009',
    title: 'The Currency',
    description:
      'Bitcoin launches. For the first time, you can send money anywhere without a bank, government, or payment processor in the middle.',
  },
  {
    year: 'Today',
    title: 'The Infrastructure',
    description:
      'Encrypted messaging apps, VPNs, Tor networks, and decentralized protocols give anyone the ability to operate outside traditional systems.',
  },
]

const useCases = [
  {
    title: 'Privacy-Conscious Individuals',
    body:
      'You want to protect your personal data and communications from surveillance. Crypto anarchist tools let you encrypt messages end-to-end with Signal, browse anonymously with Tor, and store files on decentralized networks. No one can read your conversations. No one can track your activity. No one can access your data without your permission.',
    outcome: 'You communicate freely without fear of surveillance or data breaches.',
  },
  {
    title: 'Tech Enthusiasts',
    body:
      'You want to understand how revolutionary cryptographic technologies work. Crypto anarchism shows you how encryption secures data, how blockchain enables trustless transactions, and how decentralized networks operate without central servers. You learn by using real tools that are reshaping how society functions.',
    outcome: 'You gain practical knowledge of the technologies powering the future of privacy and freedom.',
  },
  {
    title: 'Liberty Advocates',
    body:
      'You want to explore philosophies that challenge centralized control. Crypto anarchism offers a framework where individual sovereignty matters more than institutional authority. You discover how voluntary exchanges, cryptographic security, and peer-to-peer networks create alternatives to government and corporate power structures.',
    outcome: 'You find actionable principles for living with more autonomy and less dependence on centralized systems.',
  },
]

const comparisonHeaders = [
  'Feature',
  'Crypto Anarchism',
  'Traditional Anarchism',
  'Cypherpunk Movement',
  'Doing Nothing',
]

const comparisonRows = [
  {
    feature: 'Focus',
    cryptoAnarchism: 'Cryptographic tools + individual autonomy',
    traditionalAnarchism: 'Communal structures + collective action',
    cypherpunk: 'Privacy tools only',
    doingNothing: 'Accept surveillance',
  },
  {
    feature: 'Method',
    cryptoAnarchism: 'Technology-enabled freedom',
    traditionalAnarchism: 'Social revolution',
    cypherpunk: 'Build encryption software',
    doingNothing: 'Hope for the best',
  },
  {
    feature: 'Goal',
    cryptoAnarchism: 'Stateless digital society',
    traditionalAnarchism: 'Stateless physical society',
    cypherpunk: 'Protect communications',
    doingNothing: 'Maintain status quo',
  },
  {
    feature: 'Tools',
    cryptoAnarchism: 'Blockchain, encryption, anonymous networks',
    traditionalAnarchism: 'Mutual aid, cooperatives',
    cypherpunk: 'PGP, Tor, VPNs',
    doingNothing: 'None',
  },
  {
    feature: 'Outcome',
    cryptoAnarchism: 'Privacy + economic freedom',
    traditionalAnarchism: 'Community governance',
    cypherpunk: 'Secure communication',
    doingNothing: 'Loss of privacy',
  },
]

const differentiators = [
  {
    title: 'No permission required',
    body:
      "You don't need government approval to encrypt a message. You don't need a bank to send Bitcoin. You don't need a corporation's terms of service to communicate peer-to-peer. If you have the tools, you have the freedom.",
  },
  {
    title: 'Technology over politics',
    body:
      'Traditional anarchists want to change society through collective action. Crypto anarchists change society by making surveillance and control technically impossible. Strong encryption works whether governments like it or not.',
  },
  {
    title: 'Individual sovereignty first',
    body:
      "Your privacy isn't a group decision. Your transactions aren't subject to majority vote. Your freedom doesn't depend on convincing others to join a movement. Cryptography gives you autonomy right now.",
  },
  {
    title: 'Voluntary everything',
    body:
      'No coercion. No forced participation. No imposed rules. You choose which networks to join, which tools to use, and which exchanges to make. Every interaction is consensual.',
  },
]

const quotes = [
  {
    text:
      'Just as the technology of printing altered and reduced the power of medieval guilds and the social power structure, so too will cryptologic methods fundamentally alter the nature of corporations and of government interference in economic transactions.',
    author: 'The Crypto Anarchist Manifesto (1988)',
  },
  {
    text:
      'The Cypherpunk movement delivered on that vision by creating PGP encryption, anonymous remailers, and the cryptographic foundations that made Bitcoin possible. Their work proved privacy tools could exist outside government control.',
    author: 'The Cypherpunk Movement',
  },
  {
    text:
      "Bitcoin's existence validates the core thesis: you can create a global currency that no government can shut down, no bank can freeze, and no corporation can censor. Over 15 years later, it still works exactly as designed.",
    author: "Bitcoin's Legacy",
  },
]

const faqs = [
  {
    question: 'What is crypto anarchism and how does it work?',
    answer:
      'Crypto anarchism uses cryptographic technologies to secure privacy and enable anonymous communication and transactions. It works through encryption that makes messages unreadable to outsiders, blockchain that records transactions without central authority, and decentralized networks that operate peer-to-peer. You use these tools to communicate, transact, and exist online without surveillance or control.',
  },
  {
    question: 'Who wrote the Crypto Anarchist Manifesto and why is it important?',
    answer:
      'Timothy C. May wrote the Crypto Anarchist Manifesto in 1988. He predicted that public-key cryptography would let individuals communicate and trade anonymously, making government surveillance and control obsolete. The manifesto became the foundational text for the cypherpunk movement and influenced the development of encrypted communications, anonymous networks, and Bitcoin. It matters because it laid out a vision that\'s now technically possible.',
  },
  {
    question: 'How does crypto anarchism differ from traditional anarchism?',
    answer:
      'Traditional anarchism focuses on replacing the state with communal structures and collective decision-making. Crypto anarchism uses technology to make the state irrelevant. Traditional anarchists organize communities. Crypto anarchists build encryption tools. Traditional anarchism emphasizes mutual aid. Crypto anarchism emphasizes individual sovereignty. Both oppose coercive authority, but crypto anarchism does it through cryptography rather than social revolution.',
  },
  {
    question: 'What technologies are central to the crypto anarchist movement?',
    answer:
      'Public-key encryption secures communications. Anonymous remailers hide sender identity. Tor networks enable anonymous browsing. Blockchain creates decentralized transaction records. Bitcoin and other cryptocurrencies enable peer-to-peer payments. VPNs mask your location. End-to-end encrypted messaging protects conversations. These tools work together to create privacy and autonomy online.',
  },
  {
    question: 'Are there risks associated with crypto anarchism?',
    answer:
      'Yes. Anonymity enables both freedom and crime. Drug markets, money laundering, and tax evasion happen on anonymous networks. But so do whistleblowing, journalism in authoritarian countries, and privacy for ordinary people. The tools are neutral. A knife can cut food or harm someone. Encryption can protect dissidents or hide criminals. The risk isn\'t the technology — it\'s how people use it. Most crypto anarchist tools serve legitimate privacy needs.',
  },
  {
    question: 'How does crypto anarchism compare to the cypherpunk movement?',
    answer:
      'Cypherpunks focus on building privacy tools. Crypto anarchists use those tools to achieve broader political and economic goals. Cypherpunks created PGP and Tor. Crypto anarchists use PGP and Tor to build a stateless society. Cypherpunks are the engineers. Crypto anarchists are the philosophers and practitioners. The movements overlap — many cypherpunks are crypto anarchists — but crypto anarchism has a more explicit political vision.',
  },
  {
    question: 'Can crypto anarchism address modern socio-political issues?',
    answer:
      'It addresses surveillance, censorship, and financial control directly. Encrypted messaging protects activists in authoritarian countries. Bitcoin enables transactions in places where banks don\'t serve you. Anonymous networks let journalists communicate with sources. Decentralized platforms resist corporate censorship. Crypto anarchism won\'t solve every problem, but it gives individuals tools to resist institutional control over their digital lives.',
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
        'crypto anarchism, crypto anarchist manifesto, cypherpunk movement, cryptographic privacy, Timothy C. May, bitcoin anarchism, digital sovereignty, encryption privacy, anonymous communication, decentralized freedom',
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
          name: 'Crypto Anarchism',
          description:
            'A philosophy and practice using cryptographic technologies to secure privacy, enable anonymous communication, and achieve individual sovereignty online.',
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
          'crypto anarchism, cypherpunk, encryption, privacy, bitcoin, individual sovereignty',
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
