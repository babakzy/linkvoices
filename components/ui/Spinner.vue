<script setup lang="ts">
type SpinnerSize = 'sm' | 'md' | 'lg'

withDefaults(defineProps<{
  size?: SpinnerSize
  label?: string
}>(), {
  size: 'md',
  label: 'Loading',
})

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'size-4 border-2',
  md: 'size-5 border-2',
  lg: 'size-10 border-[3px]',
}
</script>

<template>
  <span
    role="status"
    class="inline-block animate-spin rounded-full border-current border-r-transparent motion-reduce:animate-none"
    :class="sizeClasses[size]"
  >
    <span class="sr-only">{{ label }}</span>
  </span>
</template>
