<script setup>
import './BaseButton.scss'

const props = defineProps({
  type: {
    type: String,
    default: 'button' // ou submit/reset
  },
  variant: {
    type: String,
    default: 'primary' // 'primary', 'outline', etc.
  },
  disabled: Boolean
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="`btn-${variant}`"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
