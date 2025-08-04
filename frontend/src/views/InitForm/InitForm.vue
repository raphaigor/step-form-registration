<script setup>
import { ref, reactive, computed } from 'vue'

import StepIndicator from '@/components/StepIndicator'

import Step1Welcome from './steps/Step1.vue'
import Step2PessoaFisica from './steps/Step2PF.vue'
import Step2PessoaJuridica from './steps/Step2PJ.vue'
import Step3Senha from './steps/Step3Senha.vue'
import Step4Revisao from './steps/Step4Revisao.vue'
import StepResult from './steps/StepResult.vue'

const currentStep = ref(1)
const formData = reactive({
  email: '',
  tipoPessoa: '', // 'pf' ou 'pj'
  nome: '',
  cpf: '',
  dataNascimento: '',
  razaoSocial: '',
  cnpj: '',
  dataAbertura: '',
  telefone: '',
  senha: ''
})

const submitted = ref(false)
const result = ref(null)

function nextStep() {
  if (currentStep.value < 4) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

function submitForm() {
  fetch('http://localhost:3000/registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      submitted.value = true
      result.value = data
    })
    .catch(err => {
      submitted.value = true
      result.value = { error: 'Erro ao enviar os dados' }
    })
}

const currentComponent = computed(() => {
  if (submitted.value) return StepResult
  if (currentStep.value === 1) return Step1Welcome
  if (currentStep.value === 2 && formData.tipoPessoa === 'pf') return Step2PessoaFisica
  if (currentStep.value === 2 && formData.tipoPessoa === 'pj') return Step2PessoaJuridica
  if (currentStep.value === 3) return Step3Senha
  if (currentStep.value === 4) return Step4Revisao
})
</script>

<template>
  <StepIndicator v-if="!submitted" :step="currentStep" :total="4" />
  <component
    :is="currentComponent"
    :formData="formData"
    :step="currentStep"
    @next="nextStep"
    @back="prevStep"
    v-on="currentStep === 4 ? { submit: submitForm } : {}"
    v-bind="currentComponent === StepResult ? { result } : {}"
  />
</template>
