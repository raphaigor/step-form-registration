<script setup>
import { reactive } from 'vue'
import { useFormValidator } from '@/composables/useFormValidator'

import InputField from '@/components/InputField'
import BaseButton from '@/components/BaseButton'

const props = defineProps(['formData', 'step'])
const emit = defineEmits(['next'])

const { errors, validateFields } = useFormValidator(props.formData)

function continuar() {
  if (validateFields(['email', 'tipoPessoa'])) {
    emit('next')
  }
}

</script>

<template>
  <div>
    <h2>Seja bem-vindo(a)</h2>

    <InputField
      label="Endereço de e-mail"
      name="email"
      type="email"
      placeholder="email@site.com"
      v-model="formData.email"
      :error="errors.email"
      required
    />

    <div class="pessoa-options">
      <label class="label-radio">
        <input type="radio" value="pf" v-model="formData.tipoPessoa" />
        Pessoa física
      </label>
      <label class="label-radio">
        <input type="radio" value="pj" v-model="formData.tipoPessoa" />
        Pessoa jurídica
      </label>
    </div>

    <p class="text-error">{{ errors.tipoPessoa }}</p>

    <BaseButton variant="primary" @click="continuar">Continuar</BaseButton>

  </div>
</template>

<style scoped>
.pessoa-options {
  display: flex;
  align-items: center;
}
</style>
