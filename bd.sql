/* INSCRIÇÕES SORTEIO ATILA ABREU */

CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    instagram VARCHAR(255),
    campanha VARCHAR(255),
    acertoumaisdecinco VARCHAR(3) NOT NULL
);

/* CONFIRMAÇÕES NO EVENTO DE FINAL DE ANO */

CREATE TABLE confirmacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    unidade VARCHAR(100)
);


/* CRIAÇÃO TABELA PARA PESQUISA DOS CORRETORES */

CREATE TABLE pesquisaCorretores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  etapa1 VARCHAR(255),
  etapa2_regiao VARCHAR(255),
  etapa2_unidade VARCHAR(255),
  etapa2_idade VARCHAR(255),
  etapa2_genero VARCHAR(255),
  etapa2_nivelEscolar VARCHAR(255),
  etapa2_estadoCivil VARCHAR(255),
  etapa2_possuiDeficiencia VARCHAR(3),
  etapa2_possuiPlano VARCHAR(3),
  etapa2_temFilhos INT,
  etapa2_temAnimais INT,
  etapa3_pessoasCasa INT,
  etapa3_pessoasComPlano INT,
  etapa3_casaPropria VARCHAR(255),
  etapa3_qtsAnosAllcross VARCHAR(255),
  etapa3_jaSaiu VARCHAR(3),
  etapa3_qtsAnosTotalAllcross VARCHAR(255),
  etapa3_tipoCorretor VARCHAR(255),
  etapa3_ferramentaTrabalho VARCHAR(255),
  etapa3_qualFerramentaMaisUsa VARCHAR(255),
  etapa3_comunicacaoInternaOrdem TEXT,
  etapa4_comunicacaoExternaOrdem TEXT,
  etapa4_midiasConsomeOrdem TEXT,
  etapa4_meioLocomocao VARCHAR(255),
  etapa4_homeOffice VARCHAR(3),
  etapa4_motivadoQuando VARCHAR(255),
  etapa5_exerciciosFisicos VARCHAR(3),
  etapa5_gostaLer VARCHAR(3),
  etapa5_viajaFrequencia VARCHAR(255),
  etapa5_estilosMusicais TEXT,
  etapa5_gostaEstudar VARCHAR(3),
  etapa5_gostaPassearShopping VARCHAR(3),
  etapa5_sobreDrogasLicitas VARCHAR(255),
  etapa5_gostaFilmes VARCHAR(3),
  etapa5_vaiCinema VARCHAR(3),
  etapa5_atividadeArLivre VARCHAR(3),
  etapa6_notaLideranca INT,
  etapa6_notaMotivacao INT,
  etapa6_notaInfraestrutura INT,
  etapa6_notaQualidadeLead INT,
  etapa6_notaPremiacoes INT,
  etapa6_notaSuporte INT,
  etapa6_notaTreinamentos INT,
  etapa6_notaPertencimento INT,
  etapa6_notaEventos INT,
  etapa6_notaRecomendaria INT,
  etapa6_notaRecomendariaProdutos INT,
  etapa7_comoConheceu VARCHAR(255),
  etapa7_referenciaVendas VARCHAR(3),
  etapa7_nomeReferencia VARCHAR(255),
  etapa7_ambienteTrabalho TEXT,
  etapa7_outrosDetalhes TEXT,
  etapa7_notaConvivencia INT,
  etapa7_notaMaisModerna INT,
  etapa7_comoProspecta TEXT
);









