function doGet (e) {
    return HtmlService.createHtmlOutput('solicitação recebida');
  }
  
  function doPost (e) {
  
    if(typeof e !== 'undefined')
    var parametros = e.parameter;
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('dados');
  
    var ultimaLinha = Math.max(planilha.getLastRow(), 1);
  
    var linhaAtual = ultimaLinha + 1;
  
    planilha.insertRowAfter(ultimaLinha);
  
    var dataAtual = new Date() // variável para pegar a data de preemnchimento de um form ou no caso da criação de uma nova linha na planilha


    var data = parametros.nome;
    var cpf = parametros.cpf;
    var instagram = parametros.instagram;
    var campanha = parametros.campanha; 
    var acertos = parametros.acertos;
  
    planilha.getRange(linhaAtual, 1).setValue(dataAtual)
    planilha.getRange(linhaAtual, 2).setValue(nome);
    planilha.getRange(linhaAtual, 3).setValue(instagram);
    planilha.getRange(linhaAtual, 4).setValue(cpf);
    planilha.getRange(linhaAtual, 5).setValue(campanha);
    planilha.getRange(linhaAtual, 6).setValue(acertos);
  
    SpreadsheetApp.flush();
  
  
    return ContentService.createTextOutput('{"status": "success"}')
        .setMimeType(ContentService.MimeType.JSON);
  
  }
  