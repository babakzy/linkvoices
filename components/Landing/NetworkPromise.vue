<template>
  <section class="people-information py-16 text-ink md:py-20">
    <UiContainer>
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-3xl font-semibold leading-tight md:text-5xl">People &gt; Information</h2>
        <p class="mt-4 text-xl font-medium leading-snug md:text-2xl">Answers aren't always enough. Sometimes you need a person.</p>
        <p class="mt-4 text-base leading-relaxed">AI can answer almost any question, but knowledge isn't always enough. Sometimes you need someone who has actually faced the problem.</p>
        <p class="mt-4 text-base leading-relaxed">Algorithms for you, not against you. Pick how the feed and discovery work. Following, local, collaboration, new people, or something wider. The choice stays until you change it.</p>
        <UiButton class="mt-8" to="/start">Get started</UiButton>
      </div>
    </UiContainer>
  </section>
</template>

<style lang="scss" scoped>
.people-information {
  background-image: url('@/assets/images/duotone.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
