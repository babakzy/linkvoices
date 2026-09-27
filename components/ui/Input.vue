<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  label: string
  id?: string
  type?: InputHTMLAttributes['type']
  name?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  description?: string
  error?: string
}>(), {
  modelValue: '',
  id: undefined,
  type: 'text',
  name: undefined,
  placeholder: undefined,
  autocomplete: undefined,
  required: false,
  disabled: false,
  description: undefined,
  error: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const descriptionId = computed(() => props.description ? `${inputId.value}-description` : undefined)
const errorId = computed(() => props.error ? `${inputId.value}-error` : undefined)
const describedBy = computed(() => [descriptionId.value, errorId.value].filter(Boolean).join(' ') || undefined)
</script>

<template>
  <div class="grid gap-2">
    <label :for="inputId" class="text-sm font-medium text-ink">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>
    <input
      :id="inputId"
      :value="modelValue ?? ''"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="describedBy"
      class="h-9 w-full rounded-ui border border-neutral-400 bg-white px-3 text-sm text-ink placeholder:text-neutral-500 focus:border-brand-blue focus:outline-2 focus:outline-brand-blue/25 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-70"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="description" :id="descriptionId" class="text-xs text-neutral-600">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="text-xs font-medium text-red-700">
      {{ error }}
    </p>
  </div>
</template>
