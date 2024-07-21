describe('Agenda Contatos App', () => {
    const baseUrl = 'https://agenda-contatos-react.vercel.app/'; 
        beforeEach(() => {
        cy.visit(baseUrl);
        });
    
        it('should add a new contact', () => {
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="phone"]').type('123456789');
        cy.get('button[type="submit"]').click();
    
        cy.contains('John Doe').should('exist');
        cy.contains('john.doe@example.com').should('exist');
        cy.contains('123456789').should('exist');
        });
    
        it('should edit an existing contact', () => {
        // First add a contact to edit
        cy.get('input[name="name"]').type('Jane Doe');
        cy.get('input[name="email"]').type('jane.doe@example.com');
        cy.get('input[name="phone"]').type('987654321');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Jane Doe').parent().find('button').contains('Edit').click();
        cy.get('input[name="name"]').clear().type('Jane Smith');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Jane Smith').should('exist');
        cy.contains('Jane Doe').should('not.exist');
        });
    
        it('should delete a contact', () => {
        // First add a contact to delete
        cy.get('input[name="name"]').type('Bob Smith');
        cy.get('input[name="email"]').type('bob.smith@example.com');
        cy.get('input[name="phone"]').type('123123123');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Bob Smith').parent().find('button').contains('Delete').click();
        cy.contains('Bob Smith').should('not.exist');
        });
    });
    