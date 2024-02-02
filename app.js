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
const cors = require('cors');
const porta = process.env.PORT || 5586;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));
app.set("view engine", "ejs");
app.use(cookie());

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
    user: "user_allcrossnet",
    password: "bl9M_51i0",
    database: "allcrossnet",
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
    res.redirect('https://allcross.com.br');
});

app.get('/pesquisaCorretores', (req , res) => {
    res.render('pesquisaCorretores')
})

app.post('/recebePesquisa', (req, res) => {
    const dadosRecebidos = req.body;

    const insertData = { ...dadosRecebidos };

    insertData.etapa5.estilosMusicais= Array.isArray(insertData.etapa5.estilosMusicais)
    ? insertData.etapa5.estilosMusicais.join(', ')
    : insertData.etapa5.estilosMusicais;

    insertData.etapa7.ambienteTrabalho = Array.isArray(insertData.etapa7.ambienteTrabalho)
    ? insertData.etapa7.ambienteTrabalho.join(', ')
    : insertData.etapa7.ambienteTrabalho;

    insertData.etapa7.comoProspecta = Array.isArray(insertData.etapa7.comoProspecta)
    ? insertData.etapa7.comoProspecta.join(', ')
    : insertData.etapa7.comoProspecta;

    const sql = `
  INSERT INTO pesquisaCorretores (
    etapa1,
    etapa2_regiao,
    etapa2_unidade,
    etapa2_idade,
    etapa2_genero,
    etapa2_nivelEscolar,
    etapa2_estadoCivil,
    etapa2_possuiDeficiencia,
    etapa2_possuiPlano,
    etapa2_temFilhos,
    etapa2_temAnimais,
    etapa3_pessoasCasa,
    etapa3_pessoasComPlano,
    etapa3_casaPropria,
    etapa3_qtsAnosAllcross,
    etapa3_jaSaiu,
    etapa3_qtsAnosTotalAllcross,
    etapa3_tipoCorretor,
    etapa3_ferramentaTrabalho,
    etapa3_qualFerramentaMaisUsa,
    etapa3_comunicacaoInternaOrdem,
    etapa4_comunicacaoExternaOrdem,
    etapa4_midiasConsomeOrdem,
    etapa4_meioLocomocao,
    etapa4_homeOffice,
    etapa4_motivadoQuando,
    etapa5_exerciciosFisicos,
    etapa5_gostaLer,
    etapa5_viajaFrequencia,
    etapa5_estilosMusicais,
    etapa5_gostaEstudar,
    etapa5_gostaPassearShopping,
    etapa5_sobreDrogasLicitas,
    etapa5_gostaFilmes,
    etapa5_vaiCinema,
    etapa5_atividadeArLivre,
    etapa6_notaLideranca,
    etapa6_notaMotivacao,
    etapa6_notaInfraestrutura,
    etapa6_notaQualidadeLead,
    etapa6_notaPremiacoes,
    etapa6_notaSuporte,
    etapa6_notaTreinamentos,
    etapa6_notaPertencimento,
    etapa6_notaEventos,
    etapa6_notaRecomendaria,
    etapa6_notaRecomendariaProdutos,
    etapa7_comoConheceu,
    etapa7_referenciaVendas,
    etapa7_nomeReferencia,
    etapa7_ambienteTrabalho,
    etapa7_outrosDetalhes,
    etapa7_notaConvivencia,
    etapa7_notaMaisModerna,
    etapa7_comoProspecta
  ) VALUES (
    '${insertData.etapa1.primeiraEtapa}',
    '${insertData.etapa2.regiao}',
    '${insertData.etapa2.unidade}',
    '${insertData.etapa2.idade}',
    '${insertData.etapa2.genero}',
    '${insertData.etapa2.nivelEscolar}',
    '${insertData.etapa2.estadoCivil}',
    '${insertData.etapa2.possuiDeficiencia}',
    '${insertData.etapa2.possuiPlano}',
    '${insertData.etapa2.temFilhos}',
    '${insertData.etapa2.temAnimais}',
    '${insertData.etapa3.pessoasCasa}',
    '${insertData.etapa3.pessoasComPlano}',
    '${insertData.etapa3.casaPropria}',
    '${insertData.etapa3.qtsAnosAllcross}',
    '${insertData.etapa3.jaSaiu}',
    '${insertData.etapa3.qtsAnosTotalAllcross}',
    '${insertData.etapa3.tipoCorretor}',
    '${insertData.etapa3.ferramentaTrabalho}',
    '${insertData.etapa3.qualFerramentaMaisUsa}',
    '${insertData.etapa3.comunicacaoInternaOrdem}',
    '${insertData.etapa4.comunicacaoExternaOrdem}',
    '${insertData.etapa4.midiasConsomeOrdem}',
    '${insertData.etapa4.meioLocomocao}',
    '${insertData.etapa4.homeOffice}',
    '${insertData.etapa4.motivadoQuando}',
    '${insertData.etapa5.exerciciosFisicos}',
    '${insertData.etapa5.gostaLer}',
    '${insertData.etapa5.viajaFrequencia}',
    '${insertData.etapa5.estilosMusicais}',
    '${insertData.etapa5.gostaEstudar}',
    '${insertData.etapa5.gostaPassearShopping}',
    '${insertData.etapa5.sobreDrogasLicitas}',
    '${insertData.etapa5.gostaFilmes}',
    '${insertData.etapa5.vaiCinema}',
    '${insertData.etapa5.atividadeArLivre}',
    '${insertData.etapa6.notaLideranca}',
    '${insertData.etapa6.notaMotivacao}',
    '${insertData.etapa6.notaInfraestrutura}',
    '${insertData.etapa6.notaQualidadeLead}',
    '${insertData.etapa6.notaPremiacoes}',
    '${insertData.etapa6.notaSuporte}',
    '${insertData.etapa6.notaTreinamentos}',
    '${insertData.etapa6.notaPertencimento}',
    '${insertData.etapa6.notaEventos}',
    '${insertData.etapa6.notaRecomendaria}',
    '${insertData.etapa6.notaRecomendariaProdutos}',
    '${insertData.etapa7.comoConheceu}',
    '${insertData.etapa7.referenciaVendas}',
    '${insertData.etapa7.nomeReferencia}',
    '${insertData.etapa7.ambienteTrabalho}',
    '${insertData.etapa7.outrosDetalhes}',
    '${insertData.etapa7.notaConvivencia}',
    '${insertData.etapa7.notaMaisModerna}',
    '${insertData.etapa7.comoProspecta}'
  )
`;
    db.query(sql, (err, result) => {
        if(err){
            console.error('Erro ao inserir respostas no Banco de Dados', err)
        }
        const resposta = { mensagem: 'Dados recebidos com sucesso!' };
        res.json(resposta);
    })
});

