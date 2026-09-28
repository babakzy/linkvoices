<template>
  <div>
    <p class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">{{ label }}</p>
    <p v-if="description" class="mt-1 text-sm text-neutral-600">{{ description }}</p>
    <div v-if="modelValue.length" class="mt-2 flex flex-wrap gap-2">
      <button
        v-for="item in modelValue"
        :key="item"
        type="button"
        class="rounded-ui border border-neutral-300 bg-white px-2 py-1 text-sm"
        @click="remove(item)"
      >
        {{ item }} <span aria-hidden="true">×</span>
      </button>
    </div>
    <input
      v-model="draft"
      class="mt-2 w-full rounded-ui border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue"
      :placeholder="placeholder"
      @keydown.enter.prevent="add"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  label: string
  description?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const draft = ref('')

function add() {
  const value = draft.value.trim()
  if (!value || props.modelValue.some(item => item.toLowerCase() === value.toLowerCase())) {
    draft.value = ''
    return
  }
  emit('update:modelValue', [...props.modelValue, value])
  draft.value = ''
}

function remove(item: string) {
  emit('update:modelValue', props.modelValue.filter(value => value !== item))
}
</script>
