<script setup>
import './StepIndicator.scss'

const props = defineProps({
  step: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 4
  }
})
</script>

<template>
  <p class="step-indicator">
		Etapa 
		<strong>
			<span class="step">{{ step }}</span>
		</strong>
		de {{ total }}
  </p>
</template>
