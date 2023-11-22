CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    instagram VARCHAR(255),
    campanha VARCHAR(255),
    acertoumaisdecinco VARCHAR(3) NOT NULL
);
