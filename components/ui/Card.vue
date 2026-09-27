<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'article' | 'div' | 'section'
  tone?: 'white' | 'spring' | 'blue'
  padded?: boolean
}>(), {
  as: 'div',
  tone: 'white',
  padded: true,
})

const toneClasses = {
  white: 'border-neutral-300 bg-white text-ink',
  spring: 'border-spring-wood-300 bg-spring-wood-100 text-ink',
  blue: 'border-cerulean-blue-800 bg-brand-blue text-white',
}
</script>

<template>
  <component
    :is="as"
    class="rounded-ui border"
    :class="[toneClasses[tone], padded && 'p-5 md:p-6']"
  >
    <slot />
  </component>
</template>
