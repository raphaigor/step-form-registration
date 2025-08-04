import { reactive } from 'vue'

export function useFormValidator(formData) {
  const errors = reactive({
    email: '',
    tipoPessoa: '',
    nome: '',
    cpf: '',
    dataNascimento: '',
    razaoSocial: '',
    cnpj: '',
    dataAbertura: '',
    telefone: '',
    senha: ''
  })

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function isValidCPF(cpf) {
    return cpf.replace(/\D/g, '').length === 11
  }

  function isValidCNPJ(cnpj) {
    return cnpj.replace(/\D/g, '').length === 14
  }

  function isNotEmpty(value) {
    return value !== null && value !== undefined && value.toString().trim() !== ''
  }

  function validateFields(fields = []) {
    Object.keys(errors).forEach(key => errors[key] = '')

    const shouldValidate = field => fields.length === 0 || fields.includes(field)

    if (shouldValidate('email')) {
      if (!isNotEmpty(formData.email)) errors.email = 'E-mail é obrigatório'
      else if (!isValidEmail(formData.email)) errors.email = 'E-mail inválido'
    }

    if (shouldValidate('tipoPessoa')) {
      if (!isNotEmpty(formData.tipoPessoa)) errors.tipoPessoa = 'Tipo de Pessoa é obrigatório'
    }

    if (formData.tipoPessoa === 'pf') {
      if (shouldValidate('nome') && !isNotEmpty(formData.nome)) errors.nome = 'Nome é obrigatório'
      if (shouldValidate('cpf') && !isValidCPF(formData.cpf)) errors.cpf = 'CPF inválido'
      if (shouldValidate('dataNascimento') && !isNotEmpty(formData.dataNascimento)) errors.dataNascimento = 'Data de nascimento é obrigatória'
    }

    if (formData.tipoPessoa === 'pj') {
      if (shouldValidate('razaoSocial') && !isNotEmpty(formData.razaoSocial)) errors.razaoSocial = 'Razão social é obrigatória'
      if (shouldValidate('cnpj') && !isValidCNPJ(formData.cnpj)) errors.cnpj = 'CNPJ inválido'
      if (shouldValidate('dataAbertura') && !isNotEmpty(formData.dataAbertura)) errors.dataAbertura = 'Data de abertura é obrigatória'
    }

    if (shouldValidate('telefone') && !isNotEmpty(formData.telefone)) errors.telefone = 'Telefone é obrigatório'
    if (shouldValidate('senha') && !isNotEmpty(formData.senha)) errors.senha = 'Senha é obrigatória'

    return Object.values(errors).every(e => !e)
  }

  return {
    errors,
    validateFields
  }
}
