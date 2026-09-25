<script setup lang="ts">
export interface UiSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  label: string
  options: UiSelectOption[]
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  description?: string
  error?: string
}>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  placeholder: undefined,
  required: false,
  disabled: false,
  description: undefined,
  error: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const selectId = computed(() => props.id ?? generatedId)
const descriptionId = computed(() => props.description ? `${selectId.value}-description` : undefined)
const errorId = computed(() => props.error ? `${selectId.value}-error` : undefined)
const describedBy = computed(() => [descriptionId.value, errorId.value].filter(Boolean).join(' ') || undefined)
</script>

<template>
  <div class="grid gap-2">
    <label :for="selectId" class="text-sm font-medium text-ink">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="describedBy"
      class="h-9 w-full rounded-ui border border-neutral-400 bg-white px-3 text-sm text-ink focus:border-brand-blue focus:outline-2 focus:outline-brand-blue/25 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-70"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="description" :id="descriptionId" class="text-xs text-neutral-600">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="text-xs font-medium text-red-700">
      {{ error }}
    </p>
  </div>
</template>
