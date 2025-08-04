<script setup>
const props = defineProps(['result'])
</script>

<template>
  <div class="result-container">
    <h2>
      {{ props.result?.error ? 'Erro no envio' : 'Cadastro realizado com sucesso!' }}
    </h2>

    <p v-if="props.result?.message">
      {{ props.result.message }}
    </p>

    <p v-if="props.result?.error" class="text-error">
      {{ props.result.error }}
    </p>

    <div v-if="props.result?.missing?.length" class="text-error">
      <p>Campos ausentes:</p>
      <ul class="text-error">
        <li v-for="campo in props.result.missing" :key="campo">
          {{ campo }}
        </li>
      </ul>
    </div>

    <div style="margin-top: 2rem">
      <a href="/" class="btn-outline">Voltar ao início</a>
    </div>
  </div>
</template>

<style scoped>
.result-container {
  text-align: center;
}
ul.text-error {
  list-style-type: none;
  padding: 0;
}
</style>
