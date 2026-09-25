<script setup lang="ts">
type BadgeVariant = 'neutral' | 'blue' | 'success' | 'warning' | 'danger'

withDefaults(defineProps<{
  variant?: BadgeVariant
}>(), {
  variant: 'neutral',
})

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'border-neutral-400 bg-white text-ink',
  blue: 'border-brand-blue bg-brand-blue text-white',
  success: 'border-green-700 bg-green-50 text-green-800',
  warning: 'border-amber-700 bg-amber-50 text-amber-900',
  danger: 'border-red-700 bg-red-50 text-red-800',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-ui border px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.06em]"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
