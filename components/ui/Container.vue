<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'div' | 'main' | 'section'
  size?: 'content' | 'wide'
}>(), {
  as: 'div',
  size: 'wide',
})

const sizeClasses = {
  content: 'max-w-3xl',
  wide: 'max-w-7xl',
}
</script>

<template>
  <component
    :is="as"
    class="mx-auto w-full px-4 md:px-6 lg:px-8"
    :class="sizeClasses[size]"
  >
    <slot />
  </component>
</template>
