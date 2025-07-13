const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
    const nome = req.query.nome?.trim();
    const ingredientes = req.query.ingredientes?.trim();

    if (!nome || !ingredientes) {
        return res.redirect('/');
    }

    const sugestaoHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Obrigado pela sugestão! - DevBurger</title>
            <link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body>
            <div class="page-container">
                <header>
                    <div class="logo-container">
                        <a href="/">
                            <img src="/images/logo.png" alt="DevBurger Logo" class="logo">
                        </a>
                    </div>
                    <nav>
                        <a href="/" class="nav-link">
                            <i class="fas fa-utensils"></i>
                            <span>Cardápio</span>
                        </a>
                        <a href="/contato" class="nav-link">
                            <i class="fas fa-envelope"></i>
                            <span>Contato</span>
                        </a>
                    </nav>
                </header>
                
                <main>
                    <section class="confirmacao">
                        <h2>Obrigado pela sua sugestão!</h2>
                        <div class="detalhes-sugestao">
                            <p><strong>Nome do lanche:</strong> ${nome}</p>
                            <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                        </div>
                        <p class="mensagem-aviso">Nossa equipe vai avaliar sua sugestão!</p>
                        <a href="/" class="botao-voltar">
                            <i class="fas fa-arrow-left"></i> Voltar ao cardápio
                        </a>
                    </section>
                </main>
                
                <footer>
                    <p>DevBurger &copy; 2025 - WebTech Journey Backend</p>
                </footer>
            </div>
        </body>
        </html>
    `;

    res.send(sugestaoHTML);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
    const nome = req.body.nome?.trim();
    const email = req.body.email?.trim();
    const assunto = req.body.assunto?.trim();
    const mensagem = req.body.mensagem?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || !emailRegex.test(email) || !assunto || !mensagem) {
        return res.redirect('/contato');
    }

    const contatoData = { nome, email, assunto, mensagem };
    const contatoId = Date.now();

    app.locals.tempData = app.locals.tempData || {};
    app.locals.tempData[contatoId] = contatoData;

    res.redirect(`/contato-recebido?id=${contatoId}`);
});

app.get('/contato-recebido', (req, res) => {
    const id = req.query.id;

    if (!id || !app.locals.tempData || !app.locals.tempData[id]) {
        return res.redirect('/contato');
    }

    const { nome, email, assunto, mensagem } = app.locals.tempData[id];
    delete app.locals.tempData[id]; 

    const contatoRecebidoHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contato Recebido - DevBurger</title>
            <link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body>
            <div class="page-container">
                <header>
                    <div class="logo-container">
                        <a href="/">
                            <img src="/images/logo.png" alt="DevBurger Logo" class="logo">
                        </a>
                    </div>
                    <nav>
                        <a href="/" class="nav-link">
                            <i class="fas fa-utensils"></i>
                            <span>Cardápio</span>
                        </a>
                        <a href="/api/lanches" class="nav-link">
                            <i class="fas fa-code"></i>
                            <span>Cardápio JSON</span>
                        </a>
                    </nav>
                </header>
                
                <main>
                    <section class="confirmacao">
                        <h2>Obrigado pelo seu contato, ${nome}!</h2>
                        <div class="detalhes-contato">
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Assunto:</strong> ${assunto}</p>
                            <p><strong>Mensagem:</strong> ${mensagem}</p>
                        </div>
                        <a href="/" class="botao-voltar">
                            <i class="fas fa-arrow-left"></i> Voltar ao cardápio
                        </a>
                    </section>
                </main>
                
                <footer>
                    <p>DevBurger &copy; 2025 - WebTech Journey Backend</p>
                </footer>
            </div>
        </body>
        </html>
    `;

    res.send(contatoRecebidoHTML);
});

app.get('/api/lanches', async (req, res) => {
    const lanchesPath = path.join(__dirname, 'public', 'data', 'lanches.json');

    try {
        const data = await fs.promises.readFile(lanchesPath, 'utf-8');
        const lanches = JSON.parse(data);
        res.json(lanches);
    } catch (error) {
        console.error('Erro ao ler lanches.json:', error);
        res.status(500).send('Erro ao carregar os lanches');
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
    console.error('Erro interno do servidor:', err);
    res.status(500).send('Erro interno do servidor!');
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
