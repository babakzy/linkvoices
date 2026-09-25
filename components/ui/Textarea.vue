<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | null
  label: string
  id?: string
  name?: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  description?: string
  error?: string
}>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  placeholder: undefined,
  rows: 5,
  required: false,
  disabled: false,
  description: undefined,
  error: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const textareaId = computed(() => props.id ?? generatedId)
const descriptionId = computed(() => props.description ? `${textareaId.value}-description` : undefined)
const errorId = computed(() => props.error ? `${textareaId.value}-error` : undefined)
const describedBy = computed(() => [descriptionId.value, errorId.value].filter(Boolean).join(' ') || undefined)
</script>

<template>
  <div class="grid gap-2">
    <label :for="textareaId" class="text-sm font-medium text-ink">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue ?? ''"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="describedBy"
      class="w-full resize-y rounded-ui border border-neutral-400 bg-white px-3 py-2 text-sm text-ink placeholder:text-neutral-500 focus:border-brand-blue focus:outline-2 focus:outline-brand-blue/25 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-70"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="description" :id="descriptionId" class="text-xs text-neutral-600">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="text-xs font-medium text-red-700">
      {{ error }}
    </p>
  </div>
</template>
