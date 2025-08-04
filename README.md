
# Desafio Técnico - Raphael Igor

Desafio Técnico desenvolvido com foco em demonstrar conhecimentos em Frontend, lógica de programação e fundamentos da web. A aplicação utiliza conceitos essenciais de JavaScript, HTML, CSS e protocolo HTTP, aplicados com a framework Vue.js para construção de uma interface moderna, funcional e responsiva.

[![Vue 3.5.17](https://img.shields.io/badge/Vue-3.5.17-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/) [![Vite 7.0.4](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Sass 1.89.2](https://img.shields.io/badge/Sass-1.89.2-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)

## Estrutura do Projeto

Este repositório está organizado em duas pastas principais:
```
└── backend
└── frontend
```

### `📡 /backend`

Contém uma API simulada utilizando Express, com os seguintes endpoints:

- `[GET] /registration` – Simula o carregamento da página
- `[POST] /registration` – Recebe os dados do formulário e responde com sucesso ou erro

Para executá-la siga os passos:

```
npm install
npm start

```
### `🖥️ /frontend`
Contém a interface do formulário desenvolvida em Vue 3 com Vite. Essa aplicação é responsável por renderizar as etapas do cadastro, realizar a validação dos dados e enviar os dados para o backend.

Para executá-lo siga os passos:
```
npm install
npm run dev
```

#### Arquitetura do frontend
```
src/
├── assets/                  # Estilos globais
├── components/              # Componentes globais reutilizáveis
│   ├── BaseButton/          # Componente de botão
│   ├── InputField/          # Componente de input
│   └── StepIndicator/       # Componente indicador de etapas
├── composables/             # Hooks reutilizáveis com lógica compartilhada
│   └── useFormValidator.js  # Validações de formulário
├── views/
│   └── InitForm/          # Página principal
│       └── steps/         # Etapas individuais do cadastro
├── App.vue             
└── main.js                
```


## Feedback

Caso tenha algum feedback, por favor nos contate por meio de raphaigor@gmail.com

