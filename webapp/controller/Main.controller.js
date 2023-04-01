sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";

        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () { // onInit equivale a INITIALIZATION no ABAP
                //alert("Meu programa está no ar!!!");
                let produto = {};
                let productModel = new JSONModel( produto );

                //This no javascript = ME-> no ABAP
                let view = this.getView();
                view.setModel( productModel, "ModeloProduto" );
            },

            onClickImage: function( oEvent ){
                urlObject.redirect( oEvent.getSource().getSrc(), true );
            },

            onPressBuscar: function(){
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url         : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method      : "GET",
                    async       : true,
                    crossDomain : true
                };

                //promise = quando uma função retorna como parametro de exportação outra função
                $.ajax( parameters ).done( function( resposta ){
                    let oProdutoModel = this.getView().getModel( "ModeloProduto" );
                    
                    //Clear
                    oProdutoModel.setData( {} );
                    oProdutoModel.refresh();
                    oProdutoModel.setData( resposta );
                    oProdutoModel.refresh();

                }.bind( this ) ) // Sucesso
                .fail( function(){
                    alert("Produto não encontrado.");                    
                }.bind( this ) ); // exception


                //variavel tipo texto - com aspas
               /* let material = "Agua Mineral Natural";

                //variavel de tipo numerico inteiro
                let peso = 500;
                let uom = "ml";

                //mumerico com casas decimais
                let qtdsodio = 15.66;

                //booleano - abap_bool
                let conteudoliquido = true;

                //tabela interna no javascript - array
                let composicao = ["bicabornato", "magnesio", "sulfato","brometo"];

                //estrutura - tipo com vairas propriedades - ou tbm chamado de objeto
                let produto = {
                    descricao : "chá verde",
                    marca : "quaker",
                    peso : 130,
                    uom : "g"
                }*/

            }
        });
    });
