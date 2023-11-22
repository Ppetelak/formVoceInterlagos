$(document).ready(function(){

    //Esconde todos os passos e exibe o primeiro ao carregar a página 
    $('.step').hide();
    $('.step').first().show();
    
    //Exibe no topo em qual passo estamos pela ordem da div que esta visivel
    var passoexibido = function(){
        var index = parseInt($(".step:visible").index());
        if(index == 0){
            //Se for o primeiro passo desabilita o botão de voltar
            $("#prev").prop('disabled',true);
            $("#prev").addClass('inactive')
        }else if(index == (parseInt($(".step").length)-1)){
            //Se for o ultimo passo desabilita o botão de avançar
            $("#next").prop('disabled',true);
            $("#next").addClass('inactive')
        }else{
            //Em outras situações os dois serão habilitados
            $("#next").prop('disabled',false);            
            $("#prev").prop('disabled',false);
            $("#next").removeClass('inactive')
            $("#prev").removeClass('inactive')
        }
        $("#passo").html(index + 1);
    
    };
    
    //Executa a função ao carregar a página
    passoexibido();
    
    //avança para o próximo passo
    $("#next").click(function(){
        $(".step:visible").hide().next().show();
        passoexibido();
    });
    
    //retrocede para o passo anterior
    $("#prev").click(function(){
        $(".step:visible").hide().prev().show();
        passoexibido();
    });
});// Variáveis globais


let acertos = 0;
let perguntas = [
  {
    pergunta: "Qual é a capital do Brasil?",
    alternativas: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    resposta: "Brasília",
  },
  {
    pergunta: "Qual é o nome do atual presidente do Brasil?",
    alternativas: ["Lula", "Bolsonaro", "Ciro Gomes", "Doria"],
    resposta: "Bolsonaro",
  },
  {
    pergunta: "Qual é o nome do maior rio da América do Sul?",
    alternativas: ["Amazonas", "Orinoco", "Paraná", "São Francisco"],
    resposta: "Amazonas",
  },
  {
    pergunta: "Qual é o nome da capital do estado de São Paulo?",
    alternativas: ["São Paulo", "Campinas", "Ribeirão Preto", "Santos"],
    resposta: "São Paulo",
  },
  {
    pergunta: "Qual é o nome da capital do estado do Rio de Janeiro?",
    alternativas: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    resposta: "Rio de Janeiro",
  },
  {
    pergunta: "Qual é o nome da capital do estado de Minas Gerais?",
    alternativas: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
    resposta: "Belo Horizonte",
  },
];

// Função para calcular o número de acertos
function calcularAcertos() {
  for (let i = 0; i < perguntas.length; i++) {
    if (document.getElementById("resposta_" + (i + 1)).value == perguntas[i].resposta) {
      acertos++;
    }
  }
}

// Função para verificar se a pessoa acertou pelo menos 6 questões
function verificarAcerto() {
  if (acertos >= 6) {
    // A pessoa acertou
    alert("Parabéns, você acertou pelo menos 6 questões!");
  } else {
    // A pessoa errou
    alert("Você errou mais de 5 questões.");
  }
}

// Evento de clique no botão "Enviar"
document.getElementById("enviar").addEventListener("click", function() {
  calcularAcertos();
  verificarAcerto();
});
