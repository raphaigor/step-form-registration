<script setup>
import { useFormValidator } from '@/composables/useFormValidator'

import InputField from '@/components/InputField'
import BaseButton from '@/components/BaseButton'

const props = defineProps(['formData', 'step'])
const emit = defineEmits(['next', 'back'])

const { errors, validateFields } = useFormValidator(props.formData)

function continuar() {
  if (validateFields(['senha'])) {
    emit('next')
  }
}
</script>

<template>
  <h2>Criação de senha</h2>

  <InputField
    label="Senha"
    name="senha"
    type="password"
    v-model="formData.senha"
    :error="errors.senha"
    required
  />

  <div class="form-actions">
    <BaseButton variant="outline" @click="emit('back')">Voltar</BaseButton>
    <BaseButton variant="primary" @click="continuar">Continuar</BaseButton>
  </div>
</template>
