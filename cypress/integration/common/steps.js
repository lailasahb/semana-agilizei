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