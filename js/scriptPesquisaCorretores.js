let etapaAtual = 1;
let etapaAnterior = 0;
let dadosGerais = {};

$(document).ready(function () {
  $('.form-range').on('input', function () {
    var spanAtual = $(this).closest('.range').find('.notaAtual');
    spanAtual.text($(this).val());
  });

  $('input[name="referenciaVendas"]').change(function () {
    console.log('Mudou')
    if ($(this).val() === 'Sim') {
      $('#campoReferencia').show();
    } else {
      $('#campoReferencia').hide();
      $('#nomeReferencia').val('');
    }
  });

  $('input[name="ambienteTrabalho"]').change(function () {
    if ($(this).val() === 'Outros') {
      // Se selecionado "Outros", mostra o campo de input
      $('#campoOutros').show();
    } else {
      // Se selecionado qualquer outra opção, oculta e limpa o campo de input
      $('#campoOutros').hide();
      $('#outrosDetalhes').val('');
    }
  });
  
  setupContadorCaracteres('produtoAfinidade', 'contador1', 250);
  setupContadorCaracteres('interesseVendas', 'contador2', 150);
});

$( function() {
  $( ".sortable" ).sortable({
    tolerance: 'pointer'
  });
});

$(function () {
  $("#comunicacaoInterna").sortable({
      update: function (event, ul) {
        var ordem = $("#comunicacaoInterna li").map(function() {
          return $(this).text().trim();
        }).get();
    
        $("#comunicacaoInternaOrdem").val(ordem.join(', '));
      }
  });

  $("#comunicacaoExterna").sortable({
    update: function (event, ul) {
      var ordem = $("#comunicacaoExterna li").map(function() {
        return $(this).text().trim();
      }).get();
  
      $("#comunicacaoExternaOrdem").val(ordem.join(', '));
    }
  });

  $("#midiasConsome").sortable({
    update: function (event, ul) {
      var ordem = $("#midiasConsome li").map(function() {
        return $(this).text().trim();
      }).get();
  
      $("#midiasConsomeOrdem").val(ordem.join(', '));
    }
  });
});

function proximoEtapa(proximaEtapa) {

  etapaAnterior = proximaEtapa - 1;
  etapaAtual = proximaEtapa;
  let form = document.getElementById(`formEtapa${etapaAnterior}`);
  let camposObrigatorios = form.querySelectorAll("[required]");
  let validacao = validaCamposObrigatorios(camposObrigatorios);
  //let validacao = true;

  if(validacao === true){
    document.getElementById(`formEtapa${etapaAnterior}`).style.display = 'none';
    document.getElementById(`formEtapa${etapaAtual}`).style.display = 'block';
    if (etapaAnterior < 8) {
      coletarDados(`formEtapa${etapaAnterior}`, etapaAnterior);
    }
  
    const progresso = (etapaAtual) * (100 / 7);
    document.querySelector('.progress-bar').style.width = `${progresso}%`;
  
    window.scrollTo(0, 0);
  }  
}

function validarCampo(campo) {
  if (campo.type === 'select-one') {
    return campo.selectedIndex !== 0;
  } else if (campo.type === 'radio') {
    var radioGroup = campo.form.querySelectorAll(`[name="${campo.name}"]:checked`);
    return radioGroup.length > 0;
  } else {
    return campo.value.trim() !== '';
  }
}

function validaCamposObrigatorios(camposObrigatorios) {
  console.log(camposObrigatorios);

  for (let i = 0; i < camposObrigatorios.length; i++) {
    if (!validarCampo(camposObrigatorios[i])) {
      alert('Todos os campos são obrigatórios, verifique e preencha antes de avançar para próxima etapa ou enviar o formulário');
      return false; 
    }
  }

  return true;
}



function mudarEtapaAnterior(etapaAnterior) {
  let etapaEsconder = etapaAnterior + 1
  etapaAtual = etapaAtual - 1;
  document.getElementById(`formEtapa${etapaEsconder}`).style.display = 'none';
  document.getElementById(`formEtapa${etapaAnterior}`).style.display = 'block';

  const progresso = (etapaAtual) * (100 / 7);
  document.querySelector('.progress-bar').style.width = `${progresso}%`;

  window.scrollTo(0, document.body.scrollHeight);
}


function atualizarOrdem() {
    // Obtém a ordem atual e atualiza o campo oculto
    var ordem = $("#comunicacaoInterna").sortable("toArray", { attribute: "data-item" });
    $("#comunicacaoInternaOrdem").val(ordem.join(","));
}

function capturarOrdem() {
    // Captura a ordem antes de enviar o formulário (pode ser substituído pelo envio real do formulário)
    atualizarOrdem();

    // Exibe a ordem capturada (remova esta parte em uma implementação real)
    var ordemCapturada = $("#ordemPreferencia").val();
    alert("Ordem de preferência capturada: " + ordemCapturada);

    // Adicione aqui o código para enviar o formulário ou realizar outras ações necessárias
}

function setupContadorCaracteres(textAreaId, contadorId, maxCaracteres) {
  $('#' + textAreaId).on('input', function () {
    var contador = $(this).val().length; // Obtém o número atual de caracteres

    // Atualiza o span de contagem
    $('#' + contadorId).text(contador + '/' + maxCaracteres);

    // Limita o número de caracteres no textarea
    if (contador > maxCaracteres) {
      $(this).val($(this).val().substring(0, maxCaracteres));
      $('#' + contadorId).text(maxCaracteres + '/' + maxCaracteres);
    }
  });
}

function enviar(ultimaEtapa) {
  console.log('Foi clicado em enviar');
  let form = document.getElementById(`formEtapa${ultimaEtapa}`);
  let camposObrigatorios = form.querySelectorAll("[required]");
  let validacao = validaCamposObrigatorios(camposObrigatorios);

  if(validacao === true) {
    coletarDados("formEtapa7", 7);
  
    var dadosJSON = JSON.stringify(dadosGerais);
    console.log(dadosJSON);
    $.ajax({
      type: 'POST',
      url: '/recebePesquisa',
      contentType: 'application/json',
      data: dadosJSON,
      success: function(response) {
        console.log('Dados enviados com sucesso:', response);
        // Se a resposta contiver uma mensagem de sucesso, redirecione para a página desejada
        if (response && response.mensagem === 'Dados recebidos com sucesso!') {
          window.location.href = '/pagina-de-sucesso-pesquisa'; // Substitua '/pagina-de-sucesso' pelo URL desejado
        }
      },
      error: function(error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados. Por favor, tente novamente.');
      }
    });
  }
}

function coletarDados(formId, etapa) {
  var dadosForm = $("#" + formId).serializeArray();
  var dadosEtapa = {}; 

  $.each(dadosForm, function (i, field) {

    if (dadosEtapa[field.name]) {

      if (!Array.isArray(dadosEtapa[field.name])) {
        dadosEtapa[field.name] = [dadosEtapa[field.name]];
      }

      dadosEtapa[field.name].push(field.value);
    } else {
      dadosEtapa[field.name] = field.value;
    }
  });

  dadosGerais['etapa' + etapa] = dadosEtapa;
  console.log(dadosGerais)
}

