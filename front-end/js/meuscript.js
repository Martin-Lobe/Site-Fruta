$( document ).ready(function() {
    $('#conteudoPrimario').removeClass("hidden");

    $('#link_pagina_sobre').click(function(){
        $.ajax({
        url: 'http://localhost:5000/mostrar_frutas',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: pagina_sobre, // chama a função listar frutas para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });
    function pagina_sobre() {
        $('#tabelaFrutas').addClass("hidden");
        $('#tabelaSucos').addClass("hidden");
        $('#tabelaQuitandas').addClass("hidden");
        $('#conteudoPrimario').removeClass("hidden");
        $('#conteudoPrimario').addClass("show");
    }
    });

// FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--
$('#link_pagina_sobre').click(function(){
        $.ajax({
        url: 'http://localhost:5000/mostrar_frutas',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: pagina_sobre, // chama a função listar frutas para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    });
    $('#link_listar_frutas').click(function(){
        $.ajax({
        url: 'http://localhost:5000/mostrar_frutas',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar_frutas, // chama a função listar frutas para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });
    function listar_frutas(frutas) {
        //limpar a tabela de frutas
        //transformar cada fruta recebida em uma nova linha na tabela de frutas
        linhas_tabela="";
        for (var i in frutas){
            lin = '<tr id="linha_'+frutas[i].id+' ">'+
              "<td>"+ frutas[i].nome +"</td>"+
              "<td>"+frutas[i].arvore+"</td>"+
              "<td>"+frutas[i].nome_binomial +"</td>"+
              "<td>"+frutas[i].cor+"</td>"+
              "<td>"+frutas[i].calorias+"</td>"+
              '<td><a href=# id="excluir_' + frutas[i].id + '"' +
              'class="excluir_frutas"><img src="imagens/excluir.png" width=25px ' +
              'alt = "Excluir fruta" title="Excluir fruta"></a>' +
              '</td>'+
            "</tr>";
            linhas_tabela = linhas_tabela + lin;
            $('#corpoTabelaFrutas').append(lin)
        }
        $('#corpoTabelaFrutas').html(linhas_tabela);
        $('#conteudoPrimario').addClass("hidden");
        $('#tabelaSucos').addClass("hidden");
        $('#tabelaQuitandas').addClass("hidden");
        $('#tabelaFrutas').removeClass("hidden");
        $('#tabelaFrutas').addClass("show");


    }
    });

    $('#botao_incluir_fruta').click(function(){

    nome_fruta = $("#nome_fruta").val();
    nome_cientifico = $("#nome_cientifico").val();
    arvore = $("#arvore").val();
    cor = String($("#cor").val());
    calorias = $("#calorias").val();
    
    dados_incluir = JSON.stringify({nome: nome_fruta, arvore: arvore, nome_binomial: nome_cientifico, cor: cor, calorias: calorias });
    
    $.ajax({
        url : 'http://localhost:5000/incluir_fruta',
        type : 'POST',
        contentType : 'application/json', //mandando em json os dados
        dataType : 'json',
        data : dados_incluir,
        success : incluirFruta,
        error : erroIncluirFruta
    });
    function incluirFruta(resposta_2){
        if (resposta_2.resultado=="ok"){
            alert("Fruta foi incluida com sucesso!!!");
            $("#nome_fruta").val("");
            $("#nome_cientifico").val("");
            $("#arvore").val("");
            $("#cor").val("");
            $("#calorias").val("");
        }
    else {
        alert("Erro no back-end para incluir fruta.");
    }
    }
    function erroIncluirFruta(resposta_2){
        alert("Erro ao mandar dados para o back end.");
    }
    });

    $(document).on("click", ".excluir_frutas", function() {  
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_fruta = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
           url: 'http://localhost:5000/excluir_frutas/'+id_fruta, 
           type: 'DELETE', 
           dataType: 'json', 
           success: frutaExcluida,  
           error: erroAoExcluir 
        })});
    
        function frutaExcluida (retorno) { 
           if (retorno.resultado == "ok") {
            alert("Fruta removida com sucesso!"); 
           } else { 
              alert(retorno.resultado + ":" + retorno.detalhes); 
           } 
        } 
        function erroAoExcluir (retorno) { 
           alert("erro ao excluir dados, verifique o backend: "); 
        };
// FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--FRUTAS--

// SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--
$('#link_listar_sucos').click(function(){
    $.ajax({
    url: 'http://localhost:5000/mostrar_suco',
    method: 'GET',
    dataType: 'json', // os dados são recebidos no formato json
    success: listar_sucos, // chama a função listar frutas para processar o resultado
    error: function() {
        alert("erro ao ler dados, verifique o backend");
    }
});
function listar_sucos(sucos) {
    //limpar a tabela de Sucos
    //transformar cada suco recebida em uma nova linha na tabela de frutas
    linhas_tabela="";
    for (var i in sucos){
        lin = '<tr id="linha_'+sucos[i].id+' ">'+
          "<td>"+ sucos[i].nome +"</td>"+
          "<td>"+sucos[i].tamanho+"</td>"+
          "<td>"+sucos[i].data_fabricacao +"</td>"+
          "<td>"+sucos[i].fruta.nome+"</td>"+
          '<td><a href=# id="excluir_' + sucos[i].id + '"' +
          'class="excluir_sucos"><img src="imagens/excluir.png" width=25px ' +
          'alt = "Excluir Suco" title="Excluir Suco"></a>' +
          '</td>'+
        "</tr>";
        linhas_tabela = linhas_tabela + lin;
        $('#corpoTabelaSucos').append(lin)
    }
    $('#corpoTabelaSucos').html(linhas_tabela);
    $('#conteudoPrimario').addClass("hidden");
    $('#tabelaFrutas').addClass("hidden");
    $('#tabelaQuitandas').addClass("hidden");
    $('#tabelaSucos').removeClass("hidden");
    $('#tabelaSucos').addClass("show");


}
});

$('#botao_incluir_suco').click(function(){

    nome_suco = $("#nome_suco").val();
    tamanho = $("#tamanho").val();
    data = $("#data").val();
    fruta = String($("#fruta").val());
    
    
    dados_incluir = JSON.stringify({nome: nome_suco, tamanaho: tamanho, data_fabricacao: data, fruta: fruta});
    
    $.ajax({
        url : 'http://localhost:5000/incluir_suco',
        type : 'POST',
        contentType : 'application/json', //mandando em json os dados
        dataType : 'json',
        data : dados_incluir,
        success : incluirSuco,
        error : erroIncluirSuco
    });
    function incluirSuco(resposta_2){
        if (resposta_2.resultado=="ok"){
            alert("Suco foi incluida com sucesso!!!");
            $("#nome_suco").val("");
            $("#nome_cientifico").val("");
            $("#arvore").val("");
            $("#cor").val("");
            $("#calorias").val("");
        }
    else {
        alert("Erro no back-end para incluir fruta.");
    }
    }
    function erroIncluirSuco(resposta_2){
        alert("Erro ao mandar dados para o back end.");
    }
    });

    $(document).on("click", ".excluir_sucos", function() {  
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_suco = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
           url: 'http://localhost:5000/excluir_frutas/'+id_suco, 
           type: 'DELETE', 
           dataType: 'json', 
           success: sucoExcluida,  
           error: erroAoExcluir2 
        })});
    
        function sucoExcluida (retorno) { 
           if (retorno.resultado == "ok") {
            alert("Suco removida com sucesso!"); 
           } else { 
              alert(retorno.resultado + ":" + retorno.detalhes); 
           } 
        } 
        function erroAoExcluir2 (retorno) { 
           alert("erro ao excluir dados, verifique o backend(suco): "); 
        };
/// SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--SUCOS--

// QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--
$('#link_listar_quitandas').click(function(){
    $.ajax({
    url: 'http://localhost:5000/mostrar_quitanda',
    method: 'GET',
    dataType: 'json', // os dados são recebidos no formato json
    success: listar_quitandas, // chama a função listar frutas para processar o resultado
    error: function() {
        alert("erro ao ler dados, verifique o backend(quitanda)");
    }
});
function listar_quitandas(quitandas) {
    linhas_tabela="";
    for (var i in quitandas){
        lin = '<tr id="linha_'+quitandas[i].id+' ">'+
          "<td>"+ quitandas[i].nome +"</td>"+
          "<td>"+quitandas[i].suco.nome+"</td>"+
          "<td>"+quitandas[i].dono+"</td>"+
          '<td><a href=# id="excluir_' + quitandas[i].id + '"' +
          'class="excluir_quitandas"><img src="imagens/excluir.png" width=25px ' +
          'alt = "Excluir Quitanda" title="Excluir Quitanda"></a>' +
          '</td>'+
        "</tr>";
        linhas_tabela = linhas_tabela + lin;
        $('#corpoTabelaQuitandas').append(lin)
    }
    $('#corpoTabelaQuitandas').html(linhas_tabela);
    $('#conteudoPrimario').addClass("hidden");
    $('#tabelaFrutas').addClass("hidden");
    $('#tabelaSucos').addClass("hidden");
    $('#tabelaQuitandas').removeClass("hidden");
    $('#tabelaQuitandas').addClass("show");
}
});

$('#botao_incluir_quitanda').click(function(){

    quitanda = $("#nome_quitanda").val();
    suco = String($("#suco").val());
    dono = $("#dono").val();
    
    
    dados_incluir = JSON.stringify({nome: quitanda, suco: suco, dono: dono});
    
    $.ajax({
        url : 'http://localhost:5000/incluir_quitanda',
        type : 'POST',
        contentType : 'application/json', //mandando em json os dados
        dataType : 'json',
        data : dados_incluir,
        success : incluirQuitanda,
        error : erroIncluirQuitanda
    });
    function incluirQuitanda(resposta_2){
        if (resposta_2.resultado=="ok"){
            alert("Quitanda foi incluida com sucesso!!!");
            $("#nome_quitanda").val("");
            $("#suco").val("");
            $("#dono").val("");

        }
    else {
        alert("Erro no back-end para incluir quitanda.");
    }
    }
    function erroIncluirQuitanda(resposta_2){
        alert("Erro ao mandar dados para o back end(Quitanda).");
    }
    });

    $(document).on("click", ".excluir_quitandas", function() {  
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_quitanda = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
           url: 'http://localhost:5000/excluir_quitandas/'+id_quitanda, 
           type: 'DELETE', 
           dataType: 'json', 
           success: quitandaExcluida,  
           error: erroAoExcluir2 
        })});
    
        function quitandaExcluida (retorno) { 
           if (retorno.resultado == "ok") {
            alert("Quitanda removida com sucesso!"); 
           } else { 
              alert(retorno.resultado + ":" + retorno.detalhes); 
           } 
        } 
        function erroAoExcluir2 (retorno) { 
           alert("erro ao excluir dados, verifique o backend(quitanda): "); 
        };
// QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--QUITANDAS--
});