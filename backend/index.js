const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// GET /registration - serve a SPA
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

// POST /registration - simula recebimento e validação dos dados
app.post('/registration', (req, res) => {
  const data = req.body

  // Validação básica: verifica campos obrigatórios
  const requiredFields = ['email', 'tipoPessoa', 'telefone', 'senha']
  const pessoaFisicaFields = ['nome', 'cpf', 'dataNascimento']
  const pessoaJuridicaFields = ['razaoSocial', 'cnpj', 'dataAbertura']

  const missingFields = []

  requiredFields.forEach(field => {
    if (!data[field]) missingFields.push(field)
  })

  if (data.tipoPessoa === 'pf') {
    pessoaFisicaFields.forEach(field => {
      if (!data[field]) missingFields.push(field)
    })
  } else if (data.tipoPessoa === 'pj') {
    pessoaJuridicaFields.forEach(field => {
      if (!data[field]) missingFields.push(field)
    })
  } else {
    return res.status(400).json({ error: 'Tipo de pessoa inválido' })
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Campos obrigatórios ausentes',
      missing: missingFields
    })
  }

  console.log('Dados recebidos:', data)
  return res.json({ message: 'Cadastro recebido com sucesso!' })
})

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`)
})
