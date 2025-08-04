<script setup>
import { computed, watch, ref } from 'vue'
import './InputField.scss'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  placeholder: String,
  type: {
    type: String,
    default: 'text' // text, cpf, cnpj, email, password, tel
  },
  name: String,
  required: Boolean,
  error: String,
  mask: String
})

const emit = defineEmits(['update:modelValue'])

const internalInputType = ref(getInputType())

function getInputType() {
  if (props.type === 'password') return 'password'
  return ['cpf', 'cnpj', 'phone'].includes(props.type) ? 'text' : props.type
}

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (props.type === 'password' && newVal !== oldVal) {
      internalInputType.value = 'text'
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        internalInputType.value = 'password'
      }, 500)
    }
  }
)

let timeout = null

const inputValue = computed(() => props.modelValue || '')

function handleInput(event) {
  let val = event.target.value
  if (['cpf', 'cnpj', 'phone'].includes(props.type)) {
    const numeric = val.replace(/\D/g, '')
    let formatted = numeric

    if (props.type === 'cpf') {
      formatted = formatCPF(numeric)
    } else if (props.type === 'cnpj') {
      formatted = formatCNPJ(numeric)
    } else if (props.type === 'phone') {
      formatted = formatPhone(numeric)
    }

    event.target.value = formatted
    emit('update:modelValue', formatted)
  } else {
    emit('update:modelValue', val)
  }
}

function formatCPF(value) {
  return value
    .replace(/\D/g, '')                // Remove tudo que não for número
    .slice(0, 11)                      // Limita a 11 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2')   // Primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2')   // Segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Traço
}

function formatCNPJ(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})\.(\d{3})(\d)/, '.$1.$2/$3')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function formatPhone(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 10)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
}

</script>

<template>
  <div class="input-field">
    <label v-if="label" :for="name">
      {{ label }} <span v-if="required">*</span>
    </label>

    <input
      :id="name"
      :name="name"
      :type="internalInputType"
      :value="inputValue"
      @input="handleInput"
      :placeholder="placeholder"
      :maxlength="{
        cpf: 14,
        cnpj: 18,
        phone: 14
      }[type] || undefined"
      :class="{ 'has-error': !!error }"
    />

    <p v-if="error" class="text-error">{{ error }}</p>
  </div>
</template>