const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const app = express()
const bodyParser = require('body-parser')
const util = require('util')
const cookie = require('cookie-parser')
const ejs = require("ejs");
const multer = require('multer');
const axios = require('axios');
const porta = process.env.PORT || 5586;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));
app.set("view engine", "ejs");
app.use(cookie());

const upload = multer();

/* const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pmp078917",
    database: "quizatila",
    port: "3306",
}); */

const db = mysql.createConnection({
    host: "localhost",
    user: "user_allcrossnet",
    password: "bl9M_51i0",
    database: "allcrossnet",
    port: "3306",
});

db.connect((error) => {
    if (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    } else {
      console.log("Conexão bem-sucedida ao banco de dados");
    }
});

function queryData(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                console.log('Erro na inserção ao BD')
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = queryData;

app.get('/', (req, res) => {
    res.redirect('https://allcross.com.br');
});


app.get('/quizAtila', (req, res) => {
    res.render('index')
})

app.get('/festa-final-de-ano-confirmacao', (req, res) => {
    res.render('confirmacaoFinalDeAno')
})


async function enviarParaPlanilha(informacoesContato, acertos) {
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbyKRhGsUSLdvEaQDUpvKCcWZY2Og8nTD6ALsKDe1wiTDng-1AyRN0Kzjm5gROt_6axK/exec';
    

    try {
        await axios.post(googleSheetsUrl, null, {
            params: {
                nome: informacoesContato.nome,
                cpf: informacoesContato.cpf,
                instagram: informacoesContato.instagram,
                campanha: informacoesContato.campanha,
                acertos: acertos
            }
        });
        console.log('Dados enviados para a planilha com sucesso!');
        return true;
    } catch (error) {
        console.error('Erro ao enviar dados para a planilha:', error);
        return false;
    }
}
app.post("/enviadados", upload.none(), async (req, res) => {
    const formulario = req.body;

    const camposVazios = Object.values(formulario).some(value => !value);

    if (camposVazios) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const cpfExistente = await queryData('SELECT cpf FROM inscricoes WHERE cpf = ?', [formulario.cpf]);

    if (cpfExistente.length > 0) {
        const html = await ejs.renderFile('views/paginaDeErro.ejs')
        return res.send(html);
    }

    const respostasCorretas = {
        respostaFeed: '24 de março de 2023',
        quantidadeApareceu: '15',
        emissorasTV: 'Tribuna da Massa, RicTV e BandTV',
        etapasCampeao: 'Silverado Stock Car 600 - GO e Velopark - RS',
        localEvento: 'Hard Rock Café',
        influenciadorStockCar: 'Xenão',
        eventoPalestra: 'Papo é Saúde Trabalho em Equipe'
    };

    const respostasQuiz = {
        respostaFeed: formulario.respostaFeed,
        quantidadeApareceu: formulario.quantidade,
        emissorasTV: formulario.emissoras,
        etapasCampeao: formulario.etapas,
        localEvento: formulario.local,
        influenciadorStockCar: formulario.influenciador,
        eventoPalestra: formulario.evento
    };

    const informacoesContato = {
        nome: formulario.nome,
        instagram: formulario.instagram,
        cpf: formulario.cpf,
        campanha: formulario.como_soube,
    };

    let acertos = 0;

    for (const pergunta in respostasCorretas) {
        if (respostasQuiz[pergunta] === respostasCorretas[pergunta]) {
            acertos++;
        }
    }

    const sqlInsertInscricoes = 'INSERT INTO inscricoes(cpf, instagram, campanha, nome, acertoumaisdecinco) VALUES(?, ?, ?, ?, ?)'

    await enviarParaPlanilha(informacoesContato, acertos);

    if (acertos > 5) {
        await queryData(sqlInsertInscricoes, [informacoesContato.cpf, informacoesContato.instagram, informacoesContato.campanha, informacoesContato.nome, 'Sim']);
        const html = await ejs.renderFile('views/paginaSucesso.ejs', { nome: informacoesContato.nome, qtdAcertos: acertos });
        return res.send(html);
    } else {
        await queryData(sqlInsertInscricoes, [informacoesContato.cpf, informacoesContato.instagram, informacoesContato.campanha, informacoesContato.nome, 'Não']);
        const html = await ejs.renderFile('views/paginaInsucesso.ejs', { nome: informacoesContato.nome })
        return res.send(html);
    }
});

async function sendSheetsConfirmacaoEvento(informacoesContato) {
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbxJn5T9ciFac_WPxQrYIGUrhTVAY2X7pOe6DwbX85-hoXDm6LDEAWjhKmr__t1fUQMZ/exec';

    try {
        await axios.post(googleSheetsUrl, null, {
            params: {
                nome: informacoesContato.nome,
                cpf: informacoesContato.cpf,
                unidade: informacoesContato.unidade,
            }
        });
        console.log('Dados enviados para a planilha com sucesso!');
        return true;
    } catch (error) {
        console.error('Erro ao enviar dados para a planilha:', error);
        return false;
    }
}

app.post("/enviadados-confirmacaoEvento", upload.none(), async (req, res) => {
    const formulario = req.body;

    const camposVazios = Object.values(formulario).some(value => !value);

    if (camposVazios) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos' });
    }

    const cpfExistente = await queryData('SELECT cpf FROM confirmacoes WHERE cpf = ?', [formulario.cpf]);

    if (cpfExistente.length > 0) {
        return res.status(500).json({ mensagem: 'CPF já confirmado' });
    }

    const informacoesContato = {
        nome: formulario.nome,
        cpf: formulario.cpf,
        unidade: formulario.unidade,
    };

    const sqlInsertconfirmacoes = 'INSERT INTO confirmacoes(cpf, nome, unidade) VALUES(?, ?, ?)'

    await sendSheetsConfirmacaoEvento(informacoesContato);

    db.query(sqlInsertconfirmacoes, [informacoesContato.cpf, informacoesContato.nome, informacoesContato.unidade], (err, result) => {
        if (err)
        {
            console.log(err)
            return res.status(400).json({ mensagem: 'Erro no servidor, tente clicar em enviar novamente!'})
        }
        return res.status(400).json({ mensagem: 'CONFIRMAÇÃO FEITA COM SUCESSO ✅ ATÉ O EVENTO 😘' });
    })
});

app.get('/paginaerro', (req, res) => {
    res.render('paginadeErro')
})

app.get('/paginasucesso', (req, res) => {
    res.render('paginaSucesso')
})

app.get('/paginainsucesso', (req, res) => {
    res.render('paginaInsucesso')
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
