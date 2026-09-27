<script setup lang="ts">
type SectionTone = 'white' | 'spring' | 'blue'
type SectionSpacing = 'compact' | 'default' | 'large'

withDefaults(defineProps<{
  tone?: SectionTone
  spacing?: SectionSpacing
}>(), {
  tone: 'white',
  spacing: 'default',
})

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-white text-ink',
  spring: 'bg-spring-wood-100 text-ink',
  blue: 'bg-brand-blue text-white',
}

const spacingClasses: Record<SectionSpacing, string> = {
  compact: 'py-10 md:py-12',
  default: 'py-16 md:py-20',
  large: 'py-20 md:py-28',
}
</script>

<template>
  <section :class="[toneClasses[tone], spacingClasses[spacing]]">
    <UiContainer>
      <slot />
    </UiContainer>
  </section>
</template>
