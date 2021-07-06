/// <reference types="cypress" />

let Chance  = require('chance');
let chance = new Chance();

Given(/^que acesso o site$/, () => {	
    cy.server()
    cy.route({
        method: 'POST', 
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
    }).as('postNewtable')   //-> as É um alias (variavel temporária)

    cy.route({
        method: 'POST', 
        url: '**/api/1/databases/userdetails/collections/usertable?**',
        status: 200,
        response: {} }).as('postUsertable')

    cy.route({
        method:  'GET', 
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {} }).as('getNewtable')

    //baseurl + o visit
    cy.visit('Register.html');

});

When(/^informar meus dados$/, () => {
	//type 
    cy.get('input[placeholder = "First Name"]').type(chance.first())
    cy.get('input[ng-model^=Last]').type(chance.last())
    cy.get('input[ng-model^=Email]').type(chance.email())
    cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted : false}))


    //Check -> checkbox e options
    cy.get('input[value=FeMale]').check(); //Marca a opção do radio option 
    cy.get('input[type=checkbox]').check('Cricket'); //Prencher o check com o value do elemento para diferenciar
    cy.get('input[type=checkbox]').check('Hockey');//Prencher o check com o value do elemento para diferenciar
  

    //Combobox -> Selects
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Australia', {force : true}); //Forçamos a interação com esse elemento, pq ele está oculto
    cy.get('select#yearbox').select('1997');
    cy.get('select[ng-model^=month]').select('March');
    cy.get('select#daybox').select('3');
    cy.get('input#firstpassword').type('Teste@2021');
    cy.get('input#secondpassword').type('Teste@2021');

    cy.get('input#imagesrc').attachFile('imagem-foto.png')
});

When(/^salvar$/, () => {
	cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
     })

    cy.wait('@postUsertable').then((resUsertable) => {
         expect(resUsertable.status).to.eq(200)
     })

     cy.wait('@getNewtable').then((resNewtable) => {
         expect(resNewtable.status).to.eq(200)
     })
});

