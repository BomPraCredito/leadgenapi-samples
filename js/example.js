/**
 * Created by danielp on 12/2/2014.
 */
//This approach is only good for quick demo purposes
//The correct implementation
$(function(){
    $('#submitGen').click(function(e){
        e.preventDefault();
        var urlAjax =  "http://hml.bompracredito.com.br/app/api/LeadGen/IntegrateLead";

        var leadGenRequest = {
            leadGeneratorId: "d95ab0fb-a53e-4568-9b27-a4a000c7a0bc",
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