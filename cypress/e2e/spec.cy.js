/// <reference types="cypress" />

describe('Agenda Contatos App', () => {
  const baseUrl = 'https://agenda-contatos-react.vercel.app/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should add a new contact', () => {
    cy.get('input[placeholder="Nome"]').type('John Doe');
    cy.get('input[placeholder="E-mail"]').type('john.doe@example.com');
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.contains('Adicionar').click();

    cy.contains('div.contato', 'John Doe').should('exist');
    cy.contains('div.contato', 'john.doe@example.com').should('exist');
    cy.contains('div.contato', '123456789').should('exist');
  });

  it('should edit an existing contact', () => {
    // First add a contact to edit
    cy.get('input[placeholder="Nome"]').type('Jane Doe');
    cy.get('input[placeholder="E-mail"]').type('jane.doe@example.com');
    cy.get('input[placeholder="Telefone"]').type('987654321');
    cy.contains('Adicionar').click();

    // Ensure the contact was added
    cy.contains('div.contato', 'Jane Doe').should('exist');

    // Edit the contact
    cy.contains('div.contato', 'Jane Doe').within(() => {
      cy.contains('button', 'Editar').click();
    });
    cy.get('input[placeholder="Nome"]').clear().type('Jane Smith');
    cy.contains('Salvar').click();

    // Ensure the contact was edited
    cy.contains('div.contato', 'Jane Smith').should('exist');
    cy.contains('div.contato', 'Jane Doe').should('not.exist');
  });

  it('should delete a contact', () => {
    // First add a contact to delete
    cy.get('input[placeholder="Nome"]').type('Bob Smith');
    cy.get('input[placeholder="E-mail"]').type('bob.smith@example.com');
    cy.get('input[placeholder="Telefone"]').type('123123123');
    cy.contains('Adicionar').click();

    // Ensure the contact was added
    cy.contains('div.contato', 'Bob Smith').should('exist');

    // Delete the contact
    cy.contains('div.contato', 'Bob Smith').within(() => {
      cy.contains('button', 'Deletar').click();
    });

    // Wait for some time to ensure the removal process is completed
    cy.wait(2000);

    // Ensure the contact was deleted
    cy.contains('div.contato', 'Bob Smith', { timeout: 10000 }).should('not.exist');
  });
});
