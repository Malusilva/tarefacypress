/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import enderecoFaturamento from '../support/page_objects/enderecoFaturamento.page'
const dadosFaturamento = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
       cy.visit('minha-conta')
       cy.fixture('perfil').then(dados =>{
            cy.login(dados.usuario, dados.senha)
       })
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        var quantidade = 2

        //cy.addProdutos('Autumn Pullie', 'L', 'Green', quantidade)
        //cy.addProdutos('Caesar Warm-Up Pant', '33', 'Purple', quantidade)
       // cy.addProdutos('Beaumont Summit Kit', 'L', 'Orange', quantidade)
        cy.addProdutos('Bruno Compete Hoodie', 'XL', 'Green', quantidade)

        cy.get('.dropdown-toggle > .text-skin').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
    
        enderecoFaturamento.faturamento('Maria', 'Luciano', '1sti', 'Brasil', 'Avenida Guarujá', '622', 'Guarulhos', 'São Paulo', '07159100', '1139632072', 'eu@eu.com.br')

        cy.finalizarCompra()
       cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

})