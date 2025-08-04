<script setup>
import { useFormValidator } from '@/composables/useFormValidator'

import InputField from '@/components/InputField'
import BaseButton from '@/components/BaseButton'

const props = defineProps(['formData', 'step'])
const emit = defineEmits(['next', 'back'])

const { errors, validateFields } = useFormValidator(props.formData)

function continuar() {
  if (validateFields(['razaoSocial', 'cnpj', 'dataAbertura', 'telefone'])) {
    emit('next')
  }
}
</script>

<template>
  <div>
    <h2>Informações da empresa</h2>
    
    <InputField
      label="Razão Social"
      name="razaoSocial"
      type="text"
      v-model="formData.razaoSocial"
      :error="errors.razaoSocial"
      required
    />

    <InputField
      label="CNPJ"
      name="cnpj"
      type="cnpj"
      v-model="formData.cnpj"
      :error="errors.cnpj"
      required
    />

    <InputField
      label="Data de Abertura"
      name="dataAbertura"
      type="date"
      v-model="formData.dataAbertura"
      :error="errors.dataAbertura"
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
