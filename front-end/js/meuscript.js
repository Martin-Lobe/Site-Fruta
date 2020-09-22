$( document ).ready(function() {
    $('#conteudoPrimario').removeClass("invisible");
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
            lin = "<tr>"+
              "<th>"+ frutas[i].nome +"</th>"+
              "<td>"+frutas[i].arvore+"</td>"+
              "<td>"+frutas[i].nome_binomial +"</td>"+
              "<td>"+frutas[i].cor+"</td>"+
              "<td>"+frutas[i].calorias+"</td>"+
            "</tr>";
            linhas_tabela = linhas_tabela + lin;
        }
        $('#corpoTabelaFrutas').html(linhas_tabela);
        $('#conteudoPrimario').addClass("invisible");
        $('#tabelaFrutas').addClass("invisible");
        $('#tabelaFrutas').removeClass("invisible");

    }
    });

  });