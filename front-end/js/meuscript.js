$( document ).ready(function() {
    $('#conteudoPrimario').removeClass("hidden");

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
              "<th>"+ frutas[i].nome +"</th>"+
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
        $('#tabelaFrutas').removeClass("hidden");
        $('#tabelaFrutas').addClass("show");


    }
    });

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
        $('#conteudoPrimario').removeClass("hidden");
        $('#conteudoPrimario').addClass("show");
    }
    });

    $('#botao_incluir_fruta').click(function(){

    nome_planta = $("#nome_planta").val();
    nome_cientifico = $("#nome_cientifico").val();
    arvore = $("#arvore").val();
    cor = $("#cor").val();
    calorias = $("#calorias").val();
    
    dados_incluir = JSON.stringify({nome: nome_planta, arvore: arvore, nome_binomial: nome_cientifico, cor: cor, calorias: calorias });
    
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
            $("#nome_planta").val("");
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
    


});