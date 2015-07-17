/**
 * Created by danielp on 12/2/2014.
 */

var urlAjax =  "http://hml.bompracredito.com.br/app/leadgen/lead/<<YOUR TOKEN HERE>>"; // url de homologaçao
//var urlAjax =  "http://localhost:60494/leadgen/lead/8bf0efc6-8cb7-4884-a338-a4ab009f0df3"; // url de homologação

function getRequest() {
    var leadGenRequest = {
        borrower: {
            name: $("#nome").val(),
            cpf: $("#cpf").val(),
            email: $("#email").val(),
            dateOfBirth: $("#datanasc").val(),
            homePhone: {
                areaCode: $("#ddd").val(),
                number: $("#fone").val()
            },
            homeAddress: {
                cep:$("#cep").val()
            }
        },
        proposal: {
            product: $("#produto").val(),
            term: $("#prazo").val(),
            amount: $("#valor").val()
        }
    }
    return leadGenRequest;
}
$(function(){
    $('#submitGen').click(function(e){
        e.preventDefault();

        var leadGenRequest = getRequest();

        $.ajax({
            type: "POST",
            url: urlAjax,
            contentType: "application/json",
            data: JSON.stringify(leadGenRequest),
            success: function(data) {
                alert("sucesso");
                location.href=data.url;
            },
            error: function(data) {
                alert("erro: "+data.responseText);
            },
            dataType: 'json'
        });
    })

});

$(function(){
    $('#submitAndGet').click(function(e){
        e.preventDefault();

        var leadGenRequest = getRequest();
        $.ajax({
            type: "POST",
            url: urlAjax,
            contentType: "application/json",
            data: JSON.stringify(leadGenRequest),
            success: function(data) {
                $.ajax({
                    type:"GET",
                    url: urlAjax+"/"+data.leadId,
                    success : function (data) {
                        var jsonPretty = JSON.stringify(data, null, '\t');
                        $("pre").text(jsonPretty);
                    },
                    error : function (data) {
                        $("pre").text("Erro: "+data.responseText);
                    }
                })
            },
            error: function(data) {
                alert("erro: "+data.responseText);
            },
            dataType: 'json'
        });
    })

});