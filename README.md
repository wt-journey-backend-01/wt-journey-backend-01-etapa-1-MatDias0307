# Atividade - Etapa 1 - DevBurger - WebTech Journey - Backend - 2025

### Estrutura do Projeto
  - public/ 
    - css/style.css
    - images/logo.png
    - data/lanches.json
  - views/ 
    - index.html
    - contato.html
    - 404.html
  - server.js 

### Rotas Implementadas
1. GET / - Página inicial com cardápio e formulário de sugestões
2. GET /sugestao - Processa sugestões via query string
3. GET /contato - Página de contato com formulário
4. POST /contato - Recebe dados do formulário de contato
5. GET /api/lanches - Endpoint API que retorna JSON com lanches
6. GET /contato-recebido - Confirmação de contato recebido (PRG)
7. Tratamento de erro 404 para rotas inexistentes

### Funcionalidades Implementadas
- Exibição do cardápio via API (/api/lanches)
- Formulário de sugestão de novos lanches
- Formulário de contato
- Padrão PRG (Post-Redirect-Get) para formulário de contato
- Páginas de confirmação para envios de formulários
- Página 404 personalizada

### Tecnologias Utilizadas
- Node.js
- Express
- HTML5
- CSS3
- JavaScript

## Como Executar o Projeto

1. Instale as dependências:
```bash
npm install express
```

2. Inicie o servidor:
```bash
npm start
```

3. Acesse no navegador:
```bash
http://localhost:3000
```