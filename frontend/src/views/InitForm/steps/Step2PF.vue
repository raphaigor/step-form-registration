<script setup>
import { useFormValidator } from '@/composables/useFormValidator'

import InputField from '@/components/InputField'
import BaseButton from '@/components/BaseButton'

const props = defineProps(['formData', 'step'])
const emit = defineEmits(['next', 'back'])

const { errors, validateFields } = useFormValidator(props.formData)

function continuar() {
  if (validateFields(['nome', 'cpf', 'dataNascimento', 'telefone'])) {
    emit('next')
  }
}

function voltar() {
  emit('back')
}
</script>

<template>
  <div>
    <h2>Informações pessoais</h2>

    <InputField
      label="Nome completo"
      name="nome"
      type="text"
      v-model="formData.nome"
      :error="errors.nome"
      required
    />

    <InputField
      label="CPF"
      name="cpf"
      type="cpf"
      v-model="formData.cpf"
      :error="errors.cpf"
      required
    />

    <InputField
      label="Data de nascimento"
      name="dataNascimento"
      type="date"
      v-model="formData.dataNascimento"
      :error="errors.dataNascimento"
      required
    />

    <InputField
      label="Telefone"
      name="telefone"
      type="phone"
      v-model="formData.telefone"
      :error="errors.telefone"
      required
    />

    <div class="form-actions">
      <BaseButton variant="outline" @click="emit('back')">Voltar</BaseButton>
      <BaseButton variant="primary" @click="continuar">Continuar</BaseButton>
    </div>
  </div>
</template>