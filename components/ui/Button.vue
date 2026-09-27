<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'blue' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonHTMLAttributes['type']
  to?: string
  href?: string
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  to: undefined,
  href: undefined,
  disabled: false,
  loading: false,
})

const component = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) {
    return {
      to: props.to,
      'aria-disabled': props.disabled || props.loading || undefined,
      tabindex: props.disabled || props.loading ? -1 : undefined,
    }
  }

  if (props.href) {
    return {
      href: props.disabled || props.loading ? undefined : props.href,
      'aria-disabled': props.disabled || props.loading || undefined,
      tabindex: props.disabled || props.loading ? -1 : undefined,
    }
  }

  return {
    type: props.type,
    disabled: props.disabled || props.loading,
  }
})

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-ink bg-ink text-white hover:border-neutral-800 hover:bg-neutral-800',
  secondary: 'border-neutral-300 bg-white text-ink hover:border-ink hover:bg-neutral-50',
  blue: 'border-brand-blue bg-brand-blue text-white hover:border-brand-blue-dark hover:bg-brand-blue-dark',
  ghost: 'border-transparent bg-transparent text-ink hover:bg-neutral-100',
  destructive: 'border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-6 text-sm',
  icon: 'size-9 p-0',
}

function preventDisabledNavigation(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<template>
  <component
    :is="component"
    v-bind="componentProps"
    class="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-ui border font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50"
    :class="[variantClasses[variant], sizeClasses[size]]"
    @click="preventDisabledNavigation"
  >
    <UiSpinner v-if="loading" size="sm" aria-hidden="true" />
    <slot />
  </component>
</template>
