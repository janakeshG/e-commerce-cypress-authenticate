describe('API Performance check', () => {
    before(() => {
      //to start jmeter
      cy.exec('jmeter -n -t ${__filename}/performance_test_plan.jmx -l ${__filename}/results.jtl').then((result) => {
        
        cy.log(result.stdout);
      });
    });
  
    it('Search Product Performance', () => {
      cy.request('/api/search?query=Titan')
        .its('status')
        .should('eq', 200);
    });
  
    it('Add to Cart performance', () => {
      cy.request({
        method: 'POST',
        url: '/api/add-to-cart',
        body: { product_id: 'Titan' },
      })
        .its('status')
        .should('eq', 200);
    });
  
    it('Checkout performance', () => {
      cy.request({
        method: 'POST',
        url: '/api/checkout',
        body: { cart_id: 'testCartid12345' },
      })
        .its('status')
        .should('eq', 200);
    });
  });
  