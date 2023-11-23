function doGet(e) {
    return HtmlService.createHtmlOutput('Solicitação recebida');
  }
  
  function doPost(e) {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('dados');
  
    var ultimaLinha = Math.max(planilha.getLastRow(), 1);
  
    var linhaAtual = ultimaLinha + 1;
  
    planilha.insertRowAfter(ultimaLinha);
  
    var dataAtual = new Date();
    var nome = e.parameter.nome;
    var cpf = e.parameter.cpf;
    var instagram = e.parameter.instagram;
    var campanha = e.parameter.campanha;
    var acertos = e.parameter.acertos;
  
    planilha.getRange(linhaAtual, 1).setValue(dataAtual);
    planilha.getRange(linhaAtual, 2).setValue(nome);
    planilha.getRange(linhaAtual, 3).setValue(instagram);
    planilha.getRange(linhaAtual, 4).setValue(cpf);
    planilha.getRange(linhaAtual, 5).setValue(campanha);
    planilha.getRange(linhaAtual, 6).setValue(acertos);
  
    SpreadsheetApp.flush();
  
    return ContentService.createTextOutput('{"status": "success"}').setMimeType(ContentService.MimeType.JSON);
  }
  