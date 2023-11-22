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

// Substitua as perguntas e respostas conforme necessário
let perguntas = [
  {
    pergunta: "Quando foi a primeira vez que falamos sobre nossa parceria com o Átila em nosso feed?",
    alternativas: ["24 de março de 2023", "30 de março de 2023", "31 de março de 2023"],
    resposta: "24 de março de 2023",
  },
  {
    pergunta: "Quantas vezes o Átila já apareceu em nosso feed?",
    alternativas: ["20", "18", "23", "16"],
    resposta: "20",
  },
  {
    pergunta: "A AllCross realizou o evento O Papo é Saúde com o Átila recentemente na XV de novembro, em Curitiba. Neste dia, aparecemos em 3 emissoras de TV, você sabe quais são?",
    alternativas: ["Tribuna da Massa, RicTV e BandTV", "RicTV, RPC e Tribuna da Massa", "Tribuna da Massa, RPC e RicTV"],
    resposta: "Tribuna da Massa, RicTV e BandTV",
  },
  {
    pergunta: "Em quais etapas Átila Abreu foi campeão?",
    alternativas: ["Silverado Stock Car 600 - GO e Velopark - RS", "Tarumã - RS e Velopark - RS", "Velopark - RS e Silverado Stock Car 600 - GO", "Interlagos - SP e Tarumã - RS"],
    resposta: "Silverado Stock Car 600 - GO e Velopark - RS",
  },
  {
    pergunta: "A AllCross realizou um evento com a Pole Motors em Curitiba no mês de maio. Em qual local da cidade esse evento aconteceu?",
    alternativas: ["Shopping Pátio Batel", "Restaurante Madalosso", "Hard Rock Café", "XV de Novembro"],
    resposta: "Hard Rock Café",
  },
  {
    pergunta: "Qual foi o primeiro Influenciador convidado pela AllCross para assistir a Stock Car? Dica: foi no mês de abril",
    alternativas: ["Júlio Cocielo", "Xenão", "Leo Stronda", "Isabella Mayeski"],
    resposta: "Xenão",
  },
  {
    pergunta: "A AllCross realizou um evento com palestra exclusiva do Átila Abreu, sobre o que Átila falou e qual era o nome do evento?",
    alternativas: ["Papo é Saúde Trabalho em Equipe", "Papo é Saúde Corrida e Trabalho", "Liderança em Foco Trabalho em Equipe", "Saúde em foco jornada de sucesso"],
    resposta: "Papo é Saúde Trabalho em Equipe",
  },
];

// Função para calcular o número de acertos
function calcularAcertos() {
  for (let i = 0; i < perguntas.length; i++) {
    const selectedOption = document.querySelector('input[name="resposta_' + i + '"]:checked');
    if (selectedOption && selectedOption.value === perguntas[i].resposta) {
      acertos++;
    }
  }
}

// Função para verificar se a pessoa acertou pelo menos 4 questões (ajuste conforme necessário)
function verificarAcerto() {
  if (acertos >= 5) {
    alert("Parabéns, você acertou pelo menos 5 questões!");
  } else {
    alert("Você acertou menos de 4 questões.");
  }
}

function validarCPF(inputElement) {
  var cpfCampo = inputElement;
  var cpf = cpfCampo.value.replace(/\D/g, '');

  var validFeedback = cpfCampo.nextElementSibling ? cpfCampo.nextElementSibling : cpfCampo.nextSibling;
  var invalidFeedback = validFeedback.nextElementSibling ? validFeedback.nextElementSibling : validFeedback.nextSibling;


  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      invalidFeedback.style.display = 'inline';
      validFeedback.style.display = 'none';
      return;
  }

  var soma = 0;
  for (var i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  var resto = 11 - (soma % 11);
  var digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

  soma = 0;
  for (var i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = 11 - (soma % 11);
  var digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

  if (digitoVerificador1 !== parseInt(cpf.charAt(9)) || digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      invalidFeedback.style.display = 'inline';
      validFeedback.style.display = 'none';
      return;
  }

  invalidFeedback.style.display = 'none';
  validFeedback.style.display = 'inline';
}

// Evento de clique no botão "Enviar"
/* document.getElementById("enviar").addEventListener("click", function() {
  calcularAcertos();
  verificarAcerto();
}); */

