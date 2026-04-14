describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@raushni.com');
    cy.get('input[name="password"]').type('Admin123!@#');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('displays dashboard stats correctly', () => {
    cy.get('[data-testid="stats-card"]').should('have.length', 6);
    cy.contains('Total Members').should('be.visible');
    cy.contains('Total Donations').should('be.visible');
  });

  it('navigates to members page', () => {
    cy.get('[data-testid="nav-members"]').click();
    cy.url().should('include', '/members');
    cy.contains('Member Management').should('be.visible');
  });

  it('creates a new member', () => {
    cy.get('[data-testid="nav-members"]').click();
    cy.get('[data-testid="add-member-btn"]').click();

    cy.get('input[name="name"]').type('Test Member');
    cy.get('input[name="email"]').type('test@member.com');
    cy.get('input[name="phone"]').type('9876543210');
    cy.get('button[type="submit"]').click();

    cy.contains('Member created successfully').should('be.visible');
  });

  it('generates donation receipt', () => {
    cy.get('[data-testid="nav-donations"]').click();
    cy.get('[data-testid="generate-receipt"]').first().click();

    cy.get('[data-testid="receipt-preview"]').should('be.visible');
    cy.get('[data-testid="download-pdf"]').click();

    // Verify download started
    cy.readFile('cypress/downloads/donation_receipt.pdf').should('exist');
  });
});