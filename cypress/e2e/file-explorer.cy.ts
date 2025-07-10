describe('File Explorer E2E Tests', () => {
  describe('Test Case 1: Initial Load', () => {
    it('should load the initial file structure correctly', () => {
      cy.visit('/');
      cy.get('h2', { timeout: 10000 }).should('contain', 'my project');
      cy.get('[role="treeitem"]').should('have.length.at.least', 6);

      cy.contains('config').should('be.visible');
      cy.contains('public').should('be.visible');
      cy.contains('src').should('be.visible');
      cy.contains('.gitignore').should('be.visible');
      cy.contains('package.json').should('be.visible');
      cy.contains('README.md').should('be.visible');
    });
  });

  describe('Test Case 2: Folder Expansion and Collapse', () => {
    it('should expand and collapse folders when clicked', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('App.css').should('not.exist');
      cy.contains('App.js').should('not.exist');
      cy.contains('index.js').should('not.exist');

      cy.contains('src').click();

      cy.contains('App.css').should('be.visible');
      cy.contains('App.js').should('be.visible');
      cy.contains('index.js').should('be.visible');

      cy.contains('src').click();

      cy.contains('App.css').should('not.exist');
      cy.contains('App.js').should('not.exist');
      cy.contains('index.js').should('not.exist');
    });

    it('should expand multiple folders independently', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('src').click();
      cy.contains('App.css').should('be.visible');

      cy.contains('public').click();
      cy.contains('index.html').should('be.visible');
      cy.contains('favicon.ico').should('be.visible');

      cy.contains('src').click();
      cy.contains('App.css').should('not.exist');
      cy.contains('index.html').should('be.visible');
      cy.contains('favicon.ico').should('be.visible');
    });
  });

  describe('Test Case 3: Item Deletion', () => {
    it('should delete a file and remove it from the UI', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('public').click();
      cy.contains('index.html').should('be.visible');

      cy.contains('index.html')
        .closest('[role="treeitem"]')
        .find('[data-testid="delete-button"]')
        .click({ force: true });

      cy.contains('index.html').should('not.exist');
      cy.contains('favicon.ico').should('be.visible');
    });

    it('should delete a folder and remove it from the UI', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('config').should('be.visible');

      cy.contains('config')
        .closest('[role="treeitem"]')
        .find('[data-testid="delete-button"]')
        .click({ force: true });

      cy.contains('config').should('not.exist');
    });
  });

  describe('Test Case 4: Icon Verification', () => {
    it('should display correct icons for different file types', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('src').closest('[role="treeitem"]').find('[data-testid="arrow-right"]').should('exist');
      cy.contains('public').closest('[role="treeitem"]').find('[data-testid="arrow-right"]').should('exist');

      cy.contains('src').click();

      cy.contains('App.css').closest('[role="treeitem"]').find('[data-testid="file-icon"]').should('exist');
      cy.contains('App.js').closest('[role="treeitem"]').find('[data-testid="file-icon"]').should('exist');
      cy.contains('.gitignore').closest('[role="treeitem"]').find('[data-testid="file-icon"]').should('exist');
    });

    it('should change folder arrow icon when expanded', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('src').closest('[role="treeitem"]').find('[data-testid="arrow-right"]').should('exist');
      cy.contains('src').closest('[role="treeitem"]').find('[data-testid="arrow-down"]').should('not.exist');

      cy.contains('src').click();

      cy.contains('src').closest('[role="treeitem"]').find('[data-testid="arrow-down"]').should('exist');
      cy.contains('src').closest('[role="treeitem"]').find('[data-testid="arrow-right"]').should('not.exist');
    });
  });

  describe('Additional Test Cases', () => {
    it('should handle keyboard navigation', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.get('[role="treeitem"]').first().focus();
      cy.get('[role="treeitem"]').first().type('{enter}');
      cy.contains('webpack.config.js').should('be.visible');

      cy.get('[role="treeitem"]').first().type(' ');
      cy.contains('webpack.config.js').should('not.exist');
    });

    it('should handle nested folder expansion', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('src').click();
      cy.contains('components').click();

      cy.contains('Button.css').should('be.visible');
      cy.contains('Button.js').should('be.visible');

      cy.contains('components').click();
      cy.contains('Button.css').should('not.exist');
      cy.contains('Button.js').should('not.exist');

      cy.contains('App.css').should('be.visible');
    });

    it('should handle multiple deletions', () => {
      cy.visit('/');
      cy.get('h2').should('contain', 'my project');

      cy.contains('config')
        .closest('[role="treeitem"]')
        .find('[data-testid="delete-button"]')
        .click({ force: true });
      cy.contains('config').should('not.exist');

      cy.contains('public')
        .closest('[role="treeitem"]')
        .find('[data-testid="delete-button"]')
        .click({ force: true });
      cy.contains('public').should('not.exist');

      cy.contains('src').should('be.visible');
    });
  });
}); 