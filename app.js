const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const app = express()
const bodyParser = require('body-parser')
const util = require('util')
const cookie = require('cookie-parser')
const ejs = require("ejs");
const multer = require('multer');
const porta = process.env.PORT || 5586;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));
app.set("view engine", "ejs");
app.use(cookie());
app.use(cors());
const upload = multer();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pmp078917",
    database: "quizatila",
    port: "3306",
});

/* const db = mysql.createConnection({
    host: "localhost",
    user: "user_quizatila",
    password: "bl9M_51i0",
    database: "quizatila",
    port: "3306",
}); */

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
    res.render('index')
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});

app.post("/enviadados", upload.none(), async (req, res) => {
    const formulario = req.body;

    const cpfExistente = await queryData('SELECT cpf FROM inscricoes WHERE cpf = ?', [formulario.cpf]);

    if (cpfExistente.length > 0) {
        const html = await ejs.renderFile('views/paginaDeErro.ejs')
        return res.send(html);
    }

    const respostasCorretas = {
        respostaFeed: '24 de março de 2023',
        quantidadeApareceu: '20',
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

    if (acertos > 5) {
        //envioSheetsAcertou(informacoesContato);
        await queryData(sqlInsertInscricoes, [informacoesContato.cpf, informacoesContato.instagram, informacoesContato.campanha, informacoesContato.nome, 'Sim']);
        const html = await ejs.renderFile('views/paginaSucesso.ejs', { nome: informacoesContato.nome, qtdAcertos: acertos });
        return res.send(html);
    } else {
        //envioSheetsErrou(informacoesContato);
        await queryData(sqlInsertInscricoes, [informacoesContato.cpf, informacoesContato.instagram, informacoesContato.campanha, informacoesContato.nome, 'Não']);
        const html = await ejs.renderFile('views/paginaInsucesso.ejs', { nome: informacoesContato.nome })
        return res.send(html);
    }
});

function envioSheetsAcertou (informacoes) {

}

function envioSheetsErrou (informacoes) {

}

app.get('/paginaerro', (req, res) => {
    res.render('paginadeErro')
})

app.get('/paginasucesso', (req, res) => {
    res.render('paginaSucesso')
})

app.get('/paginainsucesso', (req, res) => {
    res.render('paginaInsucesso')
})