app.get('/pagina-de-sucesso-pesquisa', (req,res) => {
    res.render('obrigadoCorretor')
})

app.get('/voce-em-interlagos', (req, res) => {
    res.render('index')
})

app.get('/festa-final-de-ano-confirmacao', (req, res) => {
    res.render('confirmacaoFinalDeAno')
})


async function enviarParaPlanilha(informacoesContato) {
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbyKRhGsUSLdvEaQDUpvKCcWZY2Og8nTD6ALsKDe1wiTDng-1AyRN0Kzjm5gROt_6axK/exec';
    
    try {
        await axios.post(googleSheetsUrl, null, {
            params: {
                nome: informacoesContato.nome,
                cpf: informacoesContato.cpf,
                instagram: informacoesContato.instagram,
                campanha: informacoesContato.campanha,
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

    const informacoesContato = {
        nome: formulario.nome,
        instagram: formulario.instagram,
        cpf: formulario.cpf,
        campanha: formulario.como_soube,
    };

    const sqlInsertInscricoes = 'INSERT INTO inscricoes(cpf, instagram, campanha, nome, acertoumaisdecinco) VALUES(?, ?, ?, ?, ?)'

    await enviarParaPlanilha(informacoesContato);
    await queryData(sqlInsertInscricoes, [informacoesContato.cpf, informacoesContato.instagram, informacoesContato.campanha, informacoesContato.nome, 'Sim']);

    const html = await ejs.renderFile('views/paginaSucesso.ejs', { nome: informacoesContato.nome});
    return res.send(html);
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
    res.render('paginaSucesso', {nome: 'Teste de Nome'})
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
