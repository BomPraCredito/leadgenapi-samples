/**
 * Created by danielp on 12/2/2014.
 */
//This approach is only good for quick demo purposes
//The correct implementation
$(function(){
    $('#submitGen').click(function(e){
        e.preventDefault();
        var urlAjax =  "http://hml.bompracredito.com.br/app/api/LeadGen/IntegrateLead"; // url de homologação

        var leadGenRequest = {
            leadGeneratorId: "SEU_TOKEN_AQUI", //forneça seu token aqui
            borrower: {
                name: $("#nome").val(),
                cpf: $("#cpf").val(),
                email: $("#email").val(),
                dateOfBirth : $("#datanasc").val(),
                homePhone:{
                    areaCode:$("#ddd").val(),
                    number: $("#fone").val()
                }
            },
            proposal: {
                product: $("#produto").val(),
                term: $("#prazo").val(),
                amount: $("#valor").val()
            }
        }

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
                alert("erro: "+data.statusText+' - '+data.responseText);
            },
            dataType: 'json'
        });
    })

});