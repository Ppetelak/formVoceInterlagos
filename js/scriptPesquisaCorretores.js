let etapaAtual = 1;
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
  
  if (!validarCamposObrigatorios(`formEtapa${etapaAtual}`)) {
    // Se a validação falhar, exiba uma mensagem de erro ou tome outra ação necessária
    alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
    return;
  }
  document.getElementById(`formEtapa${etapaAtual}`).style.display = 'none';
  etapaAtual = proximaEtapa;
  etapaColeta = proximaEtapa -1;
  document.getElementById(`formEtapa${etapaAtual}`).style.display = 'block';

  if (etapaAtual < 8) {
    coletarDados(`formEtapa${etapaColeta}`, etapaColeta);
  }

  const progresso = (etapaAtual - 1) * (100 / 7);
  document.querySelector('.progress-bar').style.width = `${progresso}%`;

  window.scrollTo(0, 0);
}

function etapaAnterior() {
  if (etapaAtual > 1) {
    document.getElementById(`formEtapa${etapaAtual}`).style.display = 'none';
    etapaAtual--;
    document.getElementById(`formEtapa${etapaAtual}`).style.display = 'block';

    const progresso = (etapaAtual - 1) * (100 / 7);
    document.querySelector('.progress-bar').style.width = `${progresso}%`;

    window.scrollTo(0, document.body.scrollHeight);
  }
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

function enviar() {
  console.log('Foi clicado em enviar');
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
}

function validarCamposObrigatorios(formId) {
  const form = document.getElementById(formId);
  const camposObrigatorios = form.querySelectorAll('[data-required="true"]');
  
  for (const campo of camposObrigatorios) {
    if (campo.type === 'radio') {
      // Para campos de radio, pelo menos um deve ser selecionado
      const radioGroup = form.querySelector(`[name="${campo.name}"]:checked`);
      if (!radioGroup) {
        alert('Por favor, selecione uma opção para o campo obrigatório.');
        return false;
      }
    } else if (campo.type === 'select-one') {
      // Para selects, uma opção diferente de seleção padrão deve ser escolhida
      if (campo.selectedIndex === 0) {
        alert('Por favor, selecione uma opção para o campo obrigatório.');
        return false;
      }
    } else {
      // Para outros campos de entrada de texto, verifica se o valor está vazio
      if (!campo.value.trim()) {
        alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
        return false;
      }
    }
  }

  return true;
}
