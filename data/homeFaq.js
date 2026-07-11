export const homeFaqs = [
  {
    question: 'Is there any fee to use Linkvoices?',
    answer:
      'No platform fees. Linkvoices is free for creating and sending cryptocurrency invoices. You only pay the standard blockchain network fee when a client sends payment.',
  },
  {
    question: 'Which cryptocurrencies does Linkvoices support?',
    answer:
      'Bitcoin (BTC), Ethereum (ETH), Tether (USDT) on the Tron network, and DAI on Ethereum.',
  },
  {
    question: 'How do I get started with crypto invoicing?',
    answer:
      'Sign up for a free account, add your wallet address, create an invoice with line items, and share the payment link. You receive a notification when payment is confirmed on-chain.',
  },
  {
    question: 'Can I use Linkvoices for international payments?',
    answer:
      'Yes. Cryptocurrency invoices work the same way anywhere — no wire transfers, currency conversion fees, or banking restrictions.',
  },
]

export function buildHomeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
