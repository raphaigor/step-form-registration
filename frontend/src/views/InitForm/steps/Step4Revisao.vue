<script setup>
import { useFormValidator } from '@/composables/useFormValidator'

import InputField from '@/components/InputField'
import BaseButton from '@/components/BaseButton'

const props = defineProps(['formData', 'step'])
const emit = defineEmits(['back', 'submit'])

const { errors, validateFields } = useFormValidator(props.formData)

const isPessoaFisica = props.formData.tipoPessoa === 'pf'
const isPessoaJuridica = props.formData.tipoPessoa === 'pj'

function confirmar() {
  if (validateFields(['email', 'senha', 'telefone', 'nome', 'cpf', 'dataNascimento', 'razaoSocial', 'cnpj', 'dataAbertura'])) {
    emit('submit')
  }
}
</script>

<template>
  <div>
    <h2>Revise suas informações</h2>

    <InputField
      label="Endereço de e-mail"
      name="email"
      type="email"
      v-model="formData.email"
      :error="errors.email"
      required
    />

    <template v-if="isPessoaFisica">
      <InputField
        label="Nome"
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
    </template>

    <template v-if="isPessoaJuridica">
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
        label="Data de abertura"
        name="dataAbertura"
        type="date"
        v-model="formData.dataAbertura"
        :error="errors.dataAbertura"
        required
      />
    </template>

    <InputField
      label="Telefone"
      name="telefone"
      type="phone"
      v-model="formData.telefone"
      :error="errors.telefone"
      required
    />

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
      <BaseButton variant="primary" @click="confirmar">Cadastrar</BaseButton>
    </div>
  </div>
</template>
